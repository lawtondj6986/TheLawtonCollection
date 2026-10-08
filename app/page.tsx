import Image from "next/image";
import Link from "next/link";
import { Container, ButtonLink, Rule } from "@/components/ui";
import { Monogram } from "@/components/Monogram";
import { LcBadge } from "@/components/LcBadge";
import { ListingCard } from "@/components/Cards";
import { SubscribeForm } from "@/components/SubscribeForm";
import { images } from "@/content/images";
import { brockton, capeTowns, easton, southShoreTowns } from "@/content/places";
import { Headshot } from "@/components/Headshot";
import { getListings } from "@/lib/listings";
import { faq } from "@/content/faq";
import { pageMeta } from "@/lib/metadata";
import { site, telHref } from "@/lib/site";

export const metadata = {
  ...pageMeta({
    title: "Cape Cod & the South Shore",
    description:
      "Michelle Lawton, CENTURY 21 North East, helps families buy and sell in Falmouth and the Upper Cape, and in Easton and Greater Brockton. Straight advice.",
    path: "/",
  }),
  title: { absolute: `${site.name} · ${site.brand}` },
};

// Hero lockup on a navy panel. Michelle's notes: the name smaller ("big
// letters are a bit overwhelming"), the lines below it large and roomy.
function HeroLockup() {
  return (
    <div className="text-salt">
      <Monogram className="h-14 w-auto text-brass md:h-16" />
      <span aria-hidden className="mt-5 block h-px w-20 bg-brass/80" />
      <h1 className="mt-5 font-serif text-[1.85rem] leading-tight font-medium tracking-[0.08em] text-salt uppercase sm:text-[2.2rem] lg:text-[2.1rem] xl:text-[2.3rem]">
        {site.name}
      </h1>
      <p className="mt-3 font-serif text-[1.6rem] leading-snug italic sm:text-[1.8rem]">{site.brand}</p>
      <span aria-hidden className="mt-5 block h-px w-16 bg-brass/80" />
      <p className="mt-5 font-serif text-[1.45rem] leading-snug sm:text-[1.6rem]">Cape Cod and the South Shore</p>
      <p className="mt-2 font-serif text-[1.45rem] leading-snug text-brass-light italic sm:text-[1.6rem]">{site.line}</p>
      <Link
        href="/contact"
        className="mt-8 inline-flex min-h-12 items-center gap-3 border border-brass bg-transparent px-6 text-base font-semibold tracking-[0.12em] text-salt uppercase transition-colors hover:bg-salt hover:text-navy"
      >
        Talk with Michelle <span aria-hidden>→</span>
      </Link>
      <p className="mt-4">
        <a
          href={telHref}
          aria-label={`Call Michelle at ${site.phone}`}
          className="text-[1.15rem] font-semibold tracking-wide text-salt underline decoration-brass/80 underline-offset-4 select-text hover:decoration-salt"
        >
          {site.phone}
        </a>
      </p>
    </div>
  );
}

export default function HomePage() {
  const listings = getListings().slice(0, 2);

  return (
    <>
      {/* Hero. A navy panel with the lockup beside the photograph (after the
          social frame reference); on phones the photo sits above the panel. */}
      <section aria-label="Introduction" className="bg-navy">
        <div className="grid lg:min-h-[34rem] lg:grid-cols-2">
          <div className="order-2 flex items-center border-t border-brass/60 px-5 py-12 sm:px-8 sm:py-14 lg:order-1 lg:border-t-0 lg:border-r lg:px-14 xl:pl-[calc((100vw-72rem)/2+2rem)]">
            <HeroLockup />
          </div>
          <div className="relative order-1 aspect-[3/2] lg:order-2 lg:aspect-auto">
            <Image
              src={images.hero.src}
              alt={images.hero.alt}
              fill
              preload
              fetchPriority="high"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[50%_55%]"
            />
            <LcBadge className="absolute right-4 bottom-4 w-14 sm:w-16" />
          </div>
        </div>
      </section>

      {/* Proof line and second action, at the fold. */}
      <section aria-label="About Michelle" className="border-b border-line bg-salt">
        <Container className="flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[1.05rem] text-ink">
              <span className="font-semibold text-navy">{site.native}.</span> Helping families buy and sell in
              Falmouth and the Upper Cape, and in Easton and Greater Brockton.
            </p>
            <p className="mt-1 text-base text-shingle-deep">
              {site.title} with {site.brokerage}. Award-winning, and easy to reach.
            </p>
          </div>
          <Link href="/home-value" className="shrink-0 font-semibold text-navy">
            <span className="border-b border-brass">What is my home worth?</span> <span aria-hidden>→</span>
          </Link>
        </Container>
      </section>

      {/* Two shores, after public/brand/08-social-frame.jpg. Equal paths. */}
      <section aria-labelledby="two-shores" className="py-20 sm:py-24">
        <Container>
          <div className="max-w-2xl">
            <p className="eyebrow">Two shores</p>
            <h2 id="two-shores" className="mt-3 text-4xl sm:text-5xl">
              Where are you buying or selling?
            </h2>
          </div>
          <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-6">
            <ShoreCard
              href="/cape-cod"
              caption="Cape Cod"
              image={images.capeShore}
              places={["Falmouth", ...capeTowns.map((t) => t.name)]}
              line="Falmouth and the Upper Cape."
            />
            <ShoreCard
              href="/south-shore"
              caption="South Shore"
              image={images.southShoreStreet}
              places={[easton.name, brockton.name, ...southShoreTowns.slice(0, 4).map((t) => t.name)]}
              line="Easton and Greater Brockton."
            />
          </div>
        </Container>
      </section>

      <section aria-labelledby="how" className="border-y border-line bg-sand/60 py-20 sm:py-24">
        <Container>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end">
            <Headshot className="w-40 shrink-0 sm:w-44" />
            <div>
              <p className="eyebrow">How Michelle works</p>
              <h2 id="how" className="mt-3 max-w-2xl text-4xl sm:text-5xl">
                A known local person who tells you the truth about a house.
              </h2>
              <Link href="/about" className="mt-4 inline-block font-semibold text-navy">
                <span className="border-b border-brass">Meet Michelle</span> <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {[
              {
                title: "A straight answer on price",
                body: "If your house needs work before it sells, Michelle will tell you. If it doesn't, she'll tell you that too.",
              },
              {
                title: "Your schedule, not hers",
                body: "Nurses, firefighters, police officers, teachers: shifts don't stop for open houses. Early, late, and weekend showings are normal.",
              },
              {
                title: "One call for both shores",
                body: "Moving from the South Shore to the Cape, or from the Cape back near family? Michelle knows both areas and the people in them.",
              },
            ].map((item) => (
              <div key={item.title}>
                <Rule />
                <h3 className="mt-5 text-[1.75rem]">{item.title}</h3>
                <p className="mt-3 text-ink/90">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="answers" className="py-20 sm:py-24">
        <Container>
          <p className="eyebrow">Straight answers</p>
          <h2 id="answers" className="mt-3 max-w-2xl text-4xl sm:text-5xl">
            Questions people ask before they call
          </h2>
          <dl className="mt-12 grid gap-x-14 gap-y-10 md:grid-cols-2">
            {faq.map((item) => (
              <div key={item.q} className="border-t border-line pt-6">
                <dt className="font-serif text-[1.65rem] leading-snug text-navy">{item.q}</dt>
                <dd className="mt-2.5 text-ink/90">{item.a}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3">
            <ButtonLink href="/contact">Talk with Michelle</ButtonLink>
            <a href={telHref} className="text-lg font-semibold text-navy underline decoration-brass underline-offset-4">
              or call {site.phone}
            </a>
          </div>
        </Container>
      </section>

      <section aria-labelledby="collection" className="border-t border-line py-20 sm:py-24">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">The Collection</p>
              <h2 id="collection" className="mt-3 text-4xl sm:text-5xl">
                Homes for sale
              </h2>
            </div>
            <Link href="/collection" className="font-semibold text-navy">
              <span className="border-b border-brass">See all homes</span> <span aria-hidden>→</span>
            </Link>
          </div>
          {listings.length ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {listings.map((listing) => (
                <ListingCard key={listing.slug} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="mt-10 flex flex-col gap-6 border border-line bg-white p-7 sm:p-10 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <p className="font-serif text-[1.9rem] leading-tight text-navy">New listings are on the way.</p>
                <p className="mt-2 text-ink/90">
                  Some homes sell before they&rsquo;re ever listed. Tell Michelle what you&rsquo;re looking for and
                  she&rsquo;ll keep an eye out for you.
                </p>
              </div>
              <ButtonLink href="/contact" className="shrink-0">
                Tell Michelle what you need
              </ButtonLink>
            </div>
          )}
        </Container>
      </section>

      <section aria-labelledby="letter" className="pb-4">
        <Container className="grid grid-cols-1 gap-10 border-t border-brass pt-16 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow">Market update</p>
            <h2 id="letter" className="mt-3 text-4xl sm:text-5xl">
              Get Michelle&rsquo;s market update by email.
            </h2>
            <p className="mt-5 max-w-md text-ink/90">
              What sold, what didn&rsquo;t, and what it means for your street. The first one is being written now. No
              spam. Stop any time.
            </p>
          </div>
          <div className="border border-line bg-white p-6 sm:p-8">
            <SubscribeForm source="/" />
          </div>
        </Container>
      </section>
    </>
  );
}

function ShoreCard({
  href,
  caption,
  image,
  places,
  line,
}: {
  href: string;
  caption: string;
  image: { src: string; alt: string };
  places: string[];
  line: string;
}) {
  return (
    <Link href={href} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-sand sm:aspect-[3/4] md:aspect-[4/5]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
      </div>
      <h3 className="mt-5 text-[2.3rem]">{caption}</h3>
      <p className="mt-1 text-ink/90">{line}</p>
      <p className="mt-2 text-base text-shingle-deep">{places.join(" · ")}</p>
      <p className="mt-4 font-semibold text-navy">
        <span className="border-b border-brass/70 group-hover:border-navy">Explore {caption === "Cape Cod" ? caption : `the ${caption}`}</span>
        <span aria-hidden> →</span>
      </p>
    </Link>
  );
}
