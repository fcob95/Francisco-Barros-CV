// _preview/Header.jsx — site chrome: brand mark + nav + locale + theme + mobile sheet.

(function() {
  const { useState, useEffect } = React;
  const { useLocale, t, motion, Globe, Sun, Moon, Menu, X } = window;

  function BrandMark({ onClick }) {
    return React.createElement('button', {
      onClick, className: 'group inline-flex items-baseline gap-2.5 select-none',
      'aria-label': 'Francisco Barros — Home',
    },
      React.createElement('span', { className: 'inline-block w-2 h-2 bg-[var(--c-terracotta)] translate-y-[-2px] transition-transform group-hover:rotate-45' }),
      React.createElement('span', { className: 'font-display text-[20px] tracking-[-0.01em] text-[var(--c-ink)]' }, 'Francisco Barros'),
    );
  }

  function NavLink({ href, current, onClick, children }) {
    const active = current === href;
    return React.createElement('button', {
      onClick: () => onClick(href),
      className: [
        'relative px-2 py-1 text-sm transition-colors',
        active ? 'text-[var(--c-ink)]' : 'text-[var(--c-ink-muted)] hover:text-[var(--c-ink)]',
      ].join(' '),
    },
      children,
      active && React.createElement('span', {
        className: 'absolute -bottom-0.5 left-2 right-2 h-px bg-[var(--c-terracotta)]',
      }),
    );
  }

  function LocaleSwitch() {
    const { locale, setLocale } = useLocale();
    return React.createElement('div', {
      className: 'inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--c-ink-muted)] select-none',
      role: 'group', 'aria-label': 'Language',
    },
      React.createElement('span', { className: 'opacity-50' }, '['),
      React.createElement('button', {
        onClick: () => setLocale('es'),
        'aria-pressed': locale === 'es',
        className: `transition-colors ${locale === 'es' ? 'text-[var(--c-terracotta-ink)] font-medium' : 'hover:text-[var(--c-ink)]'}`,
      }, 'ES'),
      React.createElement('span', { className: 'opacity-50' }, '/'),
      React.createElement('button', {
        onClick: () => setLocale('en'),
        'aria-pressed': locale === 'en',
        className: `transition-colors ${locale === 'en' ? 'text-[var(--c-terracotta-ink)] font-medium' : 'hover:text-[var(--c-ink)]'}`,
      }, 'EN'),
      React.createElement('span', { className: 'opacity-50' }, ']'),
    );
  }

  function ThemeToggle({ theme, setTheme }) {
    return React.createElement('button', {
      onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
      className: 'inline-flex items-center justify-center w-9 h-9 border border-[var(--c-rule)] text-[var(--c-ink-muted)] hover:text-[var(--c-ink)] hover:border-[var(--c-rule-strong)] transition-colors rounded-sm',
      'aria-label': theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
    }, theme === 'dark' ? React.createElement(Sun, { size: 16 }) : React.createElement(Moon, { size: 16 }));
  }

  function Header({ route, navigate, theme, setTheme }) {
    const [open, setOpen] = useState(false);
    const links = [
      ['/', t('nav.home')],
      ['/about', t('nav.about')],
      ['/projects', t('nav.projects')],
      ['/experience', t('nav.experience')],
      ['/contact', t('nav.contact')],
    ];
    const go = (href) => { setOpen(false); navigate(href); };

    return React.createElement('header', {
      className: 'sticky top-0 z-20 backdrop-blur-md bg-[color-mix(in_oklab,var(--c-paper)_88%,transparent)] border-b border-[var(--c-rule)]',
    },
      React.createElement('div', { className: 'max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 h-14 md:h-16 flex items-center justify-between gap-4' },
        React.createElement(BrandMark, { onClick: () => go('/') }),
        // Desktop nav
        React.createElement('nav', { className: 'hidden md:flex items-center gap-1' },
          ...links.map(([href, label]) => React.createElement(NavLink, { key: href, href, current: route, onClick: go }, label)),
        ),
        // Right cluster
        React.createElement('div', { className: 'flex items-center gap-2 md:gap-3' },
          React.createElement(LocaleSwitch, null),
          React.createElement('span', { className: 'hidden md:inline-block w-px h-5 bg-[var(--c-rule)]' }),
          React.createElement(ThemeToggle, { theme, setTheme }),
          // Mobile hamburger
          React.createElement('button', {
            onClick: () => setOpen(o => !o),
            className: 'md:hidden inline-flex items-center justify-center w-9 h-9 border border-[var(--c-rule)] text-[var(--c-ink)] rounded-sm',
            'aria-label': open ? 'Close menu' : 'Open menu',
            'aria-expanded': open,
          }, open ? React.createElement(X, { size: 16 }) : React.createElement(Menu, { size: 16 })),
        ),
      ),
      // Mobile sheet
      open && React.createElement('div', { className: 'md:hidden border-t border-[var(--c-rule)] bg-[var(--c-paper)]' },
        React.createElement('nav', { className: 'px-5 py-3 flex flex-col gap-1' },
          ...links.map(([href, label]) => React.createElement('button', {
            key: href, onClick: () => go(href),
            className: [
              'text-left py-2.5 text-[15px] border-b border-[var(--c-rule)] last:border-b-0',
              route === href ? 'text-[var(--c-ink)] font-medium' : 'text-[var(--c-ink-muted)]',
            ].join(' '),
          },
            route === href && React.createElement('span', { className: 'inline-block w-1.5 h-1.5 bg-[var(--c-terracotta)] mr-2 translate-y-[-2px]' }),
            label,
          )),
        ),
      ),
    );
  }

  Object.assign(window, { Header });
})();
