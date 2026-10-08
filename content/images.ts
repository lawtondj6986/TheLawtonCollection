// Site photography, cropped from the brand references in public/brand/.
// The originals keep their filenames; crops live in public/brand/crops/.
// These are direction images, never presented as a listing.

export const images = {
  hero: {
    src: "/brand/crops/hero-twilight.jpg",
    alt: "Gray-shingled home at twilight with every window lit, two blue chairs on the front porch, and a curved driveway across the lawn",
  },
  shinglePorch: {
    src: "/brand/crops/hero-shingle-porch.jpg",
    alt: "Gray cedar-shingle house with a white front porch, hydrangeas in bloom along the sidewalk, late-afternoon light",
  },
  southShoreStreet: {
    src: "/brand/crops/south-shore-street.jpg",
    alt: "South Shore colonial with a lit front porch on a tree-lined street, early evening",
  },
  capeShore: {
    src: "/brand/crops/cape-shore.jpg",
    alt: "Weathered shingle cape above a rocky Cape Cod shoreline, a small dock on the water at sunset",
  },
  porch: {
    src: "/brand/crops/porch-hydrangeas.jpg",
    alt: "Front porch with white railings and a wooden planter of blue hydrangeas beside a navy door",
  },
  colonialStreet: {
    src: "/brand/crops/colonial-street-autumn.jpg",
    alt: "Quiet residential street in autumn, a maple dropping leaves over the sidewalk and older homes beyond",
  },
} as const;

export const placeImages: Record<string, { src: string; alt: string; position: string }> = {
  "woods-hole": { ...images.capeShore, position: "object-[30%_55%]" },
  "quissett-sippewissett": { ...images.porch, position: "object-[60%_50%]" },
  "west-falmouth": { ...images.shinglePorch, position: "object-[75%_60%]" },
  brockton: { ...images.colonialStreet, position: "object-[50%_60%]" },
  easton: { ...images.southShoreStreet, position: "object-[50%_40%]" },
};
