import { NextResponse } from "next/server";
import { Resend } from "resend";

import { contactSchema } from "@/lib/contact/schema";

/**
 * POST /api/contact — contact-form delivery.
 *
 * Lives outside `[locale]` on purpose: it is a data endpoint, not a page, so it
 * is NOT locale-prefixed. Node runtime (Resend SDK is not Edge-safe).
 *
 * Flow: parse JSON → honeypot check (silent 200 on bot) → validate with the
 * SHARED `contactSchema` (400 on invalid) → send email via Resend to
 * CONTACT_TO_EMAIL from CONTACT_FROM_EMAIL with `replyTo` set to the submitter.
 * No persistence (decision #7).
 *
 * Anti-spam: a `company` honeypot field (visually hidden in the form, never
 * filled by humans). If it arrives non-empty we pretend success — no email, no
 * hint to the bot that it was rejected. It is NOT part of `contactSchema`, so it
 * is read leniently from the raw body before validation. No rate-limiting yet
 * (documented deferral, decision #7).
 *
 * Fail fast on missing env: 500 + server-side console.error, WITHOUT leaking
 * which variable is missing to the client.
 */
export const runtime = "nodejs";

export async function POST(request: Request) {
  // --- Parse body -----------------------------------------------------------
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  // --- Honeypot (silent bot drop, BEFORE validation/delivery) ---------------
  // Read leniently: the honeypot is not part of `contactSchema`. A human never
  // fills it, so any non-empty string means a bot — pretend success, send no
  // email, and reveal nothing.
  const honeypot = (raw as { company?: unknown } | null)?.company;
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // --- Validate with the shared schema --------------------------------------
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "invalid_input" },
      { status: 400 },
    );
  }
  const { name, email, message } = parsed.data;

  // --- Env contract (fail fast, do not leak which var is missing) -----------
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error(
      "[contact] Missing email configuration. Check RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL.",
    );
    return NextResponse.json(
      { ok: false, error: "server_misconfigured" },
      { status: 500 },
    );
  }

  // --- Deliver via Resend ---------------------------------------------------
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `Contact form — ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });

  if (error) {
    console.error("[contact] Resend delivery failed:", error);
    return NextResponse.json(
      { ok: false, error: "delivery_failed" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
