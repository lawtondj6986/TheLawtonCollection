"use client";

import { useActionState } from "react";
import { subscribe } from "@/app/actions";
import { initialFormState } from "@/lib/forms";
import { Field, FormMessage, Honeypot, SubmitButton } from "./Fields";

export function SubscribeForm({ source }: { source: string }) {
  const [state, action, pending] = useActionState(subscribe, initialFormState);
  const v = state.values ?? {};
  const e = state.errors ?? {};

  return (
    <form action={action} noValidate className="relative space-y-4">
      <input type="hidden" name="source" value={source} />
      <Honeypot />
      <FormMessage message={state.message} />
      <Field name="sub-email" label="Email" error={e.email}>
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
      <div>
        <label className="flex items-start gap-3 text-[0.95rem] leading-snug">
          <input
            type="checkbox"
            name="consent"
            aria-invalid={Boolean(e.consent)}
            className="mt-1 size-4 shrink-0 accent-navy"
          />
          <span>
            Yes, email me Michelle&rsquo;s market letter. I can unsubscribe at any time.
          </span>
        </label>
        {e.consent ? (
          <p className="mt-1.5 text-[0.9rem] text-[#9b2c2c]">{e.consent}</p>
        ) : null}
      </div>
      <SubmitButton pending={pending}>Send me the letter</SubmitButton>
    </form>
  );
}
