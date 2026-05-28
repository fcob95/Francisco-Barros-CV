import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo/site";

/**
 * robots.txt. Public site — allow all crawlers everywhere, and point them at
 * the sitemap (absolute URL, derived from NEXT_PUBLIC_SITE_URL). No staging
 * noindex needed (handled at the Vercel/deploy layer if ever required).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
