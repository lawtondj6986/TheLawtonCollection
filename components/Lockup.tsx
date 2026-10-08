import Link from "next/link";
import { Monogram } from "./Monogram";
import { site } from "@/lib/site";

// Header lockup, after public/brand/01-primary-mark.jpg (cream name lockup):
// monogram, MICHELLE LAWTON, the collection line, a short rule, "South Shore native".
// Name first: it is the largest type in the lockup. Per Michelle, the lines
// under the name are set larger and roomier than the reference's small caps.
export function Lockup() {
  return (
    <Link
      href="/"
      className="inline-flex min-w-0 items-center gap-2.5 sm:gap-5"
    >
      <Monogram className="h-9 w-auto shrink-0 text-navy sm:h-[4.8rem]" />
      <span className="flex min-w-0 flex-col items-start">
        <span className="font-serif text-[0.95rem] leading-none font-semibold tracking-[0.07em] whitespace-nowrap min-[380px]:text-[1.1rem] min-[380px]:tracking-[0.1em] text-navy uppercase sm:text-[1.85rem] sm:tracking-[0.12em]">
          {site.name}
        </span>
        <span className="mt-2.5 hidden font-serif text-[1.1rem] leading-none whitespace-nowrap text-navy sm:block">
          <span className="italic">{site.brand}</span> · {site.region}
        </span>
        <span aria-hidden className="mt-3 hidden h-px w-20 bg-brass sm:block" />
        <span className="mt-2.5 hidden font-serif text-[1.05rem] leading-none tracking-[0.06em] text-navy sm:block">
          {site.native}
        </span>
      </span>
    </Link>
  );
}
