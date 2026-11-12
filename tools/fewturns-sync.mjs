#!/usr/bin/env node
// Says whether RULES.md still carries Fewturns' current rules block, read from a local Fewturns clone (no network).
// --write copies the block and its version in.
//
//   node tools/fewturns-sync.mjs [path to a Fewturns clone, default ../fewturns] [--write]
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const MARKS = /<!-- fewturns:start -->[\s\S]*?<!-- fewturns:end -->/;
const PINNED = /as Fewturns (\d+\.\d+\.\d+) ships them/;

export const block = (body) => MARKS.exec(body)?.[0] ?? null;

// Ours against theirs: what differs, and the RULES.md text that would fix it.
export function compare(ours, theirs, version) {
  const want = block(theirs);
  if (!want) throw new Error('the Fewturns RULES.md has no fewturns block');
  const pinned = PINNED.exec(ours)?.[1];
  if (!block(ours) || !pinned) throw new Error('our RULES.md has lost its fewturns block or its version line');
  const same = { block: block(ours).replace(/\r\n/g, '\n') === want.replace(/\r\n/g, '\n'), version: pinned === version };
  const fixed = ours.replace(MARKS, () => want).replace(PINNED, `as Fewturns ${version} ships them`);
  return { same, pinned, fixed };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = fileURLToPath(new URL('..', import.meta.url));
  const clone = resolve(root, process.argv.slice(2).find((a) => a !== '--write') ?? '../fewturns');
  const ours = resolve(root, 'skills/codekickoff/RULES.md');
  const { version } = JSON.parse(readFileSync(resolve(clone, 'package.json'), 'utf8'));
  const { same, pinned, fixed } = compare(readFileSync(ours, 'utf8'), readFileSync(resolve(clone, 'skills/fewturns/RULES.md'), 'utf8'), version);
  if (same.block && same.version) { console.log(`in sync with Fewturns ${version}`); process.exit(0); }
  console.log(`Fewturns ${version} vs ours ${pinned}: block ${same.block ? 'same' : 'DIFFERS'}, version ${same.version ? 'same' : 'DIFFERS'}`);
  if (process.argv.includes('--write')) { writeFileSync(ours, fixed); console.log('RULES.md updated: bump, CHANGELOG, PR'); }
  else { console.log('run with --write to copy it in'); process.exit(1); }
}
