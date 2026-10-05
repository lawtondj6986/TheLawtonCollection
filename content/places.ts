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
    summary: "A working harbor village at the tip of Falmouth, home to the ferry and the science institutions.",
    localNote: [
      "Woods Hole is a working village first. The ferry runs to Martha's Vineyard, and the oceanographic and marine labs keep people here all year, not just in July.",
      "Houses sit close together on narrow streets. Some are old capes and shingled cottages that have been in one family for generations; a few look straight out at Great Harbor or Eel Pond.",
    ],
    forWhom: [
      "People who work at the labs or the ferry and want to walk to work",
      "Families who have summered here for years and are ready to own",
      "Sellers of a long-held family house who want it handled with care",
    ],
    askAbout: [
      "Parking and summer traffic, street by street",
      "Flood zone status and what it means for insurance",
      "Year-round versus seasonal rental history",
    ],
  },
  {
    slug: "quissett-sippewissett",
    name: "Quissett / Sippewissett",
    market: "cape",
    path: "/cape-cod/quissett-sippewissett",
    town: "Falmouth",
    summary: "Wooded lanes, a quiet harbor, and the salt marsh along Buzzards Bay.",
    localNote: [
      "Quissett Harbor is small and sheltered. Sippewissett runs north along Buzzards Bay with its salt marsh and wooded roads, and the Shining Sea Bikeway passes close by.",
      "This is mostly a neighborhood of shingled family houses set back in the trees. Some have been weekend places for decades; more are lived in year-round now.",
    ],
    forWhom: [
      "Families who want a quiet road and a short drive into Falmouth village",
      "Buyers moving from a summer place to a year-round one",
      "Owners of a long-time family home thinking about next steps",
    ],
    askAbout: [
      "Septic and Title 5 inspections, which matter on many of these lots",
      "Private road associations and who maintains what",
      "Flood zone and conservation restrictions near the marsh",
    ],
  },
  {
    slug: "west-falmouth",
    name: "West Falmouth",
    market: "cape",
    path: "/cape-cod/west-falmouth",
    town: "Falmouth",
    summary: "An old village on Route 28A with its own harbor, library, and a strong year-round feel.",
    localNote: [
      "West Falmouth has a village center that still works the way village centers used to: the library, a few shops, and neighbors who know each other. West Falmouth Harbor and Chapoquoit Beach are close.",
      "Housing runs from antique colonials and capes along 28A to newer family homes on the side roads, with a handful of waterfront properties that deserve a careful sale.",
    ],
    forWhom: [
      "Year-round families who want village life on the Upper Cape",
      "Buyers coming from off-Cape who want to settle, not just visit",
      "Sellers of an antique or waterfront home that needs a thoughtful plan",
    ],
    askAbout: [
      "Older homes: what an inspection tends to find and how to plan for it",
      "Septic, Title 5, and any town nitrogen requirements",
      "Waterfront details: flood zone, docks, and permits",
    ],
  },
];

export const brockton: Place = {
  slug: "brockton",
  name: "Brockton",
  market: "south_shore",
  path: "/south-shore/brockton",
  town: "Brockton",
  summary: "The city I grew up in. Real neighborhoods, real value, and three commuter rail stops.",
  localNote: [
    "Brockton is my hometown, the City of Champions. I know the difference between the West Side, Campello, Montello, and the streets around D.W. Field Park, and I know what people here work hard for.",
    "Many first homes here are single-families and two- or three-family houses, which can make owning possible when one income has to carry a lot. The commuter rail stops at Montello, Brockton, and Campello.",
  ],
  forWhom: [
    "First-time buyers, including people who work shifts: nurses, firefighters, police officers, teachers",
    "Buyers considering a two- or three-family to live in one unit and rent the others",
    "Families settling an estate or selling the house they grew up in",
  ],
  askAbout: [
    "First-time buyer loan programs, through lenders who use them often",
    "Multi-family basics: leases, inspections, and rent rolls",
    "Estate sales and probate timing, with family counsel when it's needed",
  ],
};

export const southShoreTowns = [
  { name: "Quincy", note: "Red Line access, condos, and older two-families near the water." },
  { name: "Plymouth", note: "The largest town in Massachusetts by area, from the harbor to the ponds." },
  { name: "Abington", note: "A small-town center with a commuter rail stop." },
  { name: "Whitman", note: "Neighborly streets and a commuter rail stop of its own." },
  { name: "Bridgewater", note: "A college town with room to spread out and rail into Boston." },
] as const;

export const allPlaces: Place[] = [...villages, brockton];
