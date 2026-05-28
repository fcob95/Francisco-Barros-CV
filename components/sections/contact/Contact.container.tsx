import { getTranslations } from "next-intl/server";

import { getProfile } from "@/lib/content";
import { Contact, type ContactChannelView, type ContactCopy } from "./Contact";

/**
 * Contact container (Server Component).
 *
 * Reads the profile (email, location, socials) from the content layer, derives
 * the channel rows (Email · LinkedIn · GitHub · Location) with their labels
 * resolved via getTranslations, resolves all chrome copy, and hands a
 * serializable view-model + copy bundle to the presentational Contact (which is
 * a Client Component because the form is interactive). No content access or
 * `t`/`L`/`pick` crosses into the client beyond the resolved strings.
 *
 * No `locale` prop is needed: profile channel values (email, location, social
 * usernames) are not localized, and getTranslations resolves the active request
 * locale on its own (set upstream in the page via setRequestLocale).
 */
export async function ContactContainer() {
  const profile = await getProfile();

  const tContact = await getTranslations("contact");
  const tCta = await getTranslations("cta");
  const tSection = await getTranslations("section");

  const linkedin = profile.socials.find((s) => s.platform === "linkedin");
  const github = profile.socials.find((s) => s.platform === "github");

  const channels: ContactChannelView[] = [
    {
      kind: "email",
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      kind: "linkedin",
      label: "LinkedIn",
      value: usernameFromUrl(linkedin?.url) ?? "—",
      href: linkedin?.url,
      external: true,
    },
    {
      kind: "github",
      label: "GitHub",
      value: usernameFromUrl(github?.url) ?? "—",
      href: github?.url,
      external: true,
    },
    {
      kind: "location",
      label: tSection("location"),
      value: profile.location,
    },
  ];

  const copy: ContactCopy = {
    title: tContact("title"),
    lead: tContact("lead"),
    nameLabel: tContact("nameLabel"),
    emailLabel: tContact("emailLabel"),
    messageLabel: tContact("messageLabel"),
    messagePlaceholder: tContact("messagePlaceholder"),
    success: tContact("success"),
    errorMessage: tContact("error"),
    fieldErrors: {
      name: tContact("errors.name"),
      email: tContact("errors.email"),
      message: tContact("errors.message"),
    },
    replyPromise: tContact("replyPromise"),
    stripNote: tContact("stripNote"),
    sendMessage: tCta("sendMessage"),
    sending: tContact("sending"),
    successHeading: tContact("successHeading"),
    sendAnother: tContact("sendAnother"),
  };

  return <Contact channels={channels} copy={copy} />;
}

/**
 * Extracts the trailing path segment of a social URL as a display username
 * (e.g. "https://linkedin.com/in/fcobarroscruz" → "fcobarroscruz"). Pure helper
 * ported from the asset; presentation-only, no content shape change.
 */
function usernameFromUrl(url: string | undefined): string | null {
  if (!url) return null;
  const match = url.match(/\/([^/?#]+)\/?$/);
  return match ? match[1] : null;
}
