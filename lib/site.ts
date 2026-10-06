// Public site settings. Brokerage and license come from env vars and are
// hidden or neutral when empty. Phone and email default to Michelle's public
// contact details so the site works before the Vercel env vars are set.

const clean = (value: string | undefined) => (value ?? "").trim();

export const site = {
  name: "Michelle Lawton",
  brand: "The Lawton Collection",
  region: "Cape Cod & the South Shore",
  line: "Brockton roots. Straight advice.",
  url: clean(process.env.NEXT_PUBLIC_SITE_URL) || "https://thelawtoncollection.com",
  brokerage: clean(process.env.NEXT_PUBLIC_BROKERAGE_NAME) || "CENTURY 21 North East",
  title: clean(process.env.NEXT_PUBLIC_AGENT_TITLE) || "Broker Associate",
  office: {
    street: clean(process.env.NEXT_PUBLIC_OFFICE_STREET) || "700 West Center Street, Suite 13",
    city: clean(process.env.NEXT_PUBLIC_OFFICE_CITY) || "West Bridgewater",
    region: "MA",
    postalCode: clean(process.env.NEXT_PUBLIC_OFFICE_ZIP) || "02379",
  },
  profileUrl:
    clean(process.env.NEXT_PUBLIC_C21_PROFILE_URL) ||
    "https://www.century21.com/agent/detail/ma/west-bridgewater/agents/michelle-lawton/aid-P00200000FDdr1BaOAb46gME0hPdv5uyd982dZIH",
  phone: clean(process.env.NEXT_PUBLIC_PHONE) || "508-942-1180",
  phoneTel: clean(process.env.NEXT_PUBLIC_PHONE_TEL) || "+15089421180",
  license: clean(process.env.NEXT_PUBLIC_LICENSE),
  email: clean(process.env.NEXT_PUBLIC_EMAIL) || "Michelle.lawton@comcast.net",
};

export const telHref = `tel:${site.phoneTel}`;
export const mailHref = `mailto:${site.email}`;

export const nav = [
  { href: "/cape-cod", label: "Cape Cod" },
  { href: "/south-shore", label: "South Shore" },
  { href: "/collection", label: "The Collection" },
  { href: "/home-value", label: "Home value" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
