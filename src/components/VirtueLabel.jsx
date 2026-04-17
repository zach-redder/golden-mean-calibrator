export default function VirtueLabel({ virtue, style = {} }) {
  if (!virtue) return null;

  return (
    <div style={{ ...styles.wrapper, ...style }}>
      <span style={styles.label}>Virtue at stake</span>
      <span style={styles.divider}>·</span>
      <span style={styles.virtue}>{virtue.virtue}</span>
      {virtue.brief && (
        <p style={styles.brief}>{virtue.brief}</p>
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
    animation: 'fadeInUp 500ms ease forwards',
  },
  label: {
    fontFamily: "'DM Sans', system-ui, sans-serif",
    fontSize: '11px',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: '#5a5652',
  },
  divider: {
    display: 'none',
  },
  virtue: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '28px',
    fontWeight: 600,
    color: '#c8922a',
    letterSpacing: '0.04em',
  },
  brief: {
    fontFamily: "'DM Sans', system-ui, sans-serif",
    fontSize: '13px',
    color: '#9a9690',
    textAlign: 'center',
    maxWidth: '420px',
    lineHeight: 1.6,
    fontStyle: 'italic',
  },
};
