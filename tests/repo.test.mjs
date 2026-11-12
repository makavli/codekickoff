// Checks on the repository itself: manifests, versions, the skill's files, the plan table, links, and that no machine left a trace.
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { figures } from '../tools/figures.mjs';
import { notes } from '../tools/release-notes.mjs';
import { block, compare } from '../tools/fewturns-sync.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const text = (p) => readFileSync(join(root, p), 'utf8');
const json = (p) => JSON.parse(text(p));
const skill = (f) => text(`skills/codekickoff/${f}`);

// The YAML subset our headers use: `key: value` and folded `key: >` blocks.
function frontmatter(body) {
  const head = /^---\r?\n([\s\S]*?)\r?\n---/.exec(body)?.[1] ?? '';
  const out = {};
  let key = null;
  for (const line of head.split(/\r?\n/)) {
    const m = /^([\w-]+):\s*(.*)$/.exec(line);
    if (m) { key = m[1]; out[key] = m[2] === '>' ? '' : m[2].replace(/^"(.*)"$/, '$1'); }
    else if (key && line.startsWith('  ')) out[key] = `${out[key]} ${line.trim()}`.trim();
  }
  return out;
}

function files(dir = root, out = []) {
  for (const name of readdirSync(dir)) {
    if (['.git', 'node_modules'].includes(name)) continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) files(path, out);
    else out.push(relative(root, path).split('\\').join('/'));
  }
  return out;
}
const all = files();

test('one version everywhere', () => {
  const { version } = json('package.json');
  assert.equal(json('.claude-plugin/plugin.json').version, version);
  assert.match(text('CHANGELOG.md'), new RegExp(`^## ${version.replaceAll('.', '\\.')} `, 'm'));
  assert.ok(text('README.md').includes(`badge/release-v${version}-`), 'the README badge names another version');
  assert.ok(text('README.md').includes(`makavli/codekickoff#v${version}\``), 'the README pin example names another version');
});

test('the plugin and its marketplace describe the same plugin, with no hooks', () => {
  const plugin = json('.claude-plugin/plugin.json');
  const market = json('.claude-plugin/marketplace.json');
  assert.equal(plugin.name, 'codekickoff');
  assert.equal(market.plugins.length, 1);
  assert.equal(market.plugins[0].name, plugin.name);
  assert.equal(market.plugins[0].source, './');
  assert.ok(!('hooks' in plugin) && !existsSync(join(root, 'hooks')), 'CodeKickoff ships no hooks');
});

test('one skill, no script, and a short header', () => {
  assert.deepEqual(readdirSync(join(root, 'skills')), ['codekickoff']);
  assert.deepEqual(readdirSync(join(root, 'skills/codekickoff')).sort(), ['GIT.md', 'HELPERS.md', 'PLANS.md', 'PROJECT.md', 'RULES.md', 'SAFETY.md', 'SKILL.md', 'TIPS.md', 'WORK.md']);
  const fm = frontmatter(skill('SKILL.md'));
  assert.equal(fm.name, 'codekickoff');
  assert.ok(fm.description.length <= 400, `description is ${fm.description.length} characters`);
});

test('each rules block has its two markers, once each and in order', () => {
  const rules = skill('RULES.md');
  for (const [name, page] of [['fewturns', rules], ['codekickoff', rules], ['codekickoff-project', skill('PROJECT.md')]]) {
    const [start, end] = [`<!-- ${name}:start -->`, `<!-- ${name}:end -->`];
    assert.equal(page.split(start).length, 2, start);
    assert.equal(page.split(end).length, 2, end);
    assert.ok(page.indexOf(start) < page.indexOf(end));
  }
});

test('every plan row names only models and efforts Claude Code accepts', () => {
  const plans = skill('PLANS.md');
  const rows = plans.split('## The keys')[0].split('\n').filter((l) => /^\| (?!Plan|---)/.test(l));
  assert.deepEqual(rows.map((r) => r.split('|')[1].trim()), ['Free', 'Pro', 'Max', 'Ultra', 'Team Standard', 'Team Premium', 'Enterprise', 'API (pay per use)']);
  const models = new Set(['opus', 'sonnet', 'haiku', 'fable', 'opusplan']);
  const efforts = new Set(['low', 'medium', 'high', 'xhigh', 'max']);
  for (const row of rows) {
    for (const [, word] of row.matchAll(/`([^`]+)`/g)) {
      const value = word.replace(/^\/(model|effort) /, '');
      assert.ok(models.has(value) || efforts.has(value), `${row.slice(0, 30)}: unknown value ${word}`);
    }
  }
  const rule = /`"effortLevel"` \| ([^|]+)\|/.exec(plans)[1];
  assert.deepEqual([...rule.split('.')[0].matchAll(/`(\w+)`/g)].map((m) => m[1]), ['low', 'medium', 'high', 'xhigh'], 'effortLevel saves these four only');
});

test('each lean helper names its own model and never pairs web tools with local tools', () => {
  const helpers = [...skill('HELPERS.md').matchAll(/^### (\S+)\.md\r?\n\r?\n````markdown\r?\n([\s\S]*?)^````\r?$/gm)];
  assert.equal(helpers.length, 4);
  for (const [, file, body] of helpers) {
    const { name, description, model, tools = '' } = frontmatter(body);
    assert.equal(name, file);
    assert.ok(description && model && model !== 'inherit', `${file}: a description and a model of its own`);
    const list = tools.split(/,\s*/);
    const web = list.some((t) => t.startsWith('Web'));
    assert.ok(!(web && list.some((t) => ['Read', 'Grep', 'Glob', 'Edit', 'Write', 'Bash'].includes(t))), `${file} has web tools and local tools`);
  }
});

test('the README names every command the skill offers', () => {
  const hint = /\[([^\]]+)\]/.exec(frontmatter(skill('SKILL.md'))['argument-hint'])[1].split('|').filter((c) => c !== 'setup');
  for (const command of hint) assert.ok(text('README.md').includes(`/codekickoff ${command}\``), `README is missing /codekickoff ${command}`);
  assert.match(text('README.md'), /not made, endorsed or supported by Anthropic/);
});

test('every answer the arguments take has its page, and the evals use only those', () => {
  const body = skill('SKILL.md');
  const values = (key) => new RegExp(`^- \`${key}=\` ([^(:\\n]+)`, 'm').exec(body)[1].split(/,| or /).map((v) => v.trim().split(' ')[0]).filter(Boolean);
  const rows = skill('PLANS.md').split('## The keys')[0].split('\n').filter((l) => /^\| (?!Plan|---)/.test(l)).map((r) => r.split('|')[1].trim().toLowerCase().replace(/ \(.*\)/, '').replace(' ', '-'));
  assert.deepEqual(values('plan'), rows);
  const works = [...skill('WORK.md').matchAll(/^## (\w+)$/gm)].map((m) => m[1]);
  assert.deepEqual(values('work').filter((w) => w !== 'mix'), works);
  assert.ok(skill('RULES.md').includes('<work lines>'), 'RULES.md has no place for the work lines');
  assert.deepEqual(values('scope'), ['user', 'project']);
  assert.deepEqual(values('git'), ['public', 'private', 'none', 'skip']);
  for (const g of ['none', 'skip']) assert.ok(skill('GIT.md').includes(`git=${g}`), `GIT.md does not define git=${g}`);
  for (const dir of readdirSync(join(root, 'evals'))) {
    if (dir === 'results') continue;
    const args = text(`evals/${dir}/prompt.md`).split('---').pop();
    for (const [, key, value] of args.matchAll(/(\w+)=(\S+)/g)) assert.ok(values(key).includes(value), `evals/${dir}: ${key}=${value}`);
  }
});

test('relative links and images resolve', () => {
  for (const file of all.filter((f) => f.endsWith('.md'))) {
    const body = text(file).replace(/```[\s\S]*?```/g, '');
    const targets = [...body.matchAll(/\]\(([^)#\s]+)(#[^)]*)?\)/g), ...body.matchAll(/(?:src|srcset|href)="([^"#]+)(#[^"]*)?"/g)].map((m) => m[1]);
    for (const target of targets) {
      if (/^[a-z]+:/i.test(target)) continue;
      assert.ok(existsSync(join(root, dirname(file), target)), `${file} links to ${target}`);
    }
  }
});

test('no machine left a trace: no home folders, addresses, e-mails or keys', () => {
  const traces = /[A-Z]:[\\/]Users[\\/]|\/home\/[a-z]|\/Users\/[a-z]|AppData|[\w.+-]+@[\w-]+\.[a-z]{2,}|\b\d{1,3}(\.\d{1,3}){3}\b|gh[pos]_[A-Za-z0-9]{20,}|BEGIN [A-Z ]*PRIVATE KEY/;
  for (const file of all.filter((f) => f !== 'tests/repo.test.mjs')) { // this file holds the pattern itself
    for (const line of text(file).split('\n')) {
      assert.ok(!traces.test(line), `${file}: ${line.trim().slice(0, 120)}`);
    }
  }
});

test('only text ships: no binaries, nothing over 200 kB', () => {
  for (const file of all) {
    assert.match(file, /\.(md|mjs|json|ya?ml|svg)$|^(LICENSE|\.gitignore|\.gitattributes|\.editorconfig)$/, `unexpected file type: ${file}`);
    assert.ok(statSync(join(root, file)).size < 200_000, `${file} is too large`);
  }
});

test('the committed pictures are what the generator draws', () => {
  for (const [name, body] of Object.entries(figures())) assert.equal(text(`assets/${name}`), body, `${name} is stale: run node tools/figures.mjs`);
});

test('the release text is the changelog entry of this version, and only that one', () => {
  const { version } = json('package.json');
  const out = notes();
  assert.ok(out.length > 80, out);
  assert.doesNotMatch(out, /^## /m);
  assert.equal(notes('9.9.9', '# Changelog\n\n## 9.9.9 (2030-01-01)\n\n- New.\n\n## 9.9.8 (2029-01-01)\n\n- Old.\n').split('\n')[0], '- New.');
  assert.throws(() => notes('0.0.0'), /no entry/);
  assert.ok(text('CHANGELOG.md').indexOf(`## ${version} `) < 20, 'the newest entry is not the current version');
});

test('the Fewturns sync spots a changed block or version, and its fix carries both', () => {
  const ours = skill('RULES.md');
  const mine = block(ours);
  const pinned = /as Fewturns (\d+\.\d+\.\d+) ships them/.exec(ours)[1];
  assert.deepEqual(compare(ours, `x\n${mine}\ny`, pinned).same, { block: true, version: true });
  const theirs = mine.replace('## Fewturns', '## Fewturns, newer');
  const { same, fixed } = compare(ours, theirs, '9.9.9');
  assert.deepEqual(same, { block: false, version: false });
  assert.equal(block(fixed), theirs);
  assert.match(fixed, /as Fewturns 9\.9\.9 ships them/);
  assert.equal(fixed.replace(theirs, mine).replace('9.9.9', pinned), ours, 'the fix touched more than the block and the version');
  assert.throws(() => compare(ours, 'no block', '1.0.0'), /no fewturns block/);
});
