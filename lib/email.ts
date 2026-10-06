import "server-only";
import { Resend } from "resend";

// Sends Michelle a plain notification. Does nothing (and returns false) when
// RESEND_API_KEY is not set, so forms work without email. LEAD_TO_EMAIL
// defaults to Michelle's public address.

type Notice = {
  subject: string;
  lines: [label: string, value: string | null | undefined][];
  replyTo?: string;
};

export async function notifyMichelle({ subject, lines, replyTo }: Notice): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL || "Michelle.lawton@comcast.net";
  if (!apiKey) return false;

  const from = process.env.LEAD_FROM_EMAIL || "The Lawton Collection <onboarding@resend.dev>";
  const body = lines
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to: to.split(",").map((address) => address.trim()),
      subject,
      text: body,
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
