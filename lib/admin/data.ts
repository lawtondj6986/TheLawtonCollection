import "server-only";
import { getSupabase } from "@/lib/supabase";

export type LeadStatus = "new" | "contacted" | "closed";

export type Lead = {
  id: string;
  created_at: string;
  kind: string;
  purpose: string | null;
  name: string;
  email: string | null;
  phone: string | null;
  town: string | null;
  market: string | null;
  timing: string | null;
  notes: string | null;
  listing_slug: string | null;
  source_page: string;
  list_consent: boolean;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  referrer: string | null;
  landing_page: string | null;
  status: LeadStatus | null;
  admin_note: string | null;
  contacted_at: string | null;
};

export type Subscriber = {
  id: string;
  created_at: string;
  email: string;
  name: string | null;
  market: string | null;
  source_page: string;
  unsubscribed_at: string | null;
};

export type LeadFilter = { status?: string; market?: string };

export const statusLabels: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  closed: "Closed",
};

export function isLeadStatus(value: string): value is LeadStatus {
  return value in statusLabels;
}

function db() {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase is not configured");
  return supabase;
}

export async function listLeads(filter: LeadFilter = {}): Promise<Lead[]> {
  let query = db().from("leads").select("*").order("created_at", { ascending: false }).limit(300);
  if (filter.status && isLeadStatus(filter.status)) query = query.eq("status", filter.status);
  if (filter.market === "cape" || filter.market === "south_shore") query = query.eq("market", filter.market);
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Lead[];
}

export async function getLead(id: string): Promise<Lead | null> {
  const { data, error } = await db().from("leads").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return (data as Lead) ?? null;
}

export async function updateLead(id: string, patch: Partial<Pick<Lead, "status" | "admin_note" | "contacted_at">>) {
  const { error } = await db().from("leads").update(patch).eq("id", id);
  if (error) throw error;
}

async function count(table: "leads" | "subscribers", apply?: (q: any) => any): Promise<number> {
  let query = db().from(table).select("id", { count: "exact", head: true });
  if (apply) query = apply(query);
  const { count: n, error } = await query;
  if (error) throw error;
  return n ?? 0;
}

export async function leadCounts() {
  const now = Date.now();
  const week = new Date(now - 7 * 86_400_000).toISOString();
  const month = new Date(now - 30 * 86_400_000).toISOString();
  const [fresh, thisWeek, thisMonth, total, subscribers] = await Promise.all([
    count("leads", (q) => q.eq("status", "new")),
    count("leads", (q) => q.gte("created_at", week)),
    count("leads", (q) => q.gte("created_at", month)),
    count("leads"),
    count("subscribers", (q) => q.is("unsubscribed_at", null)),
  ]);
  return { fresh, thisWeek, thisMonth, total, subscribers };
}

export async function listSubscribers(): Promise<Subscriber[]> {
  const { data, error } = await db()
    .from("subscribers")
    .select("id, created_at, email, name, market, source_page, unsubscribed_at")
    .order("created_at", { ascending: false })
    .limit(1000);
  if (error) throw error;
  return (data ?? []) as Subscriber[];
}
