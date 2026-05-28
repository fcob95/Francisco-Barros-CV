import type { Education } from "@/lib/content/schemas";

/**
 * Education, derived from the canonical design v1 (`design-assets/v1`).
 */
export const education: Education = {
  degree: {
    es: "Ingeniero Civil Industrial — Mención en Finanzas",
    en: "Industrial Engineering — Major in Finance",
  },
  school: "Universidad de los Andes",
  period: "2014 — 2021",
  location: "Santiago, Chile",
  notes: [
    {
      es: "Estudios aplicados en desarrollo web.",
      en: "Applied studies in web development.",
    },
    {
      es: "Minor en Liderazgo y Coaching.",
      en: "Minor in Leadership and Coaching.",
    },
  ],
};
