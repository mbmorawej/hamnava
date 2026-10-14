-- Run once in Supabase SQL Editor to enable HamNava community profile pictures.
alter table public.community_profiles add column if not exists avatar_path text;
alter table public.community_profiles drop constraint if exists community_avatar_path_valid;
alter table public.community_profiles add constraint community_avatar_path_valid check (avatar_path is null or avatar_path ~ ('^' || user_id::text || '/avatar[.](jpg|png|webp)' || chr(36)));
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('community-avatars','community-avatars',true,2097152,array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public=true,file_size_limit=2097152,allowed_mime_types=array['image/jpeg','image/png','image/webp'];
drop policy if exists "Community avatars public read" on storage.objects;
create policy "Community avatars public read" on storage.objects for select using (bucket_id='community-avatars');
drop policy if exists "Community avatar own upload" on storage.objects;
create policy "Community avatar own upload" on storage.objects for insert to authenticated with check (bucket_id='community-avatars' and (storage.foldername(name))[1]=auth.uid()::text);
drop policy if exists "Community avatar own update" on storage.objects;
create policy "Community avatar own update" on storage.objects for update to authenticated using (bucket_id='community-avatars' and (storage.foldername(name))[1]=auth.uid()::text) with check (bucket_id='community-avatars' and (storage.foldername(name))[1]=auth.uid()::text);
drop policy if exists "Community avatar own delete" on storage.objects;
create policy "Community avatar own delete" on storage.objects for delete to authenticated using (bucket_id='community-avatars' and (storage.foldername(name))[1]=auth.uid()::text);
));
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('community-avatars','community-avatars',true,2097152,array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public=true,file_size_limit=2097152,allowed_mime_types=array['image/jpeg','image/png','image/webp'];
drop policy if exists "Community avatars public read" on storage.objects;
create policy "Community avatars public read" on storage.objects for select using (bucket_id='community-avatars');
drop policy if exists "Community avatar own upload" on storage.objects;
create policy "Community avatar own upload" on storage.objects for insert to authenticated with check (bucket_id='community-avatars' and (storage.foldername(name))[1]=auth.uid()::text);
drop policy if exists "Community avatar own update" on storage.objects;
create policy "Community avatar own update" on storage.objects for update to authenticated using (bucket_id='community-avatars' and (storage.foldername(name))[1]=auth.uid()::text) with check (bucket_id='community-avatars' and (storage.foldername(name))[1]=auth.uid()::text);
drop policy if exists "Community avatar own delete" on storage.objects;
create policy "Community avatar own delete" on storage.objects for delete to authenticated using (bucket_id='community-avatars' and (storage.foldername(name))[1]=auth.uid()::text);
));
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('community-avatars','community-avatars',true,2097152,array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public=true,file_size_limit=2097152,allowed_mime_types=array['image/jpeg','image/png','image/webp'];
drop policy if exists "Community avatars public read" on storage.objects;
create policy "Community avatars public read" on storage.objects for select using (bucket_id='community-avatars');
drop policy if exists "Community avatar own upload" on storage.objects;
create policy "Community avatar own upload" on storage.objects for insert to authenticated with check (bucket_id='community-avatars' and (storage.foldername(name))[1]=auth.uid()::text);
drop policy if exists "Community avatar own update" on storage.objects;
create policy "Community avatar own update" on storage.objects for update to authenticated using (bucket_id='community-avatars' and (storage.foldername(name))[1]=auth.uid()::text) with check (bucket_id='community-avatars' and (storage.foldername(name))[1]=auth.uid()::text);
drop policy if exists "Community avatar own delete" on storage.objects;
create policy "Community avatar own delete" on storage.objects for delete to authenticated using (bucket_id='community-avatars' and (storage.foldername(name))[1]=auth.uid()::text);
));
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('community-avatars','community-avatars',true,2097152,array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public=true,file_size_limit=2097152,allowed_mime_types=array['image/jpeg','image/png','image/webp'];
drop policy if exists "Community avatars public read" on storage.objects;
create policy "Community avatars public read" on storage.objects for select using (bucket_id='community-avatars');
drop policy if exists "Community avatar own upload" on storage.objects;
create policy "Community avatar own upload" on storage.objects for insert to authenticated with check (bucket_id='community-avatars' and (storage.foldername(name))[1]=auth.uid()::text);
drop policy if exists "Community avatar own update" on storage.objects;
create policy "Community avatar own update" on storage.objects for update to authenticated using (bucket_id='community-avatars' and (storage.foldername(name))[1]=auth.uid()::text) with check (bucket_id='community-avatars' and (storage.foldername(name))[1]=auth.uid()::text);
drop policy if exists "Community avatar own delete" on storage.objects;
create policy "Community avatar own delete" on storage.objects for delete to authenticated using (bucket_id='community-avatars' and (storage.foldername(name))[1]=auth.uid()::text);
