import type { routing } from "@/i18n/routing";
import type messages from "@/messages/es.json";

/**
 * Augments next-intl with our concrete locale union and message shape, so
 * `useTranslations`/`getTranslations` keys and `locale` values are checked at
 * compile time. `es.json` is the reference bundle (parity with `en.json` is
 * enforced by the check-i18n-parity hook).
 */
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
