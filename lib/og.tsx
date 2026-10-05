import { readFile } from "node:fs/promises";
import path from "node:path";
import { MONOGRAM_HEIGHT, MONOGRAM_PATH, MONOGRAM_VIEWBOX, MONOGRAM_WIDTH } from "./monogram";

// Shared pieces for generated images (favicon, Open Graph). Colors follow
// public/brand/02-name-lockup.jpg: harbor navy field, brass LC, cream type.

export const NAVY = "#0B1F33";
export const BRASS = "#A6854E";
export const SALT = "#F7F4EE";

export function MonogramArt({ height, color = BRASS }: { height: number; color?: string }) {
  const width = Math.round((height * MONOGRAM_WIDTH) / MONOGRAM_HEIGHT);
  return (
    <svg width={width} height={height} viewBox={MONOGRAM_VIEWBOX}>
      <path d={MONOGRAM_PATH} fill={color} fillRule="evenodd" />
    </svg>
  );
}

export async function loadOgFonts() {
  const dir = path.join(process.cwd(), "assets", "fonts");
  const [regular, italic] = await Promise.all([
    readFile(path.join(dir, "cormorant-garamond-500.woff")),
    readFile(path.join(dir, "cormorant-garamond-500-italic.woff")),
  ]);
  return [
    { name: "Cormorant", data: regular, weight: 500 as const, style: "normal" as const },
    { name: "Cormorant", data: italic, weight: 500 as const, style: "italic" as const },
  ];
}
