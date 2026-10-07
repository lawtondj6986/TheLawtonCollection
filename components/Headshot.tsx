import Image from "next/image";

// Michelle's headshot. The source file is small (211 x 321), so it is shown
// at modest sizes only; replace public/brand/michelle-lawton-headshot.jpg with
// a larger original when one is available.
export const HEADSHOT = {
  src: "/brand/michelle-lawton-headshot.jpg",
  width: 211,
  height: 321,
  alt: "Michelle Lawton, smiling, arms folded, outdoors with the water behind her",
};

export function Headshot({ className = "", priority }: { className?: string; priority?: boolean }) {
  return (
    <div className={`border border-brass/70 bg-white p-1.5 ${className}`}>
      <Image
        src={HEADSHOT.src}
        alt={HEADSHOT.alt}
        width={HEADSHOT.width}
        height={HEADSHOT.height}
        preload={priority}
        sizes="(min-width: 640px) 240px, 180px"
        className="block h-auto w-full"
      />
    </div>
  );
}
