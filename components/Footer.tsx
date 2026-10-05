import Link from "next/link";
import { Container } from "./ui";
import { Monogram } from "./Monogram";
import { nav, site, telHref } from "@/lib/site";

// Footer brand block uses the yard-sign proportion from
// public/brand/03-home-hero.jpg: navy panel, thin brass frame, LC, name, region.
function SignMark() {
  return (
    <div className="aspect-[3/2] w-full max-w-[22rem] border border-brass/60 bg-navy p-2">
      <div className="flex h-full flex-col items-center justify-center border border-brass/80 px-4 text-center">
        <Monogram className="h-14 w-auto text-brass" />
        <p className="mt-4 font-serif text-[1.35rem] leading-none tracking-[0.14em] text-brass uppercase">
          {site.name}
        </p>
        <p className="mt-2.5 font-serif text-[1.05rem] text-salt/90">{site.region}</p>
      </div>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 bg-navy text-salt">
      <Container className="grid gap-12 py-16 md:grid-cols-[22rem_1fr] md:gap-16">
        <div>
          <SignMark />
          <p className="mt-6 font-serif text-xl text-salt italic">{site.line}</p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <p className="text-[0.78rem] font-semibold tracking-[0.18em] text-brass uppercase">Pages</p>
            <ul className="mt-4 space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-salt/85 hover:text-salt hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/market-report" className="text-salt/85 hover:text-salt hover:underline">
                  Market letter
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[0.78rem] font-semibold tracking-[0.18em] text-brass uppercase">Reach Michelle</p>
            <ul className="mt-4 space-y-2 text-salt/85">
              {site.phone ? (
                <li>
                  <a href={telHref(site.phone)} className="hover:text-salt hover:underline">
                    {site.phone}
                  </a>
                </li>
              ) : null}
              {site.email ? (
                <li>
                  <a href={`mailto:${site.email}`} className="hover:text-salt hover:underline">
                    {site.email}
                  </a>
                </li>
              ) : null}
              <li>
                <Link href="/contact" className="hover:text-salt hover:underline">
                  Send a note
                </Link>
              </li>
              <li>
                <Link href="/home-value" className="hover:text-salt hover:underline">
                  What is my home worth?
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-brass/40">
        <Container className="grid gap-4 py-8 text-[0.9rem] leading-relaxed text-salt/75 md:grid-cols-2 md:gap-10">
          <div className="space-y-1.5">
            <p>
              <span className="text-salt">{site.name}</span> · Real estate
            </p>
            <p data-slot="brokerage">
              Brokerage: <span className="text-salt">{site.brokerage}</span>
            </p>
            {site.license ? <p>Massachusetts license {site.license}</p> : null}
            <p>Equal Housing Opportunity.</p>
          </div>
          <div className="space-y-1.5 md:text-right">
            <p>
              The market letter is sent only to people who ask for it. To unsubscribe, reply to any letter
              or <Link href="/contact" className="underline hover:text-salt">send a note</Link> and you will be removed.
            </p>
            <p>
              <Link href="/privacy" className="underline hover:text-salt">Privacy</Link> · © {year} {site.brand}
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
