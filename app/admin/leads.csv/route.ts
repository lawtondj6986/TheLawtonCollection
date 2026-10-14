import { getSession } from "@/lib/admin/auth";
import { listLeads } from "@/lib/admin/data";
import { csvResponse, toCsv } from "@/lib/admin/csv";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await getSession())) return new Response("Sign in first", { status: 401 });
  const leads = await listLeads();
  const columns = [
    "created_at", "status", "kind", "purpose", "name", "phone", "email", "town", "market", "timing", "notes",
    "listing_slug", "list_consent", "utm_source", "utm_medium", "utm_campaign", "referrer", "landing_page",
    "source_page", "contacted_at", "admin_note",
  ];
  return csvResponse(toCsv(leads, columns), "leads.csv");
}
