import { describe, expect, it } from "vitest";

import { extractReleaseNotes } from "./extract-release-notes";
import { prepareRelease } from "./release";

const changelog = "# Changelog\n\n## [Unreleased]\n\n### Added\n- First release\n";

describe("release scripts", () => {
  it("promotes unreleased changes to a new version", () => {
    const result = prepareRelease({
      packageJson: { version: "0.1.0" },
      changelog,
      version: "0.1.1",
      date: "2026-10-01",
    });
    expect(result.packageJson.version).toBe("0.1.1");
    expect(extractReleaseNotes(result.changelog, "0.1.1")).toContain("First release");
  });

  it("rejects a non-incrementing version", () => {
    expect(() =>
      prepareRelease({
        packageJson: { version: "0.1.0" },
        changelog,
        version: "0.1.0",
        date: "2026-10-01",
      }),
    ).toThrow("greater");
  });
});
