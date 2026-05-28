"use client";

/**
 * Contact.tsx — presentational `/contact` section.
 *
 * Ported from design-assets/v1/contact/Contact.tsx (copied by value).
 * Left: channel list (Email · LinkedIn · GitHub · Location). Right: form card
 * with idle → loading → success | error states (sticker shadow).
 *
 * "use client" justification: the form is interactive (submit state machine +
 * React Hook Form). All copy arrives locale-resolved from the Server container
 * as serializable props (`copy`), and the channel values are precomputed there
 * (no `t`/`L`/`pick` or content access here).
 *
 * DESIGN-DEVIATION: the asset used native HTML5 validation (`required`,
 * `type=email`) with local useState. Replaced with React Hook Form + Zod
 * (`zodResolver(contactSchema)`) per the project stack (CLAUDE.md). The exact
 * same `contactSchema` validates server-side in /api/contact. The asset's visual
 * states, layout and sticker shadow are kept intact; inputs are wired via
 * `register()` (they were uncontrolled/native, so this is minimal markup change).
 *
 * The form keeps `data-event="contact_submit"` for traceability, but the event
 * fires via `track.contactSubmit()` on a SUCCESSFUL submit (not on click), so it
 * is excluded from the delegated click listener in the AnalyticsProvider.
 */

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowUpRight,
  Check,
  Github,
  Linkedin,
  Mail,
  MapPin,
  type LucideIcon,
} from "lucide-react";

import { contactSchema, type ContactInput } from "@/lib/contact/schema";
import { track } from "@/lib/analytics/events";

/** A contact channel row, precomputed in the Server container. */
export interface ContactChannelView {
  kind: "email" | "linkedin" | "github" | "location";
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

/** Resolved copy bundle — built in the Server container from messages. */
export interface ContactCopy {
  title: string;
  lead: string;
  nameLabel: string;
  emailLabel: string;
  messageLabel: string;
  messagePlaceholder: string;
  success: string;
  /** Inline error shown when delivery fails (role="alert"). */
  errorMessage: string;
  /** Localized per-field validation messages (shown inline under each input). */
  fieldErrors: {
    name: string;
    email: string;
    message: string;
  };
  /** Micro-promise under the form ("Reply within 24 business hours"). */
  replyPromise: string;
  /** Numbered-strip right label ("Email is best" / "Por correo, mejor"). */
  stripNote: string;
  sendMessage: string;
  sending: string;
  successHeading: string;
  sendAnother: string;
  /** Channel-list accessible label is derived from the channel labels. */
}

const CHANNEL_ICONS: Record<ContactChannelView["kind"], LucideIcon> = {
  email: Mail,
  linkedin: Linkedin,
  github: Github,
  location: MapPin,
};

export interface ContactProps {
  channels: ContactChannelView[];
  copy: ContactCopy;
}

/**
 * Form shape = the validated fields PLUS the honeypot `company`. The honeypot is
 * NOT part of `contactSchema` (humans never fill it), so it is excluded from
 * zodResolver validation but still registered with RHF and submitted to the API,
 * where the server silently drops any non-empty value.
 */
type ContactFormValues = ContactInput & { company?: string };

export function Contact({ channels, copy }: ContactProps) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onSubmit",
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("success");
      // Fire on SUCCESS only — and PII-free (no field contents in the payload).
      // No-ops without consent (typed helper → central capture).
      track.contactSubmit();
    } catch {
      setStatus("error");
    }
  });

  return (
    <section
      id="contact"
      className="relative max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 pt-12 md:pt-20 pb-16"
      aria-labelledby="contact-title"
    >
      <div className="flex items-baseline gap-3 mb-10 md:mb-12">
        {/* Editorial number strip kept verbatim (consistent with Bloque A/B). */}
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
          05 / Contact
        </span>
        <span className="h-px flex-1 bg-rule" />
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
          {copy.stripNote}
        </span>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        <div className="lg:col-span-5">
          <h2
            id="contact-title"
            className="font-display text-4xl md:text-5xl lg:text-6xl tracking-[-0.01em] text-ink leading-[1.02] mb-5 text-balance"
          >
            {copy.title}
          </h2>
          <p className="text-[16px] md:text-[17px] text-ink-muted leading-relaxed mb-8 text-pretty">
            {copy.lead}
          </p>

          <ul className="space-y-px bg-rule border border-rule" role="list">
            {channels.map((channel) => (
              <ChannelRow key={channel.kind} channel={channel} />
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <form
            onSubmit={onSubmit}
            data-event="contact_submit"
            aria-busy={status === "loading"}
            noValidate
            className="relative bg-paper-raised border border-ink p-6 md:p-8"
            style={{ boxShadow: "6px 6px 0 0 var(--color-ink)" }}
          >
            {status === "success" ? (
              <SuccessPanel
                copy={copy}
                onReset={() => {
                  setStatus("idle");
                  reset();
                }}
              />
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <Field
                    label={copy.nameLabel}
                    name="name"
                    required
                    register={register("name")}
                    invalid={!!errors.name}
                    errorMessage={
                      errors.name ? copy.fieldErrors.name : undefined
                    }
                  />
                  <Field
                    label={copy.emailLabel}
                    name="email"
                    type="email"
                    required
                    register={register("email")}
                    invalid={!!errors.email}
                    errorMessage={
                      errors.email ? copy.fieldErrors.email : undefined
                    }
                  />
                </div>
                <Field
                  label={copy.messageLabel}
                  name="message"
                  textarea
                  required
                  placeholder={copy.messagePlaceholder}
                  register={register("message")}
                  invalid={!!errors.message}
                  errorMessage={
                    errors.message ? copy.fieldErrors.message : undefined
                  }
                />

                {/*
                  Honeypot: visually hidden, off the tab order, ignored by AT.
                  Humans never see or fill it; bots that auto-fill every input
                  trip it. The server silently drops any non-empty value.
                */}
                <div className="sr-only" aria-hidden>
                  <input
                    id="field-company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    {...register("company")}
                  />
                </div>

                {status === "error" && (
                  <p className="mt-3 text-[13px] text-danger" role="alert">
                    {copy.errorMessage}
                  </p>
                )}

                <div className="mt-6 flex items-center justify-between gap-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft">
                    {copy.replyPromise}
                  </p>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex items-center gap-2 h-12 px-6 bg-ink text-paper hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-terracotta)] transition-all rounded-sm disabled:opacity-60 disabled:pointer-events-none"
                  >
                    {status === "loading" ? (
                      <>
                        <span className="inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>{copy.sending}</span>
                      </>
                    ) : (
                      <>
                        {copy.sendMessage}
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

function ChannelRow({ channel }: { channel: ContactChannelView }) {
  const Icon = CHANNEL_ICONS[channel.kind];
  const inner = (
    <li className="flex items-center justify-between gap-4 px-4 py-3.5 bg-paper">
      <div className="flex items-center gap-3 min-w-0">
        <span className="inline-flex items-center justify-center w-7 h-7 text-ink-muted border border-rule rounded-sm flex-shrink-0">
          <Icon size={13} />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft w-16 flex-shrink-0">
          {channel.label}
        </span>
        <span className="text-[14px] text-ink truncate">{channel.value}</span>
      </div>
      {channel.href && (
        <span aria-hidden className="text-ink-soft flex-shrink-0">
          ↗
        </span>
      )}
    </li>
  );
  if (!channel.href) return inner;
  return (
    <a
      href={channel.href}
      target={channel.external ? "_blank" : undefined}
      rel={channel.external ? "noopener noreferrer" : undefined}
      className="block hover:bg-paper-raised transition-colors"
    >
      {inner}
    </a>
  );
}

function Field({
  label,
  name,
  type = "text",
  textarea,
  required,
  placeholder,
  register,
  invalid,
  errorMessage,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
  placeholder?: string;
  register: ReturnType<
    ReturnType<typeof useForm<ContactFormValues>>["register"]
  >;
  invalid?: boolean;
  /** Localized validation message; when set, an inline error node is rendered. */
  errorMessage?: string;
}) {
  const id = `field-${name}`;
  const errorId = `${id}-error`;
  const cls =
    "w-full px-3 bg-paper-sunken border border-rule-strong text-ink placeholder:text-ink-soft outline-none focus:border-ink focus:ring-2 focus:ring-focus focus:ring-offset-2 focus:ring-offset-paper-raised rounded-sm";
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted mb-1.5"
      >
        {label}
        {required && (
          <span aria-hidden className="text-terracotta ml-1">
            *
          </span>
        )}
      </label>
      {textarea ? (
        <textarea
          id={id}
          placeholder={placeholder}
          rows={5}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? errorId : undefined}
          className={`${cls} py-2.5 resize-y`}
          {...register}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? errorId : undefined}
          className={`${cls} h-11`}
          {...register}
        />
      )}
      {errorMessage && (
        <p id={errorId} className="mt-1 text-xs text-danger">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

function SuccessPanel({
  copy,
  onReset,
}: {
  copy: ContactCopy;
  onReset: () => void;
}) {
  return (
    <div className="py-10 text-center">
      <div
        className="inline-flex items-center justify-center w-14 h-14 bg-success/10 text-success mb-4 rounded-sm"
        aria-hidden
      >
        <Check size={28} strokeWidth={2.5} />
      </div>
      <h3 className="font-display text-3xl tracking-[-0.01em] mb-2">
        {copy.successHeading}
      </h3>
      <p className="text-[15px] text-ink-muted max-w-[420px] mx-auto">
        {copy.success}
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 text-[13px] text-ink-muted underline-offset-4 hover:underline hover:text-ink"
      >
        {copy.sendAnother}
      </button>
    </div>
  );
}
