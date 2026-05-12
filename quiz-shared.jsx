// Shared components: logo, progress bar, image placeholder, header
const { useState, useEffect, useRef, useMemo } = React;

function Logo({ small }) {
  return (
    <div style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 800,
      letterSpacing: '0.22em',
      fontSize: small ? 14 : 17,
      color: 'var(--ink-900)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
    }}>
      <span style={{
        display: 'inline-block', width: small ? 6 : 8, height: small ? 6 : 8,
        background: 'var(--green-500)', borderRadius: 2, transform: 'rotate(45deg)'
      }} />
      LEDEBUT
    </div>
  );
}

function TopBar({ progress, onBack, canBack }) {
  return (
    <div style={{
      padding: '14px 20px 12px',
      background: 'white',
      borderBottom: '1px solid var(--ink-100)',
      position: 'sticky', top: 0, zIndex: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: progress != null ? 12 : 0 }}>
        <div style={{ width: 32, display: 'flex', justifyContent: 'flex-start' }}>
          {canBack && (
            <button onClick={onBack} aria-label="Voltar" style={{
              width: 28, height: 28, borderRadius: 999, background: 'var(--ink-50)',
              display: 'grid', placeItems: 'center', color: 'var(--ink-700)'
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
          )}
        </div>
        <Logo />
        <div style={{ width: 32, display: 'flex', justifyContent: 'flex-end' }}>
          <span style={{ fontSize: 10, color: 'var(--ink-400)', fontWeight: 600 }}>SSL</span>
        </div>
      </div>
      {progress != null && (
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  );
}

function ImgPlaceholder({ label, ratio = '16/10', style }) {
  return (
    <div className="img-ph" style={{ aspectRatio: ratio, width: '100%', ...style }}>
      <div>
        <div style={{ fontSize: 14, color: 'var(--ink-500)', marginBottom: 4 }}>◧</div>
        [imagem] {label}
      </div>
    </div>
  );
}

function RadioCard({ children, selected, onClick, leadingIcon, sub }) {
  return (
    <button
      onClick={onClick}
      className={`card-option ${selected ? 'selected' : ''}`}
      style={{
        width: '100%',
        background: 'white',
        border: '1.5px solid var(--ink-200)',
        borderRadius: 14,
        padding: '14px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        textAlign: 'left',
      }}>
      <span style={{
        width: 22, height: 22, borderRadius: 999, flexShrink: 0,
        border: selected ? '6px solid var(--green-500)' : '2px solid var(--ink-200)',
        background: 'white',
        transition: 'all .15s',
      }} />
      {leadingIcon && (
        <div style={{ flexShrink: 0 }}>{leadingIcon}</div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--ink-900)' }}>{children}</div>
        {sub && <div className="small" style={{ marginTop: 2 }}>{sub}</div>}
      </div>
    </button>
  );
}

// Tiny inline curl SVG icons
function CurlIcon({ type }) {
  const paths = {
    crespo:    "M4 6 q2 -2 4 0 q2 2 4 0 q2 -2 4 0 q2 2 4 0 M4 12 q2 -2 4 0 q2 2 4 0 q2 -2 4 0 q2 2 4 0 M4 18 q2 -2 4 0 q2 2 4 0 q2 -2 4 0 q2 2 4 0",
    cacheado:  "M4 6 q3 -3 6 0 q3 3 6 0 q3 -3 6 0 M4 12 q3 -3 6 0 q3 3 6 0 q3 -3 6 0 M4 18 q3 -3 6 0 q3 3 6 0 q3 -3 6 0",
    ondulado:  "M3 7 q4 -3 8 0 q4 3 9 0 M3 13 q4 -3 8 0 q4 3 9 0 M3 19 q4 -3 8 0 q4 3 9 0",
    liso:      "M5 4 v16 M10 4 v16 M15 4 v16 M19 4 v16",
  };
  return (
    <div style={{
      width: 44, height: 44, borderRadius: 12,
      background: 'var(--ink-50)', border: '1px solid var(--ink-100)',
      display: 'grid', placeItems: 'center', color: 'var(--ink-700)'
    }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d={paths[type]} />
      </svg>
    </div>
  );
}

function formatMMSS(s) {
  const m = Math.floor(s/60);
  const r = s % 60;
  return `${String(m).padStart(2,'0')}:${String(r).padStart(2,'0')}`;
}

function useCountdown(initialSeconds) {
  const [s, setS] = useState(initialSeconds);
  useEffect(() => {
    const id = setInterval(() => setS(v => v > 0 ? v - 1 : 0), 1000);
    return () => clearInterval(id);
  }, []);
  return s;
}

Object.assign(window, { Logo, TopBar, ImgPlaceholder, RadioCard, CurlIcon, formatMMSS, useCountdown });
