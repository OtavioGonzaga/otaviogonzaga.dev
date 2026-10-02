#!/usr/bin/env bash
set -euo pipefail

version=${1:?usage: scripts/release-state.sh VERSION}
tag="v$version"
semver='^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)$'

[[ "$version" =~ $semver ]] || { echo 'invalid SemVer version' >&2; exit 64; }

release_commit=""
while IFS= read -r candidate; do
  [[ "$(git log -1 --format=%s "$candidate")" == "chore(release): $tag" ]] || continue
  changed_files=$(git diff-tree --no-commit-id --name-only -r "$candidate^!" | LC_ALL=C sort)
  [[ "$changed_files" == $'CHANGELOG.md\npackage.json' ]] || continue
  [[ "$(git show "$candidate:package.json" | jq -r .version)" == "$version" ]] || continue
  git show "$candidate:CHANGELOG.md" | grep -Fq "## [$version]" || continue
  git merge-base --is-ancestor "$candidate" origin/main || continue
  release_commit="$candidate"
  break
done < <(git rev-list origin/main)

tag_state=missing
if git rev-parse -q --verify "refs/tags/$tag" >/dev/null; then
  [[ "$(git cat-file -t "refs/tags/$tag")" == tag ]] || { echo 'release tag must be annotated' >&2; exit 1; }
  [[ -n "$release_commit" && "$(git rev-parse "$tag^{}")" == "$release_commit" ]] || {
    echo 'release tag does not match the release commit' >&2
    exit 1
  }
  tag_state=correct
fi

printf 'prepared=%s\n' "$([[ -n "$release_commit" ]] && echo true || echo false)"
printf 'release_commit_sha=%s\n' "$release_commit"
printf 'tag_state=%s\n' "$tag_state"
