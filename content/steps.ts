// The usual path for buying and selling a home in Massachusetts, in plain
// words. General information only: no prices, fees, deadlines, or legal advice.

export type Step = { title: string; body: string };

export const buyingSteps: Step[] = [
  {
    title: "Talk with Michelle",
    body: "A free, no-pressure conversation about what you want, where, and when.",
  },
  {
    title: "Get pre-approved",
    body: "A lender looks at your income and credit and tells you how much you can borrow. Michelle can introduce you to local lenders, including ones who work with first-time buyers.",
  },
  {
    title: "Look at homes",
    body: "Michelle sets up showings around your schedule and tells you what she sees, good and bad.",
  },
  {
    title: "Make an offer",
    body: "In Massachusetts this is a signed Offer to Purchase with a small deposit. Michelle helps you decide on price and terms.",
  },
  {
    title: "Home inspection",
    body: "A licensed inspector goes through the house, usually within days of your offer being accepted. You learn what needs work before you commit.",
  },
  {
    title: "Purchase and Sale Agreement",
    body: "The full contract. Attorneys review it, and you put down a larger deposit. This is the step where it becomes official.",
  },
  {
    title: "Mortgage commitment",
    body: "The lender orders an appraisal and gives final approval for your loan.",
  },
  {
    title: "Walk-through and closing",
    body: "You see the house one last time, then sign at the closing. In Massachusetts an attorney handles the closing. You get the keys.",
  },
];

export const sellingSteps: Step[] = [
  {
    title: "Talk with Michelle",
    body: "What your home is worth, what you'd walk away with, and when to sell. Free, and no pressure to list.",
  },
  {
    title: "Get the house ready",
    body: "Michelle tells you which repairs are worth doing and which aren't worth your money.",
  },
  {
    title: "Paperwork Massachusetts requires",
    body: "A smoke and carbon monoxide certificate from your local fire department. A septic inspection (Title 5) if the house has a septic system. A lead paint notice if the house was built before 1978. Michelle will tell you what applies to your home.",
  },
  {
    title: "List and show",
    body: "Photos, the listing, and showings, scheduled so they work for your household.",
  },
  {
    title: "Review offers",
    body: "Michelle goes through each offer with you: price, deposit, financing, and timing, so you can choose with confidence.",
  },
  {
    title: "Inspection and Purchase and Sale",
    body: "The buyer's inspection, then the full contract, reviewed by attorneys.",
  },
  {
    title: "Closing",
    body: "You sign, the sale is recorded, and you hand over the keys. In Massachusetts an attorney handles the closing.",
  },
];
