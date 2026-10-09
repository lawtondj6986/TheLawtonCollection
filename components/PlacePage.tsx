import Link from "next/link";
import { Container, Rule } from "./ui";
import { Photo } from "./Photo";
import { Monogram } from "./Monogram";
import { LeadForm } from "./LeadForm";
import { marketLabel, type Place } from "@/content/places";
import { placeImages } from "@/content/images";
import { site } from "@/lib/site";

// Shared layout for the village and town pages: a short local
// note, who the page is for, and a form. No prices, ratings, or statistics.
export function PlacePage({ place }: { place: Place }) {
  const parent = place.market === "cape" ? { href: "/cape-cod", label: "Cape Cod" } : { href: "/south-shore", label: "South Shore" };
  const image = placeImages[place.slug];

  // Breadcrumb data so search results can show "Cape Cod › Mashpee".
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: parent.label, item: `${site.url}${parent.href}` },
      { "@type": "ListItem", position: 3, name: place.name, item: `${site.url}${place.path}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, "\\u003c") }}
      />
      <Container className="pt-10 sm:pt-14">
        <nav aria-label="Breadcrumb" className="text-base text-shingle-deep">
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
        <p className="mt-7 max-w-2xl text-lg text-ink/90">{place.summary}</p>
      </Container>

      <Container className="mt-10">
        {image ? (
          <Photo
            src={image.src}
            alt={image.alt}
            position={image.position}
            aspect="aspect-[16/9] md:aspect-[21/8]"
            priority
            sizes="(min-width: 1152px) 1152px, 100vw"
          />
        ) : (
          <div className="flex items-center gap-6 border-b border-brass bg-navy px-6 py-8 sm:px-10">
            <Monogram className="h-14 w-auto shrink-0 text-brass sm:h-20" />
            <p className="font-serif text-[1.6rem] leading-tight text-salt sm:text-[2.2rem]">
              {place.name} <span className="text-brass">·</span> {marketLabel[place.market]}
            </p>
          </div>
        )}
      </Container>

      <Container className="mt-14 grid gap-14 md:grid-cols-[minmax(0,1fr)_24rem] lg:grid-cols-[minmax(0,1fr)_27rem] lg:gap-20">
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
            <h2 id="for" className="text-[2rem]">A good fit for</h2>
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
            <h2 id="ask" className="text-[2rem]">Things to ask about</h2>
            <ul className="mt-4 space-y-3">
              {place.askAbout.map((item) => (
                <li key={item} className="flex gap-3 text-ink/90">
                  <span aria-hidden className="mt-[0.8em] h-px w-4 shrink-0 bg-brass" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-base text-shingle-deep">
              You won&rsquo;t find price averages or school ratings here. They change street by street and month by
              month. Ask, and Michelle will give you real numbers for the homes you care about.
            </p>
            <p className="mt-4">
              <Link href="/how-it-works" className="link font-semibold">
                How buying and selling works, step by step
              </Link>
            </p>
          </section>
        </div>

        <aside aria-labelledby="ask-michelle" className="md:sticky md:top-6 md:self-start">
          <div className="border border-line bg-white p-6 sm:p-8">
            <h2 id="ask-michelle" className="text-[1.9rem]">Ask Michelle about {place.name}</h2>
            <p className="mt-2 text-base text-ink/90">Buying, selling, or just curious. She&rsquo;ll get back to you herself.</p>
            <div className="mt-6">
              <LeadForm kind="place" source={place.path} market={place.market} town={place.town} />
            </div>
          </div>
        </aside>
      </Container>
    </>
  );
}
