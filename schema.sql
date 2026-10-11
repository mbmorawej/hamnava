-- Run once in Supabase SQL Editor. All authenticated members can read songs.
-- Each member can insert and delete only their own songs.
create table if not exists public.songs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text not null check (char_length(trim(title)) between 1 and 150),
  artist text not null check (char_length(trim(artist)) between 1 and 120),
  url text not null check (url ~ '^https://[^[:space:]]+$'),
  shared_by text check (char_length(shared_by) <= 80),
  created_at timestamptz not null default now()
);
create index if not exists songs_artist_idx on public.songs (artist);
create index if not exists songs_created_idx on public.songs (created_at desc);
alter table public.songs enable row level security;
revoke all on public.songs from anon;
grant select, insert, delete on public.songs to authenticated;
drop policy if exists "Members read songs" on public.songs;
create policy "Members read songs" on public.songs for select to authenticated using (true);
drop policy if exists "Members add own songs" on public.songs;
create policy "Members add own songs" on public.songs for insert to authenticated with check ((select auth.uid()) = user_id);
drop policy if exists "Members delete own songs" on public.songs;
create policy "Members delete own songs" on public.songs for delete to authenticated using ((select auth.uid()) = user_id);
