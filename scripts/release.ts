import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

type PackageJson = Record<string, unknown> & { version: string };

const semverPattern = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;

function compareVersions(left: string, right: string) {
  return left
    .split("-")[0]
    .split(".")
    .map(Number)
    .reduce(
      (result, part, index) =>
        result || Math.sign(part - Number(right.split("-")[0].split(".")[index])),
      0,
    );
}

export function prepareRelease(input: {
  packageJson: PackageJson;
  changelog: string;
  version: string;
  date: string;
}) {
  const { packageJson, changelog, version, date } = input;
  if (!semverPattern.test(version)) throw new Error(`invalid release version: ${version}`);
  if (compareVersions(version, packageJson.version) <= 0)
    throw new Error(`release version must be greater than ${packageJson.version}`);
  const heading = "## [Unreleased]";
  const index = changelog.indexOf(heading);
  if (index === -1) throw new Error("CHANGELOG.md must contain an [Unreleased] section");
  const contentStart = index + heading.length;
  const nextHeading = changelog.indexOf("\n## [", contentStart);
  const changes = changelog
    .slice(contentStart, nextHeading === -1 ? undefined : nextHeading)
    .trim();
  if (!/^### (Added|Changed|Deprecated|Removed|Fixed|Security)\n[\s\S]*^- /m.test(changes)) {
    throw new Error("[Unreleased] must contain a categorized change");
  }
  if (changelog.includes(`## [${version}]`))
    throw new Error(`CHANGELOG.md already contains ${version}`);
  const suffix = nextHeading === -1 ? "" : changelog.slice(nextHeading);
  return {
    packageJson: { ...packageJson, version },
    changelog: `${changelog.slice(0, index)}${heading}\n\n## [${version}] - ${date}\n\n${changes}\n${suffix}`,
  };
}

async function main() {
  const version = process.argv[2];
  if (!version) throw new Error("usage: bun scripts/release.ts VERSION");
  const root = process.cwd();
  const packagePath = path.join(root, "package.json");
  const changelogPath = path.join(root, "CHANGELOG.md");
  const result = prepareRelease({
    packageJson: JSON.parse(await readFile(packagePath, "utf8")),
    changelog: await readFile(changelogPath, "utf8"),
    version,
    date: process.env.RELEASE_DATE ?? new Date().toISOString().slice(0, 10),
  });
  await writeFile(packagePath, `${JSON.stringify(result.packageJson, null, 2)}\n`);
  await writeFile(changelogPath, result.changelog);
}

if (import.meta.main)
  main().catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  });
