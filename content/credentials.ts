// Michelle's professional credentials, as listed on her CENTURY 21 profile.
// Keep this list to what her brokerage profile shows; do not add awards,
// designations, or review counts that are not on record.

export const designations = [
  {
    short: "SRES",
    name: "Seniors Real Estate Specialist",
    note: "Training in helping people over 50 sell, downsize, or settle a family home.",
  },
  {
    short: "ABR",
    name: "Accredited Buyer's Representative",
    note: "Training in representing buyers, from the first showing through the closing.",
  },
  {
    short: "RELO",
    name: "Relocation certified",
    note: "Training in moves between towns and states, including timing two closings.",
  },
] as const;

export const awards = [
  { name: "CENTURY 21 Masters Emerald Award", years: "2020, 2021, 2023" },
  { name: "CENTURY 21 Masters Ruby Award", years: "2022" },
] as const;
