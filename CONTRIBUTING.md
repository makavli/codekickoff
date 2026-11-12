# Contributing

Thank you. CodeKickoff stays small on purpose: one skill, text files only, no hooks, no script, nothing collected.

- **A plan changed** (a new tier, a model, a limit): open an issue or a pull request with the official page or the Claude Code version that shows it, and change the row in `skills/codekickoff/PLANS.md`.
- **Before a pull request:** `npm run bump <version>`, write its `CHANGELOG.md` entry, then `npm run check`. Every merge into `main` is a release.
- **Pictures** are drawn by `node tools/figures.mjs`; never edit `assets/*.svg` by hand.
- **Never** add anything that reaches the network, runs at session start, or carries a person's name, path or address.
