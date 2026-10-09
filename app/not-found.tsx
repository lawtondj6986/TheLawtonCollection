import Link from "next/link";
import { Container, ButtonLink, Rule } from "@/components/ui";
import { site, telHref } from "@/lib/site";

const links = [
  { href: "/cape-cod", label: "Cape Cod" },
  { href: "/south-shore", label: "South Shore" },
  { href: "/how-it-works", label: "How buying and selling works" },
  { href: "/home-value", label: "What is my home worth?" },
];

export default function NotFound() {
  return (
    <Container className="py-20 text-center sm:py-24">
      <p className="eyebrow">Page not found</p>
      <h1 className="mt-4 text-5xl">That page isn&rsquo;t here.</h1>
      <Rule className="mx-auto mt-7" />
      <p className="mx-auto mt-7 max-w-xl text-lg text-ink/90">
        The link may be old or mistyped. You can call Michelle at{" "}
        <a href={telHref} className="link font-semibold">
          {site.phone}
        </a>
        , or try one of these:
      </p>
      <ul className="mx-auto mt-6 flex max-w-2xl flex-wrap justify-center gap-x-6 gap-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="link font-semibold">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <ButtonLink href="/">Back to home</ButtonLink>
      </div>
    </Container>
  );
}
