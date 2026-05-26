import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // analytics, SEO y demás wiring se agregan en sus fases (F6/F7).
};

export default withNextIntl(nextConfig);
