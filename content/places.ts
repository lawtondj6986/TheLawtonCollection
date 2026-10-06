// Local notes for the market and village pages. Plain observations only:
// no school ratings, no median prices, no invented market statistics.

export type Market = "cape" | "south_shore";

export const marketLabel: Record<Market, string> = {
  cape: "Cape Cod",
  south_shore: "South Shore",
};

export type Place = {
  slug: string;
  name: string;
  market: Market;
  path: string;
  town: string;
  summary: string;
  localNote: string[];
  forWhom: string[];
  askAbout: string[];
};

export const villages: Place[] = [
  {
    slug: "woods-hole",
    name: "Woods Hole",
    market: "cape",
    path: "/cape-cod/woods-hole",
    town: "Falmouth",
    summary: "A working harbor village at the tip of Falmouth. The ferry and the science labs keep it busy all year.",
    localNote: [
      "Woods Hole is a working village. The ferry runs to Martha's Vineyard, and the ocean science labs keep people here all year, not just in July.",
      "Houses sit close together on narrow streets. Many are older capes and shingled cottages that have been in the same family for years. A few look right out at the water.",
    ],
    forWhom: [
      "People who work at the labs or the ferry and want to walk to work",
      "Families who have come here every summer and are ready to buy",
      "People selling a house that has been in the family a long time",
    ],
    askAbout: [
      "Parking and summer traffic, street by street",
      "Whether the house is in a flood zone, and what that does to insurance",
      "Whether the house has been rented, and for how long",
    ],
  },
  {
    slug: "quissett-sippewissett",
    name: "Quissett / Sippewissett",
    market: "cape",
    path: "/cape-cod/quissett-sippewissett",
    town: "Falmouth",
    summary: "Quiet wooded roads, a small harbor, and the marsh along Buzzards Bay.",
    localNote: [
      "Quissett Harbor is small and protected from the wind. Sippewissett runs north along Buzzards Bay, with marsh, wooded roads, and the Shining Sea Bikeway close by.",
      "It is mostly shingled family houses set back in the trees. Many started as summer places. More and more people live here all year now.",
    ],
    forWhom: [
      "Families who want a quiet road and a short drive into Falmouth",
      "People ready to live on the Cape full time",
      "Owners of a family home thinking about selling",
    ],
    askAbout: [
      "The septic system. Most houses here have one, and it has to pass inspection (Title 5) before a sale",
      "Private roads: who plows, who fixes them, and what it costs",
      "Flood zones and building limits near the marsh",
    ],
  },
  {
    slug: "west-falmouth",
    name: "West Falmouth",
    market: "cape",
    path: "/cape-cod/west-falmouth",
    town: "Falmouth",
    summary: "An old village on Route 28A with its own harbor and library. People live here all year.",
    localNote: [
      "West Falmouth has a small village center: the library, a few shops, and neighbors who know each other. West Falmouth Harbor and Chapoquoit Beach are close by.",
      "You'll find old colonials and capes along 28A, newer family homes on the side roads, and a few houses on the water.",
    ],
    forWhom: [
      "Families who want to live in a small village on the Cape all year",
      "People moving to the Cape from off-Cape",
      "People selling an older house or a house on the water",
    ],
    askAbout: [
      "Older houses: what the inspection usually turns up, and what it costs to fix",
      "The septic system and its inspection (Title 5), plus any town rules about upgrades",
      "On the water: flood zones, docks, and permits",
    ],
  },
];

export const brockton: Place = {
  slug: "brockton",
  name: "Brockton",
  market: "south_shore",
  path: "/south-shore/brockton",
  town: "Brockton",
  summary: "The city Michelle grew up in. Real neighborhoods, fair prices, and three train stops to Boston.",
  localNote: [
    "Brockton is Michelle's hometown, the City of Champions. She knows the West Side, Campello, Montello, and the streets around D.W. Field Park, and she knows how hard people here work for what they have.",
    "A lot of first homes here are single-families or two- and three-family houses. Renting out the other units can help pay the mortgage. The commuter rail stops at Montello, Brockton, and Campello.",
  ],
  forWhom: [
    "First-time buyers, including people who work shifts: nurses, firefighters, police officers, teachers",
    "Buyers who want to live in one unit and rent out the others",
    "Families selling a parent's house or the house they grew up in",
  ],
  askAbout: [
    "Loan programs for first-time buyers, and lenders who know them",
    "Two- and three-families: leases, inspections, and what the rents bring in",
    "Selling a house after a death in the family, and how long the court process (probate) takes",
  ],
};

export const southShoreTowns = [
  { name: "Quincy", note: "On the Red Line, with condos and older two-families near the water." },
  { name: "Plymouth", note: "The biggest town in Massachusetts by land, from the harbor to the ponds." },
  { name: "Abington", note: "A small town with a train stop to Boston." },
  { name: "Whitman", note: "Friendly streets and its own train stop." },
  { name: "Bridgewater", note: "A college town with bigger yards and a train into Boston." },
] as const;

export const allPlaces: Place[] = [...villages, brockton];
