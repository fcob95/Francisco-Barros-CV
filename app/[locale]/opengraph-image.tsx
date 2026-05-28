import { getProfile, type Locale } from "@/lib/content";
import { SITE_URL } from "@/lib/seo/site";
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  defaultOgSubtitle,
  renderOgImage,
} from "@/lib/seo/og/render";

/**
 * Default site OG image (1200 × 630), one per locale via the `[locale]`
 * segment. Next.js wires the output into `openGraph.images` / `twitter.images`
 * for every page under this layout automatically (App Router file convention),
 * so per-page metadata does not need to set a default image.
 *
 * Node runtime (default): `lib/seo/og/fonts.ts` reads bundled binaries via
 * `node:fs`, which the edge runtime does not allow.
 */
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return (["es", "en"] satisfies Locale[]).map((locale) => ({ locale }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const profile = await getProfile();

  return renderOgImage({
    profile,
    locale,
    subtitle: defaultOgSubtitle(profile, locale),
    displayUrl: SITE_URL.replace(/^https?:\/\//, ""),
  });
}
