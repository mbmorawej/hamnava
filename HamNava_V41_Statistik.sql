-- HamNava V41 — Nur einmal in Supabase SQL Editor ausführen.
-- Admin-only report via RPC. Existing data is not deleted.
BEGIN;
CREATE TABLE IF NOT EXISTS public.hn_song_plays (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 song_id uuid NOT NULL REFERENCES public.songs(id) ON DELETE CASCADE,
 user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
 played_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS hn_song_plays_song_idx ON public.hn_song_plays(song_id);
CREATE INDEX IF NOT EXISTS hn_song_plays_user_time_idx ON public.hn_song_plays(user_id,played_at DESC);
ALTER TABLE public.hn_song_plays ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.hn_song_plays FROM anon, authenticated, PUBLIC;

CREATE OR REPLACE FUNCTION public.hn_record_play(p_song_id uuid)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE uid uuid := auth.uid();
BEGIN
 IF uid IS NULL THEN RETURN false; END IF;
 IF NOT EXISTS(SELECT 1 FROM public.songs s WHERE s.id=p_song_id AND
   (s.visibility='public' OR s.owner_id=uid OR public.hn_is_admin())) THEN RETURN false; END IF;
 -- Count at most once per song/user in 30 seconds.
 IF EXISTS(SELECT 1 FROM public.hn_song_plays p WHERE p.song_id=p_song_id AND p.user_id=uid
   AND p.played_at>now()-interval '30 seconds') THEN RETURN false; END IF;
 INSERT INTO public.hn_song_plays(song_id,user_id) VALUES(p_song_id,uid);
 RETURN true;
END $$;
REVOKE ALL ON FUNCTION public.hn_record_play(uuid) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.hn_record_play(uuid) TO authenticated;

CREATE OR REPLACE FUNCTION public.hn_admin_statistics()
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE result jsonb; pub_count bigint := 0; private_count bigint := 0;
BEGIN
 IF auth.uid() IS NULL OR NOT public.hn_is_admin() THEN
  RAISE EXCEPTION 'Access denied: administrator only' USING ERRCODE='42501';
 END IF;
 IF to_regclass('public.hn_public_playlists') IS NOT NULL THEN
  EXECUTE 'SELECT count(*) FROM public.hn_public_playlists' INTO pub_count;
 END IF;
 IF to_regclass('public.playlists') IS NOT NULL THEN
  EXECUTE 'SELECT count(*) FROM public.playlists' INTO private_count;
 END IF;
 SELECT jsonb_build_object(
  'total_songs',(SELECT count(*) FROM public.songs),
  'youtube',(SELECT count(*) FROM public.songs s WHERE lower(coalesce(to_jsonb(s)->>'source_type',''))='youtube' OR lower(coalesce(to_jsonb(s)->>'url','')) LIKE '%youtube.com/%' OR lower(coalesce(to_jsonb(s)->>'url','')) LIKE '%youtu.be/%'),
  'spotify',(SELECT count(*) FROM public.songs s WHERE lower(coalesce(to_jsonb(s)->>'source_type',''))='spotify' OR lower(coalesce(to_jsonb(s)->>'url','')) LIKE '%open.spotify.com/%'),
  'mp3',(SELECT count(*) FROM public.songs s WHERE (to_jsonb(s)->>'audio_path') IS NOT NULL OR lower(coalesce(to_jsonb(s)->>'source_type',''))='mp3' OR lower(coalesce(to_jsonb(s)->>'url','')) ~ '\.(mp3|wav|ogg|m4a)(\?|$)'),
  'other',(SELECT count(*) FROM public.songs s WHERE
    NOT (lower(coalesce(to_jsonb(s)->>'source_type','')) IN ('youtube','spotify','mp3') OR
      lower(coalesce(to_jsonb(s)->>'url','')) ~ '(youtube\.com|youtu\.be|open\.spotify\.com|\.(mp3|wav|ogg|m4a)(\?|$))' OR
      (to_jsonb(s)->>'audio_path') IS NOT NULL)),
  'artist_count',(SELECT count(DISTINCT nullif(btrim(artist),'')) FROM public.songs),
  'public_playlists',pub_count,'private_playlists',private_count,
  'user_count',(SELECT count(*) FROM auth.users),
  'total_plays',(SELECT count(*) FROM public.hn_song_plays),
  'artists',(SELECT coalesce(jsonb_agg(jsonb_build_object('name',name,'count',cnt) ORDER BY cnt DESC,name),'[]'::jsonb) FROM
   (SELECT coalesce(nullif(btrim(artist),''),'Unbekannt') name,count(*) cnt FROM public.songs GROUP BY 1 ORDER BY cnt DESC LIMIT 30) t),
  'genres',(SELECT coalesce(jsonb_agg(jsonb_build_object('name',name,'count',cnt) ORDER BY cnt DESC,name),'[]'::jsonb) FROM
   (SELECT coalesce(nullif(btrim(coalesce(to_jsonb(s)->>'genre',to_jsonb(s)->>'genres')),''),'Ohne Genre') name,count(*) cnt
    FROM public.songs s GROUP BY 1 ORDER BY cnt DESC LIMIT 30) t),
  'top_songs',(SELECT coalesce(jsonb_agg(jsonb_build_object('name',name,'count',cnt) ORDER BY cnt DESC,name),'[]'::jsonb) FROM
   (SELECT coalesce(s.artist,'')||' — '||coalesce(s.title,'') name,count(*) cnt
    FROM public.hn_song_plays p JOIN public.songs s ON s.id=p.song_id
    GROUP BY s.id,s.artist,s.title ORDER BY cnt DESC LIMIT 30) t)
 ) INTO result;
 RETURN result;
END $$;
REVOKE ALL ON FUNCTION public.hn_admin_statistics() FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.hn_admin_statistics() TO authenticated;
COMMIT;
