# The git workflow

Offered only when the user wants it. Ask which kind of repository first, because the answer decides the cost.

## What it is, for every kind

1. Every change goes on a branch and through a pull request; `main` changes only when the user merges.
2. Before every push, the project's full check runs on this machine, and the push waits for it to pass.
3. Claude never merges, never force-pushes and never pushes to `main`.

The **Git** line of [RULES.md](RULES.md) carries these three for Claude. A local guard backs up the third for everyone: save the hook below as `.git/hooks/pre-push`, and make it executable (`chmod +x`). It lives in `.git`, so it is never committed.

- If `git config core.hooksPath` prints a folder, hooks run from there: put it there instead, or tell the user.
- If a `pre-push` hook is already there, it is the user's: never write over it. Show them the guard and let them add it.
- Say what it is: a guard against a slip, not a lock. `git push --no-verify` skips it; only a rule on the server (GitHub's branch rules) truly protects `main`.

```sh
#!/bin/sh
# Refuse pushes to main or master; changes go through a pull request.
while read -r _ _ remote_ref _; do
  case "$remote_ref" in
    refs/heads/main|refs/heads/master) echo "Push to a branch and open a pull request instead." >&2; exit 1 ;;
  esac
done
exit 0
```

## Public repository: CI is free

GitHub Actions minutes are free on public repositories. Offer a workflow that runs the project's check on every pull request: ask for the check command (or read it from `package.json`, `Makefile`, `pyproject.toml`), and write `.github/workflows/check.yml` with it on `ubuntu-latest` only, read-only permissions, and a 10-minute timeout. Before the repository goes public, remind the user that its whole history becomes visible: no keys, no personal addresses.

## Private repository: say the cost first

Actions minutes on private repositories come from a monthly allowance (2,000 minutes on GitHub Free at the time of writing; Windows runners count double and macOS ten times), and past it they are billed or stop. Say that in one line, then offer the cheaper default: **no CI workflow**, the check runs locally before each push, which costs nothing. Write a workflow only if the user still asks for one, and then with `workflow_dispatch` only, so it runs when they start it.

## No git yet

Say in two lines what git gives them (every change saved and reversible), offer `git init` in the project, and add the local check and the guard once there is a check to run.
