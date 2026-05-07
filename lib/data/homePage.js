import { portfolioProjects } from "./portfolioProjects";
import { services } from "./services";

export const heroTrustItems = [
  {
    title: "Fotoğraflı ilerleme takibi",
    text: "Sahadaki önemli aşamalar kayıt altına alınır."
  },
  {
    title: "Malzeme ve ödeme şeffaflığı",
    text: "Malzeme, belge ve ödeme planı tek yerde görünür."
  },
  {
    title: "Kontrollü teslim süreci",
    text: "Teslim öncesi kontrol listesiyle kapanış netleşir."
  }
];

export const trackingFeatures = [
  "Fotoğraflı günlük/haftalık ilerleme",
  "İş kalemi durumu",
  "Ödeme planı",
  "Malzeme listesi",
  "Fatura/belge alanı",
  "Admin notları",
  "Usta fotoğraf yükleme akışı"
];

export const homeServices = [
  "Anahtar Teslim İnşaat",
  "Villa Renovasyonu",
  "Konut Tadilatı",
  "Banyo & Mutfak Yenileme",
  "Dış Cephe & Yalıtım",
  "Satış Öncesi Değer Artırma",
  "Gurbetçi Ev Takip Sistemi",
  "Malzeme + İşçilik Yönetimi"
].map((title, index) => {
  const source = services[index] || services[0];
  return {
    title,
    text: source.shortDescription
  };
});

export const workSteps = [
  "Ön Başvuru",
  "Keşif / Uzaktan İnceleme",
  "Kapsam Belirleme",
  "Malzeme Alternatifleri",
  "Anahtar Teslim Teklif",
  "Onay ve Başlangıç",
  "Fotoğraflı İlerleme",
  "Teslim Kontrolü"
];

export const homePortfolioPreview = [
  {
    title: "Akyazı Villa Renovasyonu",
    category: "Villa Renovasyonu",
    location: "Sakarya / Akyazı",
    stage: "Süreç"
  },
  {
    title: "Sakarya Daire Tadilatı",
    category: "Konut Tadilatı",
    location: "Sakarya",
    stage: "Sonrası"
  },
  {
    title: "Gurbetçi Ev Takip Demo",
    category: "Gurbetçi Ev Takip Sistemi",
    location: "Yalova",
    stage: "Süreç"
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
  "Mutfak",
  "Cephe",
  "Yalıtım"
];

export const qualityItems = [
  "Fotoğraflı Günlük Takip",
  "Malzeme ve Marka Kaydı",
  "Ödeme Planı Şeffaflığı",
  "Teslim Öncesi Kontrol Listesi"
];

export const valueRenovationItems = [
  "Satış veya kiralama öncesi doğru tadilat kapsamı",
  "Gereksiz masrafı azaltan önceliklendirme",
  "Fotoğraf, belge ve malzeme kaydıyla güven veren sunum"
];

export const expatTrackingItems = [
  "Kayıt olmadan özel takip linki",
  "Saha fotoğrafları ve açıklamalı ilerleme",
  "Malzeme, ödeme ve belge takibi"
];
