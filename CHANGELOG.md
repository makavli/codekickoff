# Changelog

## 1.0.0 (2026-11-12)

- **A safety look first.** Setup reads (never runs) the hooks, servers and settings already installed, and says in plain words what deserves a second look; plus how to spot a scam plugin.
- **Rules that fit your work.** Code, writing, web, games or data each add their own lines to the rules, and set the git default and what "done" means.
- **Your first week.** Setup closes with the five commands to start with; `/codekickoff tips` shows the rest and the habits that save the most.
- **`/codekickoff project`** kicks off the folder you are in: a short `CLAUDE.md` block, a `HANDOFF.md`, its check command, and session notes kept out of git if you want.
- **Answers in one line.** `/codekickoff setup plan=pro work=code scope=user git=private yes` skips the questions.
- **An end-to-end test.** `evals/` runs the skill in a throwaway home with `claude plugin eval` and checks what it wrote; run locally, since it spends tokens.
- Plans: Team Premium counts Fable at half the weekly limit; the memory rule uses Claude Code's own auto memory.

## 0.1.0 (2026-11-12)

- First version. `/codekickoff` asks your plan and what you work on, then sets, each on your yes: the model and effort your plan affords, four lean helpers, the working rules with a handoff and safe points, and an optional git workflow that costs nothing on a private repository.
- `/codekickoff plan` after a plan change, `/codekickoff check` in a new session, `/codekickoff undo` for any part.
- CI kept small: one Linux job per pull request, then the release on merge.
