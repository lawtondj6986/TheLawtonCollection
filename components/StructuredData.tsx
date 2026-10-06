import { site } from "@/lib/site";
import { awards, designations } from "@/content/credentials";

// schema.org RealEstateAgent markup so search engines can show Michelle's
// name, phone, office, and service area. Facts only, no ratings or reviews.
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${site.url}/#michelle-lawton`,
    name: site.name,
    alternateName: site.brand,
    jobTitle: site.title,
    url: site.url,
    image: `${site.url}/opengraph-image`,
    logo: `${site.url}/icon`,
    telephone: site.phoneTel,
    email: site.email,
    slogan: site.line,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.office.street,
      addressLocality: site.office.city,
      addressRegion: site.office.region,
      postalCode: site.office.postalCode,
      addressCountry: "US",
    },
    parentOrganization: { "@type": "RealEstateAgent", name: site.brokerage },
    areaServed: [
      "Falmouth, MA",
      "Woods Hole, MA",
      "West Falmouth, MA",
      "Brockton, MA",
      "West Bridgewater, MA",
      "Quincy, MA",
      "Plymouth, MA",
      "Abington, MA",
      "Whitman, MA",
      "Bridgewater, MA",
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
