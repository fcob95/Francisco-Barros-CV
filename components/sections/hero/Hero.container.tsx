import { getTranslations } from "next-intl/server";

import { getProfile, pick, type Locale } from "@/lib/content";
import { Hero, type HeroCopy } from "@/components/sections/hero/Hero";

/**
 * Hero container (Server Component).
 *
 * Reads the profile from the content layer, resolves all hero + CTA copy via
 * getTranslations, locale-resolves the tagline/stats via `pick`, and assembles
 * the serializable `copy` bundle the presentational Hero consumes. The pillar
 * copy (titles/kickers/bullets) lives in messages/*.json under `hero.*`.
 */
export async function HeroContainer({ locale }: { locale: Locale }) {
  const profile = await getProfile();
  const t = await getTranslations("hero");
  const tCta = await getTranslations("cta");

  const copy: HeroCopy = {
    kicker: t("kicker"),
    available: t("available"),
    experienceAt: t("experienceAt"),
    pillarsLabel: t("pillarsLabel"),
    scroll: t("scroll"),
    viewProjects: tCta("viewProjects"),
    downloadCv: tCta("downloadCv"),
    contact: tCta("contact"),
    tagline: pick(locale, profile.tagline),
    stats: pick(locale, profile.stats),
    pillars: [
      {
        key: "pricing",
        title: t("pillar1"),
        short: t("pillar1Short"),
        kicker: t("pillar1Kicker"),
        bullets: [
          t("pillar1Bullet1"),
          t("pillar1Bullet2"),
          t("pillar1Bullet3"),
        ],
      },
      {
        key: "revenue",
        title: t("pillar2"),
        short: t("pillar2Short"),
        kicker: t("pillar2Kicker"),
        bullets: [
          t("pillar2Bullet1"),
          t("pillar2Bullet2"),
          t("pillar2Bullet3"),
        ],
      },
      {
        key: "ai",
        title: t("pillar3"),
        short: t("pillar3Short"),
        kicker: t("pillar3Kicker"),
        bullets: [
          t("pillar3Bullet1"),
          t("pillar3Bullet2"),
          t("pillar3Bullet3"),
        ],
      },
    ],
  };

  return <Hero profile={profile} locale={locale} copy={copy} />;
}
