import { siteConfig } from "../lib/seo";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/client",
        "/field",
        "/ahmet-sezer",
        "/proje-takip",
        "/blaag-admin",
        "/admin",
        "/admin/finance",
        "/control",
        "/login"
      ]
    },
    sitemap: `${siteConfig.url}/sitemap.xml`
  };
}
