-- HamNava V78: public community profiles and safe follow relationships
-- Run in Supabase SQL Editor after reviewing the policies.
create table if not exists public.community_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 80),
  bio text not null default '' check (char_length(bio) <= 280),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.community_follows (
  follower_id uuid not null references auth.users(id) on delete cascade,
  followed_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, followed_id),
  constraint community_no_self_follow check (follower_id <> followed_id)
);
create index if not exists community_follows_followed_idx on public.community_follows(followed_id);
alter table public.community_profiles enable row level security;
alter table public.community_follows enable row level security;
drop policy if exists "Community profiles readable by authenticated users" on public.community_profiles;
create policy "Community profiles readable by authenticated users" on public.community_profiles for select to authenticated using (true);
drop policy if exists "Users create their community profile" on public.community_profiles;
create policy "Users create their community profile" on public.community_profiles for insert to authenticated with check (auth.uid() = user_id);
drop policy if exists "Users edit their community profile" on public.community_profiles;
create policy "Users edit their community profile" on public.community_profiles for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "Users delete their community profile" on public.community_profiles;
create policy "Users delete their community profile" on public.community_profiles for delete to authenticated using (auth.uid() = user_id);
drop policy if exists "Authenticated users see follow relationships" on public.community_follows;
create policy "Authenticated users see follow relationships" on public.community_follows for select to authenticated using (true);
drop policy if exists "Users follow as themselves" on public.community_follows;
create policy "Users follow as themselves" on public.community_follows for insert to authenticated with check (auth.uid() = follower_id and follower_id <> followed_id);
drop policy if exists "Users unfollow as themselves" on public.community_follows;
create policy "Users unfollow as themselves" on public.community_follows for delete to authenticated using (auth.uid() = follower_id);
-- No public access to auth.users, emails, passwords, or private account metadata.
