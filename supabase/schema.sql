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

alter table public.leads enable row level security;
alter table public.subscribers enable row level security;
