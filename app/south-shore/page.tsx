import { Container, PageHeader, ButtonLink, Rule } from "@/components/ui";
import { FrameCard } from "@/components/Cards";
import { brockton, easton, southShoreTowns } from "@/content/places";
import { placeImages } from "@/content/images";
import { pageMeta } from "@/lib/metadata";
import { site, telHref } from "@/lib/site";

export const metadata = pageMeta({
  title: "South Shore",
  description:
    "Easton and Greater Brockton: Easton, Brockton, West Bridgewater, East Bridgewater, Bridgewater, Stoughton, and nearby towns. Straight advice from Michelle Lawton, CENTURY 21 North East.",
  path: "/south-shore",
});

export default function SouthShorePage() {
  return (
    <>
      <PageHeader eyebrow="South Shore" title="Easton and Greater Brockton">
        <p>
          This is home. Michelle grew up on the South Shore and works with first-time buyers, growing families, and
          people selling the house they were raised in.
        </p>
      </PageHeader>

      <Container>
        <div className="grid gap-12 md:grid-cols-2 md:gap-6">
          {[easton, brockton].map((place) => (
            <FrameCard
              key={place.slug}
              href={place.path}
              kicker="South Shore"
              title={place.name}
              summary={place.summary}
              image={placeImages[place.slug]}
            />
          ))}
        </div>
      </Container>

      <Container className="mt-20">
        <h2 className="text-[2.2rem]">Also in Greater Brockton</h2>
        <Rule className="mt-4" />
        <ul className="mt-8 grid gap-x-10 border-t border-line sm:grid-cols-2">
          {southShoreTowns.map((town) => (
            <li key={town.name} className="border-b border-line py-5">
              <p className="font-serif text-[1.6rem] leading-tight text-navy">{town.name}</p>
              <p className="mt-1 text-ink/90">{town.note}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-base text-shingle-deep">
          You won&rsquo;t find made-up averages here. Ask about a town or a street and Michelle will send you real,
          current numbers.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <ButtonLink href="/contact">Talk with Michelle</ButtonLink>
          <ButtonLink href="/home-value" variant="secondary">
            What is my home worth?
          </ButtonLink>
          <a href={telHref} className="text-lg font-semibold text-navy underline decoration-brass underline-offset-4">
            or call {site.phone}
          </a>
        </div>
      </Container>
    </>
  );
}
