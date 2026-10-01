import { expect, test } from "@playwright/test";

test("serves the essential public endpoints", async ({ page, request }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: /Otavio Gonzaga/ })).toBeVisible();
  await expect(page).toHaveTitle(/Otavio Gonzaga/);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.getByRole("heading", { name: /Selected software projects/ })).toBeVisible();
  await expect(page.getByRole("link", { name: "LinkedIn", exact: true })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/otaviogonzaga",
  );
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(2);

  for (const path of ["/healthz", "/robots.txt", "/sitemap.xml"]) {
    const response = await request.get(path);
    expect(response.ok()).toBeTruthy();
  }
});

test("persists language and theme preferences", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /theme:/ }).click();
  await page.getByRole("button", { name: /English/ }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1, name: "Otavio Gonzaga" })).toBeVisible();

  await page.getByRole("button", { name: /theme:/ }).click();
  await page.getByRole("button", { name: /Dark/ }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("keeps the header usable on narrow screens and exposes the skip link", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await expect(page.getByRole("button", { name: /theme:/ })).toBeVisible();
  expect(
    await page.locator("body").evaluate((element) => element.scrollWidth <= window.innerWidth),
  ).toBe(true);

  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Pular para o conteúdo principal" })).toBeFocused();
});
