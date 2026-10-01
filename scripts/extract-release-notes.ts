import { readFile } from "node:fs/promises";

export function extractReleaseNotes(changelog: string, version: string) {
  const match = changelog.match(
    new RegExp(
      `^## \\[${version.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\][^\\n]*\\n([\\s\\S]*?)(?=^## \\[|(?![\\s\\S]))`,
      "m",
    ),
  );
  if (!match) throw new Error(`release notes not found for ${version}`);
  return match[1].trim();
}

if (import.meta.main) {
  const version = process.argv[2];
  if (!version) throw new Error("usage: bun scripts/extract-release-notes.ts VERSION");
  process.stdout.write(`${extractReleaseNotes(await readFile("CHANGELOG.md", "utf8"), version)}\n`);
}
