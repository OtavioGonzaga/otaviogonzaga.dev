# Releasing

Releases are manual GitHub Actions workflow dispatches from `main`. Supply a SemVer version without a `v` prefix. The workflow runs CI, verifies that `main` did not advance, promotes `[Unreleased]`, creates `chore(release): vX.Y.Z` and an annotated tag, builds and signs the OCI image, publishes it to GHCR, and creates the GitHub Release.

Published releases are immutable. Correct a release with a new SemVer release.
