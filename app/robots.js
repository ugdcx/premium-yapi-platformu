import { siteConfig } from "../lib/seo";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/blaag-admin", "/login"]
    },
    sitemap: `${siteConfig.url}/sitemap.xml`
  };
}
