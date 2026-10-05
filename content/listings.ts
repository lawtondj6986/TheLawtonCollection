import type { Market } from "./places";

// Manual listings. Edit this file to add, update, or remove a listing.
// Photos live in /public/listings/<slug>/. If a photo file is missing, the
// site shows a described placeholder instead of a broken image.

export type ListingStatus = "coming-soon" | "for-sale" | "under-agreement" | "sold";

export type Listing = {
  slug: string;
  /** True for placeholder content. Sample listings are labeled SAMPLE everywhere. */
  sample: boolean;
  status: ListingStatus;
  market: Market;
  town: string;
  village?: string;
  address: string;
  /** Asking price in dollars. Null shows "Price on request". */
  price: number | null;
  beds: number;
  baths: number;
  /** Optional facts shown on the detail page when present. */
  squareFeet?: number;
  lotAcres?: number;
  yearBuilt?: number;
  description: string;
  /** Main photo path under /public, e.g. "/listings/slug/front.jpg". */
  photo: string;
  photoAlt: string;
  gallery?: { src: string; alt: string }[];
};

export const statusLabel: Record<ListingStatus, string> = {
  "coming-soon": "Coming soon",
  "for-sale": "For sale",
  "under-agreement": "Under agreement",
  sold: "Sold",
};

export const listings: Listing[] = [
  {
    slug: "sample-falmouth-neighborhood-cape",
    sample: true,
    status: "for-sale",
    market: "cape",
    town: "Falmouth",
    village: "West Falmouth",
    address: "Sample listing, West Falmouth, MA",
    price: 689000,
    beds: 3,
    baths: 2,
    yearBuilt: 1962,
    description:
      "A gray-shingled three-bedroom cape on a quiet side street, a few minutes from the village. The kitchen was updated; the upstairs baths were not. Good yard, hydrangeas along the porch, room for a garden. A practical year-round house, not a showpiece.",
    photo: "/listings/sample-falmouth-neighborhood-cape/front.jpg",
    photoAlt: "Gray cedar-shingle cape with a white front door, hydrangeas along the porch, photographed straight on at eye level",
    gallery: [
      {
        src: "/listings/sample-falmouth-neighborhood-cape/kitchen.jpg",
        alt: "Updated kitchen with white cabinets and a window over the sink looking onto the yard",
      },
      {
        src: "/listings/sample-falmouth-neighborhood-cape/yard.jpg",
        alt: "Back yard with a lawn, a shed, and pine trees at the property line",
      },
    ],
  },
  {
    slug: "sample-brockton-colonial",
    sample: true,
    status: "coming-soon",
    market: "south_shore",
    town: "Brockton",
    address: "Sample listing, Brockton, MA",
    price: 459000,
    beds: 3,
    baths: 1.5,
    yearBuilt: 1928,
    description:
      "A three-bedroom colonial on a tree-lined West Side street. Hardwood floors, a front porch, and a one-car garage. The roof is newer; the heating system is original and should be budgeted for. A solid first home with room to grow.",
    photo: "/listings/sample-brockton-colonial/front.jpg",
    photoAlt: "Brockton colonial with a full front porch on a street lined with maples, early fall",
    gallery: [
      {
        src: "/listings/sample-brockton-colonial/living.jpg",
        alt: "Living room with original hardwood floors and two front windows",
      },
      {
        src: "/listings/sample-brockton-colonial/porch.jpg",
        alt: "Front porch with two chairs, looking out to the street",
      },
    ],
  },
];
