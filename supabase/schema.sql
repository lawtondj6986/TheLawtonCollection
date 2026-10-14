-- The Lawton Collection: tables for leads and the market letter list.
-- Run once in the Supabase SQL editor. The site writes with the service-role
-- key from the server only; row level security is on with no public policies,
-- so the anon key can read or write nothing.

create extension if not exists pgcrypto;

create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  kind          text not null check (kind in ('contact', 'valuation', 'place', 'listing')),
  purpose       text check (purpose in ('buying', 'selling', 'both', 'question')),
  name          text not null,
  email         text,
  phone         text,
  town          text,
  market        text check (market in ('cape', 'south_shore')),
  timing        text,
  notes         text,
  listing_slug  text,
  source_page   text not null,
  list_consent  boolean not null default false,
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  referrer      text,
  landing_page  text,
  ip_hash       text,
  user_agent    text,
  constraint leads_contact_present check (email is not null or phone is not null)
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_ip_hash_idx on public.leads (ip_hash, created_at);

create table if not exists public.subscribers (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  email            text not null unique,
  name             text,
  market           text check (market in ('cape', 'south_shore')),
  source_page      text not null,
  consent          boolean not null default false,
  consented_at     timestamptz,
  unsubscribed_at  timestamptz,
  ip_hash          text
);

create index if not exists subscribers_ip_hash_idx on public.subscribers (ip_hash, updated_at);

-- Command center: lead status and private notes (safe to re-run).
alter table public.leads add column if not exists status       text not null default 'new'
  check (status in ('new', 'contacted', 'closed'));
alter table public.leads add column if not exists admin_note   text;
alter table public.leads add column if not exists contacted_at timestamptz;
create index if not exists leads_status_idx on public.leads (status, created_at desc);

-- One-time sign-in codes for the command center. Only a hash is stored.
create table if not exists public.admin_codes (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  email       text not null,
  code_hash   text not null,
  expires_at  timestamptz not null,
  attempts    int not null default 0,
  used_at     timestamptz
);
create index if not exists admin_codes_email_idx on public.admin_codes (email, created_at desc);
alter table public.admin_codes enable row level security;

-- Columns added after the first release (safe to re-run).
alter table public.leads add column if not exists utm_source   text;
alter table public.leads add column if not exists utm_medium   text;
alter table public.leads add column if not exists utm_campaign text;
alter table public.leads add column if not exists referrer     text;
alter table public.leads add column if not exists landing_page text;

alter table public.leads enable row level security;
alter table public.subscribers enable row level security;
