import type { MetadataRoute } from "next";
import { projects } from "@/modules/projects/content/projects";
import { siteConfig } from "@/shared/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: siteConfig.url.toString(), lastModified },
    ...projects.map(({ slug }) => ({
      url: new URL(`/projects/${slug}`, siteConfig.url).toString(),
      lastModified,
    })),
  ];
}
