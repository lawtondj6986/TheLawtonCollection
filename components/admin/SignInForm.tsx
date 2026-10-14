"use client";

import { useActionState } from "react";
import { requestCode, verifyCode, type SignInState } from "@/app/admin/sign-in/actions";

const input =
  "mt-2 block w-full min-h-14 border border-line bg-white px-4 text-[1.25rem] text-ink focus:border-navy focus:outline-2 focus:outline-offset-0 focus:outline-brass";
const button =
  "mt-6 inline-flex min-h-14 w-full items-center justify-center bg-navy px-6 text-[1.1rem] font-semibold text-salt hover:bg-[#13304d] disabled:opacity-60";

export function SignInForm() {
  const [state, request, requesting] = useActionState<SignInState, FormData>(requestCode, { step: "email" });
  const [verifyState, verify, verifying] = useActionState<SignInState, FormData>(verifyCode, { step: "code" });

  const step = verifyState.message ? verifyState.step : state.step;
  const email = verifyState.email ?? state.email ?? "";
  const message = verifyState.message ?? state.message;

  if (step === "code") {
    return (
      <form action={verify} className="space-y-1">
        <input type="hidden" name="email" value={email} />
        <p className="text-ink/90">
          We emailed a six-digit code to <span className="font-semibold text-navy">{email}</span>. It works once
          and expires in 10 minutes.
        </p>
        {message ? <p role="alert" className="mt-3 border-l-2 border-[#9b2c2c] bg-white px-4 py-3 text-[#7a1f1f]">{message}</p> : null}
        <label htmlFor="code" className="mt-5 block font-semibold text-navy">
          Code
        </label>
        <input
          id="code"
          name="code"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="[0-9]{6}"
          maxLength={6}
          required
          autoFocus
          className={`${input} tracking-[0.4em]`}
        />
        <button type="submit" disabled={verifying} className={button}>
          {verifying ? "Checking…" : "Sign in"}
        </button>
        <p className="mt-4 text-base text-ink/90">
          Didn&rsquo;t get it? Check spam, or{" "}
          <a href="/admin/sign-in" className="link">
            start over
          </a>
          .
        </p>
      </form>
    );
  }

  return (
    <form action={request} className="space-y-1">
      {message ? <p role="alert" className="mb-3 border-l-2 border-[#9b2c2c] bg-white px-4 py-3 text-[#7a1f1f]">{message}</p> : null}
      <label htmlFor="email" className="block font-semibold text-navy">
        Your email
      </label>
      <input id="email" name="email" type="email" autoComplete="email" required autoFocus defaultValue={email} className={input} />
      <button type="submit" disabled={requesting} className={button}>
        {requesting ? "Sending…" : "Email me a code"}
      </button>
    </form>
  );
}
