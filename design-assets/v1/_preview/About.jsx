// _preview/About.jsx

(function() {
  const { useLocale, t, L, motion, MapPin, Calendar, Download } = window;

  function About({ navigate }) {
    const profile = window.__PROFILE;
    const skills = window.__SKILLS;
    const { locale } = useLocale();
    const cvHref = profile.cvUrl[locale] ?? profile.cvUrl.es;

    return React.createElement('section', {
      id: 'about', 'data-screen-label': '/about',
      className: 'relative max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 pt-12 md:pt-20 pb-16',
    },
      // Numbered header
      React.createElement('div', { className: 'flex items-baseline gap-3 mb-10 md:mb-16' },
        React.createElement('span', { className: 'font-mono text-xs uppercase tracking-[0.12em] text-[var(--c-ink-soft)]' }, '02 / About'),
        React.createElement('span', { className: 'h-px flex-1 bg-[var(--c-rule)]' }),
        React.createElement('span', { className: 'font-mono text-xs uppercase tracking-[0.12em] text-[var(--c-ink-soft)]' }, locale === 'es' ? 'Quién soy' : 'Who I am'),
      ),

      // Lead grid
      React.createElement('div', { className: 'grid md:grid-cols-12 gap-8 md:gap-12 mb-16 md:mb-20' },
        React.createElement('div', { className: 'md:col-span-4' },
          // Avatar slab — geometric placeholder if no src
          React.createElement('div', {
            className: 'relative w-full max-w-[320px]',
            style: { aspectRatio: '4 / 5' },
          },
            // backdrop offset frame — ink (dialed back from terracotta for structural restraint)
            React.createElement('div', {
              'aria-hidden': true,
              className: 'absolute inset-0 bg-[var(--c-ink)]',
              style: { transform: 'translate(10px, 10px)' },
            }),
            React.createElement('div', {
              className: 'relative w-full h-full bg-[var(--c-paper-raised)] border border-[var(--c-ink)] overflow-hidden flex items-end',
            },
              // abstract editorial "portrait" placeholder
              React.createElement('svg', {
                viewBox: '0 0 400 500', className: 'absolute inset-0 w-full h-full', 'aria-hidden': true,
              },
                React.createElement('rect', { width: 400, height: 500, fill: 'var(--c-paper-sunken)' }),
                React.createElement('circle', { cx: 200, cy: 200, r: 110, fill: 'var(--c-paper-raised)', stroke: 'var(--c-ink)', strokeWidth: 1.5 }),
                React.createElement('path', { d: 'M70 500 Q200 320 330 500 Z', fill: 'var(--c-ink)' }),
                React.createElement('text', {
                  x: 200, y: 215, textAnchor: 'middle', fontFamily: 'Instrument Serif, serif',
                  fontSize: 96, fill: 'var(--c-ink)',
                }, 'FB'),
              ),
              React.createElement('div', { className: 'relative w-full p-3 bg-[var(--c-ink)] text-[var(--c-paper)] font-mono text-[10px] uppercase tracking-[0.12em] flex items-center justify-between' },
                React.createElement('span', null, profile.name),
                React.createElement('span', null, locale === 'es' ? 'Stgo · CL' : 'Stgo · CL'),
              ),
            ),
          ),
          // Quick facts
          React.createElement('dl', { className: 'mt-6 space-y-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--c-ink-muted)]' },
            React.createElement('div', { className: 'flex items-center gap-2' },
              React.createElement(MapPin, { size: 12 }),
              React.createElement('span', null, profile.location),
            ),
            React.createElement('div', { className: 'flex items-center gap-2' },
              React.createElement(Calendar, { size: 12 }),
              React.createElement('span', null, locale === 'es' ? '4+ años de experiencia' : '4+ years of experience'),
            ),
          ),
        ),
        React.createElement('div', { className: 'md:col-span-8 flex flex-col' },
          React.createElement('p', {
            className: 'font-display text-[28px] md:text-[40px] leading-[1.2] tracking-[-0.01em] text-[var(--c-ink)]',
            style: { marginBottom: '40px', textWrap: 'wrap', minHeight: '6em', display: 'block' },
          }, t('about.lead')),
          React.createElement('p', {
            className: 'text-[15px] md:text-[16px] text-[var(--c-ink-muted)] leading-relaxed text-pretty max-w-[640px]',
            style: { marginBottom: '32px' },
          }, locale === 'es'
            ? 'Mi trabajo cruza pricing, datos y workflows de IA aplicada en retail, telecom y travel.'
            : 'My work sits at the crossroads of pricing, data and applied-AI workflows across retail, telecom and travel.'
          ),
          React.createElement('h1', {
            className: 'font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--c-ink-soft)]',
            style: { marginBottom: '12px' },
          }, L(profile.headline)),
          React.createElement('p', {
            className: 'text-[16px] md:text-[17px] leading-[1.65] text-[var(--c-ink-muted)] text-pretty',
          }, L(profile.bio)),
          React.createElement('div', { className: 'mt-8 flex flex-wrap items-center gap-3' },
            React.createElement('a', {
              href: cvHref, download: true,
              'data-event': 'document_download', 'data-id': 'cv',
              className: 'inline-flex items-center gap-2 h-11 px-5 bg-[var(--c-ink)] text-[var(--c-paper)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_var(--c-terracotta)] transition-all rounded-sm',
            },
              React.createElement(Download, { size: 14 }),
              t('cta.downloadCv'),
              React.createElement('span', { className: 'font-mono text-[10px] opacity-70' }, locale === 'es' ? '/ ES' : '/ EN'),
            ),
            React.createElement('button', {
              onClick: () => navigate('/contact'),
              className: 'inline-flex items-center gap-2 h-11 px-5 border border-[var(--c-ink)] text-[var(--c-ink)] hover:bg-[var(--c-ink)] hover:text-[var(--c-paper)] transition-colors rounded-sm',
            }, t('cta.contact')),
          ),
        ),
      ),

      // Skills grid
      React.createElement('div', { className: 'mb-8' },
        React.createElement('h2', { className: 'font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--c-ink-soft)] mb-6' }, t('section.skills')),
        React.createElement('div', { className: 'grid sm:grid-cols-2 gap-px bg-[var(--c-rule)] border border-[var(--c-rule)]' },
          ...skills.map((s, i) => React.createElement('div', {
            key: i,
            className: 'bg-[var(--c-paper)] p-6 group hover:bg-[var(--c-paper-raised)] transition-colors',
          },
            React.createElement('div', { className: 'flex items-baseline justify-between mb-4' },
              React.createElement('h3', { className: 'font-display text-[22px] tracking-[-0.01em] text-[var(--c-ink)]' }, L(s.title)),
              React.createElement('span', { className: 'font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--c-ink-soft)]' },
                String(i + 1).padStart(2, '0')),
            ),
            React.createElement('ul', { className: 'flex flex-wrap gap-1.5' },
              ...s.items.map((it, j) => React.createElement('li', {
                key: j,
                className: 'inline-flex px-2 py-0.5 text-[12px] bg-[var(--c-paper-sunken)] border border-[var(--c-rule-strong)] text-[var(--c-ink)] rounded-sm',
              }, it)),
            ),
          )),
        ),
      ),
    );
  }

  Object.assign(window, { About });
})();
