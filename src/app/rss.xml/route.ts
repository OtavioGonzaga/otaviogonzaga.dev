import { absoluteUrl, siteConfig } from "@/shared/config/site";

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${siteConfig.name}</title>
    <link>${absoluteUrl("/")}</link>
    <description>${siteConfig.description}</description>
    <language>pt-BR</language>
    <atom:link href="${absoluteUrl("/rss.xml")}" rel="self" type="application/rss+xml" xmlns:atom="http://www.w3.org/2005/Atom" />
  </channel>
</rss>`;

export function GET() {
  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
