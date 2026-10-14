import { marketLabel, type Market } from "@/content/places";
import { purposes, timings } from "@/lib/forms";

export const kindLabels: Record<string, string> = {
  contact: "Message",
  valuation: "Home value",
  place: "Town page",
  listing: "Listing",
};

export function whenLabel(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function marketName(market: string | null) {
  return market && market in marketLabel ? marketLabel[market as Market] : null;
}

export function timingName(value: string | null) {
  return timings.find((t) => t.value === value)?.label ?? null;
}

export function purposeName(value: string | null) {
  return purposes.find((p) => p.value === value)?.label ?? null;
}

// Where the visitor came from, in one short phrase.
export function sourceLabel(lead: { utm_source: string | null; utm_campaign: string | null; referrer: string | null }) {
  if (lead.utm_source) return lead.utm_campaign ? `${lead.utm_source} · ${lead.utm_campaign}` : lead.utm_source;
  if (lead.referrer) return lead.referrer;
  return "direct";
}

export function telHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `tel:${digits.length === 10 ? `+1${digits}` : `+${digits}`}`;
}

export function smsHref(phone: string) {
  return telHref(phone).replace(/^tel:/, "sms:");
}
