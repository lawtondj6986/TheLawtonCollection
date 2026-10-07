import { Container, PageHeader, ButtonLink, Rule } from "@/components/ui";
import { FrameCard } from "@/components/Cards";
import { Monogram } from "@/components/Monogram";
import { capeTowns, villages } from "@/content/places";
import { placeImages } from "@/content/images";
import { pageMeta } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Cape Cod",
  description:
    "Falmouth and the Upper Cape: Woods Hole, Quissett and Sippewissett, West Falmouth, Mashpee, Bourne, and Barnstable. Straight advice from Michelle Lawton, CENTURY 21 North East.",
  path: "/cape-cod",
});

export default function CapeCodPage() {
  return (
    <>
      <PageHeader eyebrow="Cape Cod" title="Falmouth and the Upper Cape">
        <p>
          Falmouth, Mashpee, Bourne, and Barnstable. Each town is a little different, with its own things to check
          before you buy or sell.
        </p>
      </PageHeader>

      <Container>
        <h2 className="text-[2.2rem]">Falmouth</h2>
        <Rule className="mt-4" />
        <div className="mt-8 grid gap-12 md:grid-cols-3 md:gap-6">
          {villages.map((village) => (
            <FrameCard
              key={village.slug}
              href={village.path}
              kicker="Falmouth"
              title={village.name}
              summary={village.summary}
              image={placeImages[village.slug]}
            />
          ))}
        </div>
      </Container>

      <Container className="mt-20">
        <h2 className="text-[2.2rem]">Mashpee, Bourne, and Barnstable</h2>
        <Rule className="mt-4" />
        <div className="mt-8 grid gap-12 md:grid-cols-3 md:gap-6">
          {capeTowns.map((town) => (
            <FrameCard
              key={town.slug}
              href={town.path}
              kicker="Upper Cape"
              title={town.name}
              summary={town.summary}
              image={placeImages[town.slug]}
            />
          ))}
        </div>
      </Container>

      <Container className="mt-20">
        <div className="flex flex-col gap-8 border-t border-brass bg-navy px-6 py-10 text-salt sm:px-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-6">
            <Monogram className="hidden h-14 w-auto shrink-0 text-brass sm:block" />
            <div>
              <p className="font-serif text-[1.9rem] leading-tight text-salt">South Shore roots · Cape Cod homes</p>
              <p className="mt-2 max-w-xl text-salt/85">
                Selling a family place on the Cape, or moving here from off-Cape? Start with a phone call. No
                pressure.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-start gap-3 md:items-end">
            <ButtonLink href="/contact" variant="light">
              Talk with Michelle
            </ButtonLink>
            <a href={`tel:${site.phoneTel}`} className="font-semibold text-salt underline decoration-brass underline-offset-4">
              or call {site.phone}
            </a>
          </div>
        </div>
      </Container>
    </>
  );
}
