"use client";

import { useActionState } from "react";
import { submitLead } from "@/app/actions";
import { initialFormState, markets, purposes, timings, type LeadKind } from "@/lib/forms";
import type { Market } from "@/content/places";
import { Field, FormMessage, Honeypot, SubmitButton } from "./Fields";

type Props = {
  kind: LeadKind;
  source: string;
  market?: Market;
  listing?: string;
  town?: string;
  submitLabel?: string;
};

// One form for contact, valuation, place, and listing inquiries. Fields shown
// depend on the kind; the server validates everything again.
export function LeadForm({ kind, source, market, listing, town, submitLabel = "Send to Michelle" }: Props) {
  const [state, action, pending] = useActionState(submitLead, initialFormState);
  const v = state.values ?? {};
  const e = state.errors ?? {};

  const askMarket = kind === "valuation" || kind === "contact";
  const askTiming = kind === "valuation" || kind === "contact" || kind === "place";
  const askTown = kind !== "listing";

  return (
    <form action={action} noValidate className="relative space-y-5">
      <input type="hidden" name="kind" value={kind} />
      <input type="hidden" name="source" value={source} />
      {listing ? <input type="hidden" name="listing" value={listing} /> : null}
      {!askMarket && market ? <input type="hidden" name="market" value={market} /> : null}
      <Honeypot />

      <FormMessage message={state.message ?? e.form} />

      {kind === "contact" ? (
        <fieldset>
          <legend className="text-base font-semibold text-navy">What can Michelle help with?</legend>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {purposes.map((p) => (
              <label
                key={p.value}
                className="flex min-h-12 cursor-pointer items-center gap-2.5 border border-line bg-white px-3 text-base has-[:checked]:border-navy has-[:checked]:bg-navy/[0.04]"
              >
                <input
                  type="radio"
                  name="purpose"
                  value={p.value}
                  defaultChecked={(v.purpose ?? "") === p.value}
                  className="accent-navy"
                />
                {p.label}
              </label>
            ))}
          </div>
          {e.purpose ? <p className="mt-1.5 text-base text-[#9b2c2c]">{e.purpose}</p> : null}
        </fieldset>
      ) : null}

      <Field name="name" label="Your name" error={e.name}>
        {(f) => (
          <input
            id={f.id}
            name="name"
            autoComplete="name"
            defaultValue={v.name}
            aria-invalid={f.invalid}
            aria-describedby={f.describedBy}
            className={f.className}
          />
        )}
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="phone" label="Phone" error={e.phone}>
          {(f) => (
            <input
              id={f.id}
              name="phone"
              type="tel"
              autoComplete="tel"
              defaultValue={v.phone}
              aria-invalid={f.invalid}
              aria-describedby={f.describedBy}
              className={f.className}
            />
          )}
        </Field>
        <Field name="email" label="Email" error={e.email}>
          {(f) => (
            <input
              id={f.id}
              name="email"
              type="email"
              autoComplete="email"
              defaultValue={v.email}
              aria-invalid={f.invalid}
              aria-describedby={f.describedBy}
              className={f.className}
            />
          )}
        </Field>
      </div>
      <p className="-mt-2 text-base text-shingle-deep">A phone number or an email is enough.</p>

      {askTown ? (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            name="town"
            label={kind === "valuation" ? "What town is the house in?" : "Town"}
            error={e.town}
            optional={kind !== "valuation"}
          >
            {(f) => (
              <input
                id={f.id}
                name="town"
                autoComplete="address-level2"
                defaultValue={v.town ?? town}
                aria-invalid={f.invalid}
                aria-describedby={f.describedBy}
                className={f.className}
              />
            )}
          </Field>
          {askTiming ? (
            <Field name="timing" label="When are you thinking of moving?" error={e.timing} optional={kind !== "valuation"}>
              {(f) => (
                <select
                  id={f.id}
                  name="timing"
                  defaultValue={v.timing ?? ""}
                  aria-invalid={f.invalid}
                  aria-describedby={f.describedBy}
                  className={f.className}
                >
                  <option value="">Choose one</option>
                  {timings.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              )}
            </Field>
          ) : null}
        </div>
      ) : null}

      {askMarket ? (
        <fieldset>
          <legend className="text-base font-semibold text-navy">
            Cape Cod or the South Shore?
            {kind !== "valuation" ? <span className="ml-1.5 font-normal text-shingle-deep">(optional)</span> : null}
          </legend>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {markets.map((m) => (
              <label
                key={m.value}
                className="flex min-h-12 cursor-pointer items-center gap-2.5 border border-line bg-white px-3 text-base has-[:checked]:border-navy has-[:checked]:bg-navy/[0.04]"
              >
                <input
                  type="radio"
                  name="market"
                  value={m.value}
                  defaultChecked={(v.market ?? market) === m.value}
                  className="accent-navy"
                />
                {m.label}
              </label>
            ))}
          </div>
          {e.market ? <p className="mt-1.5 text-base text-[#9b2c2c]">{e.market}</p> : null}
        </fieldset>
      ) : null}

      <Field
        name="notes"
        label={kind === "valuation" ? "Anything Michelle should know about the house?" : "Anything else?"}
        optional
        error={e.notes}
      >
        {(f) => (
          <textarea
            id={f.id}
            name="notes"
            rows={4}
            defaultValue={v.notes}
            aria-describedby={f.describedBy}
            className={f.className}
          />
        )}
      </Field>

      <label className="flex items-start gap-3 text-base leading-snug">
        <input type="checkbox" name="consent" className="mt-1 size-4 shrink-0 accent-navy" />
        <span>
          Also email me Michelle&rsquo;s market update. I can stop it any time.
        </span>
      </label>

      <div className="pt-2">
        <SubmitButton pending={pending}>{submitLabel}</SubmitButton>
      </div>
      <p className="text-base text-shingle-deep">
        Michelle reads every message herself. Your details are used only to reply to you.{" "}
        <a href="/privacy" className="underline">Privacy</a>
      </p>
    </form>
  );
}
