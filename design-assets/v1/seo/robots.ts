/**
 * seo/robots.ts
 *
 * Next.js App Router native robots. Place a re-export at `app/robots.ts`:
 *
 *   export { default } from "@/design-assets/v1/seo/robots";
 *
 * Next serves it at /robots.txt and automatically includes the sitemap line.
 */

import type { MetadataRoute } from "next";
import { abs } from "./site.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Keep internal/dev paths out of the index.
        disallow: ["/api/", "/_next/", "/draft/", "/preview"],
      },
    ],
    sitemap: abs("/sitemap.xml"),
    host: abs("/"),
  };
}
