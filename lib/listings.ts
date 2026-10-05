import { listings, type Listing } from "@/content/listings";

// Listings come from the typed content file for now.
//
// IDX adapter goes here. Cape Cod & Islands MLS and MLS PIN are separate
// feeds, and each requires the broker's signed IDX agreement before any
// data can be shown. When those are in place, add an adapter per feed that
// maps MLS records to the Listing type, merge them with the manual entries
// below, and include the required MLS attribution on the listing pages.

export function getListings(): Listing[] {
  return listings;
}

export function getListing(slug: string): Listing | undefined {
  return listings.find((listing) => listing.slug === slug);
}

export function formatPrice(price: number | null) {
  if (price === null) return "Price on request";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatBaths(baths: number) {
  const full = Math.floor(baths);
  return baths % 1 ? `${full} full, 1 half` : `${full}`;
}
