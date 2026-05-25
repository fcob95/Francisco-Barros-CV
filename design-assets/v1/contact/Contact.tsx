"use client";

/**
 * Contact.tsx
 *
 * Section: /contact
 *
 * Left:  channels list (Email · LinkedIn · GitHub · Location)
 * Right: form (Name · Email · Message) inside a sticker-shadow card
 *
 * States: idle → loading → success | error.
 * Submit is async — onSubmit returns Promise<void>. Caller wires PostHog event 'contact_submit'.
 * For v1 we use native HTML5 validation (no real-time client validation).
 */

import { useState } from "react";
import { ArrowUpRight, Check, Github, Linkedin, Mail, MapPin, type LucideIcon } from "lucide-react";
import type { Profile, TFn, LFn } from "@/design-assets/v1/shapes";

export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

export interface ContactProps {
  profile: Profile;
  locale: "es" | "en";
  t: TFn;
  L: LFn;
  /** Caller is responsible for actual delivery + analytics. */
  onSubmit: (v: ContactFormValues) => Promise<void>;
}

export function Contact({ profile, locale, t, L, onSubmit }: ContactProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState<ContactFormValues>({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await onSubmit(form);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 pt-12 md:pt-20 pb-16"
      aria-labelledby="contact-title"
    >
      <div className="flex items-baseline gap-3 mb-10 md:mb-12">
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">05 / Contact</span>
        <span className="h-px flex-1 bg-rule" />
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
          {locale === "es" ? "Por correo, mejor" : "Email is best"}
        </span>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        <div className="lg:col-span-5">
          <h2
            id="contact-title"
            className="font-display text-4xl md:text-5xl lg:text-6xl tracking-[-0.01em] text-ink leading-[1.02] mb-5 text-balance"
          >
            {locale === "es" ? "Hablemos." : "Let\u2019s talk."}
          </h2>
          <p className="text-[16px] md:text-[17px] text-ink-muted leading-relaxed mb-8 text-pretty">
            {t("contact.lead")}
          </p>

          <ul className="space-y-px bg-rule border border-rule" role="list">
            <ChannelRow icon={Mail} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
            <ChannelRow
              icon={Linkedin}
              label="LinkedIn"
              value={username(profile.socials.find((s) => s.platform === "linkedin")?.url) ?? "—"}
              href={profile.socials.find((s) => s.platform === "linkedin")?.url}
              external
            />
            <ChannelRow
              icon={Github}
              label="GitHub"
              value={username(profile.socials.find((s) => s.platform === "github")?.url) ?? "—"}
              href={profile.socials.find((s) => s.platform === "github")?.url}
              external
            />
            <ChannelRow
              icon={MapPin}
              label={locale === "es" ? "Ubicación" : "Location"}
              value={profile.location}
            />
          </ul>
        </div>

        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            data-event="contact_submit"
            aria-busy={status === "loading"}
            className="relative bg-paper-raised border border-ink p-6 md:p-8"
            style={{ boxShadow: "6px 6px 0 0 var(--color-ink)" }}
          >
            {status === "success" ? (
              <SuccessPanel
                onReset={() => {
                  setStatus("idle");
                  setForm({ name: "", email: "", message: "" });
                }}
                locale={locale}
                t={t}
              />
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <Field
                    label={t("contact.nameLabel")} name="name" required
                    value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                  />
                  <Field
                    label={t("contact.emailLabel")} name="email" type="email" required
                    value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                  />
                </div>
                <Field
                  label={t("contact.messageLabel")} name="message" textarea required
                  placeholder={t("contact.messagePlaceholder")}
                  value={form.message} onChange={(v) => setForm((f) => ({ ...f, message: v }))}
                />

                {status === "error" && (
                  <p className="mt-3 text-[13px] text-danger" role="alert">
                    {locale === "es"
                      ? "Algo falló. Intenta de nuevo o escríbeme directo a fcobarros1995@gmail.com."
                      : "Something failed. Try again or write directly to fcobarros1995@gmail.com."}
                  </p>
                )}

                <div className="mt-6 flex items-center justify-between gap-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft">
                    {locale === "es" ? "Respuesta en <24h hábiles" : "Reply within 24 business hours"}
                  </p>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex items-center gap-2 h-12 px-6 bg-ink text-paper hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-terracotta)] transition-all rounded-sm disabled:opacity-60 disabled:pointer-events-none"
                  >
                    {status === "loading" ? (
                      <>
                        <span className="inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>{locale === "es" ? "Enviando…" : "Sending…"}</span>
                      </>
                    ) : (
                      <>
                        {t("cta.sendMessage")}
                        <ArrowUpRight size={15} />
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function ChannelRow({
  icon: Icon, label, value, href, external,
}: {
  icon: LucideIcon; label: string; value: string; href?: string; external?: boolean;
}) {
  const inner = (
    <li className="flex items-center justify-between gap-4 px-4 py-3.5 bg-paper">
      <div className="flex items-center gap-3 min-w-0">
        <span className="inline-flex items-center justify-center w-7 h-7 text-ink-muted border border-rule rounded-sm flex-shrink-0">
          <Icon size={13} />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft w-16 flex-shrink-0">{label}</span>
        <span className="text-[14px] text-ink truncate">{value}</span>
      </div>
      {href && <span aria-hidden className="text-ink-soft flex-shrink-0">↗</span>}
    </li>
  );
  if (!href) return inner;
  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}
       className="block hover:bg-paper-raised transition-colors">
      {inner}
    </a>
  );
}

function Field({
  label, name, type = "text", textarea, value, onChange, required, placeholder,
}: {
  label: string; name: string; type?: string; textarea?: boolean;
  value: string; onChange: (v: string) => void; required?: boolean; placeholder?: string;
}) {
  const id = `field-${name}`;
  const cls = "w-full px-3 bg-paper-sunken border border-rule-strong text-ink placeholder:text-ink-soft outline-none focus:border-ink focus:ring-2 focus:ring-focus focus:ring-offset-2 focus:ring-offset-paper-raised rounded-sm";
  return (
    <div>
      <label htmlFor={id} className="block font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted mb-1.5">
        {label}{required && <span aria-hidden className="text-terracotta ml-1">*</span>}
      </label>
      {textarea ? (
        <textarea
          id={id} name={name} required placeholder={placeholder} rows={5}
          value={value} onChange={(e) => onChange(e.target.value)}
          className={`${cls} py-2.5 resize-y`}
        />
      ) : (
        <input
          id={id} name={name} type={type} required placeholder={placeholder}
          value={value} onChange={(e) => onChange(e.target.value)}
          className={`${cls} h-11`}
        />
      )}
    </div>
  );
}

function SuccessPanel({ onReset, locale, t }: { onReset: () => void; locale: "es" | "en"; t: TFn }) {
  return (
    <div className="py-10 text-center">
      <div
        className="inline-flex items-center justify-center w-14 h-14 bg-success/10 text-success mb-4 rounded-sm"
        aria-hidden
      >
        <Check size={28} strokeWidth={2.5} />
      </div>
      <h3 className="font-display text-3xl tracking-[-0.01em] mb-2">
        {locale === "es" ? "¡Recibido!" : "Got it!"}
      </h3>
      <p className="text-[15px] text-ink-muted max-w-[420px] mx-auto">{t("contact.success")}</p>
      <button
        type="button" onClick={onReset}
        className="mt-6 text-[13px] text-ink-muted underline-offset-4 hover:underline hover:text-ink"
      >
        {locale === "es" ? "Enviar otro" : "Send another"}
      </button>
    </div>
  );
}

function username(url: string | undefined): string | null {
  if (!url) return null;
  const m = url.match(/\/([^\/?#]+)\/?$/);
  return m ? m[1] : null;
}
