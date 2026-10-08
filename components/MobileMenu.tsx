"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

type Item = { href: string; label: string };

type Props = {
  items: readonly Item[];
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
};

export function MobileMenu({ items, phone, phoneHref, email, emailHref }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-11 shrink-0 items-center gap-2 border border-navy/30 px-3 text-sm font-semibold tracking-wide text-navy"
      >
        <span className="max-[379px]:sr-only">{open ? "Close" : "Menu"}</span>
        <span aria-hidden className="flex w-4 flex-col gap-[3px]">
          <span className={`h-px bg-navy transition ${open ? "translate-y-[4px] rotate-45" : ""}`} />
          <span className={`h-px bg-navy transition ${open ? "opacity-0" : ""}`} />
          <span className={`h-px bg-navy transition ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
        </span>
      </button>
      <nav
        id={panelId}
        aria-label="Main"
        hidden={!open}
        className="absolute inset-x-0 top-full z-40 border-y border-line bg-salt px-5 pb-6 shadow-[0_12px_24px_-18px_rgba(11,31,51,0.35)]"
      >
        <ul className="divide-y divide-line">
          {items.map((item) => {
            const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={`block py-3.5 text-lg ${current ? "font-semibold text-navy" : "text-ink"}`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-2 space-y-1 border-t border-line pt-4">
          <a href={phoneHref} className="block py-1.5 text-lg font-semibold text-navy select-text">
            {phone}
          </a>
          <a href={emailHref} className="block py-1.5 text-[1.02rem] break-all text-navy select-text">
            {email}
          </a>
          <a href="/michelle-lawton.vcf" download className="block py-1.5 text-[1.02rem] text-navy underline decoration-brass underline-offset-4">
            Save Michelle&rsquo;s contact
          </a>
        </div>
        <Link
          href="/contact"
          className="mt-4 flex min-h-12 items-center justify-center bg-navy font-semibold text-salt"
        >
          Talk with Michelle
        </Link>
      </nav>
    </div>
  );
}
