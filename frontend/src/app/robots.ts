import type { MetadataRoute } from "next";
import { config } from "@/cfg/site.config";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/private/"],
    },
    sitemap: new URL("/sitemap.xml", config.siteUrl).href,
  };
}
