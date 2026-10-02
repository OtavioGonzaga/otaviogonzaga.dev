# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- Production fonts, project sitemap entries, semantic Tailwind tokens, and accessible native preference dialogs.
- GitHub API request timeout, deployment rollback coverage, and release recovery state coverage.
- Dedicated project routes, project smoke coverage, and content-backed practice areas.
- GitHub module Ports & Adapters with unit tests and broader module coverage.
- Project cards now keep spacing when the mobile layout switches to one column.
- Footer external links now open in a separate tab; preference triggers and project-card spacing were refined.
- Portuguese and English translations for the complete landing-page copy, with independent TUI-style theme and language menus.
- Figma-aligned portfolio layout with detailed hero, project, practice, GitHub, contact, and footer sections.
- Portfolio sections for profile, selected projects, social links, and cached GitHub activity.
- Person structured data for Otavio Gonzaga, including UTFPR education and public profiles.
- Gruvbox light and dark themes with system, light, and dark preferences.
- Portuguese and English presentation with a server-readable language cookie.
- Initial Next.js, Bun, quality, OCI, release, and deployment foundation.

### Changed

- The initial package version now represents the state before the first `v0.1.0` release.
- Release, OCI image, and deployment workflows now verify the release commit throughout recovery and deployment.
- Release recovery accepts only generated commits that modify `CHANGELOG.md` and `package.json`.
- Deployment authenticates GHCR digest resolution and removes remote temporary deployment files automatically.
- Dependabot continues to update GitHub Actions; its Bun updater is temporarily disabled because it does not support Bun 1.4 lockfileVersion 2.
- Generate Next.js declaration files before type checks instead of tracking generated `next-env.d.ts`.

### Removed

- Empty RSS feed surface until a publishing domain exists.
