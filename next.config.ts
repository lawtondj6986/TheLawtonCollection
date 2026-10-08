import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // The /og share-image route reads these fonts at request time.
  outputFileTracingIncludes: {
    "/og": ["./assets/fonts/**"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
