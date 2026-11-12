# Security

## What is in scope

CodeKickoff is a set of instructions, with no script. An agent that follows them reads Claude Code's settings, agents and instruction files, and edits them only after the user says yes to each change, with a backup first.

A security problem is anything in this repository that could lead an agent that follows `SKILL.md`, `PLANS.md`, `HELPERS.md`, `RULES.md` or `GIT.md` to do something the user did not approve: reach the network, send a file, weaken a setting or a permission, or write outside the files these pages name.

## Supported versions

The latest release is supported. It is always the tip of `main`: a fix is released the moment it is merged.

## Reporting a problem

Please do not open a public issue. Report it privately through GitHub's [private vulnerability reporting](https://github.com/makavli/codekickoff/security/advisories/new) for this repository, with what you found, how to reproduce it and what it could let someone do.

## Installing safely

Install CodeKickoff only from `makavli/codekickoff` on GitHub. It ships text files only: no executables, no hooks, no install script. A copy that carries any of those is not this project.
