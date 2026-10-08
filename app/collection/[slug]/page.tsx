import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Rule } from "@/components/ui";
import { Photo } from "@/components/Photo";
import { LeadForm } from "@/components/LeadForm";
import { SampleBadge } from "@/components/Cards";
import { statusLabel } from "@/content/listings";
import { marketLabel } from "@/content/places";
import { formatBaths, formatPrice, getListing, getListings } from "@/lib/listings";
import { pageMeta } from "@/lib/metadata";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getListings().map((listing) => ({ slug: listing.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const listing = getListing(slug);
  if (!listing) return {};
  const place = listing.village ? `${listing.village}, ${listing.town}` : listing.town;
  return pageMeta({
    title: `${listing.sample ? "Sample listing" : listing.address} · ${place}`,
    description: `${listing.beds} bedrooms, ${listing.baths} baths in ${place}. ${listing.description.slice(0, 110)}…`,
    path: `/collection/${listing.slug}`,
    noIndex: listing.sample,
  });
}

export default async function ListingPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const listing = getListing(slug);
  if (!listing) notFound();

  const place = listing.village ? `${listing.village}, ${listing.town}` : listing.town;
  const facts: [string, string][] = [
    ["Status", statusLabel[listing.status]],
    ["Price", formatPrice(listing.price)],
    ["Bedrooms", String(listing.beds)],
    ["Baths", formatBaths(listing.baths)],
    ["Town", listing.town],
    ...(listing.village ? ([["Village", listing.village]] as [string, string][]) : []),
    ["Market", marketLabel[listing.market]],
    ...(listing.squareFeet ? ([["Living area", `${listing.squareFeet.toLocaleString()} sq ft`]] as [string, string][]) : []),
    ...(listing.lotAcres ? ([["Lot", `${listing.lotAcres} acres`]] as [string, string][]) : []),
    ...(listing.yearBuilt ? ([["Year built", String(listing.yearBuilt)]] as [string, string][]) : []),
  ];

  return (
    <>
      {listing.sample ? (
        <div className="border-b border-[#9b2c2c]/30 bg-white">
          <Container className="flex items-center gap-3 py-3 text-base">
            <SampleBadge />
            <span>This is a sample listing that shows the layout. It is not a home for sale.</span>
          </Container>
        </div>
      ) : null}

      <Container className="pt-10 sm:pt-14">
        <nav aria-label="Breadcrumb" className="text-base text-shingle-deep">
          <Link href="/collection" className="link">Homes for sale</Link>
          <span aria-hidden className="mx-2">/</span>
          <span aria-current="page">{place}</span>
        </nav>
        <p className="eyebrow mt-8">{statusLabel[listing.status]} · {place}</p>
        <h1 className="mt-4 text-[2.4rem] sm:text-[3.4rem]">{listing.address}</h1>
        <p className="mt-3 font-serif text-[2rem] text-navy">{formatPrice(listing.price)}</p>
        <Rule className="mt-6" />
      </Container>

      <Container className="mt-10">
        <Photo src={listing.photo} alt={listing.photoAlt} aspect="aspect-[3/2] md:aspect-[2/1]" priority sizes="(min-width: 1152px) 1152px, 100vw" />
        {listing.gallery?.length ? (
          <ul aria-label="More photos" className="mt-4 grid gap-4 sm:grid-cols-2">
            {listing.gallery.map((photo) => (
              <li key={photo.src}>
                <Photo src={photo.src} alt={photo.alt} aspect="aspect-[3/2]" sizes="(min-width: 640px) 50vw, 100vw" />
              </li>
            ))}
          </ul>
        ) : null}
      </Container>

      <Container className="mt-14 grid gap-14 md:grid-cols-[minmax(0,1fr)_24rem] lg:grid-cols-[minmax(0,1fr)_27rem] lg:gap-20">
        <div>
          <h2 className="text-[2rem]">About the house</h2>
          <p className="mt-4 text-lg text-ink/90">{listing.description}</p>

          <h2 className="mt-12 text-[2rem]">The facts</h2>
          <dl className="mt-4 grid border-t border-line sm:grid-cols-2 sm:gap-x-10">
            {facts.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 border-b border-line py-3">
                <dt className="text-shingle-deep">{label}</dt>
                <dd className="text-right font-semibold text-navy">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside aria-labelledby="inquire" className="md:sticky md:top-6 md:self-start">
          <div className="border border-line bg-white p-6 sm:p-8">
            <h2 id="inquire" className="text-[1.9rem]">Ask about this house</h2>
            <p className="mt-2 text-base text-ink/90">A showing, a question, or a second look. Michelle will reply herself.</p>
            <div className="mt-6">
              <LeadForm kind="listing" listing={listing.slug} source={`/collection/${listing.slug}`} market={listing.market} submitLabel="Ask Michelle" />
            </div>
          </div>
        </aside>
      </Container>
    </>
  );
}
