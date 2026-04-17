import { CHARACTERS } from '../constants/characters';

const PANEL_COLORS = {
  wraith: { primary: '#8a9aaa', mid: '#5a6a78', deep: '#1e2830', wash: 'rgba(90,106,120,0.18)' },
  sage:   { primary: '#c8922a', mid: '#9a6e1e', deep: '#2a1e08', wash: 'rgba(200,146,42,0.18)' },
  zealot: { primary: '#c85a3a', mid: '#9a3e24', deep: '#2a100a', wash: 'rgba(200,90,58,0.18)' },
};

export default function CharacterPanel({
  charId, response, spectrumName,
  isHovered, isOtherHovered,
  onMouseEnter, onMouseLeave,
}) {
  const char = CHARACTERS[charId];
  const colors = PANEL_COLORS[charId];
  const dimmed = isOtherHovered && !isHovered;

  return (
    <div
      style={{
        ...styles.panel,
        flex: isHovered ? '5 1 0' : dimmed ? '0.8 1 0' : charId === 'sage' ? '1.4 1 0' : '1 1 0',
        background: isHovered
          ? `linear-gradient(180deg, ${colors.deep} 0%, #0f0e0c 50%)`
          : dimmed ? '#0c0b09' : '#0f0e0c',
        borderRight: charId !== 'zealot' ? '1px solid rgba(255,255,255,0.05)' : 'none',
        // Subtle single overshoot — y2=1.08 barely grazes past, settles naturally
        transition: 'flex 520ms cubic-bezier(0.34, 1.08, 0.64, 1), background 500ms ease',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Color wash overlay */}
      <div style={{
        ...styles.washOverlay,
        background: colors.wash,
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 500ms ease',
      }} />

      {/* Content */}
      <div style={{
        ...styles.content,
        opacity: dimmed ? 0.28 : 1,
        transition: 'opacity 400ms ease',
      }}>
        {/* Avatar */}
        <div style={{
          ...styles.avatar,
          background: `${colors.primary}18`,
          borderColor: isHovered ? `${colors.primary}65` : `${colors.primary}2a`,
          transition: 'border-color 400ms ease',
        }}>
          <span style={{ ...styles.avatarSymbol, color: colors.primary }}>{char.symbol}</span>
        </div>

        {/* Name block */}
        <div style={styles.nameBlock}>
          <h2 style={{ ...styles.charName, color: isHovered ? colors.primary : '#e8e4dc' }}>
            {char.name}
          </h2>
          <p style={{ ...styles.charRole, color: isHovered ? colors.mid : '#5a5652' }}>
            {char.role}
          </p>
          {/* Vice / virtue name — same position on all three cards */}
          {spectrumName && (
            <p style={{
              ...styles.spectrumName,
              color: isHovered ? colors.primary : `${colors.primary}90`,
              transition: 'color 400ms ease',
            }}>
              {spectrumName}
            </p>
          )}
        </div>

        {/* Divider */}
        <div style={{
          ...styles.divider,
          background: `linear-gradient(to right, transparent, ${colors.primary}35, transparent)`,
          opacity: isHovered ? 1 : 0.25,
          transition: 'opacity 400ms ease',
        }} />

        {/* Response text */}
        <p style={{
          ...styles.responseText,
          fontSize: isHovered ? '17px' : '14px',
          opacity: isHovered ? 1 : 0.6,
          lineHeight: isHovered ? 1.8 : 1.65,
          transition: 'font-size 500ms ease, opacity 400ms ease, line-height 500ms ease',
        }}>
          {response}
        </p>
      </div>

      {/* Bottom accent line */}
      <div style={{
        ...styles.bottomAccent,
        background: colors.primary,
        opacity: isHovered ? 0.5 : 0.1,
        transition: 'opacity 400ms ease',
      }} />
    </div>
  );
}

const styles = {
  panel: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 32px',
    height: '100%',
    cursor: 'default',
    overflow: 'hidden',
  },
  washOverlay: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
  },
  content: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '14px',
    maxWidth: '440px',
    width: '100%',
  },
  avatar: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    border: '1px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarSymbol: {
    fontSize: '24px',
    lineHeight: 1,
  },
  nameBlock: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  charName: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '26px',
    fontWeight: 600,
    letterSpacing: '0.03em',
    transition: 'color 400ms ease',
    margin: 0,
  },
  charRole: {
    fontFamily: "'DM Sans', system-ui, sans-serif",
    fontSize: '10px',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    transition: 'color 400ms ease',
    margin: 0,
  },
  spectrumName: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '18px',
    fontStyle: 'italic',
    fontWeight: 400,
    letterSpacing: '0.04em',
    lineHeight: 1.2,
    margin: 0,
  },
  divider: {
    width: '60%',
    height: '1px',
  },
  responseText: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    color: '#e8e4dc',
    textAlign: 'center',
    margin: 0,
  },
  bottomAccent: {
    position: 'absolute',
    bottom: 0,
    left: '20%',
    right: '20%',
    height: '1px',
    transition: 'opacity 400ms ease',
  },
};
