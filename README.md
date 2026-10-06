# The Lawton Collection

Marketing site for **Michelle Lawton**, real estate on Cape Cod (Falmouth and the Upper Cape) and the South Shore of Massachusetts. Brockton roots. Straight advice.

Next.js (App Router) · TypeScript · Tailwind CSS · Supabase · Resend · Vercel

## Run it locally

```bash
npm install
cp .env.example .env.local   # fill in what you have; everything is optional locally
npm run dev                   # http://localhost:3000
npm run build                 # production build, must pass before deploy
```

With no Supabase or Resend keys the site still runs. Form submissions are validated, but they return a friendly error because there's nowhere to store or send them.

## Environment variables

| Variable | Where | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | public | Canonical URL, used for metadata, the sitemap and Open Graph. Defaults to `https://thelawtoncollection.com`. |
| `NEXT_PUBLIC_BROKERAGE_NAME` | public | Brokerage shown in the footer (required by Massachusetts advertising rules). Defaults to `CENTURY 21 North East`. |
| `NEXT_PUBLIC_AGENT_TITLE` | public | Michelle's title. Defaults to `Broker Associate`. |
| `NEXT_PUBLIC_OFFICE_STREET` / `_CITY` / `_ZIP` | public | Brokerage office address. Defaults to 700 West Center Street, Suite 13, West Bridgewater, MA 02379. |
| `NEXT_PUBLIC_C21_PROFILE_URL` | public | Link to her CENTURY 21 agent profile (footer, About, structured data). |
| `NEXT_PUBLIC_PHONE` | public | Phone as displayed. Defaults to `508-942-1180`. |
| `NEXT_PUBLIC_PHONE_TEL` | public | Phone for `tel:` links. Defaults to `+15089421180`. |
| `NEXT_PUBLIC_EMAIL` | public | Public email for the header menu, footer, contact and About pages. Defaults to `Michelle.lawton@comcast.net`. |
| `NEXT_PUBLIC_LICENSE` | public | License number for the footer. Hidden when blank. |
| `SUPABASE_URL` | server | Supabase project URL. |
| `SUPABASE_SERVICE_ROLE_KEY` | server | Service-role key. **Server only, never add `NEXT_PUBLIC_`.** |
| `RESEND_API_KEY` | server | Resend key. Email is skipped when blank; leads are still stored. |
| `LEAD_TO_EMAIL` | server | Where lead notifications go. Use commas for more than one address. Defaults to `Michelle.lawton@comcast.net`. |
| `LEAD_FROM_EMAIL` | server | Sender on a Resend-verified domain. Falls back to Resend's test sender. |
| `RATE_LIMIT_SALT` | server | Random string that salts the hashed IP for rate limiting. |

Never invent a license number, brokerage name, office hours, sold price or review count. If a value isn't on file, leave it blank and the row disappears.

## Supabase

Create a project, open **SQL editor**, and run [`supabase/schema.sql`](supabase/schema.sql):

```sql
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
```

Row level security is on with no policies, so only the server (service role) can read or write. Read leads in the Supabase table editor, or export them to CSV.

## How the forms work

- Server actions in `app/actions.ts` handle every form and validate on the server.
- **Honeypot**: a hidden `website` field. If it's filled in, the submission is quietly dropped.
- **Rate limit**: at most 5 submissions per salted, hashed IP in 10 minutes, counted across both tables. The raw IP is never stored.
- Each lead stores its `source_page` and `market` (`cape` or `south_shore`). Listing inquiries also store the listing slug.
- The market-letter checkbox is unchecked by default. Checking it adds the email to `subscribers`.
- If `RESEND_API_KEY` is set, Michelle gets a plain-text email at `LEAD_TO_EMAIL` with Reply-To set to the sender. Without it, the lead is still stored in Supabase and the visitor still sees the thank-you page.

## Content

- **Listings**: `content/listings.ts`. Typed, manual entries. Put photos in `public/listings/<slug>/`. Until a photo file exists, the site shows a described placeholder. Delete the two `sample: true` entries before launch. `lib/listings.ts` marks where an IDX adapter would go. Cape Cod & Islands MLS and MLS PIN are separate feeds and each needs the broker's signed agreement first.
- **Credentials**: `content/credentials.ts`. Designations and awards as shown on her CENTURY 21 profile. Add only what is on record.
- **Villages and towns**: `content/places.ts`. Local notes only: no prices, ratings or statistics.
- **Photography**: `content/images.ts`. Crops in `public/brand/crops/` come from the brand references in `public/brand/` (original filenames kept). These are direction images and are never shown as a listing.
- **Monogram**: `lib/monogram.ts`. Traced from `public/brand/02-name-lockup.jpg`. One path drives the header, the footer, the favicon (`app/icon.tsx`) and the Open Graph image (`app/opengraph-image.tsx`).

## Deploy on Vercel

1. Push this repo to GitHub.
2. In Vercel: **Add New → Project**, import the repo. The framework preset is Next.js; keep the defaults.
3. Under **Settings → Environment Variables**, add the variables above for Production (and Preview if you want forms to work on previews).
4. Deploy. Check that `npm run build` passes locally first.
5. Under **Settings → Domains**, add `thelawtoncollection.com` and `www.thelawtoncollection.com`, then set the DNS records Vercel shows at your registrar.
6. In Resend, verify the sending domain and set `LEAD_FROM_EMAIL` to an address on it.
7. Submit each form once on production. Confirm the row appears in Supabase and the email arrives.

## Not in this build

IDX or MLS search, maps with pins, buyer accounts, a blog engine, chat and payments are all deliberately left out.
