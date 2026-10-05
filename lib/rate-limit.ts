import "server-only";
import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { getSupabase } from "./supabase";

// Simple window: at most MAX_PER_WINDOW submissions per hashed IP in
// WINDOW_MINUTES, counted across both tables. Only the salted hash of the IP
// is stored, never the address itself.

const WINDOW_MINUTES = 10;
const MAX_PER_WINDOW = 5;

// Fallback when Supabase is not configured (local development).
const memory = new Map<string, number[]>();

export async function getIpHash(): Promise<string> {
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  const salt = process.env.RATE_LIMIT_SALT || "lawton-collection";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export async function isRateLimited(ipHash: string): Promise<boolean> {
  const since = new Date(Date.now() - WINDOW_MINUTES * 60_000).toISOString();
  const supabase = getSupabase();

  if (!supabase) {
    const cutoff = Date.now() - WINDOW_MINUTES * 60_000;
    const recent = (memory.get(ipHash) ?? []).filter((t) => t > cutoff);
    recent.push(Date.now());
    memory.set(ipHash, recent);
    return recent.length > MAX_PER_WINDOW;
  }

  const counts = await Promise.all(
    (["leads", "subscribers"] as const).map((table) =>
      supabase
        .from(table)
        .select("id", { count: "exact", head: true })
        .eq("ip_hash", ipHash)
        .gte(table === "leads" ? "created_at" : "updated_at", since),
    ),
  );
  const total = counts.reduce((sum, { count }) => sum + (count ?? 0), 0);
  return total >= MAX_PER_WINDOW;
}
