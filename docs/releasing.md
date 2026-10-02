# Releasing

Releases are manual GitHub Actions workflow dispatches from `main`. Supply a stable SemVer version without a `v` prefix; prereleases are intentionally unsupported. The workflow runs CI, verifies that `main` did not advance, promotes `[Unreleased]`, creates `chore(release): vX.Y.Z`, builds and signs the OCI image, then creates the annotated tag and GitHub Release. Interrupted runs reuse a valid release commit and image only when their provenance matches.

Published releases are immutable. Correct a release with a new SemVer release.
