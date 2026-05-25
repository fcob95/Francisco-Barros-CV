"use client";

/**
 * Privacy.tsx — /privacy.
 * Long-form prose page. Print-friendly.
 */

import { ArrowLeft } from "lucide-react";
import type { TFn } from "@/design-assets/v1/shapes";

export interface PrivacyProps {
  locale: "es" | "en";
  t: TFn;
  onBack: () => void;
}

export function Privacy({ locale, t, onBack }: PrivacyProps) {
  return (
    <article className="relative max-w-[720px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24">
      <div className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft mb-3">Privacy</div>
      <h1 className="font-display text-4xl md:text-5xl tracking-[-0.02em] mb-6">
        {locale === "es" ? "Cómo trato tus datos." : "How I handle your data."}
      </h1>
      <div className="space-y-5 text-[16px] leading-[1.7] text-ink-muted">
        <p>
          {locale === "es"
            ? "Uso PostHog para analítica privada de navegación: scroll depth, tiempo en página y eventos básicos (descargas, clics en proyecto, envíos de formulario). No comparto esos datos con terceros, no uso cookies de tracking publicitario y no construyo perfiles personales."
            : "I use PostHog for privacy-friendly navigation analytics: scroll depth, time on page and basic events (downloads, project clicks, form submits). I do not share data with third parties, I do not use advertising tracking cookies, and I do not build personal profiles."}
        </p>
        <p>
          {locale === "es"
            ? "Si rechazas las cookies, solo se guardan las estrictamente necesarias (idioma, tema). Puedes cambiar tu preferencia desde el botón \"Cookies\" en el footer."
            : "If you decline cookies, only strictly necessary ones (language, theme) are stored. You can change your preference from the \"Cookies\" button in the footer."}
        </p>
        <p>
          {locale === "es"
            ? "Si me escribes desde el formulario de contacto, tu nombre, correo y mensaje llegan directo a mi inbox y no se almacenan en otro lugar."
            : "If you write through the contact form, your name, email and message arrive directly to my inbox and are not stored anywhere else."}
        </p>
      </div>
      <button
        type="button"
        onClick={onBack}
        className="mt-10 inline-flex items-center gap-2 text-[14px] text-ink-muted hover:text-ink"
      >
        <ArrowLeft size={14} />
        {locale === "es" ? "Volver" : "Back"}
      </button>
    </article>
  );
}
