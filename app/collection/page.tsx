import { Container, PageHeader } from "@/components/ui";
import { ListingCard } from "@/components/Cards";
import { getListings } from "@/lib/listings";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Homes for sale",
  description: "Homes Michelle Lawton is representing on Cape Cod and the South Shore, described honestly.",
  path: "/collection",
});

export default function CollectionPage() {
  const listings = getListings();
  const hasSamples = listings.some((listing) => listing.sample);

  return (
    <>
      <PageHeader eyebrow="The Collection" title="Homes for sale">
        <p>
          Michelle knows every house here firsthand. Each description tells you what&rsquo;s good and what needs work.
        </p>
      </PageHeader>
      <Container>
        {hasSamples ? (
          <p className="mb-8 border-l-2 border-[#9b2c2c] bg-white px-4 py-3 text-base text-ink">
            Listings marked SAMPLE are examples of how this page will look. They are not real homes for sale.
          </p>
        ) : null}
        {listings.length ? (
          <div className="grid gap-6 md:grid-cols-2">
            {listings.map((listing) => (
              <ListingCard key={listing.slug} listing={listing} />
            ))}
          </div>
        ) : (
          <p className="text-lg text-ink/90">
            Nothing listed right now. Some homes sell before they&rsquo;re ever listed, so tell Michelle what
            you&rsquo;re looking for.
          </p>
        )}
      </Container>
    </>
  );
}
