import { siteConfig } from "../lib/seo";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/control", "/login"]
    },
    sitemap: `${siteConfig.url}/sitemap.xml`
  };
}
