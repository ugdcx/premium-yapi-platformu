export const siteConfig = {
  name: "BLAGG Studio",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://blagg.studio",
  locale: "tr_TR",
  defaultTitle: "BLAGG Studio | Tasarla. Uygula. Takip Et.",
  defaultDescription:
    "BLAGG Studio; renovasyon sürecinizi tasarımdan teslimata kadar görünür hale getiren mimarlık ve renovasyon stüdyosudur."
};

const defaultKeywords = [
  "BLAGG Studio",
  "mimarlık",
  "renovasyon",
  "tadilat",
  "anahtar teslim inşaat",
  "konut yenileme",
  "proje takibi",
  "Sakarya mimarlık",
  "İstanbul renovasyon",
  "peyzaj mimarisi"
];

export function createSeoMetadata({
  title,
  description,
  path = "/",
  type = "website",
  keywords = defaultKeywords
}) {
  const resolvedTitle = title || siteConfig.defaultTitle;
  const resolvedDescription = description || siteConfig.defaultDescription;
  const url = new URL(path, siteConfig.url).toString();

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    keywords,
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
      card: "summary",
      title: resolvedTitle,
      description: resolvedDescription
    }
  };
}
