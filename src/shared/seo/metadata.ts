import type { Metadata } from "next";

import { absoluteUrl, siteConfig } from "@/shared/config/site";

export const defaultMetadata: Metadata = {
  metadataBase: siteConfig.url,
  title: { default: `${siteConfig.name} — Software Engineer`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Software Engineer`,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};
