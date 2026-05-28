import type { Metadata } from "next";

import type { Locale } from "@/lib/content";
import { absoluteUrl, languageAlternates } from "@/lib/seo/site";

/**
 * DRY page-metadata builder. Every page calls this from its `generateMetadata`
 * so the canonical + hreflang + OG/twitter wiring stays in one place and is
 * impossible to get inconsistent across pages.
 *
 * - `canonical` is the absolute URL of the current (path, locale).
 * - `alternates.languages` carries the hreflang map (es / en / x-default).
 * - `openGraph` / `twitter` inherit the locale, type and (optional) per-page
 *   image. When `image` is omitted the route-level `opengraph-image` convention
 *   supplies the default card, so we never set a broken/empty image here.
 */
export interface PageMetadataInput {
  title: string;
  description: string;
  /** Logical path (locale-agnostic), e.g. "/projects" or "/". */
  path: string;
  locale: Locale;
  /** Absolute OG/twitter image URL. Omit to let `opengraph-image.tsx` apply. */
  image?: string;
  /** `website` (default) or `article` for project detail pages. */
  ogType?: "website" | "article";
}

const OG_LOCALE: Record<Locale, string> = {
  es: "es_CL",
  en: "en_US",
};

export function buildPageMetadata({
  title,
  description,
  path,
  locale,
  image,
  ogType = "website",
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path, locale);
  const images = image ? [{ url: image, width: 1200, height: 630 }] : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      type: ogType,
      url,
      title,
      description,
      locale: OG_LOCALE[locale],
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(images ? { images } : {}),
    },
  };
}
