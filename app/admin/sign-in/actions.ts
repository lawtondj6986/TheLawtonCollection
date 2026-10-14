"use server";

import { redirect } from "next/navigation";
import { Resend } from "resend";
import { getSupabase } from "@/lib/supabase";
import { createSession, hashCode, isAdminEmail, newCode } from "@/lib/admin/auth";

export type SignInState = { step: "email" | "code"; email?: string; message?: string };

const CODE_MINUTES = 10;
const MAX_CODES_PER_HOUR = 5;
const MAX_ATTEMPTS = 5;

function field(form: FormData, key: string, max: number) {
  const v = form.get(key);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

async function emailCode(to: string, code: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    const from = process.env.LEAD_FROM_EMAIL || "The Lawton Collection <onboarding@resend.dev>";
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to,
      subject: `Your sign-in code: ${code}`,
      text: `Your code for the command center is ${code}. It works once and expires in ${CODE_MINUTES} minutes.\n\nIf you didn't ask for this, you can ignore it.`,
    });
    if (error) console.error("Sign-in email error", error);
    return !error;
  }
  // Local development only: print the code to the server log.
  if (process.env.ADMIN_DEV_CODE_LOG === "true") {
    console.log(`[admin sign-in] code for ${to}: ${code}`);
    return true;
  }
  return false;
}

export async function requestCode(_prev: SignInState, form: FormData): Promise<SignInState> {
  const email = field(form, "email", 200).toLowerCase();
  if (!isAdminEmail(email)) {
    return { step: "email", email, message: "That email isn't on the sign-in list." };
  }
  const supabase = getSupabase();
  if (!supabase) return { step: "email", email, message: "The database isn't set up yet, so sign-in can't work." };

  const hourAgo = new Date(Date.now() - 3_600_000).toISOString();
  const { count } = await supabase
    .from("admin_codes")
    .select("id", { count: "exact", head: true })
    .eq("email", email)
    .gte("created_at", hourAgo);
  if ((count ?? 0) >= MAX_CODES_PER_HOUR) {
    return { step: "email", email, message: "That's several codes in an hour. Please wait a bit and try again." };
  }

  const code = newCode();
  const { error } = await supabase.from("admin_codes").insert({
    email,
    code_hash: hashCode(email, code),
    expires_at: new Date(Date.now() + CODE_MINUTES * 60_000).toISOString(),
  });
  if (error) {
    console.error("Code insert failed", error);
    return { step: "email", email, message: "Something went wrong saving the code. Try again." };
  }
  if (!(await emailCode(email, code))) {
    return { step: "email", email, message: "Sign-in email isn't set up yet (RESEND_API_KEY), so the code couldn't be sent." };
  }
  return { step: "code", email };
}

export async function verifyCode(_prev: SignInState, form: FormData): Promise<SignInState> {
  const email = field(form, "email", 200).toLowerCase();
  const code = field(form, "code", 6).replace(/\D/g, "");
  if (!isAdminEmail(email)) return { step: "email", message: "That email isn't on the sign-in list." };
  if (code.length !== 6) return { step: "code", email, message: "Enter the six-digit code from the email." };

  const supabase = getSupabase();
  if (!supabase) return { step: "email", email, message: "The database isn't set up yet." };

  const { data: row } = await supabase
    .from("admin_codes")
    .select("id, code_hash, attempts, expires_at, used_at")
    .eq("email", email)
    .is("used_at", null)
    .gt("expires_at", new Date().toISOString())
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!row || row.attempts >= MAX_ATTEMPTS) {
    return { step: "email", email, message: "That code has expired. Request a new one." };
  }
  if (row.code_hash !== hashCode(email, code)) {
    await supabase.from("admin_codes").update({ attempts: row.attempts + 1 }).eq("id", row.id);
    return { step: "code", email, message: "That code doesn't match. Check the email and try again." };
  }
  await supabase.from("admin_codes").update({ used_at: new Date().toISOString() }).eq("id", row.id);
  await createSession(email);
  redirect("/admin");
}
