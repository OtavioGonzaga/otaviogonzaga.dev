import { expect, test } from "@playwright/test";

test("serves the essential public endpoints", async ({ page, request }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: /Otavio Gonzaga/ })).toBeVisible();
  await expect(page).toHaveTitle(/Otavio Gonzaga/);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(
    page.getByRole("heading", { name: /Projetos e experimentos de software/ }),
  ).toBeVisible();
  await expect(
    page.locator("footer").getByRole("link", { name: "LinkedIn", exact: true }),
  ).toHaveAttribute("href", "https://www.linkedin.com/in/otaviogonzaga");
  await expect(
    page.locator("footer").getByRole("link", { name: "GitHub", exact: true }),
  ).toHaveAttribute("target", "_blank");
  await expect(
    page.locator("footer").getByRole("link", { name: "LinkedIn", exact: true }),
  ).toHaveAttribute("target", "_blank");
  await expect(page.getByRole("link", { name: "RSS", exact: true })).toHaveAttribute(
    "href",
    "/rss.xml",
  );
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(2);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://otaviogonzaga.dev",
  );

  for (const path of ["/healthz", "/robots.txt", "/sitemap.xml"]) {
    const response = await request.get(path);
    expect(response.ok()).toBeTruthy();
  }

  const rss = await request.get("/rss.xml");
  expect(rss.ok()).toBeTruthy();
  expect(rss.headers()["content-type"]).toContain("application/rss+xml");
  await expect(rss.text()).resolves.toContain('<rss version="2.0">');
});

test("renders project pages with canonical project navigation", async ({ page }) => {
  await page.goto("/projects/kmux");
  await expect(page.getByRole("heading", { level: 1, name: "kmux" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Ver repositório/ })).toHaveAttribute(
    "target",
    "_blank",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://otaviogonzaga.dev/projects/kmux",
  );
});

test("persists language and theme preferences", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "idioma: português" }).click();
  await page.getByRole("button", { name: /English/ }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1, name: "Otavio Gonzaga" })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Selected software projects/ })).toBeVisible();

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
  await expect(page.getByRole("button", { name: /tema: sistema/ })).toBeVisible();
  await expect(page.getByRole("button", { name: "idioma: português" })).toBeVisible();
  const cards = page.locator(".project-card");
  const firstCard = await cards.nth(0).boundingBox();
  const secondCard = await cards.nth(1).boundingBox();
  expect(secondCard?.y).toBeGreaterThan((firstCard?.y ?? 0) + (firstCard?.height ?? 0));
  expect(
    await page.locator("body").evaluate((element) => element.scrollWidth <= window.innerWidth),
  ).toBe(true);

  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Pular para o conteúdo principal" })).toBeFocused();
});
