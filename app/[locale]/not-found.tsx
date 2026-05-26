import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

/**
 * Localized 404. Rendered when `notFound()` is triggered inside the `[locale]`
 * segment (the locale layout still wraps it, so i18n + theming are available).
 */
export default function LocaleNotFound() {
  const t = useTranslations("notFound");

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-start justify-center gap-4 px-5 py-16 sm:px-8">
      <p className="font-mono text-xs uppercase tracking-[0.08em] text-terracotta-ink">
        404
      </p>
      <h1 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
        {t("title")}
      </h1>
      <p className="max-w-prose text-base text-ink-muted">{t("description")}</p>
      <Button asChild variant="outline" className="mt-2">
        <Link href="/">{t("back")}</Link>
      </Button>
    </main>
  );
}
