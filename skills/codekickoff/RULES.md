# The working rules

Two blocks go into the user's instruction file (`CLAUDE.md`), markers included. Once there, they work in every session, whether or not the CodeKickoff plugin stays enabled. The markers let `/codekickoff` update a block and `/codekickoff undo` remove it.

## Block 1: how to work efficiently

This block is [Fewturns](https://github.com/makavli/fewturns)' working rules, as Fewturns 1.5.0 ships them, under Fewturns' own markers: if the user also installs Fewturns, the two see one block, never two.

<!-- fewturns:start -->
## Fewturns: waiting is free, requests are not

- **One wait.** Finish every edit, then build and test in one command. Under ten minutes, run it in the foreground with a long timeout: the wait costs nothing. Longer, run it in the background, say so in one line and end the turn; the harness calls back when it exits. Each poll, sleep or wake-up is a paid request. If the user writes while a job runs, check it once and carry on.
- **Tails.** Read the end of an output or its error lines (`grep -E "error|FAIL|passed"`), and only the part of a file the task needs. Tile many pictures (video frames, screenshots) into one contact sheet first (ffmpeg's `tile` filter); open a single one only where the sheet is not enough.
- **Batch.** Send independent reads, searches and commands in one message. Report once, briefly.
- **Clean up.** Stop each background task, monitor or scheduled job as soon as its news has arrived. Schedule a check only on request: one job, at the pace the watched thing changes, deleting itself when done.
- **A tool beats a one-liner.** A check worth running twice becomes a small script in the repository, run as one command.
- **Helpers that pay.** Hand a subagent a bounded job that would flood this context: a wide search, a review of a finished diff, an audit. On every call, name the smallest model that can do the job: a built-in helper may otherwise run on this session's model. As few helpers as the job needs, one shared brief, a short report, one writer per file. A small job stays inline, and so does work that needs the machine to itself (a build, an editor, a render).
- **Skills by need.** Load and run the skill the task calls for, never apply one from memory; name the ones used in one line.
- **Local first.** Test on this machine; let CI run to publish.
- **Lean index.** Always-loaded files (this one, the memory index) hold short pointers; status and history live in the file a pointer names. A handoff page read at every start holds the state now: each update rewrites it and drops what is no longer true.
- **Cost shapes the plan.** It is a reason to take fewer steps, never to stop: name a large cost once, then carry on.
<!-- fewturns:end -->

## Block 2: this setup

Fill the `<...>` places from the user's row in [PLANS.md](PLANS.md), their work type in [WORK.md](WORK.md) and their answers; drop the `<...>` places that do not apply. Write this block last. Keep the **Helpers, unasked** line only if the four helper files were written, and the **Git** line only if they chose the git workflow.

<!-- codekickoff:start -->
## CodeKickoff: this setup

- **Plan.** <plan>. Everyday work: <model> at effort <effort>. A tough job: <tough job>. After a plan change, run `/codekickoff plan`.
- **Helpers, unasked.** Standing request: use the lean helpers (scout, web-scout, worker, reviewer) without asking, for bounded jobs whose material is large and whose answer is small. Brief once, ask for a short report, check a finding before acting on it.
- **Handoff.** Each project keeps `HANDOFF.md`: the state now and the next step. Read it first in a new session; rewrite it after each block of work, dropping what is no longer true.
- **Safe points.** When a block of work is done and tested, update the handoff, then ask whether to start a fresh session or carry on, recommending the cheaper: fresh when the conversation is long and the next job needs nothing unwritten.
- **Memory.** Claude Code keeps an auto memory of its own (`/memory` shows it). "Remember this" means one short fact saved there, with a one-line pointer in its index. Never a password, key or token.
- **Ask first.** Publishing, deleting, paying, sending anything outside this machine, and pushing to `main` each wait for a clear yes.
- **Git.** Every change on a branch and a pull request. Run the project's full check before every push. Never merge, force-push or push to `main`: merging is the user's.
- **Plain words.** The user is new to Claude Code: explain a term in one line the first time it comes up.
<work lines>
<!-- codekickoff:end -->
