import { describe, expect, it } from "vitest";

import { absoluteUrl, siteConfig } from "@/shared/config/site";

describe("site configuration", () => {
  it("uses a valid canonical site URL", () => {
    expect(siteConfig.url.protocol).toBe("https:");
  });

  it("builds absolute URLs", () => {
    expect(absoluteUrl("/healthz")).toBe(`${siteConfig.url.origin}/healthz`);
  });
});
