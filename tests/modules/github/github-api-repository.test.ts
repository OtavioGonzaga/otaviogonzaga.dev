import { afterEach, describe, expect, it, vi } from "vitest";

import { GitHubApiRepository } from "@/modules/github/adapters/github-api-repository";

describe("GitHubApiRepository", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("maps GitHub API data into the module port", async () => {
    const fetch = vi
      .fn()
      .mockResolvedValue({ ok: true, json: async () => [{ stargazers_count: 3 }] });
    vi.stubGlobal("fetch", fetch);

    await expect(new GitHubApiRepository().listPublicRepositories()).resolves.toEqual([
      { stargazersCount: 3 },
    ]);
    expect(fetch).toHaveBeenCalledOnce();
  });

  it("returns null for failed or unavailable requests", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    await expect(new GitHubApiRepository().listPublicRepositories()).resolves.toBeNull();
  });
});
