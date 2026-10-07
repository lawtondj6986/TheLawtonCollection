import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { CallBar } from "@/components/CallBar";
import { site } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

const description =
  "Michelle Lawton, Broker Associate with CENTURY 21 North East, helps families buy and sell homes in Falmouth, Mashpee, Bourne, and Barnstable, and in Easton and Greater Brockton. South Shore roots. Straight advice.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.brand}`,
    template: `%s · ${site.name}`,
  },
  description,
  applicationName: site.brand,
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: `${site.name} · ${site.brand}`,
    title: `${site.name} · ${site.brand}`,
    description,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0B1F33",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${sourceSans.variable}`}>
      <body className="flex min-h-dvh flex-col pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:pb-0">
        <StructuredData />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <CallBar />
      </body>
    </html>
  );
}
