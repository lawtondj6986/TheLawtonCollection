"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = { href: string; label: string };

export function NavLinks({ items }: { items: readonly Item[] }) {
  const pathname = usePathname();
  return (
    <ul className="flex flex-wrap items-center gap-x-7 gap-y-1 lg:gap-x-9">
      {items.map((item) => {
        const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={current ? "page" : undefined}
              className={`inline-block border-b py-3 text-base tracking-wide transition-colors ${
                current
                  ? "border-brass font-semibold text-navy"
                  : "border-transparent text-ink/90 hover:border-brass/60 hover:text-navy"
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
