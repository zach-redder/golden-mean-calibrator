export const CHARACTERS = {
  wraith: {
    id: 'wraith',
    name: 'The Wraith',
    role: 'Deficiency',
    colorPrimary: 'var(--wraith-primary)',
    colorMid: 'var(--wraith-mid)',
    colorDeep: 'var(--wraith-deep)',
    bgWash: 'var(--wraith-bg-wash)',
    symbol: '◌',
    description: 'Voice of paralysis. Finds every reason to wait.',
  },
  sage: {
    id: 'sage',
    name: 'The Sage',
    role: 'Golden Mean',
    colorPrimary: 'var(--sage-primary)',
    colorMid: 'var(--sage-mid)',
    colorDeep: 'var(--sage-deep)',
    bgWash: 'var(--sage-bg-wash)',
    symbol: '◈',
    description: 'Voice of virtue. Sees the whole picture.',
  },
  zealot: {
    id: 'zealot',
    name: 'The Zealot',
    role: 'Excess',
    colorPrimary: 'var(--zealot-primary)',
    colorMid: 'var(--zealot-mid)',
    colorDeep: 'var(--zealot-deep)',
    bgWash: 'var(--zealot-bg-wash)',
    symbol: '◉',
    description: 'Voice of intensity. Commits without reservation.',
  },
};

export const CHARACTER_ORDER = ['wraith', 'sage', 'zealot'];

export const EXAMPLE_SCENARIOS = [
  "My friend told me something serious in confidence. I think they might be in danger. Do I tell someone and break their trust, or stay silent?",
  "I was offered credit for a project that wasn't entirely my work. No one would know if I accepted it.",
  "Someone at work is being treated unfairly. Speaking up risks my own position. Do I say something?",
  "I can help someone I care about, but doing so would require bending the truth. Is it worth it?",
  "I've been wronged by someone. I have the opportunity to get even in a way they'd never trace back to me.",
];
