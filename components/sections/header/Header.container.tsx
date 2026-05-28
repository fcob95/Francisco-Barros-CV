import { Header } from "@/components/sections/header/Header";

/**
 * Header container (Server Component).
 *
 * Honors the presentational+container pattern as the site-wide mount point.
 * Unlike Footer/Hero, the Header needs no `lib/content` data: route, locale,
 * theme and translations are all sourced client-side from hooks inside the
 * presentational `Header`. The container therefore has no wiring to inject here
 * and simply renders the client chrome. Kept as a deliberate seam so future
 * server-resolved data (e.g. a feature flag) has a place to land.
 */
export function HeaderContainer() {
  return <Header />;
}
