import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

// Quick check that the live site can reach Supabase and whether email
// notifications are on. Returns status words only: no data, no keys.
export const dynamic = "force-dynamic";

// The public (anon / publishable) key can read nothing and write nothing, but
// it does not error on a read, so check which kind of key was configured.
function keyKind(key: string): "secret" | "public" | "unknown" {
  if (key.startsWith("sb_secret_")) return "secret";
  if (key.startsWith("sb_publishable_")) return "public";
  try {
    const role = JSON.parse(Buffer.from(key.split(".")[1] ?? "", "base64url").toString()).role;
    if (role === "service_role") return "secret";
    if (role === "anon" || role === "authenticated") return "public";
  } catch {}
  return "unknown";
}

export async function GET() {
  const supabase = getSupabase();
  let database: "ok" | "not configured" | "error" = "not configured";
  let detail: string | undefined;

  const kind = keyKind(process.env.SUPABASE_SERVICE_ROLE_KEY ?? "");
  if (supabase && kind === "public") {
    database = "error";
    detail = "SUPABASE_SERVICE_ROLE_KEY is the public key; use the secret (service_role) key";
  } else if (supabase) {
    const checks = await Promise.all(
      (["leads", "subscribers"] as const).map((table) =>
        supabase.from(table).select("id").limit(1),
      ),
    );
    const failed = checks.find((check) => check.error);
    database = failed ? "error" : "ok";
    if (failed?.error) {
      detail = failed.error.code === "42P01" ? "Tables missing: run supabase/schema.sql" : "Check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY";
    }
  }

  return NextResponse.json(
    {
      database,
      ...(detail ? { detail } : {}),
      email: process.env.RESEND_API_KEY ? "on" : "off",
      leadsWork: database === "ok" || Boolean(process.env.RESEND_API_KEY),
    },
    { headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } },
  );
}
