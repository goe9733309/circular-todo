-- Schema for the round 24-hour clock's optional cloud sync.
-- Run this once in the Supabase dashboard: SQL Editor -> New query -> Run.
--
-- Two tables, both keyed by the authenticated user. Row Level Security is
-- what keeps one account's schedules invisible to every other account, so
-- the policies below are load-bearing, not optional.

-- One row per user per day: the events on the clock plus the journal columns.
create table if not exists public.daily_entries (
  user_id    uuid        not null references auth.users (id) on delete cascade,
  entry_date date        not null,
  events     jsonb       not null default '[]'::jsonb,
  journal    jsonb       not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, entry_date)
);

-- One row per user: the global display settings blob (theme, clock style,
-- hand/title/label settings, journal font & columns, language).
create table if not exists public.user_settings (
  user_id    uuid        primary key references auth.users (id) on delete cascade,
  settings   jsonb       not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.daily_entries enable row level security;
alter table public.user_settings enable row level security;

-- Each policy is dropped first so this file can be re-run safely.
drop policy if exists "daily_entries owner read"   on public.daily_entries;
drop policy if exists "daily_entries owner insert" on public.daily_entries;
drop policy if exists "daily_entries owner update" on public.daily_entries;
drop policy if exists "daily_entries owner delete" on public.daily_entries;

create policy "daily_entries owner read" on public.daily_entries
  for select using (auth.uid() = user_id);
create policy "daily_entries owner insert" on public.daily_entries
  for insert with check (auth.uid() = user_id);
create policy "daily_entries owner update" on public.daily_entries
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "daily_entries owner delete" on public.daily_entries
  for delete using (auth.uid() = user_id);

drop policy if exists "user_settings owner read"   on public.user_settings;
drop policy if exists "user_settings owner insert" on public.user_settings;
drop policy if exists "user_settings owner update" on public.user_settings;
drop policy if exists "user_settings owner delete" on public.user_settings;

create policy "user_settings owner read" on public.user_settings
  for select using (auth.uid() = user_id);
create policy "user_settings owner insert" on public.user_settings
  for insert with check (auth.uid() = user_id);
create policy "user_settings owner update" on public.user_settings
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "user_settings owner delete" on public.user_settings
  for delete using (auth.uid() = user_id);

-- Date-range browsing (the date picker) reads by user + date order.
create index if not exists daily_entries_user_date_idx
  on public.daily_entries (user_id, entry_date desc);
