import "server-only";
import { Resend } from "resend";
import { leadEmailHtml, leadEmailText, type LeadEmail } from "./lead-email";

// Sends Michelle a large-print lead alert (HTML plus a plain-text copy).
// Does nothing (and returns false) when RESEND_API_KEY is not set, so forms
// work without email. LEAD_TO_EMAIL defaults to Michelle's public address.

type Notice = LeadEmail & {
  subject: string;
  replyTo?: string;
};

// A short, fixed confirmation to the person who wrote in. Sent only when a
// verified sender (LEAD_FROM_EMAIL) is set up in Resend. Contains none of
// what the visitor typed, so the form can't be used to send messages to
// other people.
export async function sendAutoReply(to: string, firstName: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL;
  if (!apiKey || !from) return false;
  const name = firstName.replace(/[^\p{L}\p{M}' -]/gu, "").trim().split(/\s+/)[0] || "there";
  const text = [
    `Hi ${name},`,
    "",
    "Thank you for your note. I read every message myself, and I'll get back to you by phone or email soon.",
    "",
    "If it's quicker, you can call or text me at 508-942-1180.",
    "",
    "Michelle Lawton",
    "Broker Associate, CENTURY 21 North East",
    "The Lawton Collection · Cape Cod & the South Shore",
    "www.thelawtoncollection.com",
  ].join("\n");
  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to,
      subject: "Michelle Lawton has your note",
      text,
      replyTo: process.env.LEAD_TO_EMAIL || "Michelle.lawton@comcast.net",
    });
    if (error) console.error("Auto-reply error", error);
    return !error;
  } catch (error) {
    console.error("Auto-reply failed", error);
    return false;
  }
}

export async function notifyMichelle({ subject, replyTo, ...lead }: Notice): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL || "Michelle.lawton@comcast.net";
  if (!apiKey) return false;

  const from = process.env.LEAD_FROM_EMAIL || "The Lawton Collection <onboarding@resend.dev>";

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to: to.split(",").map((address) => address.trim()),
      subject,
      html: leadEmailHtml(lead),
      text: leadEmailText(lead),
      replyTo,
    });
    if (error) {
      console.error("Resend error", error);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Resend failed", error);
    return false;
  }
}
