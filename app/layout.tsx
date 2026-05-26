import type { ReactNode } from "react";

/**
 * Root passthrough layout. The real <html>/<body> live in
 * `app/[locale]/layout.tsx` so they can read the active locale. Next.js
 * requires a root layout to exist; with the next-intl App Router pattern it
 * simply forwards children (the locale layout provides the document shell).
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
