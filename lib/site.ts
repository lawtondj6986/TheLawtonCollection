// Public site settings. Anything that must not be invented (phone, license,
// brokerage) comes from env vars and is hidden when empty.

const clean = (value: string | undefined) => (value ?? "").trim();

export const site = {
  name: "Michelle Lawton",
  brand: "The Lawton Collection",
  region: "Cape Cod & the South Shore",
  line: "Brockton roots. Straight advice.",
  url: clean(process.env.NEXT_PUBLIC_SITE_URL) || "https://thelawtoncollection.com",
  brokerage: clean(process.env.NEXT_PUBLIC_BROKERAGE_NAME) || "Brokerage name on file",
  phone: clean(process.env.NEXT_PUBLIC_PHONE),
  license: clean(process.env.NEXT_PUBLIC_LICENSE),
  email: clean(process.env.NEXT_PUBLIC_EMAIL),
};

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export const nav = [
  { href: "/cape-cod", label: "Cape Cod" },
  { href: "/south-shore", label: "South Shore" },
  { href: "/collection", label: "The Collection" },
  { href: "/home-value", label: "Home value" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
