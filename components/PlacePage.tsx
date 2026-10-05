import Link from "next/link";
import { Container, Rule } from "./ui";
import { Photo } from "./Photo";
import { LeadForm } from "./LeadForm";
import { marketLabel, type Place } from "@/content/places";
import { placeImages } from "@/content/images";

// Shared layout for the village pages and the Brockton page: a short local
// note, who the page is for, and a form. No prices, ratings, or statistics.
export function PlacePage({ place }: { place: Place }) {
  const parent = place.market === "cape" ? { href: "/cape-cod", label: "Cape Cod" } : { href: "/south-shore", label: "South Shore" };
  const image = placeImages[place.slug];

  return (
    <>
      <Container className="pt-10 sm:pt-14">
        <nav aria-label="Breadcrumb" className="text-[0.92rem] text-shingle-deep">
          <Link href={parent.href} className="link">
            {parent.label}
          </Link>
          <span aria-hidden className="mx-2">/</span>
          <span aria-current="page">{place.name}</span>
        </nav>
        <p className="eyebrow mt-8">
          {place.town === place.name ? marketLabel[place.market] : `${place.town} · ${marketLabel[place.market]}`}
        </p>
        <h1 className="mt-4 text-[2.8rem] sm:text-6xl">{place.name}</h1>
        <Rule className="mt-7" />
        <p className="mt-7 max-w-2xl text-lg text-ink/85">{place.summary}</p>
      </Container>

      {image ? (
        <Container className="mt-10">
          <Photo
            src={image.src}
            alt={image.alt}
            position={image.position}
            aspect="aspect-[16/9] md:aspect-[21/8]"
            sizes="(min-width: 1152px) 1152px, 100vw"
          />
        </Container>
      ) : null}

      <Container className="mt-14 grid gap-14 md:grid-cols-[1fr_24rem] lg:grid-cols-[1fr_27rem] lg:gap-20">
        <div className="space-y-12">
          <section aria-labelledby="note">
            <h2 id="note" className="text-[2rem]">A local note</h2>
            <div className="prose-quiet mt-4 text-ink/90">
              {place.localNote.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section aria-labelledby="for">
            <h2 id="for" className="text-[2rem]">Who this page is for</h2>
            <ul className="mt-4 space-y-3">
              {place.forWhom.map((item) => (
                <li key={item} className="flex gap-3 text-ink/90">
                  <span aria-hidden className="mt-[0.8em] h-px w-4 shrink-0 bg-brass" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="ask">
            <h2 id="ask" className="text-[2rem]">Worth asking about</h2>
            <ul className="mt-4 space-y-3">
              {place.askAbout.map((item) => (
                <li key={item} className="flex gap-3 text-ink/90">
                  <span aria-hidden className="mt-[0.8em] h-px w-4 shrink-0 bg-brass" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[0.95rem] text-shingle-deep">
              You won&rsquo;t find price averages or school ratings on this page. Numbers like that change by the
              street and by the month. Ask, and Michelle will give you current figures for the homes you care about.
            </p>
          </section>
        </div>

        <aside aria-labelledby="ask-michelle" className="md:sticky md:top-6 md:self-start">
          <div className="border border-line bg-white p-6 sm:p-8">
            <h2 id="ask-michelle" className="text-[1.9rem]">Ask Michelle about {place.name}</h2>
            <p className="mt-2 text-[0.98rem] text-ink/80">Buying, selling, or just curious. She&rsquo;ll get back to you herself.</p>
            <div className="mt-6">
              <LeadForm kind="place" source={place.path} market={place.market} town={place.town} />
            </div>
          </div>
        </aside>
      </Container>
    </>
  );
}
