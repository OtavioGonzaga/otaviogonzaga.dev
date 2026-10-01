import { describe, expect, it } from "vitest";

import { defaultMetadata } from "@/shared/seo/metadata";
import { websiteStructuredData } from "@/shared/seo/structured-data";

describe("SEO helpers", () => {
  it("provides canonical metadata", () => {
    expect(defaultMetadata.alternates?.canonical).toBe("/");
    expect(String(defaultMetadata.metadataBase)).toMatch(/^https:/);
  });

  it("creates WebSite structured data", () => {
    expect(websiteStructuredData()).toMatchObject({ "@type": "WebSite", name: "Otavio Gonzaga" });
  });
});
