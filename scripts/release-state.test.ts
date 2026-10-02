import { execFileSync } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

const script = path.join(process.cwd(), "scripts/release-state.sh");
const directories: string[] = [];

function git(directory: string, ...args: string[]) {
  return execFileSync("git", args, { cwd: directory, encoding: "utf8" }).trim();
}

function runState(directory: string) {
  return execFileSync("bash", [script, "0.1.0"], {
    cwd: directory,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

async function createRepository() {
  const directory = await mkdtemp(path.join(tmpdir(), "release-state-test-"));
  directories.push(directory);
  const remote = path.join(directory, "origin.git");
  const worktree = path.join(directory, "worktree");
  git(directory, "init", "--bare", remote);
  git(directory, "clone", remote, worktree);
  git(worktree, "checkout", "-b", "main");
  git(worktree, "config", "user.name", "Test User");
  git(worktree, "config", "user.email", "test@example.com");
  await writeFile(path.join(worktree, "package.json"), '{"version":"0.0.1"}\n');
  await writeFile(path.join(worktree, "CHANGELOG.md"), "# Changelog\n\n## [Unreleased]\n");
  git(worktree, "add", ".");
  git(worktree, "commit", "-m", "chore: initial");
  git(worktree, "push", "-u", "origin", "main");
  return worktree;
}

async function addReleaseCommit(directory: string, version = "0.1.0") {
  await writeFile(path.join(directory, "package.json"), `{"version":"${version}"}\n`);
  await writeFile(
    path.join(directory, "CHANGELOG.md"),
    `# Changelog\n\n## [Unreleased]\n\n## [${version}] - 2026-10-02\n`,
  );
  git(directory, "add", ".");
  git(directory, "commit", "-m", `chore(release): v${version}`);
  git(directory, "push", "origin", "main");
  return git(directory, "rev-parse", "HEAD");
}

afterEach(async () => {
  await Promise.all(
    directories.splice(0).map((directory) => rm(directory, { force: true, recursive: true })),
  );
});

describe("release-state", () => {
  it("reports an unprepared release when no release commit exists", async () => {
    const repository = await createRepository();
    expect(runState(repository)).toContain("prepared=false");
  });

  it("finds a valid release commit without a tag", async () => {
    const repository = await createRepository();
    const commit = await addReleaseCommit(repository);
    const state = runState(repository);
    expect(state).toContain("prepared=true");
    expect(state).toContain(`release_commit_sha=${commit}`);
    expect(state).toContain("tag_state=missing");
  });

  it("accepts an annotated tag on the release commit", async () => {
    const repository = await createRepository();
    await addReleaseCommit(repository);
    git(repository, "tag", "-a", "v0.1.0", "-m", "Release v0.1.0");
    expect(runState(repository)).toContain("tag_state=correct");
  });

  it("rejects a lightweight release tag", async () => {
    const repository = await createRepository();
    await addReleaseCommit(repository);
    git(repository, "tag", "v0.1.0");
    expect(() => runState(repository)).toThrow("release tag must be annotated");
  });

  it("does not accept a release-shaped commit with a different package version", async () => {
    const repository = await createRepository();
    await addReleaseCommit(repository, "0.1.1");
    expect(runState(repository)).toContain("prepared=false");
  });

  it("rejects an annotated tag that points away from the release commit", async () => {
    const repository = await createRepository();
    await addReleaseCommit(repository);
    git(repository, "tag", "-a", "v0.1.0", "HEAD~1", "-m", "Release v0.1.0");
    expect(() => runState(repository)).toThrow("release tag does not match the release commit");
  });
});
