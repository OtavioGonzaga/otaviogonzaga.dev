import type { Metadata } from "next";

import { absoluteUrl, siteConfig } from "@/shared/config/site";

export const defaultMetadata: Metadata = {
  metadataBase: siteConfig.url,
  title: { default: `${siteConfig.name} — Software Engineer`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": absoluteUrl("/rss.xml") },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Software Engineer`,
    description: siteConfig.description,
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: "Otavio Gonzaga — Software Engineer",
      },
    ],
  },
  twitter: { card: "summary_large_image", images: [absoluteUrl("/opengraph-image")] },
  robots: { index: true, follow: true },
};
