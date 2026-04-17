import { CHARACTER_ORDER, CHARACTERS } from '../constants/characters';
import VirtueLabel from './VirtueLabel';

const COLOR_MAP = {
  wraith: '#8a9aaa',
  sage: '#c8922a',
  zealot: '#c85a3a',
};

export default function ThinkingScreen({ virtue }) {
  return (
    <div style={styles.wrapper}>
      <style>{CSS}</style>

      <div style={styles.container}>
        <p style={styles.eyebrow}>Consulting the spectrum…</p>

        <div style={styles.cards}>
          {CHARACTER_ORDER.map((id, i) => {
            const char = CHARACTERS[id];
            const color = COLOR_MAP[id];
            return (
              <div
                key={id}
                style={{
                  ...styles.card,
                  borderColor: `${color}22`,
                  animationDelay: `${i * 120}ms`,
                }}
                className="card-slide-in"
              >
                {/* Avatar */}
                <div style={{ ...styles.avatar, background: `${color}18`, borderColor: `${color}40` }}>
                  <span style={{ ...styles.avatarSymbol, color }}>{char.symbol}</span>
                </div>

                <h3 style={{ ...styles.charName, color }}>{char.name}</h3>
                <p style={styles.charRole}>{char.role}</p>

                {/* Pulsing dots */}
                <div style={styles.dots}>
                  {[0, 1, 2].map(j => (
                    <span
                      key={j}
                      style={{ ...styles.dot, background: color, animationDelay: `${j * 200}ms` }}
                      className="pulse-dot"
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Virtue fades in once detected */}
        <div style={styles.virtuePart}>
          {virtue ? (
            <VirtueLabel virtue={virtue} />
          ) : (
            <p style={styles.virtuePlaceholder}>Identifying virtue…</p>
          )}
        </div>
      </div>
    </div>
  );
}

const CSS = `
  @keyframes pulse {
    0%, 80%, 100% { opacity: 0.15; transform: scale(0.8); }
    40% { opacity: 1; transform: scale(1); }
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .card-slide-in {
    animation: slideIn 500ms ease forwards;
    opacity: 0;
  }
  .pulse-dot {
    animation: pulse 1.4s ease-in-out infinite;
  }
`;

const styles = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0f0e0c',
    padding: '40px 24px',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '48px',
    width: '100%',
    maxWidth: '860px',
  },
  eyebrow: {
    fontFamily: "'DM Sans', system-ui, sans-serif",
    fontSize: '12px',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#5a5652',
  },
  cards: {
    display: 'flex',
    gap: '20px',
    width: '100%',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  card: {
    background: '#1a1916',
    border: '1px solid',
    borderRadius: '6px',
    padding: '32px 28px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    flex: '1 1 180px',
    maxWidth: '220px',
  },
  avatar: {
    width: '52px',
    height: '52px',
    borderRadius: '50%',
    border: '1px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '4px',
  },
  avatarSymbol: {
    fontSize: '22px',
    lineHeight: 1,
  },
  charName: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '20px',
    fontWeight: 600,
    letterSpacing: '0.03em',
    margin: 0,
  },
  charRole: {
    fontFamily: "'DM Sans', system-ui, sans-serif",
    fontSize: '11px',
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color: '#5a5652',
    margin: 0,
  },
  dots: {
    display: 'flex',
    gap: '6px',
    marginTop: '12px',
    alignItems: 'center',
  },
  dot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    display: 'inline-block',
  },
  virtuePart: {
    minHeight: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  virtuePlaceholder: {
    fontFamily: "'DM Sans', system-ui, sans-serif",
    fontSize: '12px',
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color: '#3a3835',
  },
};
