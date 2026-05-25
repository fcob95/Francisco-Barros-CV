# contact/

## Contact.tsx

Section `/contact`.

### Composition

- **Left (5/12)**
  - Display heading + lead paragraph
  - Channel list (Email · LinkedIn · GitHub · Location) — each row clickable when it
    has a `href`, otherwise informational
- **Right (7/12)**
  - Form card with `boxShadow: "6px 6px 0 var(--color-ink)"` (sticker shadow)
  - Name + Email (sm:grid-cols-2) + Message textarea
  - Submit button with **loading spinner**, **success panel**, **error inline message**
  - Below form: response-time micro-promise (`Respuesta en <24h hábiles`)

### States

| state       | UI                                            |
| ----------- | --------------------------------------------- |
| `"idle"`    | form visible, button enabled                  |
| `"loading"` | button shows spinner + "Enviando…", disabled  |
| `"success"` | form replaced by success panel + "Send another" |
| `"error"`   | inline `role="alert"` below textarea          |

### Props

| Prop       | Type                                              |
| ---------- | ------------------------------------------------- |
| `profile`  | `Profile`                                         |
| `locale`   | `"es" \| "en"`                                    |
| `t`, `L`   | `TFn`, `LFn`                                      |
| `onSubmit` | `(values: ContactFormValues) => Promise<void>`    |

### `onSubmit` contract

Caller handles:
1. Delivery (e.g., POST `/api/contact`)
2. Analytics — `document.querySelector('form[data-event=contact_submit]')`
   already carries the marker; or fire `posthog.capture('contact_submit', ...)`
   from inside `onSubmit`
3. Throws → component shows error panel

### Accessibility

- `<form aria-busy={status === "loading"}>`
- Error message has `role="alert"` (announced live)
- Native HTML5 validation (`required`, `type="email"`) — no client-side library
- All labels are proper `<label htmlFor>` pairs
