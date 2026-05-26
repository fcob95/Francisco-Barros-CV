import { createNavigation } from "next-intl/navigation";

import { routing } from "@/i18n/routing";

/**
 * Locale-aware navigation APIs. Always import `Link`, `useRouter`,
 * `usePathname`, `redirect`, `getPathname` from here (never from `next/link`
 * or `next/navigation` directly) so the active locale prefix is handled for us.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
