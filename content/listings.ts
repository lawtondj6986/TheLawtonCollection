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

// Add Michelle's real listings here. Example entry:
//
// {
//   slug: "12-example-street-falmouth",
//   sample: false,
//   status: "for-sale",
//   market: "cape",
//   town: "Falmouth",
//   village: "West Falmouth",
//   address: "12 Example Street, Falmouth, MA",
//   price: 650000,
//   beds: 3,
//   baths: 2,
//   description: "Short, honest description: what's good and what needs work.",
//   photo: "/listings/12-example-street-falmouth/front.jpg",
//   photoAlt: "What the photo shows, in plain words",
//   gallery: [{ src: "/listings/12-example-street-falmouth/kitchen.jpg", alt: "Kitchen" }],
// },
export const listings: Listing[] = [];
