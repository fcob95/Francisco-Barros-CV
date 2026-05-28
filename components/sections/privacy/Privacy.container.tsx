import { getTranslations } from "next-intl/server";

import { Privacy, type PrivacyCopy } from "./Privacy";

/**
 * Privacy container (Server Component).
 *
 * Resolves all prose via getTranslations (`privacy.*`) and hands a serializable
 * copy bundle to the presentational Privacy. No content access and no `pick`
 * needed: the page is static prose entirely in messages, and getTranslations
 * resolves the active request locale on its own (set upstream in the page via
 * setRequestLocale), so no `locale` prop is required here.
 */
export async function PrivacyContainer() {
  const t = await getTranslations("privacy");

  const copy: PrivacyCopy = {
    kicker: t("kicker"),
    title: t("title"),
    analytics: t("analytics"),
    cookies: t("cookies"),
    contactForm: t("contactForm"),
    back: t("back"),
  };

  return <Privacy copy={copy} />;
}
