import { mailHref, site, smsHref, telHref } from "@/lib/site";

// Phones only: a fixed bar so calling, texting, or emailing Michelle is
// always one tap away.
export function CallBar() {
  const side = "flex min-h-14 items-center justify-center gap-1.5 border-l border-salt/20 px-4 text-base font-semibold text-salt";
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_auto_auto] border-t border-brass bg-navy pb-[env(safe-area-inset-bottom)] md:hidden">
      <a
        href={telHref}
        aria-label={`Call Michelle at ${site.phone}`}
        className="flex min-h-14 items-center justify-center gap-2 text-base font-semibold text-salt"
      >
        <svg aria-hidden viewBox="0 0 24 24" className="size-5 shrink-0 fill-none stroke-brass-light" strokeWidth="1.8">
          <path d="M6.6 3.5h2.7l1.4 4-2 1.3a12 12 0 0 0 6.5 6.5l1.3-2 4 1.4v2.7a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />
        </svg>
        <span>
          Call <span className="whitespace-nowrap">{site.phone}</span>
        </span>
      </a>
      <a href={smsHref} aria-label={`Text Michelle at ${site.phone}`} className={side}>
        <svg aria-hidden viewBox="0 0 24 24" className="size-5 shrink-0 fill-none stroke-brass-light" strokeWidth="1.8">
          <path d="M4 5h16v11H9l-5 4V5Z" strokeLinejoin="round" />
        </svg>
        Text
      </a>
      <a href={mailHref} aria-label="Email Michelle" className={side}>
        Email
      </a>
    </div>
  );
}
