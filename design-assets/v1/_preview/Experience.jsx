// _preview/Experience.jsx — vertical editorial timeline.

(function() {
  const { useLocale, t, L, Briefcase, MapPin, Download } = window;

  function formatPeriod(start, end, locale) {
    const months = locale === 'es'
      ? ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
      : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const fmt = (s) => {
      if (s === 'present') return locale === 'es' ? 'Presente' : 'Present';
      const [y, m] = s.split('-');
      return `${months[parseInt(m, 10) - 1]} ${y}`;
    };
    return `${fmt(start)} — ${fmt(end)}`;
  }

  function Experience({ navigate }) {
    const items = window.__EXPERIENCE;
    const edu = window.__EDUCATION;
    const profile = window.__PROFILE;
    const { locale } = useLocale();
    const cvHref = profile.cvUrl[locale] ?? profile.cvUrl.es;

    return React.createElement('section', {
      id: 'experience', 'data-screen-label': '/experience',
      className: 'relative max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 pt-12 md:pt-20 pb-16',
    },
      // Numbered header
      React.createElement('div', { className: 'flex items-baseline gap-3 mb-10 md:mb-12' },
        React.createElement('span', { className: 'font-mono text-xs uppercase tracking-[0.12em] text-[var(--c-ink-soft)]' }, '04 / Experience'),
        React.createElement('span', { className: 'h-px flex-1 bg-[var(--c-rule)]' }),
        React.createElement('a', {
          href: cvHref, download: true,
          'data-event': 'document_download', 'data-id': 'cv',
          className: 'inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--c-ink-muted)] hover:text-[var(--c-ink)]',
        },
          React.createElement(Download, { size: 11 }), t('cta.downloadCv'), ' / ', locale.toUpperCase(),
        ),
      ),

      React.createElement('h2', { className: 'font-display text-4xl md:text-5xl lg:text-6xl tracking-[-0.01em] text-[var(--c-ink)] leading-[1.02] mb-12 md:mb-16 text-balance' },
        t('section.experience') + '.',
      ),

      // Timeline
      React.createElement('ol', { className: 'relative space-y-12 md:space-y-16' },
        // Vertical rail
        React.createElement('div', {
          'aria-hidden': true,
          className: 'absolute left-3 md:left-[140px] top-2 bottom-2 w-px bg-[var(--c-rule-strong)]',
        }),
        ...items.map((it, i) => React.createElement('li', {
          key: i, className: 'relative grid md:grid-cols-[140px_1fr] gap-4 md:gap-10 items-start',
        },
          // Date column
          React.createElement('div', { className: 'flex items-start gap-3 md:block md:pt-1' },
            // Dot on rail
            React.createElement('span', {
              'aria-hidden': true,
              className: 'relative z-10 inline-flex items-center justify-center w-6 h-6 bg-[var(--c-paper)] border border-[var(--c-ink)] md:absolute md:left-[128px]',
              style: { borderRadius: 2 },
            },
              React.createElement('span', { className: 'w-2 h-2', style: { background: 'var(--c-terracotta)' } }),
            ),
            React.createElement('div', { className: 'md:pr-6' },
              React.createElement('div', { className: 'font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--c-ink-muted)]' },
                formatPeriod(it.period.start, it.period.end, locale)),
              React.createElement('div', { className: 'mt-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--c-ink-soft)] flex items-center gap-1' },
                React.createElement(MapPin, { size: 10 }), it.location),
            ),
          ),
          // Content card
          React.createElement('div', {
            className: 'bg-[var(--c-paper-raised)] border border-[var(--c-rule-strong)] p-6 md:p-8',
            style: { boxShadow: '4px 4px 0 0 var(--c-rule-strong)' },
          },
            React.createElement('div', { className: 'flex items-baseline justify-between gap-4 mb-3' },
              React.createElement('div', { className: 'flex items-baseline gap-3 min-w-0' },
                it.logo && window.CompanyLogo && React.createElement('span', {
                  className: 'text-[var(--c-ink)] flex-shrink-0 self-center inline-flex items-center justify-center w-8 h-8 border border-[var(--c-rule-strong)] rounded-sm bg-[var(--c-paper)]',
                }, React.createElement(window.CompanyLogo, { company: it.logo, size: 18, variant: 'icon' })),
                React.createElement('h3', { className: 'font-display text-[26px] md:text-[30px] leading-[1.05] tracking-[-0.01em] text-[var(--c-ink)]' }, it.company),
              ),
              React.createElement('span', { className: 'font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--c-ink-soft)] flex-shrink-0' },
                String(items.length - i).padStart(2, '0')),
            ),
            React.createElement('p', { className: 'font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--c-ink-muted)] mb-4' }, L(it.role)),
            React.createElement('p', { className: 'text-[15px] text-[var(--c-ink-muted)] leading-[1.6] mb-5 text-pretty' }, L(it.summary)),
            React.createElement('ul', { className: 'space-y-2' },
              ...it.highlights.map((h, j) => React.createElement('li', {
                key: j, className: 'flex items-start gap-3 text-[14px] text-[var(--c-ink)]',
              },
                React.createElement('span', { className: 'inline-block w-3 h-px bg-[var(--c-ink)] mt-3 flex-shrink-0' }),
                React.createElement('span', { className: 'text-pretty' }, L(h)),
              )),
            ),
          ),
        )),

        // Education entry
        React.createElement('li', { className: 'relative grid md:grid-cols-[140px_1fr] gap-4 md:gap-10 items-start' },
          React.createElement('div', { className: 'flex items-start gap-3 md:block md:pt-1' },
            React.createElement('span', {
              'aria-hidden': true,
              className: 'relative z-10 inline-flex items-center justify-center w-6 h-6 bg-[var(--c-paper)] border border-[var(--c-ink-soft)] md:absolute md:left-[128px]',
              style: { borderRadius: '50%' },
            },
              React.createElement('span', { className: 'w-1.5 h-1.5 bg-[var(--c-ink-soft)] rounded-full' }),
            ),
            React.createElement('div', { className: 'md:pr-6' },
              React.createElement('div', { className: 'font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--c-ink-muted)]' }, edu.period),
              React.createElement('div', { className: 'mt-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--c-ink-soft)]' }, edu.location),
            ),
          ),
          React.createElement('div', {
            className: 'bg-[var(--c-paper-sunken)] border border-[var(--c-rule)] p-6',
          },
            React.createElement('div', { className: 'font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--c-ink-soft)] mb-2' }, t('section.education')),
            React.createElement('h3', { className: 'font-display text-[24px] leading-[1.1] tracking-[-0.01em] text-[var(--c-ink)] mb-1' }, L(edu.degree)),
            React.createElement('p', { className: 'text-[14px] text-[var(--c-ink-muted)]' }, edu.school),
            React.createElement('ul', { className: 'mt-3 space-y-1 text-[13px] text-[var(--c-ink-muted)]' },
              ...edu.notes.map((n, i) => React.createElement('li', { key: i, className: 'flex items-start gap-2' },
                React.createElement('span', { className: 'inline-block w-2 h-px bg-[var(--c-ink-soft)] mt-2.5' }),
                React.createElement('span', null, L(n)),
              )),
            ),
          ),
        ),
      ),
    );
  }

  Object.assign(window, { Experience });
})();
