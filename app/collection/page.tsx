import { Container, PageHeader } from "@/components/ui";
import { ListingCard } from "@/components/Cards";
import { getListings } from "@/lib/listings";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "The Collection",
  description: "Homes Michelle Lawton is representing on Cape Cod and the South Shore, described honestly.",
  path: "/collection",
});

export default function CollectionPage() {
  const listings = getListings();
  const hasSamples = listings.some((listing) => listing.sample);

  return (
    <>
      <PageHeader eyebrow="The Collection" title="Homes Michelle is representing">
        <p>
          Every house here is one Michelle knows firsthand. The descriptions say what is good and what needs work,
          because that is what you would want to know.
        </p>
      </PageHeader>
      <Container>
        {hasSamples ? (
          <p className="mb-8 border-l-2 border-[#9b2c2c] bg-white px-4 py-3 text-[0.95rem] text-ink">
            Listings marked SAMPLE are placeholders that show how the Collection will look. They are not homes for
            sale.
          </p>
        ) : null}
        {listings.length ? (
          <div className="grid gap-6 md:grid-cols-2">
            {listings.map((listing) => (
              <ListingCard key={listing.slug} listing={listing} />
            ))}
          </div>
        ) : (
          <p className="text-lg text-ink/85">
            Nothing listed at the moment. New homes often come up before they reach the open market, so it is worth
            a note to Michelle about what you are looking for.
          </p>
        )}
      </Container>
    </>
  );
}
