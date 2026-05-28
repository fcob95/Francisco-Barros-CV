import { z } from "zod";

/**
 * Single source of truth for contact-form validation.
 *
 * Used in BOTH places (no drift):
 *  - client: `zodResolver(contactSchema)` in the Contact client form (RHF).
 *  - server: `contactSchema.safeParse(body)` in `app/api/contact/route.ts`.
 *
 * Length caps double as minimal abuse guardrails (no separate rate-limit layer
 * in v1 — decision #7: no persistence, email-only delivery).
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(10).max(4000),
});

export type ContactInput = z.infer<typeof contactSchema>;
