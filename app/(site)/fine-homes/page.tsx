import Link from "next/link";
import { Container, PageHeader, Rule } from "@/components/ui";
import { Photo } from "@/components/Photo";
import { LeadForm } from "@/components/LeadForm";
import { images } from "@/content/images";
import { pageMeta } from "@/lib/metadata";
import { site, telHref } from "@/lib/site";

export const metadata = pageMeta({
  title: "Waterfront and fine homes",
  description:
    "Selling a waterfront home or a longtime family house on Cape Cod or the South Shore? How Michelle Lawton handles a significant sale, with care and discretion.",
  path: "/fine-homes",
});

// How a significant sale is handled. Same voice as the rest of the site:
// specific, calm, no superlatives.
const steps = [
  {
    title: "A quiet first conversation",
    body: "We talk before anything is listed, photographed, or shared. What you want, what you're worried about, and what the house means to your family all shape the plan.",
  },
  {
    title: "An honest price",
    body: "Michelle will tell you what the house is worth today, not a number meant to win the listing. For a waterfront or an unusual house, that takes real work: recent sales, the lot, the water frontage, and what the next owner will actually pay for.",
  },
  {
    title: "The house, prepared",
    body: "Small things done well: repairs that pay for themselves, the yard and the approach, and nothing you don't need. Michelle brings in the right people and keeps the list short.",
  },
  {
    title: "Photography that respects the house",
    body: "Photographed in the right light, at the right time of day, by people who know how to show a shingled house and the water without distortion.",
  },
  {
    title: "The right buyers, the right way",
    body: "Some houses sell best with a full launch. Others sell best quietly, to a few qualified buyers, before they ever appear online. Michelle will tell you which fits yours, and she honors your privacy either way.",
  },
  {
    title: "Showings on your terms",
    body: "By appointment, with notice, and only to buyers who are ready. No open-house parade through your home unless you want one.",
  },
  {
    title: "A careful closing",
    body: "Attorneys review every document, and Michelle stays on it through the final walk-through. When an estate is involved, she can point you to the right family counsel.",
  },
];

const details = [
  "Flood zone status, elevation, and what insurance will cost the next owner",
  "Docks, moorings, seawalls, and the permits that go with them",
  "Septic systems (Title 5), wells, and conservation limits on the lot",
  "Rights of way, private roads, and beach or association rights",
  "Lead paint and older-house disclosures, done right the first time",
];

export default function FineHomesPage() {
  return (
    <>
      <PageHeader eyebrow="Waterfront and fine homes" title="A careful sale for a house that matters">
        <p>
          A waterfront home, a house that has been in the family for generations, or simply a home that deserves
          more than a quick listing. Michelle handles these sales herself, start to finish, with the same straight
          advice she gives everyone.
        </p>
      </PageHeader>

      <Container>
        <Photo
          src={images.capeShore.src}
          alt={images.capeShore.alt}
          position="object-[40%_55%]"
          aspect="aspect-[16/9] md:aspect-[21/8]"
          priority
          sizes="(min-width: 1152px) 1152px, 100vw"
        />
      </Container>

      <Container className="mt-14 grid grid-cols-1 gap-14 md:grid-cols-[minmax(0,1fr)_24rem] lg:grid-cols-[minmax(0,1fr)_27rem] lg:gap-20">
        <div className="space-y-14">
          <section aria-labelledby="how">
            <h2 id="how" className="text-[2rem]">How Michelle handles it</h2>
            <ol className="mt-6 space-y-7">
              {steps.map((step, index) => (
                <li key={step.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-3">
                  <span aria-hidden className="font-serif text-[2rem] leading-none text-brass-deep">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-[1.5rem] leading-snug">{step.title}</h3>
                    <p className="mt-1 text-ink/90">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="details">
            <h2 id="details" className="text-[2rem]">The details that decide a waterfront sale</h2>
            <p className="mt-3 text-ink/90">
              These are the questions a serious buyer&rsquo;s attorney will ask. Michelle gets the answers before the
              house goes on the market, so nothing surprises anyone at the closing table.
            </p>
            <ul className="mt-5 space-y-3">
              {details.map((item) => (
                <li key={item} className="flex gap-3 text-ink/90">
                  <span aria-hidden className="mt-[0.8em] h-px w-4 shrink-0 bg-brass" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="buying">
            <Rule />
            <h2 id="buying" className="mt-6 text-[2rem]">Buying on the water</h2>
            <p className="mt-3 text-ink/90">
              The same care applies if you&rsquo;re the buyer. Michelle will tell you what a waterfront house
              really costs to own, what to check before you make an offer, and when to walk away. She knows which
              houses are worth the price and which ones are selling a view.
            </p>
            <p className="mt-4">
              <Link href="/how-it-works" className="link font-semibold">
                How buying and selling works, step by step
              </Link>
            </p>
          </section>
        </div>

        <aside aria-labelledby="talk" className="md:sticky md:top-6 md:self-start">
          <div className="border border-line bg-white p-6 sm:p-8">
            <h2 id="talk" className="text-[1.9rem]">Start with a conversation</h2>
            <p className="mt-2 text-base text-ink/90">
              Private, unhurried, and free. Nothing is listed or shared until you say so.
            </p>
            <div className="mt-6">
              <LeadForm kind="place" source="/fine-homes" submitLabel="Ask Michelle" />
            </div>
            <p className="mt-5 text-base text-ink/90">
              Or call Michelle directly at{" "}
              <a href={telHref} className="link font-semibold">
                {site.phone}
              </a>
              .
            </p>
          </div>
        </aside>
      </Container>
    </>
  );
}
