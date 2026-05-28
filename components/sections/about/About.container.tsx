import { getTranslations } from "next-intl/server";

import { getProfile, getSkills, pick, type Locale } from "@/lib/content";
import { About, type AboutCopy, type SkillClusterView } from "./About";

/**
 * About container (Server Component).
 *
 * Reads the profile + skill clusters from the content layer, locale-resolves
 * every `{ es, en }` field via `pick`, resolves all chrome labels via
 * getTranslations, and hands a serializable view-model + copy bundle to the
 * presentational About. No content access or `t`/`L`/`pick` crosses the boundary.
 *
 * Skill order in the array is the visual order (4 expected).
 */
export async function AboutContainer({ locale }: { locale: Locale }) {
  const profile = await getProfile();
  const skills = await getSkills();

  const tAbout = await getTranslations("about");
  const tSection = await getTranslations("section");
  const tCta = await getTranslations("cta");

  const skillsView: SkillClusterView[] = skills.map((cluster) => ({
    title: pick(locale, cluster.title),
    items: cluster.items,
  }));

  const copy: AboutCopy = {
    whoIAm: tAbout("whoIAm"),
    lead: tAbout("lead"),
    context: tAbout("context"),
    headline: pick(locale, profile.headline),
    bio: pick(locale, profile.bio),
    yearsExperience: tAbout("yearsExperience"),
    skillsLabel: tSection("skills"),
    downloadCv: tCta("downloadCv"),
    contact: tCta("contact"),
  };

  return (
    <About
      profile={profile}
      skills={skillsView}
      locale={locale}
      avatarAlt={pick(locale, profile.avatar.alt)}
      copy={copy}
    />
  );
}
