import { normalizePhone } from "../helpers/phone";
import { services } from "./services";
import { portfolioProjects } from "./portfolioProjects";

const now = "2026-05-07T10:00:00.000Z";

export const customers = [
  {
    id: "customer-ali-atmaca",
    fullName: "Ali Atmaca",
    phone: "+90 532 400 16 34",
    normalizedPhone: normalizePhone("+90 532 400 16 34"),
    email: "ali@example.com",
    city: "Sakarya",
    district: "Akyazı"
  },
  {
    id: "customer-deniz-arman",
    fullName: "Deniz Arman",
    phone: "+90 532 111 24 58",
    normalizedPhone: normalizePhone("+90 532 111 24 58"),
    email: "deniz@example.com",
    city: "İstanbul",
    district: "Zekeriyaköy"
  },
  {
    id: "customer-murat-aydin",
    fullName: "Murat Aydın",
    phone: "+90 542 909 33 41",
    normalizedPhone: normalizePhone("+90 542 909 33 41"),
    email: "murat@example.com",
    city: "Muğla",
    district: "Bodrum"
  },
  {
    id: "customer-ece-yilmaz",
    fullName: "Ece Yılmaz",
    phone: "+90 533 700 19 64",
    normalizedPhone: normalizePhone("+90 533 700 19 64"),
    email: "ece@example.com",
    city: "Ankara",
    district: "İncek"
  }
];

export const leadApplications = [
  {
    id: "lead-1",
    fullName: "Ali Atmaca",
    phone: "+90 532 400 16 34",
    normalizedPhone: normalizePhone("+90 532 400 16 34"),
    city: "Sakarya",
    district: "Akyazı",
    serviceType: "Konut Yenileme ve Değer Artırma",
    description: "Mutfak, banyo, salon ve dış cephe alanlarında değer artırma odaklı renovasyon.",
    budgetRange: "₺1.250.000",
    startTime: "1 ay içinde",
    photos: ["Mutfak mevcut durum.jpg", "Banyo seramik teslimatı.jpg", "Dış cephe keşif notu.pdf"],
    status: "İnceleniyor",
    createdAt: "2026-04-25T09:30:00.000Z",
    updatedAt: now,
    adminNotes: "Mutfak ve banyo öncelikli. Dış cephe keşfine göre metraj netleşecek."
  },
  {
    id: "lead-2",
    fullName: "Deniz Arman",
    phone: "+90 532 111 24 58",
    normalizedPhone: normalizePhone("+90 532 111 24 58"),
    city: "İstanbul",
    district: "Zekeriyaköy",
    serviceType: "Anahtar Teslim İnşaat",
    description: "Arsa üzerinde yeni villa yapımı için ilk kapsam değerlendirmesi.",
    budgetRange: "₺9M - ₺12M",
    startTime: "3 ay içinde",
    photos: ["Arsa konumu.pdf", "Referans villa görselleri.zip"],
    status: "Yeni",
    createdAt: "2026-04-25T13:20:00.000Z",
    updatedAt: "2026-04-25T13:20:00.000Z",
    adminNotes: ""
  },
  {
    id: "lead-3",
    fullName: "Murat Aydın",
    phone: "+90 542 909 33 41",
    normalizedPhone: normalizePhone("+90 542 909 33 41"),
    city: "Muğla",
    district: "Bodrum",
    serviceType: "Satış Öncesi Değer Artırma",
    description: "Villa satışa hazırlık ve portföy sunumu için değer artırma çalışması.",
    budgetRange: "₺18M beklenti",
    startTime: "Hemen",
    photos: ["İlan fotoğrafları.zip", "Ekspertiz notu.pdf"],
    status: "Teklif Hazırlanıyor",
    createdAt: "2026-04-23T11:45:00.000Z",
    updatedAt: "2026-04-24T15:00:00.000Z",
    adminNotes: "Portföy fotoğrafları sadeleştirilecek."
  },
  {
    id: "lead-4",
    fullName: "Ece Yılmaz",
    phone: "+90 533 700 19 64",
    normalizedPhone: normalizePhone("+90 533 700 19 64"),
    city: "Ankara",
    district: "İncek",
    serviceType: "Anahtar Teslim İnşaat",
    description: "Müstakil konut için proje planlama, uygulama ve teslim koordinasyonu.",
    budgetRange: "₺7M - ₺9M",
    startTime: "6 ay içinde",
    photos: ["Referans plan.pdf"],
    status: "Onaylandı",
    createdAt: "2026-04-21T08:10:00.000Z",
    updatedAt: "2026-04-26T08:10:00.000Z",
    adminNotes: "Ön sözleşme hazırlığı yapılacak."
  },
  {
    id: "lead-5",
    fullName: "Selin Bora",
    phone: "0532 888 42 10",
    normalizedPhone: normalizePhone("0532 888 42 10"),
    city: "Yalova",
    district: "Merkez",
    serviceType: "BLAGG Remote",
    description: "Yurt dışından takip edilecek daire yenilemesi için fotoğraflı ilerleme isteği.",
    budgetRange: "₺650.000 - ₺850.000",
    startTime: "2 ay içinde",
    photos: [],
    status: "Arandı",
    createdAt: "2026-04-20T17:40:00.000Z",
    updatedAt: "2026-04-22T12:00:00.000Z",
    adminNotes: "Müşteri uzaktan takip linki istiyor."
  }
];

const sharedPayments = [
  { id: "payment-1", title: "Ön ödeme", amount: 350000, dueDate: "2026-04-25", paidDate: "2026-04-25", status: "Ödendi" },
  { id: "payment-2", title: "Malzeme başlangıcı", amount: 300000, dueDate: "2026-05-03", status: "Yaklaşan" },
  { id: "payment-3", title: "Ara ödeme", amount: 350000, dueDate: "2026-05-15", status: "Bekliyor" },
  { id: "payment-4", title: "Teslim ödemesi", amount: 250000, dueDate: "2026-05-30", status: "Bekliyor" }
];

export const projects = [
  {
    id: "project-villa-renovasyon",
    slug: "akyazi-villa-renovasyonu",
    title: "Akyazı Villa Renovasyonu",
    customerName: "Ali Atmaca",
    customerPhone: "+90 532 400 16 34",
    location: "Sakarya / Akyazı",
    serviceType: "Konut Yenileme ve Değer Artırma",
    status: "Uygulamada",
    progress: 42,
    startDate: "2026-04-25",
    estimatedEndDate: "2026-05-30",
    totalAmount: 1250000,
    paidAmount: 350000,
    remainingAmount: 900000,
    clientToken: "1234567",
    workerToken: "1234567",
    workItems: [
      { id: "work-1", title: "Zemin hazırlığı", description: "Mevcut zemin sökümü ve yüzey tesviyesi.", status: "Tamamlandı", plannedDate: "2026-04-26", completedDate: "2026-04-27", notes: "Yeni kaplama için alan hazırlandı." },
      { id: "work-2", title: "Boya hazırlığı", description: "Duvar yüzey tamiri, astar ve boya öncesi kontrol.", status: "Uygulamada", plannedDate: "2026-05-03", notes: "Salon ve koridor yüzeyleri kontrol ediliyor." },
      { id: "work-3", title: "Banyo yenileme", description: "Tesisat çıkışları, yalıtım ve seramik uygulaması.", status: "Planlandı", plannedDate: "2026-05-08", notes: "Malzeme teslimi bekleniyor." },
      { id: "work-4", title: "Mutfak yenileme", description: "Mutfak söküm, elektrik kontrolü ve dolap hazırlığı.", status: "Tamamlandı", plannedDate: "2026-04-28", completedDate: "2026-05-02", notes: "Elektrik kontrolü için alan hazırlandı." },
      { id: "work-5", title: "Dış cephe kontrolü", description: "Cephe boya ve yalıtım ön incelemesi.", status: "Planlandı", plannedDate: "2026-05-12", notes: "Hava durumuna göre planlanacak." }
    ],
    photos: [
      { id: "photo-1", url: "", caption: "Mutfak söküm işlemi tamamlandı.", uploadedBy: "worker", workItemId: "work-4", stage: "Süreç", status: "approved", visible_to_customer: true, createdAt: "2026-05-07T14:30:00.000Z" },
      { id: "photo-2", url: "", caption: "Banyo seramik teslimatı sahaya alındı.", uploadedBy: "worker", workItemId: "work-3", stage: "Malzeme", status: "approved", visible_to_customer: true, createdAt: "2026-05-06T16:45:00.000Z" },
      { id: "photo-3", url: "", caption: "Zemin yüzeyi uygulama öncesi kaydedildi.", uploadedBy: "admin", workItemId: "work-1", stage: "Öncesi", status: "approved", visible_to_customer: true, createdAt: "2026-05-05T10:20:00.000Z" },
      { id: "photo-4", url: "", caption: "Boya öncesi duvar tamiri başladı.", uploadedBy: "worker", workItemId: "work-2", stage: "Süreç", status: "pending_review", visible_to_customer: false, createdAt: "2026-05-07T09:15:00.000Z" }
    ],
    payments: sharedPayments,
    materials: [
      { id: "material-1", category: "Boya", brand: "Jotun", model: "İç Cephe", quantity: 12, unit: "kova", status: "Seçildi", documentUrl: "" },
      { id: "material-2", category: "Armatür", brand: "VitrA", model: "Minimal", quantity: 4, unit: "adet", status: "Onay bekliyor", documentUrl: "" },
      { id: "material-3", category: "Seramik", brand: "Bien", model: "60x120", quantity: 80, unit: "m²", status: "Sahaya alındı", documentUrl: "" },
      { id: "material-4", category: "Zemin", brand: "Çamsan", model: "Derzli parke", quantity: 95, unit: "m²", status: "Tedarikte", documentUrl: "" },
      { id: "material-5", category: "Cephe", brand: "Filli Boya", model: "Dış cephe", quantity: 10, unit: "kova", status: "Onay bekliyor", documentUrl: "" }
    ],
    documents: [
      { id: "doc-1", title: "Teklif PDF", type: "PDF", url: "#", createdAt: "2026-04-25T09:30:00.000Z" },
      { id: "doc-2", title: "Sözleşme Taslağı", type: "DOC", url: "#", createdAt: "2026-04-26T09:30:00.000Z" },
      { id: "doc-3", title: "Malzeme Belgesi", type: "PDF", url: "#", createdAt: "2026-05-03T09:30:00.000Z" },
      { id: "doc-4", title: "Teslim Kontrol Formu", type: "PDF", url: "#", createdAt: "2026-05-07T09:30:00.000Z" }
    ],
    notes: [
      { id: "note-1", visibility: "admin", content: "Mutfak ve banyo öncelikli takip edilecek.", createdAt: now },
      { id: "note-2", visibility: "client", content: "BLAGG Studio ekibi onaylanan gelişmeleri burada paylaşır.", createdAt: now }
    ]
  },
  {
    id: "project-mustakil-konut",
    slug: "mustakil-konut-projesi",
    title: "Müstakil Konut Projesi",
    customerName: "Ece Yılmaz",
    customerPhone: "+90 533 700 19 64",
    location: "Ankara / İncek",
    serviceType: "Anahtar Teslim İnşaat",
    status: "Planlama",
    progress: 12,
    startDate: "2026-06-01",
    estimatedEndDate: "2027-02-01",
    totalAmount: 8600000,
    paidAmount: 0,
    remainingAmount: 8600000,
    clientToken: "ece-2026",
    workerToken: "usta-ece",
    workItems: [],
    photos: [],
    payments: [],
    materials: [],
    documents: [],
    notes: []
  },
  {
    id: "project-villa-satis",
    slug: "villa-satis-hazirligi",
    title: "Villa Satış Hazırlığı",
    customerName: "Murat Aydın",
    customerPhone: "+90 542 909 33 41",
    location: "Muğla / Bodrum",
    serviceType: "Satış Öncesi Değer Artırma",
    status: "Uygulamada",
    progress: 64,
    startDate: "2026-04-23",
    estimatedEndDate: "2026-05-20",
    totalAmount: 17500000,
    paidAmount: 0,
    remainingAmount: 17500000,
    clientToken: "murat-remote",
    workerToken: "field-murat",
    workItems: [],
    photos: [],
    payments: [],
    materials: [],
    documents: [],
    notes: []
  },
  {
    id: "project-yalova-uzaktan",
    slug: "yalova-uzaktan-ev-takip",
    title: "Yalova BLAGG Remote Takip",
    customerName: "Selin Bora",
    customerPhone: "0532 888 42 10",
    location: "Yalova / Merkez",
    serviceType: "BLAGG Remote",
    status: "Planlama",
    progress: 8,
    startDate: "2026-06-15",
    estimatedEndDate: "2026-08-15",
    totalAmount: 750000,
    paidAmount: 0,
    remainingAmount: 750000,
    clientToken: "selin-remote",
    workerToken: "worker-selin",
    workItems: [],
    photos: [],
    payments: [],
    materials: [],
    documents: [],
    notes: []
  }
];

export const workers = [
  { id: "worker-1", fullName: "Ahmet Sezer", phone: "0532 001 00 02", normalizedPhone: normalizePhone("0532 001 00 02"), specialty: "Genel saha", activeProjectId: "project-villa-renovasyon", workerToken: "1234567" },
  { id: "worker-2", fullName: "Ayhan Usta", phone: "0532 444 18 20", normalizedPhone: normalizePhone("0532 444 18 20"), specialty: "Tesisat", activeProjectId: "project-villa-renovasyon", workerToken: "ayhan-123" },
  { id: "worker-3", fullName: "Saha Fotoğraf Ekibi", phone: "0532 700 44 11", normalizedPhone: normalizePhone("0532 700 44 11"), specialty: "Görsel raporlama", activeProjectId: "project-villa-satis", workerToken: "photo-team" }
];

export const activeClientProject = projects.find((project) => project.clientToken === "1234567");
export const activeWorkerProject = projects.find((project) => project.workerToken === "1234567");

export { services, portfolioProjects };
