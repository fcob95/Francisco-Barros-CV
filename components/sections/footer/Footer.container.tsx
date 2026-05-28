import { getTranslations } from "next-intl/server";

import { getProfile, type Locale } from "@/lib/content";
import { Footer } from "@/components/sections/footer/Footer";

/**
 * Footer container (Server Component).
 *
 * Reads the profile from the content layer, resolves footer copy via
 * getTranslations, composes the static meta line, and hands serializable props
 * to the presentational Footer. No client hooks here.
 */
export async function FooterContainer({ locale }: { locale: Locale }) {
  const profile = await getProfile();
  const t = await getTranslations("footer");
  const tCta = await getTranslations("cta");

  // Meta line, e.g. "FB · Santiago — 2026". City derives from profile.location
  // ("Santiago, Chile" → "Santiago"); the year is the current calendar year so
  // the footer does not go stale.
  const city = profile.location.split(",")[0]?.trim() ?? profile.location;
  const initials = profile.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
  const metaLine = `${initials} · ${city} — ${new Date().getFullYear()}`;

  return (
    <Footer
      profile={profile}
      locale={locale}
      metaLine={metaLine}
      copy={{
        kicker: t("kicker"),
        manifesto: t("manifesto"),
        downloadCv: tCta("downloadCv"),
        built: t("built"),
        privacy: t("privacy"),
        cookies: t("cookies"),
      }}
    />
  );
}
