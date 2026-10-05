import Link from "next/link";
import { Monogram } from "./Monogram";
import { site } from "@/lib/site";

// Header lockup, after public/brand/01-primary-mark.jpg (cream name lockup):
// monogram, MICHELLE LAWTON, the collection line, a short rule, "Brockton native".
// Name first: it is the largest type in the lockup.
export function Lockup() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-3 sm:gap-5"
      aria-label={`${site.name}, ${site.brand}, home`}
    >
      <Monogram className="h-10 w-auto shrink-0 text-navy sm:h-[4.6rem]" />
      <span className="flex min-w-0 flex-col items-start">
        <span className="font-serif text-[1.12rem] leading-none font-semibold tracking-[0.1em] whitespace-nowrap text-navy uppercase sm:text-[2.15rem] sm:tracking-[0.14em]">
          {site.name}
        </span>
        <span className="mt-2 hidden font-serif text-[0.8rem] leading-none tracking-[0.16em] whitespace-nowrap text-navy uppercase sm:block">
          {site.brand} · {site.region}
        </span>
        <span aria-hidden className="mt-2.5 hidden h-px w-24 self-center bg-navy/70 sm:block" />
        <span className="mt-2 hidden self-center font-serif text-[0.92rem] leading-none tracking-[0.12em] text-navy sm:block">
          Brockton native
        </span>
      </span>
    </Link>
  );
}
