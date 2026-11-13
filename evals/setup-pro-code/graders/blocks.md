---
type: regex
target:
  source: file
  path: CLAUDE.md
pattern: 'fewturns:start[\s\S]*fewturns:end[\s\S]*codekickoff:start[\s\S]*\*\*Plan\.\*\* [^\n]*Pro[\s\S]*Done means tested[\s\S]*codekickoff:end'
---
Both blocks are there between their markers, in order, with the plan line naming Pro and the `code` work lines.
