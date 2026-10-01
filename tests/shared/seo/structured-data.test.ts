import { describe, expect, it } from "vitest";

import { defaultMetadata } from "@/shared/seo/metadata";
import { personStructuredData, websiteStructuredData } from "@/shared/seo/structured-data";

describe("SEO helpers", () => {
  it("provides canonical metadata", () => {
    expect(defaultMetadata.alternates?.canonical).toBe("/");
    expect(String(defaultMetadata.metadataBase)).toMatch(/^https:/);
  });

  it("creates WebSite structured data", () => {
    expect(websiteStructuredData()).toMatchObject({ "@type": "WebSite", name: "Otavio Gonzaga" });
  });
});

it("describes the person with factual professional links", () => {
  const data = personStructuredData();
  expect(data).toMatchObject({
    "@type": "Person",
    name: "Otavio Gonzaga",
    jobTitle: "Software Engineer",
  });
  expect(data.sameAs).toContain("https://github.com/OtavioGonzaga");
  expect(data.sameAs).toContain("https://www.linkedin.com/in/otaviogonzaga");
});
