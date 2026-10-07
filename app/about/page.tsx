import { Container, ButtonLink, Rule } from "@/components/ui";
import { Monogram } from "@/components/Monogram";
import { pageMeta } from "@/lib/metadata";
import { mailHref, site, telHref } from "@/lib/site";
import { awards, designations } from "@/content/credentials";
import { Headshot } from "@/components/Headshot";

export const metadata = pageMeta({
  title: "About",
  description:
    "Michelle Lawton grew up on the South Shore. A Broker Associate with CENTURY 21 North East (SRES, ABR), she helps families buy and sell in Falmouth and the Upper Cape, and in Easton and Greater Brockton.",
  path: "/about",
});

// Quiet panel after public/brand/02-name-lockup.jpg (navy field mark).
function PrimaryMarkPanel() {
  return (
    <div className="flex aspect-[2/3] w-full flex-col items-center justify-center bg-navy px-6 text-center">
      <Monogram className="h-36 w-auto text-brass sm:h-44" />
      <p className="mt-10 font-serif text-[1.35rem] tracking-[0.16em] text-salt uppercase sm:text-[1.6rem]">
        {site.brand}
      </p>
      <p className="mt-3 font-serif text-[1.05rem] text-brass sm:text-[1.15rem]">
        {site.name} · {site.region}
      </p>
      <span aria-hidden className="mt-7 block h-px w-40 bg-brass/70" />
    </div>
  );
}

// Family card after public/brand/06-business-cards.jpg.
function FamilyCard() {
  return (
    <div className="mx-auto max-w-xl border border-line bg-white px-6 py-12 text-center text-navy sm:px-12">
      <Monogram className="mx-auto h-14 w-auto text-navy" />
      <p className="mt-5 font-serif text-[1.05rem] tracking-[0.18em] uppercase">{site.brand}</p>
      <span aria-hidden className="mx-auto mt-4 block h-px w-14 bg-navy/60" />
      <p className="mt-4 font-serif text-[2.6rem] leading-none">{site.name}</p>
      <p className="mt-2 font-serif text-[1.1rem] tracking-[0.2em]">real estate</p>
      <p className="mt-2 text-[0.8rem] tracking-[0.14em] text-ink/90 uppercase">
        {site.title} · {site.brokerage}
      </p>
      <span aria-hidden className="mx-auto mt-4 block h-px w-14 bg-navy/60" />
      <p className="mt-4 font-serif text-[1.3rem]">Cape Cod and the South Shore</p>
      <p className="mt-2 font-serif text-[1.3rem]">{site.native}</p>
      <span aria-hidden className="mx-auto mt-6 block h-px w-10 bg-brass" />
      <p className="mt-6 font-serif text-[1.15rem] leading-snug text-ink/90">
        Family counsel:
        <br />
        Richard Lawton, attorney,
        <br />
        real estate closings and estates,
        <br />
        Brockton.
      </p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <Container className="grid gap-12 pt-14 pb-16 sm:pt-20 md:grid-cols-[1fr_22rem] md:gap-16 lg:grid-cols-[1fr_26rem]">
        <div>
          <p className="eyebrow">About Michelle</p>
          <h1 className="mt-4 text-[2.6rem] sm:text-6xl">{site.line}</h1>
          <Rule className="mt-7" />
          <div className="prose-quiet mt-8 max-w-2xl text-lg text-ink/90">
            <p>
              I grew up on the South Shore. I learned early that a house is usually the biggest thing a family will
              ever buy, and that people deserve someone who will tell them the truth about it.
            </p>
            <p>
              Today I help people buy and sell in two places I know well. On Cape Cod, that&rsquo;s Falmouth and the
              Upper Cape: Mashpee, Bourne, and Barnstable. On the South Shore, it&rsquo;s Easton and Greater
              Brockton. Some of my clients are buying their first home. Some are selling a house that has been in the
              family for fifty years. Some are moving between the two. I give all of them the same thing: a clear
              plan, an honest price, and a phone that gets answered.
            </p>
            <p>
              I work with a lot of people who work shifts, including nurses, firefighters, police officers, and
              teachers. I plan around your schedule. And when a waterfront home comes my way, it gets the same care
              and the same straight talk as a three-bedroom ranch.
            </p>
          </div>
          <p className="mt-6 text-lg text-navy">
            Call{" "}
            <a href={telHref} className="link font-semibold select-text">
              {site.phone}
            </a>{" "}
            or email{" "}
            <a href={mailHref} className="link break-all select-text">
              {site.email}
            </a>
            .
          </p>

          <section aria-labelledby="credentials" className="mt-14 max-w-2xl">
            <h2 id="credentials" className="text-[1.9rem]">Credentials</h2>
            <p className="mt-3 text-ink/90">
              {site.title} with {site.brokerage}.
            </p>
            <dl className="mt-6 border-t border-line">
              {designations.map((d) => (
                <div key={d.short} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[6rem_1fr] sm:gap-6">
                  <dt className="font-serif text-[1.5rem] leading-none text-navy">{d.short}</dt>
                  <dd>
                    <span className="font-semibold text-navy">{d.name}.</span>{" "}
                    <span className="text-ink/90">{d.note}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <ul className="mt-6 space-y-1.5">
              {awards.map((a) => (
                <li key={a.name} className="flex gap-3 text-ink/90">
                  <span aria-hidden className="mt-[0.8em] h-px w-4 shrink-0 bg-brass" />
                  <span>
                    {a.name}, {a.years}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5">
              <a href={site.profileUrl} target="_blank" rel="noopener" className="link">
                See Michelle&rsquo;s CENTURY 21 profile<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
          </section>

          <div className="mt-12 max-w-2xl border-l-2 border-brass pl-6">
            <h2 className="text-[1.9rem]">Family counsel</h2>
            <p className="mt-3 text-ink/90">
              My husband, Richard Lawton, is an attorney in Brockton. He helps families with real estate closings and
              with estates, and some of my clients choose to work with him for that part of the process. You are
              always free to choose your own attorney. Richard is not a listing agent and is not part of my real
              estate business.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <ButtonLink href="/contact">Talk with Michelle</ButtonLink>
            <ButtonLink href="/home-value" variant="secondary">
              What is my home worth?
            </ButtonLink>
          </div>
        </div>

        <aside aria-label="Michelle Lawton" className="space-y-8 md:pt-4">
          <figure>
            <Headshot priority className="w-full max-w-[16rem]" />
            <figcaption className="mt-3 text-base text-ink/90">
              <span className="font-semibold text-navy">{site.name}</span>
              <br />
              {site.title}, {site.brokerage}
            </figcaption>
          </figure>
          <PrimaryMarkPanel />
        </aside>
      </Container>

      <section aria-label="Michelle's card" className="border-t border-line bg-sand/60 py-16 sm:py-20">
        <Container>
          <FamilyCard />
        </Container>
      </section>
    </>
  );
}
