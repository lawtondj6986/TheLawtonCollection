import { MONOGRAM_PATH, MONOGRAM_VIEWBOX } from "@/lib/monogram";

type Props = {
  className?: string;
  title?: string;
};

// Brass on navy, navy on cream: set the color with a text-* class.
export function Monogram({ className, title }: Props) {
  return (
    <svg
      viewBox={MONOGRAM_VIEWBOX}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={MONOGRAM_PATH} fillRule="evenodd" />
    </svg>
  );
}
