import { allPlaces } from "@/content/places";
import { getListings } from "@/lib/listings";

// Titles the /og share-image route is allowed to draw, keyed by page path.
// The route only renders text from this list, so nobody can make a branded
// image that says something Michelle didn't write.
const staticTitles: Record<string, string> = {
  "/about": "About Michelle",
  "/cape-cod": "Cape Cod",
  "/south-shore": "South Shore",
  "/collection": "Homes for sale",
  "/home-value": "What is my home worth?",
  "/how-it-works": "How buying and selling works",
  "/contact": "Talk with Michelle",
  "/market-report": "Market update",
  "/privacy": "Privacy",
};

export function shareTitle(path: string): string | undefined {
  if (staticTitles[path]) return staticTitles[path];
  const place = allPlaces.find((p) => p.path === path);
  if (place) {
    const area = place.market === "cape" ? "Cape Cod" : "South Shore";
    return place.town === place.name ? `${place.name}, ${area}` : `${place.name}, ${place.town}`;
  }
  const listing = getListings().find((l) => `/collection/${l.slug}` === path);
  return listing ? listing.address : undefined;
}
