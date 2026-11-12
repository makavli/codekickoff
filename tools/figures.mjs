#!/usr/bin/env node
// Draws the README pictures: the hero and the animated setup demo, light and dark.
//   node tools/figures.mjs           write assets/*.svg
//   node tools/figures.mjs --check   fail if a committed picture differs from what this draws
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const THEMES = {
  light: { bg: '#fbfaf7', panel: '#ffffff', ink: '#16181d', mute: '#5d6470', line: '#e3e0d8', accent: '#d9480f', ok: '#2b8a3e', chip: '#f3efe6' },
  dark: { bg: '#0f1115', panel: '#161a21', ink: '#eef0f4', mute: '#9aa3b2', line: '#2a303b', accent: '#ff8a4c', ok: '#69db7c', chip: '#1d222b' },
};
const MONO = "ui-monospace, 'SF Mono', Menlo, Consolas, monospace";
const SANS = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function hero(t) {
  const chips = ['Your plan → the right model and effort', 'Four lean helpers', 'Rules, handoff, safe points', 'Git the safe way'];
  let x = 48;
  const parts = chips.map((c) => {
    const w = Math.round(c.length * 6.5 + 28);
    const g = `<rect x="${x}" y="196" width="${w}" height="32" rx="16" fill="${t.chip}" stroke="${t.line}"/><text x="${x + w / 2}" y="217" text-anchor="middle" font-size="13" fill="${t.ink}">${esc(c)}</text>`;
    x += w + 10;
    return g;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="880" height="260" viewBox="0 0 880 260" font-family="${SANS}">
<rect width="880" height="260" rx="18" fill="${t.bg}"/>
<text x="48" y="78" font-size="15" font-weight="600" letter-spacing="2" fill="${t.accent}">JUST INSTALLED CLAUDE CODE?</text>
<text x="46" y="132" font-size="52" font-weight="800" fill="${t.ink}">Code<tspan fill="${t.accent}">Kickoff</tspan></text>
<text x="48" y="170" font-size="18" fill="${t.mute}">One command sets you up like a seasoned user, sized to the plan you pay for.</text>
${parts.join('\n')}
</svg>
`;
}

// Each line: [text, colour key, indent]. Lines appear one by one, hold, then the loop starts again.
const DEMO = [
  ['$ claude', 'mute', 0],
  ['> /codekickoff', 'accent', 0],
  ['Safety look: nothing to worry about in what is installed', 'ok', 1],
  ['Which plan do you have?   ● Pro   ○ Max   ○ Ultra   ○ Team   ○ API', 'ink', 1],
  ['What do you mostly do?    ● Code  ○ Writing  ○ Web  ○ Games', 'ink', 1],
  ['Your setup:', 'ink', 1],
  ['model    opus · effort medium     tough job: /effort high', 'mute', 2],
  ['helpers  scout, web-scout on haiku · worker, reviewer on sonnet', 'mute', 2],
  ['rules    working rules · handoff · safe points · "done means tested"', 'mute', 2],
  ['git      branch + pull request · check before push · no CI cost', 'mute', 2],
  ['Apply all?  Yes', 'accent', 1],
  ['✓ settings.json backed up and updated', 'ok', 1],
  ['✓ 4 helpers written to ~/.claude/agents', 'ok', 1],
  ['✓ CLAUDE.md: working rules + this setup', 'ok', 1],
  ['First week: /usage  /clear  /plan  /rewind  /effort      more: /codekickoff tips', 'ink', 1],
  ['Open a new session, then /codekickoff check.   Undo any part: /codekickoff undo', 'ink', 1],
];

function demo(t) {
  const cycle = 18; // seconds for one loop
  const step = 0.7; // seconds between lines
  const lines = DEMO.map(([text, colour, indent], i) => {
    const on = ((i * step + 0.6) / cycle) * 100;
    const y = 74 + i * 22;
    return `<style>@keyframes l${i}{0%,${on.toFixed(2)}%{opacity:0}${(on + 0.5).toFixed(2)}%,96%{opacity:1}100%{opacity:0}}.l${i}{animation:l${i} ${cycle}s linear infinite}</style>
<text class="l${i}" xml:space="preserve" x="${32 + indent * 20}" y="${y}" fill="${t[colour]}">${esc(text)}</text>`;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="880" height="440" viewBox="0 0 880 440" font-family="${MONO}" font-size="14">
<rect width="880" height="440" rx="14" fill="${t.panel}" stroke="${t.line}"/>
<circle cx="28" cy="24" r="6" fill="#ff5f57"/><circle cx="48" cy="24" r="6" fill="#febc2e"/><circle cx="68" cy="24" r="6" fill="#28c840"/>
<text x="440" y="29" text-anchor="middle" font-family="${SANS}" font-size="13" fill="${t.mute}">first session · about one minute</text>
<style>@media (prefers-reduced-motion: reduce){text{animation:none!important}}</style>
<line x1="0" y1="44" x2="880" y2="44" stroke="${t.line}"/>
${lines.join('\n')}
</svg>
`;
}

export function figures() {
  const out = {};
  for (const [name, t] of Object.entries(THEMES)) {
    out[`hero-${name}.svg`] = hero(t);
    out[`demo-${name}.svg`] = demo(t);
  }
  return out;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const dir = fileURLToPath(new URL('../assets', import.meta.url));
  const stale = [];
  mkdirSync(dir, { recursive: true });
  for (const [name, body] of Object.entries(figures())) {
    const path = join(dir, name);
    if (process.argv.includes('--check')) {
      let now = '';
      try { now = readFileSync(path, 'utf8'); } catch {}
      if (now !== body) stale.push(name);
    } else writeFileSync(path, body);
  }
  if (stale.length) {
    console.error(`stale: ${stale.join(', ')}. Run: node tools/figures.mjs`);
    process.exit(1);
  }
}
