import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHash, createHmac, randomInt, timingSafeEqual } from "node:crypto";

// Sign-in for the command center. No passwords: an allowed email receives a
// six-digit code, and a signed cookie keeps the person signed in for 30 days.

const COOKIE = "lc_admin";
const SESSION_DAYS = 30;

export function adminEmails(): string[] {
  const raw = process.env.ADMIN_EMAILS || "Michelle.lawton@comcast.net,lawtondj@gmail.com";
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string) {
  return adminEmails().includes(email.trim().toLowerCase());
}

function secret(): Buffer {
  const s = process.env.AUTH_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!s) throw new Error("AUTH_SECRET is not set");
  return createHash("sha256").update(`lc-admin:${s}`).digest();
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export async function createSession(email: string) {
  const payload = Buffer.from(
    JSON.stringify({ e: email.trim().toLowerCase(), x: Date.now() + SESSION_DAYS * 86_400_000 }),
  ).toString("base64url");
  (await cookies()).set(COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 86_400,
  });
}

export async function getSession(): Promise<{ email: string } | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  let expected: string;
  try {
    expected = sign(payload);
  } catch {
    return null;
  }
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const { e, x } = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (typeof e !== "string" || typeof x !== "number" || x < Date.now() || !isAdminEmail(e)) return null;
    return { email: e };
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect("/admin/sign-in");
  return session;
}

export async function clearSession() {
  (await cookies()).delete(COOKIE);
}

export function newCode() {
  return String(randomInt(0, 1_000_000)).padStart(6, "0");
}

export function hashCode(email: string, code: string) {
  return createHash("sha256")
    .update(`${email.trim().toLowerCase()}:${code}:${process.env.AUTH_SECRET || ""}`)
    .digest("hex");
}
