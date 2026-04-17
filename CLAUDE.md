# CLAUDE.md — The Golden Mean

This file guides Claude Code as it builds this project. Read it fully before writing any code.

---

## What This Project Is

A single-page React application (Vite) where users enter a moral dilemma and three philosophical characters — each representing a position on Aristotle's virtue spectrum — respond in their distinct voice. It is a class project on virtue ethics. It should feel immersive, theatrical, and visually striking.

**Non-negotiables:**
- Single page, no routing
- No login, no signup, no data storage of any kind
- No follow-up dialogue — characters respond once to the initial prompt only
- OpenAI API for all AI logic
- React + Vite
- `.env` for API key via `import.meta.env.VITE_OPENAI_API_KEY`

---

## Project Structure

Always organize files this way. Do not deviate:

```
src/
  components/
    InputScreen.jsx
    ThinkingScreen.jsx
    SpectrumScreen.jsx
    CharacterPanel.jsx
    SpectrumLine.jsx
    VirtueLabel.jsx
  api/
    openai.js
  constants/
    characters.js
  App.jsx
  App.css
  index.css
index.html
.env
```

---

## App State Machine

`App.jsx` controls everything. Use this exact state shape — do not add complexity:

```javascript
const [appState, setAppState] = useState('input'); // 'input' | 'thinking' | 'spectrum'
const [scenario, setScenario] = useState('');
const [virtue, setVirtue] = useState(null);        // { virtue, deficiency, excess, brief }
const [responses, setResponses] = useState(null);  // { wraith, sage, zealot }
const [hoveredChar, setHoveredChar] = useState(null); // 'wraith' | 'sage' | 'zealot' | null
```

Screen transitions: `input` → `thinking` → `spectrum`. A reset button on the spectrum screen returns to `input` and clears all state.

---

## Build Order

Follow this sequence. Do not skip ahead:

1. `index.css` — CSS variables, global resets, font imports
2. `App.jsx` — state machine, screen switching logic only
3. `constants/characters.js` — character definitions
4. `InputScreen.jsx` — textarea, chips, submit
5. `api/openai.js` — both API calls
6. `ThinkingScreen.jsx` — loading cards, pulsing dots, virtue reveal
7. `SpectrumScreen.jsx` + `CharacterPanel.jsx` — hover interaction (most complex)
8. `SpectrumLine.jsx` — visual spectrum line
9. `VirtueLabel.jsx` — virtue display
10. Polish pass — transitions, background washes, typography

---

## The Three Characters

These are fixed archetypes. Define them in `constants/characters.js` and import everywhere. Never hardcode character data inside components.

```javascript
export const CHARACTERS = {
  wraith: {
    id: 'wraith',
    name: 'The Wraith',
    role: 'Deficiency',
    colorPrimary: '#8a9aaa',
    colorMid: '#5a6a78',
    colorDeep: '#1e2830',
    bgWash: 'rgba(90, 106, 120, 0.18)',
    borderColor: 'rgba(138, 154, 170, 0.3)',
  },
  sage: {
    id: 'sage',
    name: 'The Sage',
    role: 'The Mean',
    colorPrimary: '#c8922a',
    colorMid: '#9a6e1e',
    colorDeep: '#2a1e08',
    bgWash: 'rgba(200, 146, 42, 0.18)',
    borderColor: 'rgba(200, 146, 42, 0.3)',
  },
  zealot: {
    id: 'zealot',
    name: 'The Zealot',
    role: 'Excess',
    colorPrimary: '#c85a3a',
    colorMid: '#9a3e24',
    colorDeep: '#2a100a',
    bgWash: 'rgba(200, 90, 58, 0.18)',
    borderColor: 'rgba(200, 90, 58, 0.3)',
  },
};

export const CHARACTER_ORDER = ['wraith', 'sage', 'zealot'];
```

---

## CSS Variables — Define in index.css

```css
:root {
  --bg-base: #0f0e0c;
  --bg-surface: #1a1916;
  --bg-surface-2: #222018;
  --text-primary: #e8e4dc;
  --text-secondary: #9a9690;
  --text-muted: #5a5652;
  --border-subtle: rgba(255, 255, 255, 0.07);
  --border-mid: rgba(255, 255, 255, 0.12);
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'DM Sans', sans-serif;
  --transition-panel: 450ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-fade: 400ms ease;
  --transition-bg: 500ms ease;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--bg-base);
  color: var(--text-primary);
  font-family: var(--font-body);
  min-height: 100vh;
  overflow-x: hidden;
}
```

---

## Typography

Import in `index.html` inside `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
```

Usage rules:
- `font-family: var(--font-display)` — app title, character names, virtue labels, any headline
- `font-family: var(--font-body)` — all body text, UI labels, character responses, buttons
- Never use system fonts, Inter, Roboto, or Arial anywhere

---

## OpenAI API — api/openai.js

Two calls. Both must be in `api/openai.js`. Always use `gpt-4o-mini` as the model.

### Call 1 — identifyVirtue(scenario)

Fires immediately when the user submits. Returns the virtue object.

```javascript
export async function identifyVirtue(scenario) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      temperature: 0.7,
      messages: [
        {
          role: 'system',
          content: `You are an expert in Aristotelian virtue ethics. Respond only with valid JSON, no markdown, no extra text.`,
        },
        {
          role: 'user',
          content: `A user has described the following moral dilemma: "${scenario}"

Identify the single most relevant Aristotelian virtue at stake. Then name the corresponding vice of deficiency and vice of excess.

Respond ONLY with this JSON format:
{
  "virtue": "Courage",
  "deficiency": "Cowardice",
  "excess": "Recklessness",
  "brief": "One sentence explaining why this virtue is at stake."
}`,
        },
      ],
    }),
  });
  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
}
```

### Call 2 — generateResponses(scenario, virtue)

Fires after Call 1 returns. Takes the full virtue object as second param.

```javascript
export async function generateResponses(scenario, virtue) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      temperature: 0.85,
      messages: [
        {
          role: 'system',
          content: `You are writing dialogue for three philosophical characters. Respond only with valid JSON, no markdown, no extra text.`,
        },
        {
          role: 'user',
          content: `Three philosophical characters are responding to this moral dilemma: "${scenario}"

Virtue at stake: ${virtue.virtue}
Vice of deficiency: ${virtue.deficiency}
Vice of excess: ${virtue.excess}

Write a 3-5 sentence response for each character in their distinct voice:

THE WRAITH (embodies ${virtue.deficiency}): Intelligent but paralyzed. Finds reasons why action is premature. Self-deprecating, passive, weirdly sympathetic. Speaks in qualifications and conditionals. Uses phrases like "But have we really considered...", "It's not the right time", "I'm just being realistic." Never fully commits. May trail off.

THE SAGE (embodies ${virtue.virtue}): Measured, warm but not soft. Asks questions before giving answers. Acknowledges the pull of both extremes before charting the middle path. Never preachy. Uses phrases like "It depends on what you're actually trying to protect here", "Both of them are seeing something real, but...", "What would this look like in a year?" Reframes rather than reacts.

THE ZEALOT (embodies ${virtue.excess}): Speaks in absolutes. Short punchy declarative sentences. Completely convinced they are right. Never conditional. Uses phrases like "There is no half-measure", "You either commit fully or you've already failed", "Hesitation is cowardice dressed up as wisdom." High intensity throughout.

Respond ONLY with this JSON format:
{
  "wraith": "The Wraith response here.",
  "sage": "The Sage response here.",
  "zealot": "The Zealot response here."
}`,
        },
      ],
    }),
  });
  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
}
```

### Error handling rule
Always wrap both calls in try/catch. On failure, return null and handle gracefully in the UI with an error message and a "Try again" button. Never let an API error crash the app.

---

## The Hover Interaction — Most Important UX Element

This is the centerpiece of the app. Get it right.

**Implementation approach — use flex-grow, not width:**

```jsx
// In SpectrumScreen.jsx
const getFlexGrow = (charId) => {
  if (!hoveredChar) return charId === 'sage' ? 1.4 : 1;
  if (hoveredChar === charId) return 3.5;
  return 0.6;
};

const getOpacity = (charId) => {
  if (!hoveredChar) return 1;
  if (hoveredChar === charId) return 1;
  return 0.5;
};
```

Apply to each panel:
```jsx
<div
  style={{
    flexGrow: getFlexGrow(char.id),
    opacity: getOpacity(char.id),
    transition: `flex-grow var(--transition-panel), opacity var(--transition-fade)`,
  }}
  onMouseEnter={() => setHoveredChar(char.id)}
  onMouseLeave={() => setHoveredChar(null)}
>
```

**Background color wash:**
The background behind all three panels shifts on hover. Apply to the panels container:
```jsx
<div style={{
  backgroundColor: hoveredChar ? CHARACTERS[hoveredChar].bgWash : 'transparent',
  transition: `background-color var(--transition-bg)`,
}}>
```

**Text behavior on hover:**
- Hovered panel: response text at full opacity, slightly larger font size
- Non-hovered panels: response text faded to ~40% opacity
- Character name and role always remain readable

**Do not:**
- Do not use `width` or `max-width` transitions — they are janky
- Do not use `transform: scaleX` — distorts text
- Do not hide the non-hovered panels — they must stay visible and hoverable
- Do not use `pointer-events: none` on non-hovered panels

---

## InputScreen — Scenario Chips

Hardcode these five chips. Clicking one sets the textarea value:

```javascript
const EXAMPLE_CHIPS = [
  "My friend told me something serious in confidence. I think they might be in danger. Do I tell someone and break their trust, or stay silent?",
  "I was offered credit for a project that wasn't entirely my work. No one would know if I accepted it.",
  "Someone at work is being treated unfairly. Speaking up risks my own position. Do I say something?",
  "I can help someone I care about, but it requires bending the truth. Is it worth it?",
  "I've been wronged by someone and have the opportunity to get even in a way they'd never trace back to me.",
];
```

Display chips with short truncated labels (first 4-5 words), full text goes into the textarea on click.

---

## ThinkingScreen — Sequencing

Run API calls in this order inside `App.jsx` when the user submits:

```javascript
const handleSubmit = async () => {
  setAppState('thinking');
  try {
    const virtueData = await identifyVirtue(scenario);
    setVirtue(virtueData);                          // virtue label animates in on ThinkingScreen
    const responseData = await generateResponses(scenario, virtueData);
    setResponses(responseData);
    setAppState('spectrum');                         // transition to spectrum view
  } catch (err) {
    console.error(err);
    setAppState('input');                            // return to input on failure
    // show error message to user
  }
};
```

Pulsing dots animation — CSS only, staggered:

```css
@keyframes pulse {
  0%, 100% { opacity: 0.2; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1); }
}

.dot:nth-child(1) { animation: pulse 1.2s ease-in-out infinite 0s; }
.dot:nth-child(2) { animation: pulse 1.2s ease-in-out infinite 0.2s; }
.dot:nth-child(3) { animation: pulse 1.2s ease-in-out infinite 0.4s; }
```

The virtue label (`VirtueLabel`) fades in when `virtue` state is not null, while character responses are still loading.

---

## SpectrumLine Component

Visual: `o ————————— o ————————— o`

- Thin `1px` horizontal line connecting three nodes
- Nodes are circles, `14px` diameter, filled with `colorPrimary` of each character
- Line color: `var(--border-mid)`
- On hover of a character panel, that character's node subtly brightens (increase opacity or add a soft ring)
- Sits above the three panels, centered

---

## Atmosphere and Visual Details

- Background should feel like a dark candlelit space — use `var(--bg-base)` (#0f0e0c) as the page background
- Add a very subtle noise/grain texture to the body using an SVG filter or a pseudo-element with `opacity: 0.03` — this adds depth without being distracting
- In `InputScreen`, add thin decorative lines framing the textarea — like a stage or arena border. Use `::before` / `::after` pseudo-elements or simple bordered divs at the corners
- The submit button should be in warm amber/gold tones to foreshadow the Sage — the virtuous path forward
- Screen transitions between states should use CSS opacity fade-ins (`opacity 0s → 1`, `transition 400ms ease`) — never abrupt cuts

---

## What Not to Do

- Do not add routing (React Router or otherwise)
- Do not add any authentication or user accounts
- Do not persist data to localStorage, sessionStorage, or any backend
- Do not add a reply/follow-up input in the spectrum view — responses are one-way
- Do not use inline styles for everything — use CSS classes and CSS variables for maintainability
- Do not use `width` transitions for the panel hover effect — use `flex-grow`
- Do not use generic fonts (Inter, Roboto, Arial, system-ui)
- Do not use purple gradients or any generic "AI app" aesthetic
- Do not crash on API errors — always handle gracefully

---

## Definition of Done

The app is complete when:
- [ ] User can type or select a scenario and submit
- [ ] Loading screen shows all three characters with pulsing dots
- [ ] Virtue is identified and displayed during loading
- [ ] Spectrum screen shows all three panels with generated responses
- [ ] Hover interaction smoothly expands the active panel and fades others
- [ ] Background color washes correctly on hover per character color
- [ ] Spectrum line renders with three colored nodes
- [ ] Reset button returns to the input screen cleanly
- [ ] App handles API errors without crashing
- [ ] No console errors in normal operation
- [ ] Typography uses Cormorant Garamond + DM Sans throughout
- [ ] All colors come from CSS variables or the characters constant

---

*Build something worth deliberating over.*