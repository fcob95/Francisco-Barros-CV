import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";
import type { Locale } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { ContactContainer } from "@/components/sections/contact/Contact.container";

async function resolveLocale(params: Promise<{ locale: string }>) {
  const { locale } = await params;
  return hasLocale(routing.locales, locale)
    ? (locale as Locale)
    : routing.defaultLocale;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "contact" });
  return buildPageMetadata({
    title: t("title").replace(/[.…]$/, ""),
    description: t("lead"),
    path: "/contact",
    locale,
  });
}

/**
 * Contact (`/contact`). Renders the channel list + contact form. Data + i18n are
 * wired inside ContactContainer (Server Component → presentational Contact, which
 * is a Client Component because the form is interactive). The form POSTs to
 * /api/contact (Resend delivery, shared Zod validation, no persistence). Chrome
 * (Header/Footer) is mounted by the locale layout.
 *
 * A11y: the section leads with an <h2>; we add the single page <h1> here as
 * visually-hidden (sr-only) carrying the page title (contact.title).
 */
export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <>
      <h1 className="sr-only">{t("title").replace(/[.…]$/, "")}</h1>
      <ContactContainer />
    </>
  );
}
