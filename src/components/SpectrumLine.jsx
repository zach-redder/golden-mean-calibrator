import { CHARACTER_ORDER } from '../constants/characters';

const NODE_COLORS = {
  wraith: '#8a9aaa',
  sage: '#c8922a',
  zealot: '#c85a3a',
};

const NODE_LABELS = {
  wraith: 'Deficiency',
  sage: 'The Mean',
  zealot: 'Excess',
};

export default function SpectrumLine({ hoveredChar, virtue }) {
  return (
    <div style={styles.wrapper}>
      {/* The line + nodes */}
      <div style={styles.lineRow}>
        {CHARACTER_ORDER.map((id, i) => {
          const color = NODE_COLORS[id];
          const isHovered = hoveredChar === id;
          return (
            <div key={id} style={styles.segment}>
              {i > 0 && (
                <div style={styles.connector} />
              )}
              <div
                style={{
                  ...styles.node,
                  background: color,
                  boxShadow: isHovered
                    ? `0 0 0 4px ${color}30, 0 0 12px ${color}50`
                    : `0 0 0 1px ${color}40`,
                  transform: isHovered ? 'scale(1.3)' : 'scale(1)',
                  transition: 'transform 400ms ease, box-shadow 400ms ease',
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Labels below nodes */}
      <div style={styles.labelsRow}>
        {CHARACTER_ORDER.map(id => {
          const color = NODE_COLORS[id];
          const isHovered = hoveredChar === id;
          return (
            <div key={id} style={styles.labelCell}>
              <span style={{
                ...styles.nodeLabel,
                color: isHovered ? color : '#5a5652',
                transition: 'color 400ms ease',
              }}>
                {NODE_LABELS[id]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Virtue display */}
      {virtue && (
        <div style={styles.virtueRow}>
          <span style={styles.virtueLabel}>
            The spectrum of&nbsp;
            <span style={styles.virtueName}>{virtue.virtue}</span>
          </span>
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    padding: '22px 0 20px',
    width: '100%',
    maxWidth: '480px',
    margin: '0 auto',
  },
  lineRow: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  segment: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
  connector: {
    position: 'absolute',
    left: '-50%',
    right: '50%',
    height: '1px',
    background: 'rgba(255,255,255,0.12)',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '100%',
  },
  node: {
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    position: 'relative',
    zIndex: 1,
  },
  labelsRow: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  labelCell: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  nodeLabel: {
    fontFamily: "'DM Sans', system-ui, sans-serif",
    fontSize: '10px',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
  },
  virtueRow: {
    marginTop: '10px',
  },
  virtueLabel: {
    fontFamily: "'DM Sans', system-ui, sans-serif",
    fontSize: '12px',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#5a5652',
  },
  virtueName: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '18px',
    fontWeight: 600,
    letterSpacing: '0.04em',
    color: '#c8922a',
    textTransform: 'none',
  },
};
