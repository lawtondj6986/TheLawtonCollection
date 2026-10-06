import { mailHref, site, telHref } from "@/lib/site";

// Phones only: a fixed bar so calling Michelle is always one tap away.
export function CallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_auto] border-t border-brass bg-navy pb-[env(safe-area-inset-bottom)] md:hidden">
      <a
        href={telHref}
        className="flex min-h-14 items-center justify-center gap-2 text-[1.05rem] font-semibold text-salt"
      >
        <svg aria-hidden viewBox="0 0 24 24" className="size-5 fill-none stroke-brass-light" strokeWidth="1.8">
          <path d="M6.6 3.5h2.7l1.4 4-2 1.3a12 12 0 0 0 6.5 6.5l1.3-2 4 1.4v2.7a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />
        </svg>
        Call Michelle · {site.phone}
      </a>
      <a
        href={mailHref}
        className="flex min-h-14 items-center border-l border-salt/20 px-5 text-[1.05rem] font-semibold text-salt"
      >
        Email
      </a>
    </div>
  );
}
