import { useState } from 'react';
import CharacterPanel from './CharacterPanel';
import SpectrumLine from './SpectrumLine';
import { CHARACTER_ORDER } from '../constants/characters';

const BG_WASHES = {
  wraith: 'rgba(90,106,120,0.07)',
  sage:   'rgba(200,146,42,0.07)',
  zealot: 'rgba(200,90,58,0.07)',
};

// What name each card shows beneath its role label
function getSpectrumName(charId, virtue) {
  if (!virtue) return null;
  if (charId === 'wraith') return virtue.deficiency;
  if (charId === 'sage')   return virtue.virtue;
  if (charId === 'zealot') return virtue.excess;
  return null;
}

export default function SpectrumScreen({ virtue, responses, onReset }) {
  const [hoveredChar, setHoveredChar] = useState(null);

  const bgColor = hoveredChar ? BG_WASHES[hoveredChar] : 'transparent';

  return (
    <div style={styles.wrapper}>
      <style>{CSS}</style>

      {/* Global background wash */}
      <div style={{
        ...styles.bgWash,
        background: bgColor,
        transition: 'background 500ms ease',
      }} />

      {/* Three panels — full height, absolute fill */}
      <div style={styles.panels}>
        {CHARACTER_ORDER.map(id => (
          <CharacterPanel
            key={id}
            charId={id}
            response={responses?.[id] || ''}
            spectrumName={getSpectrumName(id, virtue)}
            isHovered={hoveredChar === id}
            isOtherHovered={hoveredChar !== null && hoveredChar !== id}
            onMouseEnter={() => setHoveredChar(id)}
            onMouseLeave={() => setHoveredChar(null)}
          />
        ))}
      </div>

      {/* Overlay: spectrum line + virtue — top center */}
      <div style={styles.overlayTop}>
        <SpectrumLine hoveredChar={hoveredChar} virtue={virtue} />
      </div>

      {/* Overlay: reset button — bottom center */}
      <div style={styles.overlayBottom}>
        <button
          style={styles.resetBtn}
          onClick={onReset}
          onMouseEnter={e => {
            e.currentTarget.style.color = '#c8922a';
            e.currentTarget.style.borderColor = 'rgba(200,146,42,0.5)';
            e.currentTarget.style.background = 'rgba(200,146,42,0.08)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = '#5a5652';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.background = 'rgba(15,14,12,0.7)';
          }}
        >
          New dilemma →
        </button>
      </div>
    </div>
  );
}

const CSS = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const styles = {
  wrapper: {
    position: 'relative',
    height: '100vh',
    overflow: 'hidden',
    background: '#0f0e0c',
    animation: 'fadeInUp 500ms ease forwards',
  },
  bgWash: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    zIndex: 0,
  },
  panels: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    zIndex: 1,
  },
  overlayTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    display: 'flex',
    justifyContent: 'center',
    padding: '0 48px',
    // Frosted backdrop so the spectrum line reads over any card content
    background: 'linear-gradient(to bottom, rgba(15,14,12,0.85) 60%, transparent)',
    pointerEvents: 'none',
  },
  overlayBottom: {
    position: 'absolute',
    bottom: '28px',
    left: 0,
    right: 0,
    zIndex: 10,
    display: 'flex',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  resetBtn: {
    pointerEvents: 'auto',
    background: 'rgba(15,14,12,0.7)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '3px',
    color: '#5a5652',
    fontFamily: "'DM Sans', system-ui, sans-serif",
    fontSize: '11px',
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    padding: '8px 20px',
    cursor: 'pointer',
    transition: 'color 300ms ease, border-color 300ms ease, background 300ms ease',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  },
};
