import { site } from "@/lib/site";
import { awards, designations } from "@/content/credentials";

// schema.org RealEstateAgent markup so search engines can show Michelle's
// name, phone, brokerage, and service area. Facts only, no ratings or reviews.
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${site.url}/#michelle-lawton`,
    name: site.name,
    alternateName: site.brand,
    jobTitle: site.title,
    url: site.url,
    image: `${site.url}/brand/michelle-lawton-headshot.jpg`,
    logo: `${site.url}/icon`,
    telephone: site.phoneTel,
    email: site.email,
    slogan: site.line,
    parentOrganization: { "@type": "RealEstateAgent", name: site.brokerage },
    areaServed: [
      "Falmouth, MA",
      "Woods Hole, MA",
      "West Falmouth, MA",
      "Mashpee, MA",
      "Bourne, MA",
      "Barnstable, MA",
      "Easton, MA",
      "Brockton, MA",
      "West Bridgewater, MA",
      "East Bridgewater, MA",
      "Bridgewater, MA",
      "Stoughton, MA",
    ].map((name) => ({ "@type": "Place", name })),
    knowsAbout: designations.map((d) => d.name),
    award: awards.map((a) => `${a.name} (${a.years})`),
    sameAs: [site.profileUrl],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
