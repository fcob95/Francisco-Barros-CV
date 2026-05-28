"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * Thin wrapper around next-themes. Client component because it relies on
 * localStorage. Default is LIGHT (not OS-based, `enableSystem={false}`); the user
 * can still flip to dark via the header toggle and the choice persists.
 * `attribute="data-theme"` matches the editorial tokens, which key dark mode off
 * `[data-theme="dark"]`.
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
