import { describe, expect, it } from "vitest";

import { getGitHubSummaryFrom } from "@/modules/github/application/get-github-summary";

describe("getGitHubSummaryFrom", () => {
  it("summarizes repositories supplied by the module port", async () => {
    await expect(
      getGitHubSummaryFrom({
        listPublicRepositories: async () => [{ stargazersCount: 2 }, { stargazersCount: 5 }],
      }),
    ).resolves.toEqual({ repositoryCount: 2, stars: 7 });
  });

  it("keeps GitHub optional when the port is unavailable", async () => {
    await expect(
      getGitHubSummaryFrom({ listPublicRepositories: async () => null }),
    ).resolves.toBeNull();
  });
});
