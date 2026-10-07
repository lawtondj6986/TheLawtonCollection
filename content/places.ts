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
  summary: "The biggest city in Greater Brockton. Real neighborhoods, fair prices, and three train stops to Boston.",
  localNote: [
    "Brockton is the City of Champions. Every part of it is different: the West Side, Campello, Montello, and the streets around D.W. Field Park. Michelle knows them, and she knows how hard people here work for what they have.",
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

export const easton: Place = {
  slug: "easton",
  name: "Easton",
  market: "south_shore",
  path: "/south-shore/easton",
  town: "Easton",
  summary: "North Easton and South Easton: old stone buildings, big yards, and room to breathe.",
  localNote: [
    "Easton is two villages in one town. North Easton has the old Ames shovel works, Stonehill College, and some of the best-known stone buildings in the state. South Easton is quieter and more spread out.",
    "Many homes here sit on bigger lots than you'll find closer to Boston. Borderland State Park is on the town line, with trails and ponds for the whole family.",
  ],
  forWhom: [
    "Families who want a bigger yard and a quieter street",
    "Buyers moving up from a first home in Brockton or nearby",
    "Owners of a longtime family home thinking about selling",
  ],
  askAbout: [
    "Town water or a private well, and town sewer or a septic system (Title 5)",
    "Older homes: what the inspection usually turns up",
    "Commute times to Route 24, Route 138, and the nearest train stations",
  ],
};

export const capeTowns: Place[] = [
  {
    slug: "mashpee",
    name: "Mashpee",
    market: "cape",
    path: "/cape-cod/mashpee",
    town: "Mashpee",
    summary: "Ponds, South Cape Beach, and Mashpee Commons, right next door to Falmouth.",
    localNote: [
      "Mashpee sits between Falmouth and Barnstable. It has freshwater ponds, South Cape Beach on Nantucket Sound, and Mashpee Commons for shopping and dinner. It is also home to the Mashpee Wampanoag Tribe.",
      "Homes range from year-round neighborhoods near the ponds to communities like New Seabury and Popponesset near the water, some with their own associations and rules.",
    ],
    forWhom: [
      "Year-round families who want ponds and beaches close by",
      "People moving to the Cape full time",
      "Owners of a second home thinking about selling",
    ],
    askAbout: [
      "Association fees and rules in neighborhoods that have them",
      "The septic system and its inspection (Title 5)",
      "Whether the house is in a flood zone, and what that does to insurance",
    ],
  },
  {
    slug: "bourne",
    name: "Bourne",
    market: "cape",
    path: "/cape-cod/bourne",
    town: "Bourne",
    summary: "The gateway to the Cape. Both canal bridges, quiet villages, and an easier drive off-Cape.",
    localNote: [
      "Bourne is where you cross onto the Cape. Both the Bourne and Sagamore bridges are here, and part of the town sits on the mainland side of the canal. That makes it a good fit for people who work off-Cape.",
      "The town is a group of villages: Buzzards Bay, Sagamore Beach, Monument Beach, Pocasset, Cataumet, and Bournedale. Each has its own feel, from beach streets to wooded neighborhoods.",
    ],
    forWhom: [
      "People who commute to the South Shore or Boston",
      "Families who want Cape living with an easier drive",
      "Owners of a family home or a beach house thinking about selling",
    ],
    askAbout: [
      "Bridge traffic, especially in summer",
      "The septic system and its inspection (Title 5)",
      "Flood zones near the canal and the bay",
    ],
  },
  {
    slug: "barnstable",
    name: "Barnstable",
    market: "cape",
    path: "/cape-cod/barnstable",
    town: "Barnstable",
    summary: "Hyannis, Centerville, Osterville, Cotuit, Marstons Mills, and more. Seven villages, one town.",
    localNote: [
      "Barnstable is the largest town on the Cape. Hyannis has Cape Cod Hospital, the airport, and the ferries to Nantucket and Martha's Vineyard. A lot of people who work on the Cape live here all year.",
      "The villages are very different from each other: Hyannis is busy, while Centerville, Osterville, Cotuit, Marstons Mills, West Barnstable, and Barnstable Village are quieter, with older homes and ponds.",
    ],
    forWhom: [
      "Nurses, first responders, and others who work in Hyannis",
      "First-time buyers looking for a year-round home on the Cape",
      "Families selling a longtime Cape home",
    ],
    askAbout: [
      "Which village fits your commute and your budget",
      "The septic system and its inspection (Title 5), or town sewer where it exists",
      "Flood zones and insurance near the water",
    ],
  },
];

export const southShoreTowns = [
  { name: "West Bridgewater", note: "A small town with a country feel, right next to Brockton." },
  { name: "East Bridgewater", note: "Quiet streets and bigger yards, east of Brockton." },
  { name: "Bridgewater", note: "A college town with bigger yards and a train into Boston." },
  { name: "Stoughton", note: "A busy town center and its own train stop to Boston." },
  { name: "Avon", note: "A small town right off Route 24." },
  { name: "Whitman", note: "Friendly streets and its own train stop." },
  { name: "Abington", note: "A small town with a train stop to Boston." },
] as const;

export const capePlaces: Place[] = [...villages, ...capeTowns];

export const allPlaces: Place[] = [...capePlaces, easton, brockton];
