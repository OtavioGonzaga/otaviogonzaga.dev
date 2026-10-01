const fallbackSiteUrl = "https://otaviogonzaga.dev";

export const siteConfig = {
  name: "Otavio Gonzaga",
  description: "Software Engineer portfolio.",
  url: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl),
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
