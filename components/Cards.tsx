import Link from "next/link";
import { Photo } from "./Photo";
import { Monogram } from "./Monogram";
import type { Listing } from "@/content/listings";
import { statusLabel } from "@/content/listings";
import { formatPrice } from "@/lib/listings";

// Village card, after the social frame (public/brand/07-yard-sign.jpg):
// photograph above, navy band with a brass rule, the name, and a small LC.
export function FrameCard({
  href,
  title,
  kicker,
  summary,
  image,
}: {
  href: string;
  title: string;
  kicker: string;
  summary: string;
  image: { src: string; alt: string; position?: string };
}) {
  return (
    <Link href={href} className="group block focus-visible:outline-offset-4">
      <Photo src={image.src} alt={image.alt} position={image.position} aspect="aspect-[4/3]" sizes="(min-width: 768px) 33vw, 100vw" />
      <div className="flex items-center justify-between gap-4 border-t border-brass bg-navy px-5 py-4">
        <div>
          <p className="text-[0.8rem] font-semibold tracking-[0.18em] text-brass uppercase">{kicker}</p>
          <h3 className="mt-1 text-[1.65rem] leading-tight text-salt">{title}</h3>
        </div>
        <Monogram className="h-8 w-auto shrink-0 text-brass" />
      </div>
      <p className="mt-4 text-ink/90">{summary}</p>
      <p className="mt-3 font-semibold text-navy">
        <span className="border-b border-brass/70 group-hover:border-navy">Read the local note</span>
        <span aria-hidden> →</span>
      </p>
    </Link>
  );
}

export function SampleBadge() {
  return (
    <span className="inline-block border border-[#9b2c2c] bg-white px-2 py-0.5 text-[0.8rem] font-bold tracking-[0.16em] text-[#9b2c2c]">
      SAMPLE
    </span>
  );
}

export function ListingCard({ listing }: { listing: Listing }) {
  const place = listing.village ? `${listing.village}, ${listing.town}` : listing.town;
  return (
    <Link href={`/collection/${listing.slug}`} className="group block border border-line bg-white">
      <div className="relative">
        <Photo src={listing.photo} alt={listing.photoAlt} aspect="aspect-[3/2]" sizes="(min-width: 768px) 50vw, 100vw" />
        {listing.sample ? (
          <div className="absolute top-3 left-3">
            <SampleBadge />
          </div>
        ) : null}
      </div>
      <div className="p-5 sm:p-6">
        <p className="text-[0.8rem] font-semibold tracking-[0.18em] text-brass-deep uppercase">
          {statusLabel[listing.status]} · {place}
        </p>
        <p className="mt-2 font-serif text-[1.9rem] leading-none text-navy">{formatPrice(listing.price)}</p>
        <p className="mt-2 text-ink/90">
          {listing.beds} bedrooms · {listing.baths} baths
        </p>
        <p className="mt-3 line-clamp-3 text-base text-ink/90">{listing.description}</p>
        <p className="mt-4 font-semibold text-navy">
          <span className="border-b border-brass/70 group-hover:border-navy">See the house</span>
          <span aria-hidden> →</span>
        </p>
      </div>
    </Link>
  );
}
