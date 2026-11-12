# Contributing

Thank you. CodeKickoff stays small on purpose: one skill, text files only, no hooks, no script, nothing collected.

- **A plan changed** (a new tier, a model, a limit): open an issue or a pull request with the official page or the Claude Code version that shows it, and change the row in `skills/codekickoff/PLANS.md`.
- **Before a pull request:** `npm run bump <version>`, write its `CHANGELOG.md` entry, then `npm run check`. Every merge into `main` is a release.
- **Pictures** are drawn by `node tools/figures.mjs`; never edit `assets/*.svg` by hand.
- **Never** add anything that reaches the network, runs at session start, or carries a person's name, path or address.

## The end-to-end test

`evals/` holds cases for `claude plugin eval`. They run the skill for real, so they spend tokens: run them locally, never in CI.

```text
claude plugin eval . --allow-tools "Write,Edit,Read(//<absolute path of this clone>/**)" --ablation none --model sonnet --max-cost-usd 3 --no-publish --trust-plugin
```

The `Read` rule lets the run open the skill's own pages, which sit outside the throwaway workspace (on Windows the path is written `//c/...`). Claude Code never lets an unattended session write into `.claude/`, so the cases judge what the run says it would write there. Shell tools need a sandbox, which Windows lacks; the skill works without one.
