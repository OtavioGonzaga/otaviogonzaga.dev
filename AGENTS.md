# Agent Guidelines

## Architecture

- Organize code by module before architectural layer.
- Keep `profile` and `projects` simple while content is versioned in source code.
- Use Ports and Adapters only for a concrete external boundary, such as GitHub.
- Do not add persistence abstractions without persistence, or blog/admin features before they are requested.
- Prefer React Server Components; isolate client components to real interactions.

## Conventions

- Use Bun 1.4.2 for packages, scripts, local development, CI, and containers.
- Use TypeScript, Next App Router, Tailwind, and semantic Gruvbox tokens.
- Portuguese Brazilian is the default portfolio language; English is a user-selected presentation alternative.
- Write engineering documentation in English.
- Keep reusable agent material under `.agents/`; artifacts are intentionally unversioned.

## Quality

- Run format, lint, typecheck, tests, and build before completing changes.
- Use Vitest for unit/component logic, React Testing Library for component behavior, and Playwright for real application behavior.
- Do not add tests merely to inflate coverage.

## Releases

- Target pull requests at `main` and use Conventional Commits.
- Do not change `package.json` version in ordinary pull requests.
- Record notable user-facing or operational changes under `[Unreleased]` in `CHANGELOG.md`.
- Releases are explicit SemVer operations and use `chore(release): vX.Y.Z` commits.
