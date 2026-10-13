-- HamNava v38: Run once in Supabase SQL Editor, after taking a database backup.
-- Assumes public.admins(user_id), public.songs(id,user_id), public.playlists(id,owner_id).
BEGIN;

CREATE OR REPLACE FUNCTION public.hn_is_admin()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = ''
AS $$ SELECT EXISTS(SELECT 1 FROM public.admins WHERE user_id = (SELECT auth.uid())) $$;
REVOKE ALL ON FUNCTION public.hn_is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.hn_is_admin() TO authenticated;

ALTER TABLE public.songs ADD COLUMN IF NOT EXISTS visibility text NOT NULL DEFAULT 'public';
ALTER TABLE public.songs ALTER COLUMN visibility SET DEFAULT 'private';
ALTER TABLE public.songs DROP CONSTRAINT IF EXISTS hn_songs_visibility_check;
ALTER TABLE public.songs ADD CONSTRAINT hn_songs_visibility_check
CHECK (visibility IN ('private','review','public'));

CREATE OR REPLACE FUNCTION public.hn_guard_song_visibility()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
 IF TG_OP='INSERT' THEN
   IF NOT public.hn_is_admin() THEN NEW.visibility:='private'; END IF;
 ELSIF TG_OP='UPDATE' THEN
   IF NEW.visibility IS DISTINCT FROM OLD.visibility AND NOT public.hn_is_admin() THEN
      RAISE EXCEPTION 'Only administrators can change song visibility';
   END IF;
 END IF;
 RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS hn_guard_song_visibility ON public.songs;
CREATE TRIGGER hn_guard_song_visibility BEFORE INSERT OR UPDATE ON public.songs
FOR EACH ROW EXECUTE FUNCTION public.hn_guard_song_visibility();

ALTER TABLE public.songs ENABLE ROW LEVEL SECURITY;
-- Restrictive policy protects private songs even if older broad SELECT/ALL policies exist.
DROP POLICY IF EXISTS hn_song_visibility_gate ON public.songs;
CREATE POLICY hn_song_visibility_gate ON public.songs AS RESTRICTIVE FOR SELECT TO authenticated
USING (visibility='public' OR user_id=(SELECT auth.uid()) OR public.hn_is_admin());
DROP POLICY IF EXISTS hn_song_visibility_read ON public.songs;
CREATE POLICY hn_song_visibility_read ON public.songs FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS hn_admin_song_update ON public.songs;
CREATE POLICY hn_admin_song_update ON public.songs FOR UPDATE TO authenticated
USING (public.hn_is_admin()) WITH CHECK (public.hn_is_admin());
-- The existing owner INSERT/UPDATE/DELETE policies are preserved.

ALTER TABLE public.playlists ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS hn_admin_all_playlists_read ON public.playlists;
CREATE POLICY hn_admin_all_playlists_read ON public.playlists FOR SELECT TO authenticated
USING (public.hn_is_admin());
DROP POLICY IF EXISTS hn_admin_all_playlists_update ON public.playlists;
CREATE POLICY hn_admin_all_playlists_update ON public.playlists FOR UPDATE TO authenticated
USING (public.hn_is_admin()) WITH CHECK (public.hn_is_admin());
DROP POLICY IF EXISTS hn_admin_all_playlists_delete ON public.playlists;
CREATE POLICY hn_admin_all_playlists_delete ON public.playlists FOR DELETE TO authenticated
USING (public.hn_is_admin());
ALTER TABLE public.playlist_songs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS hn_admin_all_playlist_songs_read ON public.playlist_songs;
CREATE POLICY hn_admin_all_playlist_songs_read ON public.playlist_songs FOR SELECT TO authenticated
USING (public.hn_is_admin());
DROP POLICY IF EXISTS hn_admin_all_playlist_songs_write ON public.playlist_songs;
CREATE POLICY hn_admin_all_playlist_songs_write ON public.playlist_songs FOR ALL TO authenticated
USING (public.hn_is_admin()) WITH CHECK (public.hn_is_admin());

CREATE TABLE IF NOT EXISTS public.hn_public_playlists (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
 created_by uuid NOT NULL REFERENCES auth.users(id),
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS public.hn_public_playlist_songs (
 playlist_id uuid NOT NULL REFERENCES public.hn_public_playlists(id) ON DELETE CASCADE,
 song_id uuid NOT NULL REFERENCES public.songs(id) ON DELETE CASCADE,
 created_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY (playlist_id,song_id)
);
ALTER TABLE public.hn_public_playlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hn_public_playlist_songs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS hn_public_playlists_read ON public.hn_public_playlists;
CREATE POLICY hn_public_playlists_read ON public.hn_public_playlists FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS hn_public_playlists_admin_insert ON public.hn_public_playlists;
CREATE POLICY hn_public_playlists_admin_insert ON public.hn_public_playlists FOR INSERT TO authenticated WITH CHECK (public.hn_is_admin() AND created_by=(SELECT auth.uid()));
DROP POLICY IF EXISTS hn_public_playlists_admin_update ON public.hn_public_playlists;
CREATE POLICY hn_public_playlists_admin_update ON public.hn_public_playlists FOR UPDATE TO authenticated USING (public.hn_is_admin()) WITH CHECK (public.hn_is_admin());
DROP POLICY IF EXISTS hn_public_playlists_admin_delete ON public.hn_public_playlists;
CREATE POLICY hn_public_playlists_admin_delete ON public.hn_public_playlists FOR DELETE TO authenticated USING (public.hn_is_admin());
DROP POLICY IF EXISTS hn_public_playlist_songs_read ON public.hn_public_playlist_songs;
CREATE POLICY hn_public_playlist_songs_read ON public.hn_public_playlist_songs FOR SELECT TO authenticated
USING (EXISTS(SELECT 1 FROM public.songs s WHERE s.id=song_id AND (s.visibility='public' OR public.hn_is_admin())));
DROP POLICY IF EXISTS hn_public_playlist_songs_admin_insert ON public.hn_public_playlist_songs;
CREATE POLICY hn_public_playlist_songs_admin_insert ON public.hn_public_playlist_songs FOR INSERT TO authenticated
WITH CHECK (public.hn_is_admin() AND EXISTS(SELECT 1 FROM public.songs s WHERE s.id=song_id AND s.visibility='public'));
DROP POLICY IF EXISTS hn_public_playlist_songs_admin_delete ON public.hn_public_playlist_songs;
CREATE POLICY hn_public_playlist_songs_admin_delete ON public.hn_public_playlist_songs FOR DELETE TO authenticated USING (public.hn_is_admin());

CREATE TABLE IF NOT EXISTS public.hn_login_sessions (
 id uuid PRIMARY KEY,
 user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
 login_at timestamptz NOT NULL DEFAULT now(),
 logout_at timestamptz,
 last_seen_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS hn_sessions_recent_idx ON public.hn_login_sessions(login_at DESC);
CREATE INDEX IF NOT EXISTS hn_sessions_user_idx ON public.hn_login_sessions(user_id,login_at DESC);
ALTER TABLE public.hn_login_sessions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS hn_session_insert_own ON public.hn_login_sessions;
CREATE POLICY hn_session_insert_own ON public.hn_login_sessions FOR INSERT TO authenticated WITH CHECK (user_id=(SELECT auth.uid()));
DROP POLICY IF EXISTS hn_session_read_own_or_admin ON public.hn_login_sessions;
CREATE POLICY hn_session_read_own_or_admin ON public.hn_login_sessions FOR SELECT TO authenticated USING (user_id=(SELECT auth.uid()) OR public.hn_is_admin());
DROP POLICY IF EXISTS hn_session_update_own ON public.hn_login_sessions;
CREATE POLICY hn_session_update_own ON public.hn_login_sessions FOR UPDATE TO authenticated USING (user_id=(SELECT auth.uid())) WITH CHECK (user_id=(SELECT auth.uid()));

-- Optional, but recommended: cleanup with a scheduled Supabase job after 90 days.
-- DELETE FROM public.hn_login_sessions WHERE login_at < now() - interval '90 days';

-- HamNava V39: link a public copy to its source private playlist.
ALTER TABLE public.hn_public_playlists
  ADD COLUMN IF NOT EXISTS source_playlist_id uuid REFERENCES public.playlists(id) ON DELETE SET NULL;
CREATE UNIQUE INDEX IF NOT EXISTS hn_public_playlists_source_unique
  ON public.hn_public_playlists(source_playlist_id)
  WHERE source_playlist_id IS NOT NULL;
COMMIT;
