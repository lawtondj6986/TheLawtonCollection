import { Container, PageHeader, ButtonLink } from "@/components/ui";
import { FrameCard } from "@/components/Cards";
import { Monogram } from "@/components/Monogram";
import { villages } from "@/content/places";
import { placeImages } from "@/content/images";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Cape Cod",
  description:
    "Falmouth and the Upper Cape: Woods Hole, Quissett and Sippewissett, and West Falmouth. Local notes and straight advice from Michelle Lawton.",
  path: "/cape-cod",
});

export default function CapeCodPage() {
  return (
    <>
      <PageHeader eyebrow="Cape Cod" title="Falmouth and the Upper Cape">
        <p>
          Michelle works mostly in Falmouth. Each village is a little different, with its own things to check
          before you buy or sell.
        </p>
      </PageHeader>

      <Container>
        <div className="grid gap-12 md:grid-cols-3 md:gap-6">
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
        <div className="flex flex-col gap-8 border-t border-brass bg-navy px-6 py-10 text-salt sm:px-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-6">
            <Monogram className="hidden h-14 w-auto shrink-0 text-brass sm:block" />
            <div>
              <p className="font-serif text-[1.9rem] leading-tight text-salt">Brockton roots · Cape Cod homes</p>
              <p className="mt-2 max-w-xl text-salt/85">
                Selling a family place on the Cape, or moving here from off-Cape? Start with a phone call. No
                pressure.
              </p>
            </div>
          </div>
          <ButtonLink href="/contact" variant="light" className="shrink-0">
            Talk with Michelle
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
