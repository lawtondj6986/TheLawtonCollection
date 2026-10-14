import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { StructuredData } from "@/components/StructuredData";
import { Attribution } from "@/components/Attribution";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { site } from "@/lib/site";
import "./globals.css";

// Fonts ship with the site (assets/fonts, OFL licensed), so builds and
// visitors never depend on Google Fonts.
const cormorant = localFont({
  src: [
    { path: "../assets/fonts/cormorant-garamond-latin-wght-normal.woff2", style: "normal" },
    { path: "../assets/fonts/cormorant-garamond-latin-wght-italic.woff2", style: "italic" },
  ],
  weight: "300 700",
  variable: "--font-cormorant",
  display: "swap",
});

const sourceSans = localFont({
  src: [
    { path: "../assets/fonts/source-sans-3-latin-wght-normal.woff2", style: "normal" },
    { path: "../assets/fonts/source-sans-3-latin-wght-italic.woff2", style: "italic" },
  ],
  weight: "200 900",
  variable: "--font-source-sans",
  display: "swap",
});

const description =
  "Michelle Lawton, CENTURY 21 North East, helps families buy and sell in Falmouth and the Upper Cape, and in Easton and Greater Brockton. Straight advice.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · Real Estate on Cape Cod & the South Shore`,
    template: `%s · ${site.name}`,
  },
  description,
  applicationName: site.brand,
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: `${site.name} · ${site.brand}`,
    title: `${site.name} · Real Estate on Cape Cod & the South Shore`,
    description,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  // Paste the codes from Google Search Console / Bing Webmaster Tools into
  // these env vars to verify the site; no code change needed.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1F33",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${sourceSans.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <StructuredData />
        <Attribution />
        {children}
        {/* Vercel's cookie-free visitor counts and speed data. Active once
            Analytics and Speed Insights are enabled on the Vercel project. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
