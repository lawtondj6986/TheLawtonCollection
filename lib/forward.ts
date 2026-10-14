import "server-only";

// Forwards each lead as JSON to LEAD_WEBHOOK_URL (a Zapier, Make, or CRM
// webhook), so leads can flow into any CRM or a Google Sheet without code
// changes. Does nothing when the variable is unset; never throws.
export async function forwardLead(payload: Record<string, unknown>): Promise<boolean> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return false;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, sentAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) console.error("Lead webhook returned", res.status);
    return res.ok;
  } catch (error) {
    console.error("Lead webhook failed", error);
    return false;
  }
}
