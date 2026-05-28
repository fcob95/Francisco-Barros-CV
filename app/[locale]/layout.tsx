import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";

import { getTranslations } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/theme-provider";
import { AnalyticsProviderContainer } from "@/components/analytics/AnalyticsProvider.container";
import { HeaderContainer } from "@/components/sections/header/Header.container";
import { FooterContainer } from "@/components/sections/footer/Footer.container";
import { getProfile, pick, type Locale } from "@/lib/content";
import { SITE_URL, absoluteUrl, languageAlternates } from "@/lib/seo/site";

import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

/**
 * Site-wide metadata defaults. `metadataBase` makes every relative/route URL
 * (incl. the `opengraph-image` convention) resolve to an absolute one. The
 * title template lets pages set only their own segment ("About" →
 * "About · Francisco Barros"); the home page uses `title.default`.
 *
 * Locale-resolved: name from profile, description from `profile.tagline`,
 * canonical + hreflang for the locale root. Per-page `generateMetadata`
 * overrides title/description/canonical for deeper routes.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const resolved = hasLocale(routing.locales, locale)
    ? (locale as Locale)
    : routing.defaultLocale;

  const profile = await getProfile();
  const t = await getTranslations({ locale: resolved, namespace: "hero" });
  const description = pick(resolved, profile.tagline);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${profile.name} — ${pick(resolved, profile.role)}`,
      template: `%s · ${profile.name}`,
    },
    description,
    applicationName: profile.name,
    authors: [{ name: profile.name }],
    creator: profile.name,
    alternates: {
      canonical: absoluteUrl("/", resolved),
      languages: languageAlternates("/"),
    },
    openGraph: {
      type: "website",
      siteName: profile.name,
      title: `${profile.name} — ${pick(resolved, profile.role)}`,
      description,
      url: absoluteUrl("/", resolved),
      locale: resolved === "es" ? "es_CL" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${profile.name} — ${t("kicker")}`,
      description,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // Opt the locale layout into static rendering for this request.
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <NextIntlClientProvider>
          <ThemeProvider>
            <AnalyticsProviderContainer>
              <HeaderContainer />
              <main>{children}</main>
              <FooterContainer locale={locale as Locale} />
            </AnalyticsProviderContainer>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
