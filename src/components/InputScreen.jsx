import { useState } from 'react';
import { EXAMPLE_SCENARIOS } from '../constants/characters';

export default function InputScreen({ onSubmit, error }) {
  const [text, setText] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>The Golden Mean</h1>
          <p style={styles.subtitle}>Three voices. One spectrum. Every moral decision.</p>
        </div>

        {/* Input arena */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.arenaFrame}>
            <div style={styles.cornerTL} />
            <div style={styles.cornerTR} />
            <div style={styles.cornerBL} />
            <div style={styles.cornerBR} />
            <textarea
              style={styles.textarea}
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Describe your dilemma..."
              rows={4}
              onFocus={e => {
                e.target.style.borderColor = 'rgba(200, 146, 42, 0.4)';
                e.target.style.boxShadow = '0 0 0 1px rgba(200,146,42,0.15), 0 0 30px rgba(200,146,42,0.06)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Example chips */}
          <div style={styles.chipsWrapper}>
            <span style={styles.chipsLabel}>Or try one of these:</span>
            <div style={styles.chips}>
              {EXAMPLE_SCENARIOS.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  style={styles.chip}
                  onClick={() => setText(s)}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(200,146,42,0.5)';
                    e.currentTarget.style.color = '#e8e4dc';
                    e.currentTarget.style.background = 'rgba(200,146,42,0.07)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = '#9a9690';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {s.length > 72 ? s.slice(0, 72) + '…' : s}
                </button>
              ))}
            </div>
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button
            type="submit"
            disabled={!text.trim()}
            style={{
              ...styles.submitBtn,
              opacity: text.trim() ? 1 : 0.4,
              cursor: text.trim() ? 'pointer' : 'not-allowed',
            }}
            onMouseEnter={e => {
              if (!text.trim()) return;
              e.currentTarget.style.background = 'rgba(200,146,42,0.18)';
              e.currentTarget.style.borderColor = 'rgba(200,146,42,0.8)';
              e.currentTarget.style.letterSpacing = '0.12em';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(200,146,42,0.5)';
              e.currentTarget.style.letterSpacing = '0.08em';
            }}
          >
            Dive in →
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '56px 24px 24px',
    background: '#0f0e0c',
  },
  container: {
    width: '100%',
    maxWidth: '660px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '28px',
  },
  header: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  title: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 'clamp(40px, 6vw, 60px)',
    fontWeight: 600,
    color: '#e8e4dc',
    letterSpacing: '0.02em',
    lineHeight: 1.1,
    margin: 0,
  },
  subtitle: {
    fontFamily: "'DM Sans', system-ui, sans-serif",
    fontSize: '13px',
    fontWeight: 300,
    color: '#5a5652',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    margin: 0,
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  arenaFrame: {
    position: 'relative',
    width: '100%',
  },
  cornerTL: {
    position: 'absolute', top: -6, left: -6,
    width: 14, height: 14,
    borderTop: '1px solid rgba(200,146,42,0.3)',
    borderLeft: '1px solid rgba(200,146,42,0.3)',
    zIndex: 1,
  },
  cornerTR: {
    position: 'absolute', top: -6, right: -6,
    width: 14, height: 14,
    borderTop: '1px solid rgba(200,146,42,0.3)',
    borderRight: '1px solid rgba(200,146,42,0.3)',
    zIndex: 1,
  },
  cornerBL: {
    position: 'absolute', bottom: -6, left: -6,
    width: 14, height: 14,
    borderBottom: '1px solid rgba(200,146,42,0.3)',
    borderLeft: '1px solid rgba(200,146,42,0.3)',
    zIndex: 1,
  },
  cornerBR: {
    position: 'absolute', bottom: -6, right: -6,
    width: 14, height: 14,
    borderBottom: '1px solid rgba(200,146,42,0.3)',
    borderRight: '1px solid rgba(200,146,42,0.3)',
    zIndex: 1,
  },
  textarea: {
    width: '100%',
    background: 'rgba(26,25,22,0.8)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '4px',
    color: '#e8e4dc',
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '18px',
    lineHeight: 1.7,
    padding: '16px 20px',
    resize: 'none',
    outline: 'none',
    transition: 'border-color 300ms ease, box-shadow 300ms ease',
    caretColor: '#c8922a',
  },
  chipsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  chipsLabel: {
    fontFamily: "'DM Sans', system-ui, sans-serif",
    fontSize: '10px',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: '#5a5652',
  },
  chips: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  chip: {
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '3px',
    color: '#9a9690',
    fontFamily: "'DM Sans', system-ui, sans-serif",
    fontSize: '12px',
    lineHeight: 1.5,
    padding: '6px 12px',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'border-color 200ms ease, color 200ms ease, background 200ms ease',
  },
  error: {
    fontFamily: "'DM Sans', system-ui, sans-serif",
    fontSize: '13px',
    color: '#c85a3a',
    padding: '8px 12px',
    border: '1px solid rgba(200,90,58,0.3)',
    borderRadius: '3px',
    background: 'rgba(200,90,58,0.06)',
    margin: 0,
  },
  submitBtn: {
    alignSelf: 'flex-end',
    background: 'transparent',
    border: '1px solid rgba(200,146,42,0.5)',
    borderRadius: '3px',
    color: '#c8922a',
    fontFamily: "'DM Sans', system-ui, sans-serif",
    fontSize: '12px',
    fontWeight: 500,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    padding: '10px 24px',
    transition: 'background 300ms ease, border-color 300ms ease, letter-spacing 300ms ease',
  },
};
