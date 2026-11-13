# Changelog

## 1.0.2 (2026-11-13)

- **The working rules carry Fewturns 1.5.0's block.** The text is the same as before; only the version label moved.
- **The safety look points to a check before you install:** `/fewturns audit owner/repo` reads a plugin's repository first (who owns it, what it would run, what it would cost each request).

## 1.0.2 (2026-11-13)

- 

## 1.0.1 (2026-11-12)

- **Two more end-to-end cases:** `project` checks the project kickoff, `project-undo` checks that undo removes it again.
- **`npm run fewturns`** says whether the rules carry Fewturns' current block, read from a local Fewturns clone (no network); `--write` copies a newer one in.
- **Undo never empties a file.** A file that should go but cannot be deleted here stays as it was, and you are told which and why.
- **`/codekickoff project` writes `HANDOFF.md` exactly as the template**, so a later undo can tell an untouched one from your notes.

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
