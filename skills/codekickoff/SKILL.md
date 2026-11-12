---
name: codekickoff
description: >
  First setup for someone new to Claude Code. Asks which plan they pay for and
  what they work on, then sets, each on their yes: the model and effort that fit
  the plan, four lean helpers, working rules with a handoff and safe points, and
  an optional git workflow. Use right after installing Claude Code or changing plan.
argument-hint: "[setup|plan|check|undo]"
license: MIT
---

# CodeKickoff

A working setup on day one, sized to the plan the user pays for. Every change is an edit the user sees and approves; nothing is sent anywhere, and `/codekickoff undo` reverses each part.

Talk to someone who has never opened a settings file: plain words, short lines, no jargon without a one-line meaning. Ask at most four questions in all, in one dialog when the host has one.

Take the branch the argument names. With no argument, run **setup**.

## setup

1. **Ask** in one dialog:
   - which plan they have (the rows of [PLANS.md](PLANS.md));
   - what they mostly do: code, writing, web pages, games, data, or a mix;
   - where the setup goes: every project (recommended) or this project only;
   - whether they want the git workflow, and for which kind of repository: public, private, or no git yet ([GIT.md](GIT.md)).
   On the Free plan, stop here: say that Claude Code needs a paid plan or an API key, and that nothing was changed.
2. **Show the plan** in at most six short lines, before any edit: the model and effort for everyday work and for a tough job, the helpers, the rules, and the git workflow if chosen, each with what it costs and what it gives. Then one yes for all, or the parts they pick.
3. **Back up** each settings file before its first edit: copy it beside itself as `<name>.bak-codekickoff-<YYYY-MM-DD>` with `cp -p`, keeping an existing backup of the same day. Settings can hold tokens: inside a git repository, unless `git check-ignore` already covers the backup, add `*.bak-codekickoff-*` to `.git/info/exclude`. Name each backup to the user.
4. **Apply** only what they accepted, at the scope they chose:
   - **Model and effort.** Set the keys their row of [PLANS.md](PLANS.md) names in `~/.claude/settings.json` (every project) or `.claude/settings.json` (this project); create the file as `{}` if it is missing. Change only those keys; keep every other key as it is. Where `model` or `effortLevel` already holds another value, show it beside the row's value and let the user pick; where the row leaves `model` unset, an existing `model` counts too.
   - **Helpers.** Write each file of [HELPERS.md](HELPERS.md) into `~/.claude/agents/` or `.claude/agents/`, with the models their row names on the `model:` line. A file of that name already there is left alone, unless it matches HELPERS.md apart from its `model:` line: then it is CodeKickoff's, and only that line is updated.
   - **Rules.** Put both blocks of [RULES.md](RULES.md) into `~/.claude/CLAUDE.md` or the project's `CLAUDE.md` (create the file if it is missing), with the placeholders filled from their row and answers. Where a block's markers already exist as a pair, replace what is between them; leave the rest of the file as it is. Where only one marker of a pair is there, stop and show the user that spot instead of editing. Where the Fewturns block is there and differs from RULES.md, it may be a newer Fewturns: show the difference and replace it only on a yes.
   - **Git.** As [GIT.md](GIT.md) says for their kind of repository.
5. **Prove** each edited JSON file still parses, with its path in quotes: `node -e "JSON.parse(require('fs').readFileSync(process.argv[1],'utf8'))" "<file>"`. Without Node, read it back and check the braces and commas by eye.
6. **Close** in at most five lines: what changed, that it applies from the next session (open a new one, then `/codekickoff check`), the one command to raise effort for a hard moment (`/effort`), and that `/codekickoff undo` reverses any part.

Done when every part is applied or declined, every edited file parses, and the user knows how to check and undo.

## plan

The user changed plan. Read their current plan from the **Plan** line of the CodeKickoff block (ask only if the block is missing), ask which plan they have now, show what changes from their current row to the new one (model, effort, helper models, the plan line of the rules), and apply it on a yes, as **setup** steps 3 to 5.

## check

Read the settings files, the agents folders and the instruction files, and report each part as set, missing or changed by hand, against the plan line in the rules block. Then compare with what this session loaded: the helpers in the agent list and the rules in your context. A part in the files that this session does not show means it has not reloaded: open a new session.

## undo

Ask which part to undo.

- **Model and effort.** Take the oldest `.bak-codekickoff-*` backup of each settings file (the state before CodeKickoff first touched it) and show which of the keys [PLANS.md](PLANS.md) sets differ from it. After a yes, set those keys back to the backup's values, or remove them where the backup did not have them; leave every other key as it is now. A backup neither you nor the user made is not CodeKickoff's: say so and leave it.
- **Helpers.** After a yes, delete each helper file that still matches [HELPERS.md](HELPERS.md) apart from its `model:` line; one that differs otherwise is the user's.
- **Rules.** Delete a block and its two markers. The Fewturns block belongs to Fewturns too: if the user has Fewturns installed, ask before removing it.
- **Git.** Remove what [GIT.md](GIT.md) installed, each only if it still matches GIT.md: the hook file and the workflow file.

Done when the user has seen each change and the edited files parse.
