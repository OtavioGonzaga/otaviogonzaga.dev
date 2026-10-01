import { expect, test } from "@playwright/test";

test("serves the essential public endpoints", async ({ page, request }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Otavio Gonzaga" })).toBeVisible();
  await expect(page).toHaveTitle(/Otavio Gonzaga/);

  for (const path of ["/healthz", "/robots.txt", "/sitemap.xml"]) {
    const response = await request.get(path);
    expect(response.ok()).toBeTruthy();
  }
});
