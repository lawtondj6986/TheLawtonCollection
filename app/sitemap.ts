import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { allPlaces } from "@/content/places";
import { getListings } from "@/lib/listings";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/about",
    "/cape-cod",
    "/south-shore",
    "/collection",
    "/home-value",
    "/how-it-works",
    "/contact",
    "/market-report",
    "/privacy",
    ...allPlaces.map((place) => place.path),
    ...getListings()
      .filter((listing) => !listing.sample)
      .map((listing) => `/collection/${listing.slug}`),
  ];
  return paths.map((path) => ({ url: `${site.url}${path}` }));
}
