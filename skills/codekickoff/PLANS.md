# Plans

What each plan gets. Checked against Claude Code 2.1.322 and Anthropic's pricing and model pages in November 2026; plans and limits change, so when the user's screen says otherwise, believe the screen.

Every paid plan shares one usage allowance between Claude and Claude Code, refilled in windows of a few hours and capped each week. A larger model or a higher effort spends it faster; a helper on a small model spends it slower. On the API every token is billed instead.

## The table

| Plan | Everyday work | A tough job | Helpers: scout, web-scout / worker, reviewer |
|---|---|---|---|
| Free | Claude Code is not included | | |
| Pro | `opus`, effort `medium` | `/effort high` for that session | `haiku` / `sonnet` |
| Max | `opus`, effort `high` | `/effort xhigh` or `max`; `/model fable` sparingly, on its own weekly limit | `haiku` / `sonnet` |
| Ultra | `opus`, effort `high` | `/model fable` with `/effort max` | `haiku` / `sonnet` |
| Team Standard | as Pro | as Pro | as Pro |
| Team Premium | as Max | as Max | as Max |
| Enterprise | as Max, unless the admin turned a model off | ask the admin what is on | as Max |
| API (pay per use) | `sonnet`, effort `medium` | `/model opus` for that session | `haiku` / `haiku` |

## The keys

Every project: `~/.claude/settings.json`. This project only: `.claude/settings.json`.

| Part | Key | Values |
|---|---|---|
| Model | `"model"` | `opus`, `sonnet`, `haiku`, `fable`, `opusplan`. Leave it unset where the row says `opus`: that is already the default on every paid plan, and the rules' plan line says "opus (the default)". Only the API row writes it. |
| Effort | `"effortLevel"` | `low`, `medium`, `high`, `xhigh`. `max` is not a saved value: `/effort max` sets it for one session. |
| Helper model | the `model:` line of each helper file | as the row says |

Effort is how long the model thinks before it answers. More is better on hard problems and spends the allowance faster on easy ones, which is why the rows keep it modest and raise it for one session when a job deserves it.

## Why these rows

- **Pro** has the smallest allowance: the strong model at its default effort, and small helpers for searches, keeps a day of work inside it.
- **Max and Ultra** can afford more thought on every turn. Fable is the strongest model and the most expensive; keep it for the jobs that need it.
- **API** bills each token, so the everyday model is the mid-size one and the large one is a choice made per session. Suggest a monthly spend limit in the Anthropic Console.
- **Helpers** read and search much more than they write, so the small model does that work and the session keeps the large one for decisions.
