"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getSupabase } from "@/lib/supabase";
import { notifyMichelle } from "@/lib/email";
import { getIpHash, isRateLimited } from "@/lib/rate-limit";
import { getListing } from "@/lib/listings";
import {
  HONEYPOT,
  leadKinds,
  purposes,
  timings,
  type FormState,
  type LeadKind,
} from "@/lib/forms";
import type { Market } from "@/content/places";
import { marketLabel } from "@/content/places";
import { site } from "@/lib/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function text(form: FormData, key: string, max: number) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function asMarket(value: string): Market | null {
  return value === "cape" || value === "south_shore" ? value : null;
}

function asSourcePage(value: string) {
  return value.startsWith("/") && !value.startsWith("//") ? value : "/";
}

// Only reached when the lead could be neither stored nor emailed.
function unavailableMessage() {
  return `Something went wrong on our end. Please call Michelle at ${site.phone} or email ${site.email}.`;
}

async function userAgent() {
  return (await headers()).get("user-agent")?.slice(0, 300) ?? null;
}

export async function submitLead(_prev: FormState, form: FormData): Promise<FormState> {
  const kindRaw = text(form, "kind", 20);
  const kind: LeadKind = (leadKinds as readonly string[]).includes(kindRaw)
    ? (kindRaw as LeadKind)
    : "contact";

  // Bots fill every field. Quietly accept and drop the submission.
  if (text(form, HONEYPOT, 200)) redirect(`/thank-you?from=${kind}`);

  const values = {
    name: text(form, "name", 100),
    email: text(form, "email", 200).toLowerCase(),
    phone: text(form, "phone", 40),
    town: text(form, "town", 100),
    market: text(form, "market", 20),
    timing: text(form, "timing", 20),
    purpose: text(form, "purpose", 20),
    notes: text(form, "notes", 2000),
    listing: text(form, "listing", 120),
    source: asSourcePage(text(form, "source", 200)),
  };
  const consent = form.get("consent") === "on";

  const errors: Record<string, string> = {};
  if (!values.name) errors.name = "Please add your name.";
  if (values.email && !EMAIL_RE.test(values.email)) errors.email = "That email doesn't look right.";
  const digits = values.phone.replace(/\D/g, "");
  if (values.phone && (digits.length < 10 || digits.length > 15)) {
    errors.phone = "Please include the area code.";
  }
  if (!values.email && !values.phone) errors.email = "Add an email or a phone number so Michelle can reach you.";
  if (consent && !values.email) errors.email = "Add an email to receive the market letter.";

  let market = asMarket(values.market);
  const listing = kind === "listing" ? getListing(values.listing) : undefined;
  if (kind === "listing") {
    if (!listing) errors.form = "That listing is no longer available.";
    else market = listing.market;
  }
  if (kind === "valuation" && !market) errors.market = "Choose Cape Cod or the South Shore.";
  if (kind === "valuation" && !values.town) errors.town = "Which town is the home in?";

  const timing = timings.find((t) => t.value === values.timing);
  if (kind === "valuation" && !timing) errors.timing = "Choose a rough timeframe.";
  const purpose = purposes.find((p) => p.value === values.purpose);
  if (kind === "contact" && !purpose) errors.purpose = "Let Michelle know what this is about.";

  if (Object.keys(errors).length) {
    return { ok: false, message: "Please check the highlighted fields.", errors, values };
  }

  const ipHash = await getIpHash();
  if (await isRateLimited(ipHash)) {
    return {
      ok: false,
      message: "That's several messages in a few minutes. Please wait a little and try again.",
      values,
    };
  }

  const supabase = getSupabase();
  let stored = false;
  if (supabase) {
    const { error } = await supabase.from("leads").insert({
      kind,
      purpose: purpose?.value ?? null,
      name: values.name,
      email: values.email || null,
      phone: values.phone || null,
      town: values.town || null,
      market,
      timing: timing?.value ?? null,
      notes: values.notes || null,
      listing_slug: listing?.slug ?? null,
      source_page: values.source,
      list_consent: consent,
      ip_hash: ipHash,
      user_agent: await userAgent(),
    });
    if (error) console.error("Lead insert failed", error);
    stored = !error;

    if (stored && consent && values.email) {
      const { error: subError } = await supabase.from("subscribers").upsert(
        {
          email: values.email,
          name: values.name,
          market,
          source_page: values.source,
          consent: true,
          consented_at: new Date().toISOString(),
          unsubscribed_at: null,
          ip_hash: ipHash,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "email" },
      );
      if (subError) console.error("Subscriber upsert failed", subError);
    }
  }

  const subjectByKind: Record<LeadKind, string> = {
    contact: "New message",
    valuation: "Home value consultation request",
    place: "New inquiry",
    listing: `Listing inquiry: ${listing?.address ?? ""}`,
  };
  const emailed = await notifyMichelle({
    subject: `${subjectByKind[kind]} from ${values.name}`,
    replyTo: values.email || undefined,
    lines: [
      ["Name", values.name],
      ["Phone", values.phone],
      ["Email", values.email],
      ["Purpose", purpose?.label],
      ["Town", values.town],
      ["Market", market ? marketLabel[market] : null],
      ["Timing", timing?.label],
      ["Listing", listing ? `${listing.address}${listing.sample ? " (SAMPLE)" : ""}` : null],
      ["Notes", values.notes],
      ["Market letter", consent ? "Yes, opted in" : "No"],
      ["Page", `${site.url}${values.source}`],
    ],
  });

  if (!stored && !emailed) {
    return { ok: false, message: unavailableMessage(), values };
  }

  redirect(`/thank-you?from=${kind}`);
}

export async function subscribe(_prev: FormState, form: FormData): Promise<FormState> {
  if (text(form, HONEYPOT, 200)) redirect("/thank-you?from=letter");

  const values = {
    name: text(form, "name", 100),
    email: text(form, "email", 200).toLowerCase(),
    market: text(form, "market", 20),
    source: asSourcePage(text(form, "source", 200)),
  };
  const consent = form.get("consent") === "on";

  const errors: Record<string, string> = {};
  if (!EMAIL_RE.test(values.email)) errors.email = "Please enter a valid email.";
  if (!consent) errors.consent = "Please check the box so Michelle can send the letter.";
  if (Object.keys(errors).length) {
    return { ok: false, message: "Please check the highlighted fields.", errors, values };
  }

  const ipHash = await getIpHash();
  if (await isRateLimited(ipHash)) {
    return { ok: false, message: "Please wait a few minutes and try again.", values };
  }

  const market = asMarket(values.market);
  const supabase = getSupabase();
  let stored = false;
  if (supabase) {
    const now = new Date().toISOString();
    const { error } = await supabase.from("subscribers").upsert(
      {
        email: values.email,
        name: values.name || null,
        market,
        source_page: values.source,
        consent: true,
        consented_at: now,
        unsubscribed_at: null,
        ip_hash: ipHash,
        updated_at: now,
      },
      { onConflict: "email" },
    );
    if (error) console.error("Subscriber upsert failed", error);
    stored = !error;
  }

  const emailed = await notifyMichelle({
    subject: "New market letter subscriber",
    lines: [
      ["Email", values.email],
      ["Name", values.name],
      ["Market", market ? marketLabel[market] : "Both"],
      ["Page", `${site.url}${values.source}`],
    ],
  });

  if (!stored && !emailed) return { ok: false, message: unavailableMessage(), values };

  redirect("/thank-you?from=letter");
}
