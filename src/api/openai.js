const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const API_URL = 'https://api.openai.com/v1/chat/completions';

async function callOpenAI(messages) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.8,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

function parseJSON(text) {
  // Strip markdown code fences if present
  const cleaned = text.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/i, '').trim();
  return JSON.parse(cleaned);
}

export async function identifyVirtue(scenario) {
  const content = await callOpenAI([
    {
      role: 'user',
      content: `You are an expert in Aristotelian virtue ethics. A user has described the following moral dilemma:

"${scenario}"

Identify the single most relevant Aristotelian virtue at stake in this scenario. Then name the corresponding vice of deficiency and vice of excess.

Respond ONLY with a JSON object in this exact format, no extra text:
{
  "virtue": "Courage",
  "deficiency": "Cowardice",
  "excess": "Recklessness",
  "brief": "A one sentence explanation of why this virtue is at stake."
}`,
    },
  ]);

  return parseJSON(content);
}

export async function generateResponses(scenario, virtue, deficiency, excess) {
  const content = await callOpenAI([
    {
      role: 'user',
      content: `You are writing dialogue for three philosophical characters who each embody a different position on Aristotle's virtue spectrum. They are responding to this moral dilemma:

"${scenario}"

The virtue at stake is: ${virtue}
The deficient vice is: ${deficiency}
The excessive vice is: ${excess}

Write a response for each character. Each response should be 3-5 sentences in their distinct voice.

THE WRAITH (voice of deficiency — ${deficiency}):
Intelligent but paralyzed. Finds reasons why action is always premature. Self-deprecating, passive, weirdly sympathetic. Speaks in qualifications and conditionals. Uses phrases like "But have we really considered...", "It's not the right time", "I'm just being realistic." Never commits. Trails off.

THE SAGE (voice of the mean — ${virtue}):
Measured, warm but not soft. Asks questions before giving answers. Acknowledges the pull of both extremes before charting the middle. Never preachy. Uses phrases like "It depends on what you're actually trying to protect here", "Both of them are seeing something real, but...", "What would this look like in a year?" Reframes rather than reacts.

THE ZEALOT (voice of excess — ${excess}):
Speaks in absolutes. Punchy, declarative sentences. Completely convinced they are right. Uses phrases like "There is no half-measure", "You either commit fully or you've already failed", "Hesitation is cowardice dressed up as wisdom." Short sentences. High intensity. Never conditional.

Respond ONLY with a JSON object in this exact format, no extra text:
{
  "wraith": "The Wraith's response here.",
  "sage": "The Sage's response here.",
  "zealot": "The Zealot's response here."
}`,
    },
  ]);

  return parseJSON(content);
}
