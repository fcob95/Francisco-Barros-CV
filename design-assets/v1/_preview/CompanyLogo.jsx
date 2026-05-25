// _preview/CompanyLogo.jsx
// Monocromo SVG wordmarks for trust signals. Render in ink (currentColor).
// Placeholder marks — swap for real brand assets in production.

(function() {
  function CompanyLogo({ company, size = 18, variant = 'full', className, style }) {
    const isIcon = variant === 'icon';
    const props = {
      height: size,
      viewBox: isIcon ? '0 0 24 24' : '0 0 120 28',
      fill: 'none',
      className, style: { color: 'currentColor', verticalAlign: 'middle', ...style },
      'aria-label': company,
    };

    if (company === 'movistar' || company === 'telefonica') {
      return React.createElement('svg', props,
        React.createElement('g', { fill: 'currentColor' },
          isIcon
            ? React.createElement(React.Fragment, null,
                React.createElement('path', { d: 'M3 19 L3 5 L7 5 L12 14 L17 5 L21 5 L21 19 L17.5 19 L17.5 10 L13.5 18 L10.5 18 L6.5 10 L6.5 19 Z' }),
                React.createElement('path', { d: 'M4 21 Q12 24 20 21', stroke: 'currentColor', strokeWidth: 1.4, fill: 'none' }),
              )
            : React.createElement(React.Fragment, null,
                React.createElement('path', { d: 'M2 22 L2 6 L7 6 L12 16 L17 6 L22 6 L22 22 L18 22 L18 12 L14 21 L10 21 L6 12 L6 22 Z' }),
                React.createElement('path', { d: 'M3 24 Q12 27 21 24', stroke: 'currentColor', strokeWidth: 1.5, fill: 'none' }),
                React.createElement('text', { x: 28, y: 19, fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, letterSpacing: 0.3, fill: 'currentColor' }, 'movistar'),
              ),
        ),
      );
    }

    if (company === 'cocha') {
      return React.createElement('svg', props,
        React.createElement('g', { fill: 'currentColor' },
          isIcon
            ? React.createElement('path', { d: 'M3 12 L11 4 L11 9 L20 9 L20 15 L11 15 L11 20 Z' })
            : React.createElement(React.Fragment, null,
                React.createElement('path', { d: 'M2 14 L8 8 L8 11 L14 11 L14 17 L8 17 L8 20 Z' }),
                React.createElement('text', { x: 19, y: 19, fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: 1.2, fill: 'currentColor' }, 'COCHA'),
                React.createElement('text', { x: 19, y: 26, fontFamily: 'JetBrains Mono, monospace', fontSize: 6, letterSpacing: 1.5, fill: 'currentColor', opacity: 0.55 }, 'TRAVEL'),
              ),
        ),
      );
    }

    if (company === 'skinautica') {
      return React.createElement('svg', props,
        React.createElement('g', { fill: 'currentColor' },
          isIcon
            ? React.createElement(React.Fragment, null,
                React.createElement('circle', { cx: 12, cy: 12, r: 9, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 }),
                React.createElement('circle', { cx: 12, cy: 12, r: 3, fill: 'currentColor' }),
              )
            : React.createElement(React.Fragment, null,
                React.createElement('circle', { cx: 10, cy: 14, r: 7, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 }),
                React.createElement('circle', { cx: 10, cy: 14, r: 2.5, fill: 'currentColor' }),
                React.createElement('text', { x: 22, y: 19, fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, letterSpacing: 0.6, fill: 'currentColor' }, 'Skinautica'),
              ),
        ),
      );
    }

    return null;
  }

  Object.assign(window, { CompanyLogo });
})();
