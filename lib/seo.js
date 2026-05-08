export const siteConfig = {
  name: "BLAGG Studio",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://blagg.studio",
  locale: "tr_TR",
  defaultTitle:
    "BLAGG Studio | Design. Build. Track.",
  defaultDescription:
    "BLAGG Studio; seçilmiş yapı ve renovasyon projelerini tasarım, uygulama ve takip sistemiyle yöneten premium proje stüdyosudur."
};

export function createSeoMetadata({ title, description, path = "/", type = "website" }) {
  const resolvedTitle = title || siteConfig.defaultTitle;
  const resolvedDescription = description || siteConfig.defaultDescription;
  const url = new URL(path, siteConfig.url).toString();

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription
    }
  };
}
