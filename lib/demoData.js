import { formatCurrency, formatDate } from "./helpers/format";
import { leadApplications, projects, activeClientProject } from "./data/mockData";

const mainProject = activeClientProject || projects[0];
const mainLead = leadApplications[0];

export const demoCustomer = {
  name: mainProject.customerName,
  phone: mainProject.customerPhone,
  phoneHref: mainProject.customerPhone.replace(/\s/g, ""),
  location: mainProject.location,
  email: "ali@example.com"
};

export const demoProject = {
  applicationNo: "BLAGG-2026-001",
  title: mainProject.title,
  serviceType: mainProject.serviceType,
  status: {
    admin: "İnceleniyor",
    client: "İnceleniyor",
    field: mainProject.status
  },
  offer: formatCurrency(mainProject.totalAmount),
  paid: formatCurrency(mainProject.paidAmount),
  remaining: formatCurrency(mainProject.remainingAmount),
  progress: mainProject.progress,
  estimatedDelivery: "18 gün",
  nextStep: "Teklif onayı ve uygulama takvimi netleştirme",
  areas: ["Mutfak", "Banyo", "Salon", "Dış Cephe"]
};

export const demoOffer = {
  title: "Villa Renovasyon Değer Artırma Teklifi",
  price: demoProject.offer,
  validUntil: "15 Mayıs 2026",
  scope:
    "Mutfak, banyo, salon ve dış cephe alanlarında değer artırma odaklı renovasyon; elektrik altyapı kontrolü, malzeme koordinasyonu ve teslim öncesi kalite kontrol dahil.",
  included: [
    "Mevcut durum analizi ve uygulama planı",
    "Mutfak ve banyo yenileme uygulaması",
    "Elektrik ve tesisat kontrol işleri",
    "Malzeme tedarik ve saha koordinasyonu",
    "Fotoğraflı günlük ilerleme raporu"
  ],
  excluded: [
    "Ruhsat ve resmi harç bedelleri",
    "Mobilya dışı özel dekorasyon ürünleri",
    "Kapsam dışı ek metraj ve revizyonlar"
  ],
  internalNote: mainLead.adminNotes
};

export const demoPaymentPlan = mainProject.payments.map((payment) => ({
  title: payment.title,
  amount: formatCurrency(payment.amount),
  dueDate: payment.paidDate ? "Ödendi" : formatDate(payment.dueDate),
  status: payment.status
}));

export const demoTimeline = mainProject.photos.map((photo, index) => ({
  id: `tl-${index + 1}`,
  date: formatDate(photo.createdAt),
  time: new Date(photo.createdAt).toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit"
  }),
  area: photo.caption.split(" ")[0] || "Saha",
  description: photo.caption,
  photos: 1,
  status: photo.stage
}));

export const demoMaterials = mainProject.materials.map((material) => [
  `${material.brand} ${material.model}`,
  material.status
]);

export const demoDocuments = [
  ...mainProject.documents.map((document) => ({
    name: document.title,
    type: document.type,
    status: "Hazır"
  })),
  { name: "Fatura / Fiş Görselleri", type: "Görsel", status: "Hazır" },
  { name: "Garanti Belgeleri", type: "PDF", status: "Bekleniyor" },
  { name: "Teslim Tutanağı", type: "PDF", status: "Bekleniyor" }
];

export const demoGallery = mainProject.photos.map((photo) => ({
  id: photo.id,
  area: photo.caption.split(" ")[0] || "Saha",
  date: formatDate(photo.createdAt),
  time: new Date(photo.createdAt).toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit"
  }),
  stage: photo.stage,
  note: photo.caption
}));

export const demoFiles = mainLead.photos;

export const demoApplicationAnswers = [
  ["Kapsam", mainLead.description],
  ["Konum", `${mainLead.city} / ${mainLead.district}`],
  ["Hizmet", mainLead.serviceType],
  ["Başlama zamanı", mainLead.startTime],
  ["Bütçe aralığı", mainLead.budgetRange]
];

export const demoRequests = [
  {
    id: "req-1",
    date: "Bugün 10:15",
    customer: demoCustomer.name,
    type: "Revize Talebi",
    area: "Mutfak",
    message: "Mutfak dolabı kulp modelini daha sade bir alternatifle değerlendirebilir miyiz?",
    status: "İnceleniyor",
    internalNote: "",
    response: ""
  },
  {
    id: "req-2",
    date: "Dün 18:20",
    customer: demoCustomer.name,
    type: "Soru",
    area: "Ödeme",
    message: "Malzeme başlangıcı ödemesi için tarih netleşti mi?",
    status: "Açık",
    internalNote: "",
    response: ""
  }
];

export const demoWarranty = {
  completionStatus: "Teslime Hazırlanıyor",
  deliveryDate: formatDate(mainProject.estimatedEndDate),
  warrantyStart: "01 Haziran 2026",
  warrantyEnd: "01 Haziran 2028",
  responsible: "Proje Danışmanı: Ayşe Demir",
  checklist: [
    { label: "İş kapsamı tamamlandı", status: "Bekliyor" },
    { label: "Alan temizliği yapıldı", status: "Bekliyor" },
    { label: "Malzeme ve uygulama kontrol edildi", status: "Tamamlandı" },
    { label: "Belgeler teslim edildi", status: "Bekliyor" },
    { label: "Garanti süreci başlatıldı", status: "Bekliyor" }
  ],
  serviceRequests: [
    {
      id: "srv-1",
      area: "Banyo",
      subject: "Armatür kontrolü",
      description: "Teslim öncesi armatür montajı tekrar kontrol edilecek.",
      status: "Bekliyor"
    }
  ]
};

const statusToLegacy = {
  Yeni: "new",
  İnceleniyor: "review",
  Arandı: "review",
  "Teklif Hazırlanıyor": "offer",
  Onaylandı: "approved",
  Reddedildi: "rejected"
};

export const demoApplications = leadApplications.slice(0, 5).map((application, index) => ({
  id: application.id,
  applicationNo: `BLAGG-2026-${String(index + 1).padStart(3, "0")}`,
  source: "Ön Başvuru Formu",
  status: statusToLegacy[application.status] || "new",
  customer: application.fullName,
  phone: application.phone,
  phoneHref: application.normalizedPhone,
  email: index === 0 ? demoCustomer.email : `${application.fullName.toLowerCase().replace(/\s/g, ".")}@example.com`,
  location: `${application.city} / ${application.district}`,
  projectTitle: application.description.split(" için ")[0] || application.serviceType,
  service: application.serviceType,
  date: formatDate(application.createdAt),
  budget: application.budgetRange,
  price: String(index === 0 ? mainProject.totalAmount : ""),
  note: application.adminNotes,
  answers: [
    ["Açıklama", application.description],
    ["Konum", `${application.city} / ${application.district}`],
    ["Başlama zamanı", application.startTime],
    ["Bütçe aralığı", application.budgetRange]
  ],
  files: application.photos
}));

