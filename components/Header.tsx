import { Container, ButtonLink } from "./ui";
import { Lockup } from "./Lockup";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { mailHref, nav, site, telHref } from "@/lib/site";

export function Header() {
  return (
    <header className="relative z-30 border-b border-line bg-salt print:hidden">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-navy focus:px-4 focus:py-2 focus:text-salt"
      >
        Skip to content
      </a>
      <Container className="flex items-center justify-between gap-4 py-4 sm:py-6">
        <Lockup />
        <div className="hidden shrink-0 items-center gap-6 md:flex">
          <a
            href={telHref}
            aria-label={`Call Michelle at ${site.phone}`}
            className="text-[1.05rem] font-semibold tracking-wide whitespace-nowrap text-navy select-text hover:underline"
          >
            {site.phone}
          </a>
          <div className="hidden lg:block">
            <ButtonLink href="/contact" className="min-h-11 px-5">
              Talk with Michelle
            </ButtonLink>
          </div>
        </div>
        <MobileMenu
          items={nav}
          phone={site.phone}
          phoneHref={telHref}
          email={site.email}
          emailHref={mailHref}
        />
      </Container>
      <nav aria-label="Main" className="hidden border-t border-line md:block">
        <Container>
          <NavLinks items={nav} />
        </Container>
      </nav>
    </header>
  );
}
