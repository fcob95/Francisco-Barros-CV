import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";

import type { CookieBannerCopy } from "@/components/sections/cookie-banner/CookieBanner";
import { AnalyticsProvider } from "./AnalyticsProvider";

/**
 * Analytics container (Server Component).
 *
 * Resolves the `cookies.*` banner copy for the active locale and hands the
 * serializable bundle to the client AnalyticsProvider. Wrapping the app's
 * children here keeps i18n resolution on the server and matches the
 * presentational+container convention used across the site.
 */
export async function AnalyticsProviderContainer({
  children,
}: {
  children: ReactNode;
}) {
  const t = await getTranslations("cookies");

  const cookies: CookieBannerCopy = {
    title: t("title"),
    body: t("body"),
    learnMore: t("learnMore"),
    accept: t("accept"),
    necessary: t("necessary"),
  };

  return <AnalyticsProvider cookies={cookies}>{children}</AnalyticsProvider>;
}
