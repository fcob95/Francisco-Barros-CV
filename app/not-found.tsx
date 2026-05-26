import "./globals.css";
import { routing } from "@/i18n/routing";
import messages from "@/messages/es.json";

/**
 * Root-level 404 shim. Next.js requires a `not-found` reachable from the root
 * layout; because that layout is a passthrough (the document shell lives in
 * the locale layout), this shim provides its own <html>/<body>. It only fires
 * for paths the middleware could not map to a locale, so it falls back to the
 * default locale's copy (read from messages/, not hardcoded in JSX).
 */
export default function RootNotFound() {
  const t = messages.notFound;

  return (
    <html lang={routing.defaultLocale}>
      <body>
        <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-start justify-center gap-4 px-5 py-16 sm:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-terracotta-ink">
            404
          </p>
          <h1 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
            {t.title}
          </h1>
          <p className="max-w-prose text-base text-ink-muted">
            {t.description}
          </p>
          <a
            href={`/`}
            className="mt-2 inline-flex h-10 items-center rounded-sm border border-rule-strong px-4 text-sm font-medium text-ink hover:bg-paper-sunken"
          >
            {t.back}
          </a>
        </main>
      </body>
    </html>
  );
}
