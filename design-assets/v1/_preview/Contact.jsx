// _preview/Contact.jsx — form with loading/success/error states.

(function() {
  const { useState } = React;
  const { useLocale, t, L, Mail, Linkedin, Github, Check, ArrowUpRight, MapPin } = window;

  function Contact({ navigate }) {
    const profile = window.__PROFILE;
    const { locale } = useLocale();
    const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
    const [form, setForm] = useState({ name: '', email: '', message: '' });

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!form.name || !form.email || !form.message) return;
      setStatus('loading');
      // Simulate async; analytics event 'contact_submit' fires here in real app
      await new Promise(r => setTimeout(r, 1200));
      setStatus('success');
    };

    return React.createElement('section', {
      id: 'contact', 'data-screen-label': '/contact',
      className: 'relative max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 pt-12 md:pt-20 pb-16',
    },
      // Numbered header
      React.createElement('div', { className: 'flex items-baseline gap-3 mb-10 md:mb-12' },
        React.createElement('span', { className: 'font-mono text-xs uppercase tracking-[0.12em] text-[var(--c-ink-soft)]' }, '05 / Contact'),
        React.createElement('span', { className: 'h-px flex-1 bg-[var(--c-rule)]' }),
        React.createElement('span', { className: 'font-mono text-xs uppercase tracking-[0.12em] text-[var(--c-ink-soft)]' }, locale === 'es' ? 'Por correo, mejor' : 'Email is best'),
      ),

      React.createElement('div', { className: 'grid lg:grid-cols-12 gap-8 lg:gap-16 items-start' },
        // Left: lead + channels
        React.createElement('div', { className: 'lg:col-span-5' },
          React.createElement('h2', {
            className: 'font-display text-4xl md:text-5xl lg:text-6xl tracking-[-0.01em] text-[var(--c-ink)] leading-[1.02] mb-5 text-balance',
          }, locale === 'es' ? 'Hablemos.' : 'Let\u2019s talk.'),
          React.createElement('p', { className: 'text-[16px] md:text-[17px] text-[var(--c-ink-muted)] leading-relaxed mb-8 text-pretty' },
            t('contact.lead')),

          // Channel list
          React.createElement('ul', { className: 'space-y-px bg-[var(--c-rule)] border border-[var(--c-rule)]' },
            React.createElement(ChannelRow, {
              icon: Mail, label: 'Email', value: profile.email,
              href: 'mailto:' + profile.email,
            }),
            React.createElement(ChannelRow, {
              icon: Linkedin, label: 'LinkedIn', value: 'fcobarroscruz',
              href: profile.socials.find(s => s.platform === 'linkedin').url, external: true,
            }),
            React.createElement(ChannelRow, {
              icon: Github, label: 'GitHub', value: 'fcobarros',
              href: profile.socials.find(s => s.platform === 'github').url, external: true,
            }),
            React.createElement(ChannelRow, {
              icon: MapPin, label: locale === 'es' ? 'Ubicación' : 'Location', value: profile.location,
            }),
          ),
        ),

        // Right: form
        React.createElement('div', { className: 'lg:col-span-7' },
          React.createElement('form', {
            onSubmit: handleSubmit,
            'data-event': 'contact_submit',
            className: 'relative bg-[var(--c-paper-raised)] border border-[var(--c-ink)] p-6 md:p-8',
            style: { boxShadow: '6px 6px 0 0 var(--c-ink)' },
          },
            status === 'success'
              ? React.createElement('div', { className: 'py-10 text-center' },
                  React.createElement('div', {
                    className: 'inline-flex items-center justify-center w-14 h-14 bg-[var(--c-success)]/10 text-[var(--c-success)] mb-4',
                    style: { borderRadius: 2 },
                  }, React.createElement(Check, { size: 28, strokeWidth: 2.5 })),
                  React.createElement('h3', { className: 'font-display text-3xl tracking-[-0.01em] mb-2' },
                    locale === 'es' ? '¡Recibido!' : 'Got it!'),
                  React.createElement('p', { className: 'text-[15px] text-[var(--c-ink-muted)] max-w-[420px] mx-auto' },
                    t('contact.success')),
                  React.createElement('button', {
                    type: 'button',
                    onClick: () => { setStatus('idle'); setForm({ name: '', email: '', message: '' }); },
                    className: 'mt-6 text-[13px] text-[var(--c-ink-muted)] underline-offset-4 hover:underline hover:text-[var(--c-ink)]',
                  }, locale === 'es' ? 'Enviar otro' : 'Send another'),
                )
              : React.createElement(React.Fragment, null,
                  React.createElement('div', { className: 'grid sm:grid-cols-2 gap-4 mb-4' },
                    React.createElement(Field, {
                      label: t('contact.nameLabel'), name: 'name', required: true,
                      value: form.name, onChange: (v) => setForm(f => ({ ...f, name: v })),
                    }),
                    React.createElement(Field, {
                      label: t('contact.emailLabel'), name: 'email', type: 'email', required: true,
                      value: form.email, onChange: (v) => setForm(f => ({ ...f, email: v })),
                    }),
                  ),
                  React.createElement(Field, {
                    label: t('contact.messageLabel'), name: 'message', textarea: true, required: true,
                    placeholder: t('contact.messagePlaceholder'),
                    value: form.message, onChange: (v) => setForm(f => ({ ...f, message: v })),
                  }),
                  React.createElement('div', { className: 'mt-6 flex items-center justify-between gap-4' },
                    React.createElement('p', { className: 'font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--c-ink-soft)]' },
                      locale === 'es' ? 'Respuesta en <24h hábiles' : 'Reply within 24 business hours'),
                    React.createElement('button', {
                      type: 'submit', disabled: status === 'loading',
                      className: 'inline-flex items-center gap-2 h-12 px-6 bg-[var(--c-ink)] text-[var(--c-paper)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_var(--c-terracotta)] transition-all rounded-sm disabled:opacity-60 disabled:pointer-events-none',
                    },
                      status === 'loading'
                        ? React.createElement(React.Fragment, null,
                            React.createElement('span', { className: 'inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin' }),
                            React.createElement('span', null, locale === 'es' ? 'Enviando…' : 'Sending…'),
                          )
                        : React.createElement(React.Fragment, null,
                            t('cta.sendMessage'),
                            React.createElement(ArrowUpRight, { size: 15 }),
                          ),
                    ),
                  ),
                ),
          ),
        ),
      ),
    );
  }

  function ChannelRow({ icon: Ic, label, value, href, external }) {
    const inner = React.createElement('div', { className: 'flex items-center justify-between gap-4 px-4 py-3.5 bg-[var(--c-paper)]' },
      React.createElement('div', { className: 'flex items-center gap-3 min-w-0' },
        React.createElement('span', { className: 'inline-flex items-center justify-center w-7 h-7 text-[var(--c-ink-muted)] border border-[var(--c-rule)] rounded-sm flex-shrink-0' },
          React.createElement(Ic, { size: 13 }),
        ),
        React.createElement('span', { className: 'font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--c-ink-soft)] w-16 flex-shrink-0' }, label),
        React.createElement('span', { className: 'text-[14px] text-[var(--c-ink)] truncate' }, value),
      ),
      href && React.createElement('span', { className: 'text-[var(--c-ink-soft)] flex-shrink-0' }, '↗'),
    );
    if (!href) return inner;
    return React.createElement('a', {
      href, target: external ? '_blank' : undefined, rel: external ? 'noopener noreferrer' : undefined,
      className: 'block hover:bg-[var(--c-paper-raised)] transition-colors',
    }, inner);
  }

  function Field({ label, name, type = 'text', textarea, value, onChange, required, placeholder }) {
    const id = 'field-' + name;
    return React.createElement('div', null,
      React.createElement('label', {
        htmlFor: id, className: 'block font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--c-ink-muted)] mb-1.5',
      }, label, required && React.createElement('span', { className: 'text-[var(--c-terracotta)] ml-1' }, '*')),
      textarea
        ? React.createElement('textarea', {
            id, name, value, onChange: (e) => onChange(e.target.value),
            required, placeholder, rows: 5,
            className: 'w-full px-3 py-2.5 bg-[var(--c-paper-sunken)] border border-[var(--c-rule-strong)] text-[var(--c-ink)] placeholder:text-[var(--c-ink-soft)] outline-none focus:border-[var(--c-ink)] focus:ring-2 focus:ring-[var(--c-focus)] focus:ring-offset-2 focus:ring-offset-[var(--c-paper-raised)] rounded-sm resize-y',
          })
        : React.createElement('input', {
            id, name, type, value, onChange: (e) => onChange(e.target.value),
            required, placeholder,
            className: 'w-full h-11 px-3 bg-[var(--c-paper-sunken)] border border-[var(--c-rule-strong)] text-[var(--c-ink)] placeholder:text-[var(--c-ink-soft)] outline-none focus:border-[var(--c-ink)] focus:ring-2 focus:ring-[var(--c-focus)] focus:ring-offset-2 focus:ring-offset-[var(--c-paper-raised)] rounded-sm',
          }),
    );
  }

  Object.assign(window, { Contact });
})();
