// _preview/stubs.jsx — shadcn + lucide + framer-motion + i18n stubs for the preview.
// In the real codebase these come from @/components/ui/*, lucide-react, framer-motion, next-intl.

(function() {
  const { useState, useEffect, useRef, createContext, useContext } = React;

  // ─── i18n stub ────────────────────────────────────────────────────────────
  // t() and L() are PURE — they read from a module-level locale. Components
  // call useLocale() at the top to subscribe and trigger re-renders;
  // t()/L() never call hooks, so they're safe in conditional JSX.
  let __locale = 'es';
  const LocaleCtx = createContext({ locale: 'es', setLocale: () => {} });
  function LocaleProvider({ children }) {
    const [locale, setLocale] = useState('es');
    useEffect(() => { __locale = locale; }, [locale]);
    return React.createElement(LocaleCtx.Provider, { value: { locale, setLocale } }, children);
  }
  function useLocale() { return useContext(LocaleCtx); }

  function t(key) {
    const dict = window.__DICT || {};
    const entry = key.split('.').reduce((o, k) => (o && o[k] != null ? o[k] : null), dict);
    if (entry == null) return key;
    if (typeof entry === 'string') return entry;
    return entry[__locale] ?? entry.es ?? key;
  }
  function L(obj) {
    if (obj == null) return '';
    if (typeof obj === 'string') return obj;
    return obj[__locale] ?? obj.es ?? '';
  }

  // ─── reduced motion ───────────────────────────────────────────────────────
  function useReducedMotion() {
    const [r, setR] = useState(false);
    useEffect(() => {
      const m = window.matchMedia('(prefers-reduced-motion: reduce)');
      const on = () => setR(m.matches);
      on(); m.addEventListener('change', on);
      return () => m.removeEventListener('change', on);
    }, []);
    return r;
  }

  // ─── Framer-motion stub: minimal motion.* that uses CSS transitions ────────
  function makeMotion(tag) {
    return React.forwardRef(function MotionEl({
      initial, animate, exit, transition, whileHover, whileTap, variants,
      style, className, children, ...rest
    }, ref) {
      const reduce = useReducedMotion();
      const [visible, setVisible] = useState(false);
      useEffect(() => {
        const id = requestAnimationFrame(() => setVisible(true));
        return () => cancelAnimationFrame(id);
      }, []);
      // resolve variants object → state name → style
      const resolveVar = (key) => {
        if (variants && typeof key === 'string') return variants[key];
        return key;
      };
      const initialStyle = reduce ? {} : (resolveVar(initial) || {});
      const animateStyle = reduce ? {} : (resolveVar(animate) || {});
      const target = visible ? animateStyle : initialStyle;
      const dur = (transition?.duration ?? 0.32);
      const delay = (transition?.delay ?? 0);
      const mergedStyle = {
        transition: reduce ? 'none' : `transform ${dur}s cubic-bezier(.32,.72,0,1) ${delay}s, opacity ${dur}s cubic-bezier(.32,.72,0,1) ${delay}s`,
        ...style,
        ...(target.opacity != null ? { opacity: target.opacity } : initialStyle.opacity != null ? { opacity: initialStyle.opacity } : {}),
        transform: [
          target.x != null ? `translateX(${target.x}px)` : initialStyle.x != null ? `translateX(${initialStyle.x}px)` : '',
          target.y != null ? `translateY(${target.y}px)` : initialStyle.y != null ? `translateY(${initialStyle.y}px)` : '',
          target.rotate != null ? `rotate(${target.rotate}deg)` : '',
          target.scale != null ? `scale(${target.scale})` : '',
        ].filter(Boolean).join(' ') || (style?.transform ?? 'none'),
      };
      return React.createElement(tag, { ref, className, style: mergedStyle, ...rest }, children);
    });
  }
  const motion = new Proxy({}, { get: (_, tag) => makeMotion(tag) });

  // ─── Inline icon set (subset of lucide we use) ────────────────────────────
  const ic = (path, extra) => React.forwardRef(function Icon({ size = 16, strokeWidth = 1.75, className, style, ...rest }, ref) {
    return React.createElement('svg', {
      ref, width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
      stroke: 'currentColor', strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round',
      className, style: { display: 'inline-block', verticalAlign: '-0.125em', ...style }, ...rest,
    }, React.createElement(React.Fragment, null,
      typeof path === 'string'
        ? React.createElement('path', { d: path })
        : path,
      extra
    ));
  });
  const ArrowUpRight = ic('M7 17L17 7M8 7h9v9');
  const ArrowRight = ic('M5 12h14M13 5l7 7-7 7');
  const ArrowLeft = ic('M19 12H5M12 19l-7-7 7-7');
  const ArrowDown = ic('M12 5v14M19 12l-7 7-7-7');
  const Download = ic('M12 3v12m0 0l-4-4m4 4l4-4M5 21h14');
  const Mail = ic([
    React.createElement('rect', { key: 'r', x: 3, y: 5, width: 18, height: 14, rx: 1 }),
    React.createElement('path', { key: 'p', d: 'M3 7l9 6 9-6' }),
  ]);
  const Linkedin = ic([
    React.createElement('rect', { key: 'r', x: 3, y: 3, width: 18, height: 18, rx: 1 }),
    React.createElement('path', { key: 'p1', d: 'M8 10v7M8 7v.01' }),
    React.createElement('path', { key: 'p2', d: 'M12 17v-3a2 2 0 014 0v3M12 10v7' }),
  ]);
  const Github = ic('M9 19c-4 1.5-4-2-6-2m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 00-1.3-3.2 4.2 4.2 0 00-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 00-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 00-.1 3.2A4.6 4.6 0 004 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21');
  const Sun = ic([
    React.createElement('circle', { key: 'c', cx: 12, cy: 12, r: 4 }),
    React.createElement('path', { key: 'p', d: 'M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41' }),
  ]);
  const Moon = ic('M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z');
  const Menu = ic('M4 6h16M4 12h16M4 18h16');
  const X = ic('M18 6L6 18M6 6l12 12');
  const Search = ic([
    React.createElement('circle', { key: 'c', cx: 11, cy: 11, r: 7 }),
    React.createElement('path', { key: 'p', d: 'M21 21l-4.3-4.3' }),
  ]);
  const Sparkles = ic('M12 3l1.8 4.7L18 9.5l-4.2 1.8L12 16l-1.8-4.7L6 9.5l4.2-1.8L12 3zM5 17l.9 2.3L8 20l-2.1.7L5 23l-.9-2.3L2 20l2.1-.7L5 17zM19 14l.7 1.8L21 16l-1.3.5L19 18l-.7-1.7L17 16l1.3-.5L19 14z');
  const Code = ic('M16 18l6-6-6-6M8 6l-6 6 6 6');
  const Database = ic([
    React.createElement('ellipse', { key: 'e', cx: 12, cy: 5, rx: 9, ry: 3 }),
    React.createElement('path', { key: 'p1', d: 'M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5' }),
    React.createElement('path', { key: 'p2', d: 'M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6' }),
  ]);
  const TrendingUp = ic('M3 17l6-6 4 4 8-8M14 7h7v7');
  const Check = ic('M5 13l4 4L19 7');
  const Filter = ic('M3 5h18l-7 8v6l-4-2v-4L3 5z');
  const Globe = ic([
    React.createElement('circle', { key: 'c', cx: 12, cy: 12, r: 9 }),
    React.createElement('path', { key: 'p', d: 'M3 12h18M12 3a13 13 0 010 18M12 3a13 13 0 000 18' }),
  ]);
  const ChevronDown = ic('M6 9l6 6 6-6');
  const ChevronRight = ic('M9 6l6 6-6 6');
  const MapPin = ic([
    React.createElement('path', { key: 'p', d: 'M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z' }),
    React.createElement('circle', { key: 'c', cx: 12, cy: 9, r: 2.5 }),
  ]);
  const Calendar = ic([
    React.createElement('rect', { key: 'r', x: 3, y: 5, width: 18, height: 16, rx: 1 }),
    React.createElement('path', { key: 'p', d: 'M3 9h18M8 3v4M16 3v4' }),
  ]);
  const Briefcase = ic([
    React.createElement('rect', { key: 'r', x: 3, y: 7, width: 18, height: 13, rx: 1 }),
    React.createElement('path', { key: 'p', d: 'M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 13h18' }),
  ]);

  // ─── shadcn-like primitives (stubs that match the look) ────────────────────
  function cx(...xs) { return xs.filter(Boolean).join(' '); }

  function Button({ variant = 'default', size = 'md', as = 'button', className, children, ...rest }) {
    const base = 'inline-flex items-center justify-center gap-2 font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--c-paper)] disabled:opacity-50 disabled:pointer-events-none';
    const sizes = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-11 px-5 text-[15px]',
      lg: 'h-12 px-6 text-base',
    };
    const variants = {
      default: 'bg-[var(--c-ink)] text-[var(--c-paper)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_var(--c-terracotta)]',
      accent:  'bg-[var(--c-terracotta)] text-white hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_var(--c-ink)]',
      outline: 'border border-[var(--c-ink)] text-[var(--c-ink)] hover:bg-[var(--c-ink)] hover:text-[var(--c-paper)]',
      ghost:   'text-[var(--c-ink)] hover:bg-[var(--c-paper-sunken)]',
      link:    'text-[var(--c-terracotta-ink)] underline-offset-4 hover:underline px-0 h-auto',
    };
    const Tag = as;
    return React.createElement(Tag, { className: cx(base, sizes[size], variants[variant], className), ...rest }, children);
  }

  function Badge({ tone = 'neutral', className, children, ...rest }) {
    const tones = {
      neutral:    'bg-[var(--c-paper-sunken)] text-[var(--c-ink-muted)] border-[var(--c-rule)]',
      accent:     'bg-[var(--c-terracotta)]/10 text-[var(--c-terracotta-ink)] border-[var(--c-terracotta)]/30',
      ocean:      'bg-[var(--c-ocean)]/10 text-[var(--c-ocean)] border-[var(--c-ocean)]/30',
      mono:       'bg-transparent text-[var(--c-ink-muted)] border-[var(--c-rule-strong)] font-mono uppercase tracking-[0.08em] text-[10px]',
    };
    return React.createElement('span', {
      className: cx('inline-flex items-center gap-1 px-2 py-0.5 text-xs border rounded-sm', tones[tone], className),
      ...rest,
    }, children);
  }

  function Card({ className, children, ...rest }) {
    return React.createElement('div', {
      className: cx('bg-[var(--c-paper-raised)] border border-[var(--c-rule)]', className), ...rest,
    }, children);
  }

  function Separator({ className, vertical = false, ...rest }) {
    return React.createElement('div', {
      className: cx(vertical ? 'w-px h-full' : 'h-px w-full', 'bg-[var(--c-rule)]', className), ...rest,
    });
  }

  function Avatar({ size = 56, name = '', src, className }) {
    const initials = name.split(' ').map(s => s[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
    return React.createElement('div', {
      className: cx('relative inline-flex items-center justify-center bg-[var(--c-paper-sunken)] border border-[var(--c-rule-strong)] font-display select-none', className),
      style: { width: size, height: size, borderRadius: 2 },
    }, src
      ? React.createElement('img', { src, alt: name, className: 'w-full h-full object-cover' })
      : React.createElement('span', { style: { fontSize: size * 0.4, color: 'var(--c-ink)' } }, initials)
    );
  }

  function Input(props) {
    return React.createElement('input', {
      ...props,
      className: cx('w-full h-11 px-3 bg-[var(--c-paper-sunken)] border border-[var(--c-rule-strong)] text-[var(--c-ink)] placeholder:text-[var(--c-ink-soft)] outline-none focus:border-[var(--c-ink)] focus:ring-2 focus:ring-[var(--c-focus)] focus:ring-offset-2 focus:ring-offset-[var(--c-paper)] rounded-sm', props.className),
    });
  }
  function Textarea(props) {
    return React.createElement('textarea', {
      ...props,
      className: cx('w-full px-3 py-2.5 bg-[var(--c-paper-sunken)] border border-[var(--c-rule-strong)] text-[var(--c-ink)] placeholder:text-[var(--c-ink-soft)] outline-none focus:border-[var(--c-ink)] focus:ring-2 focus:ring-[var(--c-focus)] focus:ring-offset-2 focus:ring-offset-[var(--c-paper)] rounded-sm resize-y', props.className),
    });
  }
  function Label({ className, children, ...rest }) {
    return React.createElement('label', {
      className: cx('text-xs font-mono uppercase tracking-[0.08em] text-[var(--c-ink-muted)]', className), ...rest,
    }, children);
  }

  // ─── Page-section wrapper (numbered editorial headers) ────────────────────
  function PageSection({ id, num, kicker, title, children, className }) {
    return React.createElement('section', {
      id, className: cx('relative px-5 md:px-8 lg:px-12 py-16 md:py-24 max-w-[1240px] mx-auto', className),
    },
      React.createElement('header', { className: 'mb-10 md:mb-16' },
        num != null && React.createElement('div', { className: 'flex items-baseline gap-3 mb-3' },
          React.createElement('span', { className: 'font-mono text-xs uppercase tracking-[0.12em] text-[var(--c-ink-soft)]' }, num),
          React.createElement('span', { className: 'h-px flex-1 bg-[var(--c-rule)]' }),
          kicker && React.createElement('span', { className: 'font-mono text-xs uppercase tracking-[0.12em] text-[var(--c-ink-soft)]' }, kicker),
        ),
        title && React.createElement('h2', { className: 'font-display text-4xl md:text-5xl lg:text-6xl tracking-[-0.01em] text-[var(--c-ink)] leading-[1.02]' }, title),
      ),
      children
    );
  }

  // ─── Export ───────────────────────────────────────────────────────────────
  Object.assign(window, {
    LocaleProvider, LocaleCtx, useLocale, t, L, useReducedMotion, motion,
    Button, Badge, Card, Separator, Avatar, Input, Textarea, Label,
    PageSection,
    ArrowUpRight, ArrowRight, ArrowLeft, ArrowDown, Download, Mail, Linkedin, Github,
    Sun, Moon, Menu, X, Search, Sparkles, Code, Database, TrendingUp, Check, Filter,
    Globe, ChevronDown, ChevronRight, MapPin, Calendar, Briefcase,
  });
})();
