import { getTranslations } from "next-intl/server";

import {
  getEducation,
  getExperience,
  getProfile,
  pick,
  type Locale,
} from "@/lib/content";
import {
  Experience,
  type EducationView,
  type ExperienceCopy,
  type ExperienceItemView,
} from "./Experience";

/**
 * Experience container (Server Component).
 *
 * Reads the experience timeline (most-recent first), the single education block
 * and the profile (for the CV link) from the content layer, locale-resolves every
 * `{ es, en }` field via `pick`, resolves chrome labels via getTranslations, and
 * hands a serializable view-model + copy bundle to the presentational Experience.
 * No content access or `t`/`L`/`pick` crosses the boundary.
 */
export async function ExperienceContainer({ locale }: { locale: Locale }) {
  const items = await getExperience();
  const education = await getEducation();
  const profile = await getProfile();

  const tSection = await getTranslations("section");
  const tCta = await getTranslations("cta");
  const tPeriod = await getTranslations("period");

  const itemsView: ExperienceItemView[] = items.map((it) => ({
    company: it.company,
    role: pick(locale, it.role),
    period: { start: it.period.start, end: it.period.end },
    location: it.location,
    summary: pick(locale, it.summary),
    highlights: it.highlights.map((h) => pick(locale, h)),
  }));

  const educationView: EducationView = {
    degree: pick(locale, education.degree),
    school: education.school,
    period: education.period,
    location: education.location,
    notes: education.notes.map((n) => pick(locale, n)),
  };

  const copy: ExperienceCopy = {
    title: tSection("experience"),
    educationLabel: tSection("education"),
    downloadCv: tCta("downloadCv"),
    present: tPeriod("present"),
  };

  return (
    <Experience
      items={itemsView}
      education={educationView}
      cvHref={profile.cvUrl[locale]}
      locale={locale}
      copy={copy}
    />
  );
}
