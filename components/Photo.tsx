import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

type Props = {
  src?: string;
  alt: string;
  /** Tailwind aspect class, e.g. "aspect-[4/3]". */
  aspect?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** Tailwind object-position class for real photos, e.g. "object-[70%_50%]". */
  position?: string;
};

// Staggered courses of cedar shingles, drawn as a faint repeating texture.
const SHINGLES = `url("data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="22"><path d="M0 21.5H36M0 10.75H36M.5 0V10.75M18.5 0V10.75M9.5 10.75V21.5M27.5 10.75V21.5" fill="none" stroke="#8A847C" stroke-opacity=".28"/></svg>',
)}")`;

function exists(src?: string) {
  if (!src || !src.startsWith("/")) return false;
  try {
    return fs.existsSync(path.join(process.cwd(), "public", src));
  } catch {
    return false;
  }
}

// Shows the real photo when the file is in /public. Until then it renders a
// quiet shingle-textured placeholder that describes the photo to shoot, so
// the photography direction lives on the page and in the alt text.
export function Photo({ src, alt, aspect = "aspect-[4/3]", className = "", priority, sizes, position = "object-center" }: Props) {
  if (exists(src)) {
    return (
      <div className={`relative overflow-hidden bg-sand ${aspect} ${className}`}>
        <Image
          src={src!}
          alt={alt}
          fill
          preload={priority}
          fetchPriority={priority ? "high" : undefined}
          sizes={sizes ?? "(min-width: 1024px) 50vw, 100vw"}
          className={`object-cover ${position}`}
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Photo to come: ${alt}`}
      className={`relative overflow-hidden bg-sand ${aspect} ${className}`}
    >
      <div aria-hidden className="absolute inset-0" style={{ backgroundImage: SHINGLES }} />
      <div className="absolute inset-x-0 bottom-0 border-t border-line bg-sand px-5 py-4">
        <p className="eyebrow text-[0.8rem]">Photograph to come</p>
        <p className="mt-1 max-w-md font-serif text-lg leading-snug text-navy italic">{alt}</p>
      </div>
    </div>
  );
}
