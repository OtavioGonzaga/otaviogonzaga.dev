# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- Project cards now keep spacing when the mobile layout switches to one column.
- Footer external links now open in a separate tab; preference triggers and project-card spacing were refined.
- Working footer links and an RSS feed at `/rss.xml`.
- Portuguese and English translations for the complete landing-page copy, with independent TUI-style theme and language menus.
- Figma-aligned portfolio layout with detailed hero, project, practice, GitHub, contact, and footer sections.
- Portfolio sections for profile, selected projects, social links, and cached GitHub activity.
- Person structured data for Otavio Gonzaga, including UTFPR education and public profiles.
- Gruvbox light and dark themes with system, light, and dark preferences.
- Portuguese and English presentation with a server-readable language cookie.
- Initial Next.js, Bun, quality, OCI, release, and deployment foundation.

### Changed

- Generate Next.js declaration files before type checks instead of tracking generated `next-env.d.ts`.
