import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // /brand/0* are the original design references (one shows a placeholder
    // phone number); keep them out of search results. Crops stay indexable.
    rules: { userAgent: "*", allow: "/", disallow: ["/thank-you", "/brand/0"] },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
