import { site } from "@/lib/site";

// A contact card people can save to their phone in one tap.
export const dynamic = "force-static";

function escape(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\;");
}

export function GET() {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Lawton;Michelle;;;",
    `FN:${escape(site.name)}`,
    `ORG:${escape(site.brokerage)}`,
    `TITLE:${escape(site.title)}`,
    `TEL;TYPE=CELL,VOICE:${site.phoneTel}`,
    `EMAIL;TYPE=INTERNET:${site.email}`,
    `URL:${site.url}`,
    `NOTE:${escape(`${site.brand} · ${site.region}`)}`,
    "END:VCARD",
  ];
  return new Response(lines.join("\r\n") + "\r\n", {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="michelle-lawton.vcf"',
    },
  });
}
