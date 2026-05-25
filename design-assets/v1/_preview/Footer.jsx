// _preview/Footer.jsx — bottom chrome with socials, CV, privacy.

(function() {
  const { useLocale, t, L, Linkedin, Github, Mail, ArrowUpRight, Download } = window;

  function Footer({ navigate, openCookies }) {
    const profile = window.__PROFILE;
    const { locale } = useLocale();
    const cvHref = profile.cvUrl[locale] ?? profile.cvUrl.es;

    const socialIcon = {
      linkedin: Linkedin, github: Github, email: Mail,
    };

    return React.createElement('footer', {
      className: 'border-t border-[var(--c-rule)] bg-[var(--c-paper)] mt-24',
    },
      React.createElement('div', { className: 'max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 py-12 md:py-16' },
        // Top row — manifesto + actions
        React.createElement('div', { className: 'grid md:grid-cols-12 gap-8 md:gap-12 mb-12' },
          React.createElement('div', { className: 'md:col-span-7' },
            React.createElement('div', { className: 'font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--c-ink-soft)] mb-3' }, '— Fin'),
            React.createElement('p', { className: 'font-display text-3xl md:text-4xl tracking-[-0.01em] text-[var(--c-ink)] leading-[1.1] text-balance' },
              locale === 'es'
                ? 'Si hay un problema de pricing, datos o adopción de IA que vale la pena resolver, escríbeme.'
                : 'If there is a pricing, data or AI-adoption problem worth solving, write to me.'
            ),
          ),
          React.createElement('div', { className: 'md:col-span-5 flex md:justify-end' },
            React.createElement('div', { className: 'flex flex-col gap-3' },
              React.createElement('a', {
                href: cvHref, download: true,
                'data-event': 'document_download', 'data-id': 'cv',
                className: 'inline-flex items-center gap-2 text-sm border border-[var(--c-ink)] text-[var(--c-ink)] px-4 h-11 hover:bg-[var(--c-ink)] hover:text-[var(--c-paper)] transition-colors rounded-sm self-start md:self-end',
              },
                React.createElement(Download, { size: 14 }),
                t('cta.downloadCv'),
                React.createElement('span', { className: 'font-mono text-[10px] opacity-60' }, locale === 'es' ? '/ ES' : '/ EN'),
              ),
              React.createElement('button', {
                onClick: () => navigate('/contact'),
                className: 'inline-flex items-center gap-2 text-sm text-[var(--c-ink-muted)] hover:text-[var(--c-ink)] self-start md:self-end',
              },
                React.createElement(Mail, { size: 14 }),
                profile.email,
              ),
            ),
          ),
        ),
        // Hairline
        React.createElement('div', { className: 'h-px bg-[var(--c-rule)] mb-8' }),
        // Bottom row
        React.createElement('div', { className: 'flex flex-col md:flex-row md:items-center md:justify-between gap-6' },
          React.createElement('div', { className: 'flex items-center gap-4' },
            React.createElement('span', { className: 'font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--c-ink-soft)]' },
              'FB · Santiago — 2026'),
            React.createElement('div', { className: 'flex items-center gap-1' },
              ...profile.socials.map((s) => {
                const Ic = socialIcon[s.platform];
                if (!Ic) return null;
                return React.createElement('a', {
                  key: s.platform, href: s.url, target: '_blank', rel: 'noopener noreferrer',
                  className: 'inline-flex items-center justify-center w-8 h-8 text-[var(--c-ink-muted)] hover:text-[var(--c-terracotta-ink)] transition-colors',
                  'aria-label': s.platform,
                }, React.createElement(Ic, { size: 15 }));
              }),
            ),
          ),
          React.createElement('div', { className: 'flex items-center gap-4 text-[12px] text-[var(--c-ink-muted)]' },
            React.createElement('span', { className: 'text-balance' }, t('footer.built')),
            React.createElement('button', {
              onClick: () => navigate('/privacy'),
              className: 'underline-offset-4 hover:underline hover:text-[var(--c-ink)]',
            }, t('footer.privacy')),
            React.createElement('button', {
              onClick: openCookies,
              className: 'underline-offset-4 hover:underline hover:text-[var(--c-ink)]',
            }, locale === 'es' ? 'Cookies' : 'Cookies'),
          ),
        ),
      ),
    );
  }

  Object.assign(window, { Footer });
})();
