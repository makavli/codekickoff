## What changes and why

## How it was checked

- [ ] `npm run check` passes
- [ ] A new version and its `CHANGELOG.md` entry (`npm run bump <version>`): merging this publishes it as a release
- [ ] A changed plan setting names its source (docs page or Claude Code version)
- [ ] Nothing in `skills/` reaches the network, and every edit it asks for waits for the user's yes
