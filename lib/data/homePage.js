import { portfolioProjects } from "./portfolioProjects";
import { services } from "./services";

export const heroTrustItems = [
  {
    title: "Design",
    text: "Kapsam ve malzeme kararları netleşir."
  },
  {
    title: "Build",
    text: "Saha işleri kontrollü şekilde yürütülür."
  },
  {
    title: "Track",
    text: "Fotoğraflar, ödemeler ve belgeler görünür olur."
  }
];

export const trackingFeatures = [
  "Onaylı fotoğraflar",
  "Ödeme ve belge takibi",
  "Uzaktan proje görünürlüğü"
];

export const homeServices = [
  "Villa Renovasyonu",
  "Konut Yenileme",
  "Satış Öncesi Değer Artırma",
  "Malzeme & Uygulama Yönetimi",
  "BLAGG Signature",
  "Uzaktan Proje Yönetimi"
].map((title, index) => {
  const source = services[index] || services[0];
  return {
    title,
    text: source.shortDescription,
    href: title === "Uzaktan Proje Yönetimi" ? "/blagg-remote" : `/hizmetler/${source.slug}`
  };
});

export const workSteps = [
  {
    title: "Planla",
    text: "Kapsam, malzeme ve teklif netleşir."
  },
  {
    title: "Uygula",
    text: "Saha işleri kontrollü şekilde yürütülür."
  },
  {
    title: "Takip Et",
    text: "Fotoğraflar, ödemeler ve belgeler kayıt altında tutulur."
  }
];

export const homePortfolioPreview = [
  {
    title: "Akyazı Villa Renovasyonu",
    category: "Villa Renovasyonu",
    location: "Sakarya / Akyazı",
    stage: "Süreç"
  },
  {
    title: "İstanbul Konut Yenileme",
    category: "Konut Yenileme",
    location: "İstanbul",
    stage: "Teslim"
  },
  {
    title: "Remote Proje Görünümü",
    category: "BLAGG Remote",
    location: "Yalova",
    stage: "Planlama"
  },
  {
    title: "Satışa Hazırlık Renovasyonu",
    category: "Değer Artırma",
    location: "Muğla / Bodrum",
    stage: "Öncesi"
  }
].map((project, index) => ({
  ...portfolioProjects[index],
  ...project
}));

export const materialCategories = [
  "Zemin",
  "Seramik",
  "Boya",
  "Kapı",
  "Pencere",
  "Elektrik",
  "Banyo",
  "Mutfak"
];
