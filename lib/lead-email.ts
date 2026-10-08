// The lead alert Michelle receives. Large, high-contrast type and big Call,
// Text, and Reply buttons, because she reads these on her phone. Everything a
// visitor typed is escaped before it goes into the HTML.

export type LeadEmail = {
  heading: string;
  rows: [label: string, value: string | null | undefined][];
  phone?: string;
  email?: string;
  pageUrl: string;
};

const NAVY = "#0B1F33";
const BRASS = "#A6854E";
const SALT = "#F7F4EE";
const INK = "#1C1917";

function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function telDigits(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 ? `+1${digits}` : `+${digits}`;
}

function button(href: string, label: string) {
  return `<td style="padding:6px 8px 6px 0"><a href="${esc(href)}" style="display:inline-block;background:${NAVY};color:${SALT};font-family:Arial,Helvetica,sans-serif;font-size:20px;font-weight:bold;text-decoration:none;padding:16px 26px;border-radius:4px">${esc(label)}</a></td>`;
}

export function leadEmailHtml({ heading, rows, phone, email, pageUrl }: LeadEmail) {
  const filled = rows.filter(([, value]) => value);
  const buttons = [
    phone ? button(`tel:${telDigits(phone)}`, "Call") : "",
    phone ? button(`sms:${telDigits(phone)}`, "Text") : "",
    email ? button(`mailto:${email}`, "Reply") : "",
  ].join("");

  const rowsHtml = filled
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:14px 0 2px;font-family:Arial,Helvetica,sans-serif;font-size:15px;letter-spacing:1px;text-transform:uppercase;color:#6b5a3a">${esc(label)}</td>
        </tr>
        <tr>
          <td style="padding:0 0 14px;border-bottom:1px solid #e3dccf;font-family:Arial,Helvetica,sans-serif;font-size:22px;line-height:1.45;color:${INK};white-space:pre-wrap">${esc(String(value))}</td>
        </tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="en">
<body style="margin:0;padding:0;background:${SALT}">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${SALT}">
    <tr><td align="center" style="padding:24px 12px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #e3dccf">
        <tr><td style="background:${NAVY};border-bottom:3px solid ${BRASS};padding:22px 26px">
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:15px;letter-spacing:3px;color:${BRASS}">THE LAWTON COLLECTION</div>
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1.25;color:${SALT};padding-top:6px">${esc(heading)}</div>
        </td></tr>
        ${buttons ? `<tr><td style="padding:22px 26px 6px"><table role="presentation" cellpadding="0" cellspacing="0"><tr>${buttons}</tr></table></td></tr>` : ""}
        <tr><td style="padding:8px 26px 10px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rowsHtml}</table>
        </td></tr>
        <tr><td style="padding:10px 26px 26px;font-family:Arial,Helvetica,sans-serif;font-size:16px;color:#5c5750">
          Sent from <a href="${esc(pageUrl)}" style="color:${NAVY}">${esc(pageUrl)}</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function leadEmailText({ heading, rows, pageUrl }: LeadEmail) {
  return [heading, "", ...rows.filter(([, v]) => v).map(([label, value]) => `${label}: ${value}`), "", `Page: ${pageUrl}`].join("\n");
}
