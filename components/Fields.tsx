import type { ReactNode } from "react";
import { HONEYPOT } from "@/lib/forms";

const inputBase =
  "mt-1.5 block w-full min-h-12 border bg-white px-3.5 py-2.5 text-[1rem] text-ink placeholder:text-shingle-deep/70 focus:border-navy focus:outline-2 focus:outline-offset-0 focus:outline-brass";

export function Field({
  name,
  label,
  error,
  hint,
  optional,
  children,
}: {
  name: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  children: (props: { id: string; className: string; describedBy?: string; invalid: boolean }) => ReactNode;
}) {
  const id = `field-${name}`;
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <label htmlFor={id} className="block text-[0.95rem] font-semibold text-navy">
        {label}
        {optional ? <span className="ml-1.5 font-normal text-shingle-deep">(optional)</span> : null}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="mt-0.5 text-[0.9rem] text-shingle-deep">
          {hint}
        </p>
      ) : null}
      {children({
        id,
        describedBy,
        invalid: Boolean(error),
        className: `${inputBase} ${error ? "border-[#9b2c2c]" : "border-line"}`,
      })}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-[0.9rem] text-[#9b2c2c]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

// Hidden from people and assistive tech; bots tend to fill it.
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor={HONEYPOT}>Leave this field empty</label>
      <input id={HONEYPOT} name={HONEYPOT} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  );
}

export function FormMessage({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="border-l-2 border-[#9b2c2c] bg-white px-4 py-3 text-[0.95rem] text-[#7a1f1f]">
      {message}
    </p>
  );
}

export function SubmitButton({ pending, children }: { pending: boolean; children: ReactNode }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-12 items-center justify-center bg-navy px-7 font-semibold tracking-wide text-salt transition-colors hover:bg-[#13304d] disabled:opacity-60"
    >
      {pending ? "Sending…" : children}
    </button>
  );
}
