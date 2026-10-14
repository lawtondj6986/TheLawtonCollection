import type { MetadataRoute } from "next";

// Lets the site (and the command center) be added to a phone's home screen
// with the LC icon and a short name, like an app.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Lawton Collection",
    short_name: "Lawton Collection",
    description: "Michelle Lawton · Real Estate on Cape Cod & the South Shore",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F4EE",
    theme_color: "#0B1F33",
    icons: [
      { src: "/icon", sizes: "64x64", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
      { src: "/icon-512", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
