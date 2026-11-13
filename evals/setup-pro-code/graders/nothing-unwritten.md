---
type: regex
target:
  source: file
  path: CLAUDE.md
pattern: 'Helpers, unasked|`reviewer` helper|\*\*Git\.\*\*'
match: not_contains
---
The sandbox never lets an unattended run write into `.claude/`, so the helpers are never written here: the rules must not name them. git=none, so no Git line either.
