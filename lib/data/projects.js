import { projectImages } from "../blagg-images";

export const featuredProjects = [
  {
    slug: "villa-k",
    name: "Villa K.",
    location: "Sakarya / Akyazı",
    scope: "Konut Yenileme",
    status: "Devam Ediyor",
    year: "2026",
    coverImage: projectImages.villaK.cover || "/images/blagg/project-01.jpg",
    coverAlt: projectImages.villaK.coverAlt,
    placeholderTitle: "Villa K. / Uygulama Süreci",
    atmosphere: "Malzeme kararı ve saha ritmi görünür ilerleyen konut yenileme.",
    intent: "Kontrollü uygulama",
    summary:
      "Malzeme kararı, saha koordinasyonu ve görünür takip aynı çizgide ilerliyor."
  },
  {
    slug: "residence-dairesi",
    name: "Residence Dairesi",
    location: "İstanbul",
    scope: "İç Mekân Dönüşümü",
    status: "Planlama Aşamasında",
    year: "2026",
    coverImage: projectImages.residenceDairesi.cover || "/images/blagg/project-02.jpg",
    coverAlt: projectImages.residenceDairesi.coverAlt,
    placeholderTitle: "Residence / Tasarım Süreci",
    atmosphere: "Plan, ışık ve yüzey kararlarıyla sadeleşen iç mekân hazırlığı.",
    intent: "Tasarım hazırlığı",
    summary:
      "Plan, malzeme ve uygulama kararları tek akışta toplanıyor."
  }
];

export const projectAtmosphereRecords = {
  "akyazi-villa-renovasyonu": {
    atmosphere: "Saha ritmi görünür tutulan villa renovasyonu.",
    intent: "Kontrollü uygulama",
    coverImage: projectImages.villaK.cover || "/images/blagg/project-01.jpg",
    coverAlt: "Akyazı villa renovasyonu atmosfer görseli"
  },
  "sakarya-daire-tadilati": {
    atmosphere: "Kiraya hazırlık için sade ve temiz konut dönüşümü.",
    intent: "Teslim hazırlığı",
    coverImage: "/images/blagg/project-02.jpg",
    coverAlt: "Sakarya daire tadilatı atmosfer görseli"
  },
  "banyo-mutfak-yenileme": {
    atmosphere: "Islak hacim ve mutfak kararlarının kontrollü yenilenmesi.",
    intent: "Malzeme disiplini",
    coverImage: "/images/blagg/project-01.jpg",
    coverAlt: "Banyo ve mutfak yenileme atmosfer görseli"
  },
  "satisa-hazirlik-renovasyonu": {
    atmosphere: "Satış öncesi algıyı güçlendiren ölçülü müdahaleler.",
    intent: "Değer hazırlığı",
    coverImage: "/images/blagg/project-02.jpg",
    coverAlt: "Satışa hazırlık renovasyonu atmosfer görseli"
  },
  "blagg-remote-proje-gorunumu": {
    atmosphere: "Uzaktan takip edilen projenin onaylı görünürlük kaydı.",
    intent: "Görünür takip",
    coverImage: "",
    coverAlt: "BLAGG Remote proje görünümü"
  },
  "dis-cephe-yalitim-calismasi": {
    atmosphere: "Cephe yüzeyi ve yalıtım kararlarının teslim kaydı.",
    intent: "Dış kabuk kontrolü",
    coverImage: "",
    coverAlt: "Dış cephe yalıtım çalışması atmosfer kaydı"
  }
};

export function findProjectAtmosphere(slug) {
  return projectAtmosphereRecords[slug] || null;
}
