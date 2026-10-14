import { getSession } from "@/lib/admin/auth";
import { listSubscribers } from "@/lib/admin/data";
import { csvResponse, toCsv } from "@/lib/admin/csv";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await getSession())) return new Response("Sign in first", { status: 401 });
  const rows = (await listSubscribers()).filter((r) => !r.unsubscribed_at);
  return csvResponse(toCsv(rows, ["created_at", "email", "name", "market", "source_page"]), "market-update-signups.csv");
}
