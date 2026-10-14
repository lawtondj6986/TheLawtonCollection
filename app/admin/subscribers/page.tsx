import { requireAdmin } from "@/lib/admin/auth";
import { listSubscribers } from "@/lib/admin/data";
import { marketName, whenLabel } from "@/lib/admin/format";
import { getSupabase } from "@/lib/supabase";

export const metadata = { title: "Sign-ups" };

export default async function SubscribersPage() {
  await requireAdmin();
  const rows = getSupabase() ? await listSubscribers() : [];
  const active = rows.filter((r) => !r.unsubscribed_at);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-[2.4rem]">Market update sign-ups</h1>
        <a href="/admin/subscribers.csv" className="link font-semibold">
          Download spreadsheet
        </a>
      </div>
      <p className="mt-2 text-ink/90">{active.length} people have asked for the market update.</p>
      {active.length ? (
        <ul className="mt-6 divide-y divide-line border-y border-line bg-white">
          {active.map((r) => (
            <li key={r.id} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-4 py-3">
              <div>
                <a href={`mailto:${r.email}`} className="font-semibold text-navy hover:underline">
                  {r.email}
                </a>
                {r.name ? <span className="text-ink/90"> · {r.name}</span> : null}
              </div>
              <span className="text-base text-shingle-deep">
                {[marketName(r.market), whenLabel(r.created_at)].filter(Boolean).join(" · ")}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 text-lg text-ink/90">No sign-ups yet.</p>
      )}
    </div>
  );
}
