import Link from "next/link";
import type { Lead } from "@/lib/admin/data";
import { statusLabels } from "@/lib/admin/data";
import { kindLabels, marketName, smsHref, sourceLabel, telHref, whenLabel } from "@/lib/admin/format";

const badge: Record<string, string> = {
  new: "bg-brass text-navy",
  contacted: "bg-navy text-salt",
  closed: "bg-sand text-shingle-deep",
};

export function ContactButtons({ lead, size = "sm" }: { lead: Lead; size?: "sm" | "lg" }) {
  const cls =
    size === "lg"
      ? "inline-flex min-h-14 items-center justify-center bg-navy px-6 text-[1.1rem] font-semibold text-salt"
      : "inline-flex min-h-11 items-center justify-center border border-navy px-4 text-base font-semibold text-navy";
  return (
    <div className="flex flex-wrap gap-2">
      {lead.phone ? (
        <>
          <a href={telHref(lead.phone)} className={cls}>Call</a>
          <a href={smsHref(lead.phone)} className={cls}>Text</a>
        </>
      ) : null}
      {lead.email ? <a href={`mailto:${lead.email}`} className={cls}>Email</a> : null}
    </div>
  );
}

export function LeadCard({ lead }: { lead: Lead }) {
  const status = lead.status ?? "new";
  const place = [lead.town, marketName(lead.market)].filter(Boolean).join(" · ");
  return (
    <li className="border border-line bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <div className="min-w-0">
          <Link href={`/admin/leads/${lead.id}`} className="font-serif text-[1.6rem] leading-tight text-navy hover:underline">
            {lead.name}
          </Link>
          <p className="mt-1 text-ink/90">
            {kindLabels[lead.kind] ?? lead.kind}
            {place ? ` · ${place}` : ""}
          </p>
          <p className="mt-1 text-base text-shingle-deep">
            {whenLabel(lead.created_at)} · from {sourceLabel(lead)}
          </p>
        </div>
        <span className={`shrink-0 px-2.5 py-1 text-[0.85rem] font-bold tracking-wide uppercase ${badge[status]}`}>
          {statusLabels[status as keyof typeof statusLabels] ?? status}
        </span>
      </div>
      {lead.notes ? <p className="mt-3 line-clamp-2 text-ink/90">&ldquo;{lead.notes}&rdquo;</p> : null}
      <div className="mt-4">
        <ContactButtons lead={lead} />
      </div>
    </li>
  );
}
