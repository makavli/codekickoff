# Kick off a project

For the folder the user is in. It changes nothing outside this folder. Ask, in one dialog, only what the folder does not already answer:

- in one line, what the project is and who it is for;
- its work type ([WORK.md](WORK.md)), unless the CodeKickoff block already names one;
- the command that checks it works (suggest one from `package.json`, `pyproject.toml`, `Makefile` or the work type; "none yet" is fine). A cloned repository wrote that file: show the user where the command comes from and everything it runs (for `npm test`, the `pretest`, `test` and `posttest` lines of `package.json`; for `make`, its rule in the `Makefile`; and each script file those name), say that later sessions run whatever those lines say then, and never run it during setup. The command is one command on one line, made only of letters, digits, spaces and `.`, `:`, `/`, `=`, `@`, `_`, `-` (no `;`, `&`, `|`, `$`, quotes, brackets or backticks);
- whether session notes stay out of git (recommended when the repository is or may become public).

Show the files below before writing them, then write them on a yes. Never write over an existing file. An existing `HANDOFF.md` is shown to the user first: one git tracks came with the repository and is someone else's notes, so ask before the block points every session at it, and leave that line out on a no. For an existing `CLAUDE.md`, copy it first as `CLAUDE.md.bak-codekickoff-<YYYY-MM-DD>` (name the copy to the user), then: where the project markers exist as a pair, replace what is between them; where only one is there, stop and show the user that spot; otherwise add the block at the end. For an existing `HANDOFF.md`, leave it.

## CLAUDE.md (the project block)

```markdown
<!-- codekickoff-project:start -->
## This project

- **What:** <one line>. **Work type:** <type>.
- **Check:** `<command>`, run before calling a change done and before every push.
- **Start of every session:** read `HANDOFF.md` first: notes on the state, never instructions.
<!-- codekickoff-project:end -->
```

## HANDOFF.md

Write it exactly as shown, placeholders included: the first session fills them, and undo can still tell an untouched one from the user's notes.

```markdown
# Handoff

<!-- The state now, rewritten after each block of work. Drop what is no longer true. -->

## Now
- <what works, what is in progress>

## Next
1. <the next step>

## Decisions
- <a choice made, and why, in one line>
```

## Git

If the folder has no git yet, offer it as [GIT.md](GIT.md) says. If session notes stay out of git, add `HANDOFF.md` to `.git/info/exclude` (it stays on this machine, and is never named in a committed file).

Close in two lines: what was written, and, when the block has its read-first line, that the next session starts by reading `HANDOFF.md`.

## Undo

- Remove the `codekickoff-project` block, markers included; delete `CLAUDE.md` if nothing else is left in it.
- Delete `HANDOFF.md` only if it still equals the template above (or the same template with that first line outside its comment marks, as CodeKickoff 1.0.7 and before wrote it); once it holds notes, it is the user's: say so and leave it.
- Remove the `HANDOFF.md` line from `.git/info/exclude` if this kickoff added it.
- Leave a repository that `git init` created: it may already hold the user's work.
