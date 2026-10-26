import type { MetadataRoute } from "next";
import { config } from "@/cfg/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: config.siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: new URL("/projects", config.siteUrl).href,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
