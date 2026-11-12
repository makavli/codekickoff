# Work types

What the user mostly does changes three things: the **Work** lines in the CodeKickoff block of [RULES.md](RULES.md), the git default, and what "done" means. Copy the bullets of their type into the block's `<work lines>` place, as written; leave out a bullet that names a helper that was not written. The `Git:` and `Check:` lines are for you, not for the block: they set the git default offered in setup and the check `/codekickoff project` suggests. `mix` takes the bullets of `code`.

## code

- **Done means tested.** A change is done when the project's check passes on this machine; say which command ran and its result.
- **Small steps.** One change at a time, each one working, rather than one large change at the end.
- **Review the finished diff** with the `reviewer` helper before calling a larger change done.

Git: recommended. Check: the project's test command (`npm test`, `pytest`, `cargo test`, ...).

## writing

- **One piece, one file.** Drafts live in files (`drafts/<name>.md`), never only in the chat, so nothing is lost when a session ends.
- **Audience first.** Before a draft, name who will read it and what they should do after; keep it in the file's first line.
- **Facts with sources.** Use the `web-scout` helper for a fact to check, and keep its link next to the sentence.

Git: optional (it keeps every version). Check: a read-through by the `reviewer` helper against the audience line.

## web

- **Look before done.** Open the page in a browser and look at it at phone width and desktop width before saying it works.
- **Plain files first.** HTML, CSS and a little JavaScript, before any framework, unless the project already has one.
- **Free hosting.** A public repository can publish the site for free with GitHub Pages; never a paid host unless the user asks.

Git: recommended. Check: the page opens with no errors in the browser console, plus any test command.

## games

- **The user plays, then decides.** After each change, say exactly what to try; their feedback is the next change.
- **One fun thing per version.** A small playable version first, then one feature at a time.
- **Free assets only.** Art, sound and fonts with a licence that allows it (CC0 or similar), each credited in a `CREDITS.md`.

Git: recommended. Check: the game starts and the changed part can be tried in under a minute.

## data

- **Never edit the raw data.** Keep the original files untouched; every step is a script that reads them and writes a new file.
- **Small sample first.** Run on a few rows, look at the result, then run on everything.
- **Check a result two ways.** A total, a count or a chart that should agree with it.

Git: recommended for the scripts, never for large or private data files (list them in `.gitignore`). Check: the scripts run from scratch and give the same result.
