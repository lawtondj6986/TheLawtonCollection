import Link from "next/link";
import { Container, PageHeader, ButtonLink, Rule } from "@/components/ui";
import { Photo } from "@/components/Photo";
import { brockton, southShoreTowns } from "@/content/places";
import { images } from "@/content/images";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "South Shore",
  description:
    "Brockton first, then Quincy, Plymouth, Abington, Whitman, and Bridgewater. Michelle Lawton helps South Shore families buy and sell with straight advice.",
  path: "/south-shore",
});

export default function SouthShorePage() {
  return (
    <>
      <PageHeader eyebrow="South Shore" title="Brockton first, and the towns around it">
        <p>
          This is home. Michelle grew up in Brockton and works across the South Shore, with first-time buyers,
          growing families, and people selling the house they were raised in.
        </p>
      </PageHeader>

      <Container>
        <Link href={brockton.path} className="group grid items-stretch border border-line bg-white md:grid-cols-2">
          <Photo src={images.southShoreStreet.src} alt={images.southShoreStreet.alt} aspect="aspect-[4/3] md:aspect-auto md:h-full md:min-h-[26rem]" position="object-[50%_45%]" sizes="(min-width: 768px) 50vw, 100vw" />
          <div className="flex flex-col justify-center p-7 sm:p-10">
            <p className="eyebrow">Hometown</p>
            <h2 className="mt-3 text-[2.6rem]">Brockton</h2>
            <Rule className="mt-5" />
            <p className="mt-5 text-ink/90">{brockton.summary}</p>
            <p className="mt-6 font-semibold text-navy">
              <span className="border-b border-brass/70 group-hover:border-navy">Read the Brockton page</span>
              <span aria-hidden> →</span>
            </p>
          </div>
        </Link>
      </Container>

      <Container className="mt-20">
        <h2 className="text-[2.2rem]">Also on the South Shore</h2>
        <ul className="mt-8 grid gap-x-10 border-t border-line sm:grid-cols-2">
          {southShoreTowns.map((town) => (
            <li key={town.name} className="border-b border-line py-5">
              <p className="font-serif text-[1.6rem] leading-tight text-navy">{town.name}</p>
              <p className="mt-1 text-ink/90">{town.note}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-base text-shingle-deep">
          No market statistics here on purpose. Ask about a specific town or street and Michelle will send you
          current, real numbers.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/contact">Talk with Michelle</ButtonLink>
          <ButtonLink href="/home-value" variant="secondary">
            What is my home worth?
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
