-- Technical heartbeat table for Supabase activity monitoring.
-- This migration is intentionally isolated from all menu/business tables.
-- Do not use this table for products, categories, users, permissions, pricing,
-- availability, images, or any operational menu data.

create extension if not exists "pgcrypto";

create table if not exists public.system_heartbeat (
  id uuid primary key default gen_random_uuid(),
  service_name text not null unique,
  last_ping_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.system_heartbeat enable row level security;

comment on table public.system_heartbeat is
  'Isolated technical heartbeat table. Used only to keep minimal Supabase activity for Visual Food Menu.';

comment on column public.system_heartbeat.service_name is
  'Technical service identifier. For this project the value must be visual-food-menu.';

comment on column public.system_heartbeat.last_ping_at is
  'Timestamp of the latest technical heartbeat ping.';
