export const siteConfig = {
  name: "BLAAG Construction and Architecture",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.blaag.com.tr",
  locale: "tr_TR",
  defaultTitle:
    "BLAAG Construction and Architecture | İnşaat, Tadilat ve Proje Takip Sistemi",
  defaultDescription:
    "BLAAG; konut, villa, tadilat ve değer artırma projelerinde keşiften teslimata kadar tüm süreci fotoğraflı takip, malzeme şeffaflığı ve ödeme planı ile yönetir."
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
