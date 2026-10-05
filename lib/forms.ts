import type { Market } from "@/content/places";

// Shared form vocabulary for the client forms and the server actions.

export type FormState = {
  ok: boolean;
  message?: string;
  errors?: Partial<Record<string, string>>;
  values?: Record<string, string>;
};

export const initialFormState: FormState = { ok: false };

export const leadKinds = ["contact", "valuation", "place", "listing"] as const;
export type LeadKind = (typeof leadKinds)[number];

export const purposes = [
  { value: "buying", label: "Buying" },
  { value: "selling", label: "Selling" },
  { value: "both", label: "Both" },
  { value: "question", label: "Just a question" },
] as const;

export const timings = [
  { value: "now", label: "Now, or within 3 months" },
  { value: "3-6", label: "3 to 6 months" },
  { value: "6-12", label: "6 to 12 months" },
  { value: "later", label: "More than a year out" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export const markets: { value: Market; label: string }[] = [
  { value: "cape", label: "Cape Cod" },
  { value: "south_shore", label: "South Shore" },
];

// Name of the hidden honeypot field. Real people never see or fill it.
export const HONEYPOT = "website";
