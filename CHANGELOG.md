# Changelog

## 1.0.7 (2026-11-13)

- **Dependabot's pull requests can pass.** They bump only the pinned actions, never the version, so the "version must be new" check now skips them; merging one publishes no release (the release step skips a version that exists).

## 1.0.6 (2026-11-13)

- **Red checks open an issue.** A pull request whose checks fail gets one `ci-failure` issue, linked from the pull request, and the next green run closes it. Closing the pull request closes it too. Main gets its own issue, and a failed release counts as red.
- **One gate for main.** A `passed` job sums up the checks, so main's protection can require one stable name, and `release` waits for it.
- **The workflow scripts are tested** against a stand-in `gh`, every path of the issue (`tests/workflow.test.mjs`).
- **Dependabot keeps the pinned actions fresh.** One grouped pull request a month at most.

## 1.0.5 (2026-11-13)

- **Backups stay out of commits in worktrees and submodules.** Setup finds the exclude file with `git rev-parse --git-path info/exclude` instead of assuming `.git` is a folder.
- **Undo ignores a backup git tracks.** A `.bak-codekickoff-*` file that came with a cloned repository can no longer choose the model and effort undo restores.
- **A cloned repository's check command is shown, not run.** Setup says where the suggested command comes from and never runs it.
- **The public CI workflow it writes** triggers on `pull_request` and `push` only (never `pull_request_target`) and checks out with `persist-credentials: false`.

## 1.0.4 (2026-11-13)

- **The rules wait for the other writes.** Setup writes `CLAUDE.md` only once the settings and helper writes have answered, never in the same batch, so a denied helper write can no longer leave a rule that names missing helpers.
- **The setup eval is no longer a coin flip.** Its judge was asked about the transcript but saw only the final reply. The case now checks the file, the tool calls and the trace directly (markers, plan line, no unwritten helpers, no question asked, a read-only safety look) and leaves the judge only what a reply shows.
- **One changelog entry per version,** as in Fewturns 1.5.2: `npm run bump` no longer opens a second one, and a test catches a repeated heading or an empty bullet.
- The working rules carry Fewturns 1.5.2's block (same text; only the version label moved).

## 1.0.3 (2026-11-13)

- **The safety look reads the scripts hooks run,** not only the hook files that start them: a hook file says what starts, the script says what it does. A script too long to read goes to the read-only `scout` helper when it is installed.
- **`web-scout`'s rule is exact:** it never puts the user's own name, email, path, username or private project into a query or URL; the one exception is a public GitHub name it is asked to look up, on GitHub's hosts only (as in Fewturns 1.5.1).
- **A hook that prints a whole file at session start is named:** that text rides on every request after start, `/clear` and compaction, and can steer the agent.

## 1.0.2 (2026-11-13)

- **The working rules carry Fewturns 1.5.0's block.** The text is the same as before; only the version label moved.
- **The safety look points to a check before you install:** `/fewturns audit owner/repo` reads a plugin's repository first (who owns it, what it would run, what it would cost each request).

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
