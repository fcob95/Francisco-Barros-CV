import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";
import { getProfile, pick } from "@/lib/content";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { Button } from "@/components/ui/button";

/**
 * F3 placeholder home. Renders entirely through i18n (no hardcoded copy) and
 * pulls profile name/role from the F1 content layer to prove the wiring is
 * end-to-end. Real sections arrive in F4. The theme toggle + locale switcher
 * are reachable here so both locales and theming are demonstrably navigable.
 */
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const profile = await getProfile();

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="flex items-center justify-end gap-2 p-4">
        <LocaleSwitcher />
        <ThemeToggle />
      </header>

      <main className="mx-auto flex max-w-3xl flex-col items-start gap-4 px-5 py-16 sm:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-ink-soft">
          {t("eyebrow")}
        </p>
        <h1 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
          {t("title")}
        </h1>
        <p className="max-w-prose text-base text-ink-muted">
          {t("description")}
        </p>

        <div className="mt-4 rounded-md border border-rule bg-paper-raised p-4">
          <p className="text-lg font-semibold text-ink">{profile.name}</p>
          <p className="text-sm text-ink-muted">{pick(locale, profile.role)}</p>
        </div>

        <Button variant="accent" className="mt-4">
          {t("viewProjects")}
        </Button>
      </main>
    </div>
  );
}
