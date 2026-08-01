import { services } from "../lib/data/services";
import { portfolioProjects } from "../lib/data/portfolioProjects";
import { siteConfig } from "../lib/seo";

const staticRoutes = [
  "",
  "/hizmetler",
  "/projeler",
  "/surec",
  "/blagg-remote",
  "/teklif-al",
  "/iletisim"
];

export default function sitemap() {
  const now = new Date();
  const routes = [
    ...staticRoutes,
    ...services.map((service) => `/hizmetler/${service.slug}`),
    ...portfolioProjects.map((project) => `/projeler/${project.slug}`)
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7
  }));
}
