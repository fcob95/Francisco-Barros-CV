import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except API routes, Next internals and static files
  // (anything with a dot, e.g. `favicon.ico`). Keeps middleware off assets.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
