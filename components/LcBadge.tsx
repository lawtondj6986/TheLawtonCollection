import { Monogram } from "./Monogram";

// The small navy card with a gold LC and a thin gold frame, as on the
// two-shores photographs. Decorative.
export function LcBadge({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`aspect-square bg-navy p-1 shadow-[0_1px_2px_rgba(11,31,51,0.3)] ${className}`}>
      <div className="flex h-full w-full items-center justify-center border border-brass/80">
        <Monogram className="h-[58%] w-auto text-brass" />
      </div>
    </div>
  );
}
