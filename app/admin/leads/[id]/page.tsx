import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { getLead, statusLabels, type LeadStatus } from "@/lib/admin/data";
import { kindLabels, marketName, purposeName, sourceLabel, timingName, whenLabel } from "@/lib/admin/format";
import { ContactButtons } from "@/components/admin/LeadCard";
import { saveLeadNote, setLeadStatus } from "@/app/admin/actions";
import { site } from "@/lib/site";

export const metadata = { title: "Lead" };

export default async function LeadPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const lead = await getLead(id);
  if (!lead) notFound();
  const status = (lead.status ?? "new") as LeadStatus;

  const facts: [string, string | null][] = [
    ["Received", whenLabel(lead.created_at)],
    ["Kind", kindLabels[lead.kind] ?? lead.kind],
    ["About", purposeName(lead.purpose)],
    ["Phone", lead.phone],
    ["Email", lead.email],
    ["Town", lead.town],
    ["Area", marketName(lead.market)],
    ["Timing", timingName(lead.timing)],
    ["Listing", lead.listing_slug],
    ["Market update", lead.list_consent ? "Signed up" : "No"],
    ["Came from", sourceLabel(lead)],
    ["Page", lead.source_page],
    ["First page seen", lead.landing_page],
    ["Contacted", lead.contacted_at ? whenLabel(lead.contacted_at) : null],
  ];

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8">
      <Link href="/admin" className="link text-base">
        ← All leads
      </Link>
      <h1 className="mt-4 text-[2.4rem]">{lead.name}</h1>
      <div className="mt-5">
        <ContactButtons lead={lead} size="lg" />
      </div>

      {lead.notes ? (
        <blockquote className="mt-8 border-l-2 border-brass bg-white px-5 py-4 text-[1.15rem] whitespace-pre-wrap text-ink">
          {lead.notes}
        </blockquote>
      ) : null}

      <section aria-labelledby="status" className="mt-8">
        <h2 id="status" className="text-[1.6rem]">Status</h2>
        <form action={setLeadStatus} className="mt-3 flex flex-wrap gap-2">
          <input type="hidden" name="id" value={lead.id} />
          {(Object.keys(statusLabels) as LeadStatus[]).map((s) => (
            <button
              key={s}
              type="submit"
              name="status"
              value={s}
              aria-pressed={status === s}
              className={`min-h-12 border px-5 text-base font-semibold ${
                status === s ? "border-navy bg-navy text-salt" : "border-line bg-white text-navy hover:border-navy"
              }`}
            >
              {statusLabels[s]}
            </button>
          ))}
        </form>
      </section>

      <section aria-labelledby="note" className="mt-8">
        <h2 id="note" className="text-[1.6rem]">Your note</h2>
        <form action={saveLeadNote} className="mt-3">
          <input type="hidden" name="id" value={lead.id} />
          <label htmlFor="admin-note" className="sr-only">
            Private note
          </label>
          <textarea
            id="admin-note"
            name="note"
            rows={4}
            defaultValue={lead.admin_note ?? ""}
            placeholder="Only you can see this."
            className="block w-full border border-line bg-white px-4 py-3 text-[1.1rem] focus:border-navy focus:outline-2 focus:outline-offset-0 focus:outline-brass"
          />
          <button type="submit" className="mt-3 inline-flex min-h-12 items-center bg-navy px-6 font-semibold text-salt">
            Save note
          </button>
        </form>
      </section>

      <section aria-labelledby="details" className="mt-10">
        <h2 id="details" className="text-[1.6rem]">Details</h2>
        <dl className="mt-3 border-t border-line">
          {facts
            .filter(([, v]) => v)
            .map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 border-b border-line py-3">
                <dt className="text-shingle-deep">{label}</dt>
                <dd className="text-right font-semibold break-all text-navy">
                  {label === "Page" ? (
                    <a href={`${site.url}${value}`} target="_blank" rel="noopener" className="hover:underline">
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            ))}
        </dl>
      </section>
    </div>
  );
}
