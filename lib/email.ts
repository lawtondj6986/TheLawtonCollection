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
