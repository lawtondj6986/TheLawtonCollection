import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { leadCounts, listLeads, statusLabels } from "@/lib/admin/data";
import { LeadCard } from "@/components/admin/LeadCard";
import { getSupabase } from "@/lib/supabase";

export const metadata = { title: "Leads" };

type Search = { status?: string; market?: string };

function Chip({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center border px-4 text-base font-semibold ${
        active ? "border-navy bg-navy text-salt" : "border-line bg-white text-navy hover:border-navy"
      }`}
    >
      {children}
    </Link>
  );
}

export default async function AdminHome({ searchParams }: { searchParams: Promise<Search> }) {
  await requireAdmin();
  const { status = "", market = "" } = await searchParams;

  if (!getSupabase()) {
    return (
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8">
        <h1 className="text-[2.4rem]">Leads</h1>
        <p className="mt-4 max-w-xl text-ink/90">
          The database isn&rsquo;t connected yet. Add <code>SUPABASE_URL</code> and{" "}
          <code>SUPABASE_SERVICE_ROLE_KEY</code> in Vercel (see the README) and leads will show up here.
        </p>
      </div>
    );
  }

  const [counts, leads] = await Promise.all([leadCounts(), listLeads({ status, market })]);
  const q = (s: string, m: string) => {
    const p = new URLSearchParams();
    if (s) p.set("status", s);
    if (m) p.set("market", m);
    const str = p.toString();
    return `/admin${str ? `?${str}` : ""}`;
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-[2.4rem]">Leads</h1>
        <a href="/admin/leads.csv" className="link font-semibold">
          Download spreadsheet
        </a>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {[
          ["New", counts.fresh],
          ["This week", counts.thisWeek],
          ["This month", counts.thisMonth],
          ["All time", counts.total],
          ["Sign-ups", counts.subscribers],
        ].map(([label, n]) => (
          <div key={label} className="border border-line bg-white px-4 py-3">
            <dt className="text-[0.85rem] font-semibold tracking-wide text-shingle-deep uppercase">{label}</dt>
            <dd className="font-serif text-[2.2rem] leading-none text-navy">{n}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 flex flex-wrap gap-2">
        <Chip href={q("", market)} active={!status}>All</Chip>
        {(Object.keys(statusLabels) as (keyof typeof statusLabels)[]).map((s) => (
          <Chip key={s} href={q(s, market)} active={status === s}>{statusLabels[s]}</Chip>
        ))}
        <span className="mx-1 hidden self-center text-line sm:inline">|</span>
        <Chip href={q(status, "cape")} active={market === "cape"}>Cape Cod</Chip>
        <Chip href={q(status, "south_shore")} active={market === "south_shore"}>South Shore</Chip>
      </div>

      {leads.length ? (
        <ul className="mt-6 space-y-4">
          {leads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </ul>
      ) : (
        <p className="mt-8 text-lg text-ink/90">No leads here yet.</p>
      )}
    </div>
  );
}
