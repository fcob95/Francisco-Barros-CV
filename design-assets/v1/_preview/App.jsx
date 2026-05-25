// _preview/App.jsx — router-stub + theme management + cookie state.

(function() {
  const { useState, useEffect } = React;
  const { Header, Footer, Hero, About, ProjectsList, ProjectDetail, Experience, Contact,
          NotFound, Privacy, CookieBanner, OGImage, LocaleProvider, useLocale } = window;

  function App() {
    // route is a string: '/', '/about', '/projects', '/projects/<slug>', '/experience', '/contact', '/privacy', '/404', '/og-image'
    const [route, setRoute] = useState(() => {
      // restore from hash
      const h = window.location.hash.slice(1);
      return h && h.startsWith('/') ? h : '/';
    });
    const [theme, setTheme] = useState(() => {
      try { return localStorage.getItem('fb-theme') || 'light'; } catch { return 'light'; }
    });
    const [cookieDecided, setCookieDecided] = useState(() => {
      try { return !!localStorage.getItem('fb-cookies'); } catch { return false; }
    });
    const [cookiesOpen, setCookiesOpen] = useState(false);
    const [previewNavOpen, setPreviewNavOpen] = useState(false);

    useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
      try { localStorage.setItem('fb-theme', theme); } catch {}
    }, [theme]);

    useEffect(() => {
      const onHash = () => {
        const h = window.location.hash.slice(1);
        if (h && h.startsWith('/')) setRoute(h);
      };
      window.addEventListener('hashchange', onHash);
      return () => window.removeEventListener('hashchange', onHash);
    }, []);

    useEffect(() => {
      if (window.location.hash !== '#' + route) {
        window.location.hash = route;
      }
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, [route]);

    useEffect(() => {
      if (!cookieDecided) {
        const id = setTimeout(() => setCookiesOpen(true), 1400);
        return () => clearTimeout(id);
      }
    }, [cookieDecided]);

    const navigate = (href) => setRoute(href);

    const onCookieDecide = (choice) => {
      try { localStorage.setItem('fb-cookies', choice); } catch {}
      setCookieDecided(true); setCookiesOpen(false);
    };

    // route matching
    let view;
    if (route === '/') view = React.createElement(Hero, { navigate });
    else if (route === '/about') view = React.createElement(About, { navigate });
    else if (route === '/projects') view = React.createElement(ProjectsList, { navigate });
    else if (route.startsWith('/projects/')) view = React.createElement(ProjectDetail, { slug: route.slice('/projects/'.length), navigate });
    else if (route === '/experience') view = React.createElement(Experience, { navigate });
    else if (route === '/contact') view = React.createElement(Contact, { navigate });
    else if (route === '/privacy') view = React.createElement(Privacy, { navigate });
    else if (route === '/og-image') view = React.createElement(OGImageView, { theme, setTheme });
    else view = React.createElement(NotFound, { navigate });

    const isOG = route === '/og-image';

    return React.createElement(React.Fragment, null,
      !isOG && React.createElement(Header, { route, navigate, theme, setTheme }),
      React.createElement('main', { className: 'min-h-[60vh]' }, view),
      !isOG && React.createElement(Footer, { navigate, openCookies: () => setCookiesOpen(true) }),
      !isOG && React.createElement(CookieBanner, {
        open: cookiesOpen, onDecide: onCookieDecide, navigate,
      }),
      React.createElement(PreviewNavigator, {
        route, navigate, open: previewNavOpen, setOpen: setPreviewNavOpen,
      }),
    );
  }

  function OGImageView({ theme, setTheme }) {
    const [locale, setLocale] = React.useState('es');
    return React.createElement('div', { className: 'p-8 max-w-[1320px] mx-auto' },
      React.createElement('div', { className: 'mb-6 flex items-center justify-between' },
        React.createElement('h1', { className: 'font-display text-3xl tracking-[-0.01em]' }, 'OG image · 1200 × 630'),
        React.createElement('div', { className: 'flex items-center gap-2' },
          React.createElement('button', {
            onClick: () => setLocale(l => l === 'es' ? 'en' : 'es'),
            className: 'h-9 px-3 text-xs font-mono uppercase tracking-[0.1em] border border-[var(--c-rule-strong)] rounded-sm',
          }, locale.toUpperCase()),
        ),
      ),
      React.createElement('div', { className: 'border border-[var(--c-ink)]', style: { boxShadow: '6px 6px 0 0 var(--c-ink)' } },
        React.createElement(window.OGImage, { locale }),
      ),
      React.createElement('p', { className: 'mt-4 text-sm text-[var(--c-ink-muted)]' },
        'Para producción: capturar a 1200×630 con next/og o html-to-image. Las fonts ya están cargadas.'),
    );
  }

  // Floating "review every route" navigator — for design review only; not part of production.
  function PreviewNavigator({ route, navigate, open, setOpen }) {
    const routes = [
      ['/', 'Home'],
      ['/about', 'About'],
      ['/projects', 'Projects'],
      ['/projects/trustonic-movistar', '— Trustonic (case)'],
      ['/projects/ndc-cocha-travel', '— NDC (case)'],
      ['/projects/finanzas-flow', '— Finanzas Flow (side)'],
      ['/experience', 'Experience'],
      ['/contact', 'Contact'],
      ['/privacy', 'Privacy'],
      ['/404', '404'],
      ['/og-image', 'OG image'],
    ];
    return React.createElement('div', {
      className: 'fixed bottom-4 left-4 z-50 font-mono text-[11px]',
    },
      open && React.createElement('div', {
        className: 'mb-2 bg-[var(--c-paper-raised)] border border-[var(--c-ink)] p-2 min-w-[220px]',
        style: { boxShadow: '4px 4px 0 0 var(--c-ink)' },
      },
        React.createElement('div', { className: 'px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-[var(--c-ink-soft)] border-b border-[var(--c-rule)] mb-1' },
          'Preview · routes'),
        ...routes.map(([href, label]) => React.createElement('button', {
          key: href,
          onClick: () => { navigate(href); setOpen(false); },
          className: [
            'block w-full text-left px-2 py-1 hover:bg-[var(--c-paper-sunken)] truncate',
            route === href ? 'text-[var(--c-terracotta-ink)] font-medium' : 'text-[var(--c-ink-muted)]',
          ].join(' '),
        }, label)),
      ),
      React.createElement('button', {
        onClick: () => setOpen(o => !o),
        className: 'inline-flex items-center gap-2 px-3 h-8 bg-[var(--c-ink)] text-[var(--c-paper)] uppercase tracking-[0.1em]',
        style: { boxShadow: '3px 3px 0 0 var(--c-terracotta)' },
      },
        React.createElement('span', { className: 'inline-block w-1.5 h-1.5 bg-[var(--c-terracotta)]' }),
        open ? 'Close' : 'Routes · ' + route,
      ),
    );
  }

  // Mount — DOMContentLoaded has already fired by the time Babel finishes,
  // so mount synchronously.
  Object.assign(window, { App });
  const __root = ReactDOM.createRoot(document.getElementById('root'));
  __root.render(React.createElement(LocaleProvider, null, React.createElement(App)));
})();
