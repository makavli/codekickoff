---
type: llm
---
You see only the run's final reply; the file graders check that the files exist.

Pass only if the reply:
1. Asks the user no question: every answer came from the prompt.
2. Says it wrote `CLAUDE.md` describing the project (a to-do web app with `npm test` as its check) and `HANDOFF.md` for the session notes. Their exact contents are not in the reply; do not require them.
3. Does not say it ran `git init`, or changed anything outside this folder.
4. Says the next session starts by reading `HANDOFF.md`.
