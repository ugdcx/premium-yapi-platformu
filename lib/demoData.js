export const demoCustomer = {
  name: "Ali Atmaca",
  phone: "+90 5XX XXX XX XX",
  phoneHref: "+905XXXXXXXXX",
  location: "Sakarya / Akyazı",
  email: "ali@example.com"
};

export const demoProject = {
  applicationNo: "AG-2026-001",
  title: "Villa Renovasyon Süreci",
  serviceType: "Tadilat & Değer Artırma Çalışmaları",
  status: {
    admin: "Yeni",
    client: "Başvurunuz inceleniyor",
    field: "Uygulamada"
  },
  offer: "₺1.250.000",
  paid: "₺350.000",
  remaining: "₺900.000",
  progress: 42,
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
  internalNote:
    "Mutfak ve banyo öncelikli. Dış cephe keşfine göre ek boya metrajı netleşecek."
};

export const demoPaymentPlan = [
  {
    title: "Ön ödeme",
    amount: "₺350.000",
    dueDate: "Onay sonrası",
    status: "Ödendi"
  },
  {
    title: "Malzeme başlangıcı",
    amount: "₺300.000",
    dueDate: "03 Mayıs 2026",
    status: "Yaklaşan"
  },
  {
    title: "Ara ödeme",
    amount: "₺350.000",
    dueDate: "15 Mayıs 2026",
    status: "Bekliyor"
  },
  {
    title: "Teslim ödemesi",
    amount: "₺250.000",
    dueDate: "Teslim günü",
    status: "Bekliyor"
  }
];

export const demoTimeline = [
  {
    id: "tl-1",
    date: "Bugün",
    time: "14:30",
    area: "Mutfak",
    description: "Mutfak söküm işlemleri tamamlandı",
    photos: 8,
    status: "Tamamlandı"
  },
  {
    id: "tl-2",
    date: "Bugün",
    time: "11:10",
    area: "Mutfak",
    description: "Elektrik altyapı kontrolü yapıldı",
    photos: 5,
    status: "İncelendi"
  },
  {
    id: "tl-3",
    date: "Dün",
    time: "16:45",
    area: "Banyo",
    description: "Banyo seramik teslimatı sahaya alındı",
    photos: 12,
    status: "Malzeme"
  },
  {
    id: "tl-4",
    date: "Dün",
    time: "09:20",
    area: "Dış Cephe",
    description: "Dış cephe keşfi tamamlandı",
    photos: 6,
    status: "Kontrol"
  }
];

export const demoMaterials = [
  ["Jotun İç Cephe Boya", "Onaylandı"],
  ["VitrA Armatür", "Onay bekliyor"],
  ["Bien 60x120 Seramik", "Sahaya alındı"],
  ["Kalekim Yapıştırıcı", "Tedarikte"]
];

export const demoDocuments = [
  { name: "Teklif PDF", type: "PDF", status: "Hazır" },
  { name: "Sözleşme Taslağı", type: "DOC", status: "İnceleniyor" },
  { name: "Fatura / Fiş Görselleri", type: "Görsel", status: "Hazır" },
  { name: "Garanti Belgeleri", type: "PDF", status: "Bekleniyor" },
  { name: "Teslim Tutanağı", type: "PDF", status: "Bekleniyor" }
];

export const demoGallery = [
  {
    id: "ph-1",
    area: "Mutfak",
    date: "Bugün",
    time: "14:30",
    stage: "Süreç",
    note: "Mutfak söküm işlemleri tamamlandı"
  },
  {
    id: "ph-2",
    area: "Mutfak",
    date: "Bugün",
    time: "11:10",
    stage: "Öncesi",
    note: "Elektrik altyapı kontrolü öncesi mevcut durum"
  },
  {
    id: "ph-3",
    area: "Banyo",
    date: "Dün",
    time: "16:45",
    stage: "Malzeme",
    note: "Banyo seramik teslimatı sahaya alındı"
  },
  {
    id: "ph-4",
    area: "Salon",
    date: "Dün",
    time: "12:20",
    stage: "Süreç",
    note: "Salon zemin ve boya yüzey kontrolü yapıldı"
  },
  {
    id: "ph-5",
    area: "Dış Cephe",
    date: "Dün",
    time: "09:20",
    stage: "Öncesi",
    note: "Dış cephe keşfi tamamlandı"
  }
];

export const demoFiles = [
  "Mutfak mevcut durum.jpg",
  "Banyo seramik teslimatı.jpg",
  "Dış cephe keşif notu.pdf",
  "Teklif PDF"
];

export const demoApplicationAnswers = [
  ["Kapsam", "Komple Ev"],
  ["Ev şu an boş mu?", "Boş"],
  ["Konum", demoCustomer.location],
  ["Yaklaşık m²", "180 m²"],
  ["Hedef", "Değer Artışı"],
  ["Kritik sorunlar", "Elektrik, Tesisat, Zemin, Boya"],
  ["Başlama zamanı", "1 ay içinde"],
  ["Bütçe aralığı", demoProject.offer]
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
  deliveryDate: "30 Mayıs 2026",
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

export const demoApplications = [
  {
    id: "app-ali-atmaca",
    applicationNo: demoProject.applicationNo,
    source: "Ön Başvuru Formu",
    status: "new",
    customer: demoCustomer.name,
    phone: demoCustomer.phone,
    phoneHref: demoCustomer.phoneHref,
    email: demoCustomer.email,
    location: demoCustomer.location,
    projectTitle: demoProject.title,
    service: demoProject.serviceType,
    date: "25 Nisan 2026",
    budget: demoProject.offer,
    price: "1250000",
    note: "Ön inceleme tamamlanıyor. Mutfak, banyo ve dış cephe kapsamı birlikte değerlendirilecek.",
    answers: demoApplicationAnswers,
    files: demoFiles
  },
  {
    id: "app-demo-2",
    status: "new",
    customer: "Deniz Arman",
    phone: "+90 532 111 24 58",
    phoneHref: "+905321112458",
    email: "deniz@example.com",
    location: "İstanbul / Zekeriyaköy",
    projectTitle: "Yeni Villa Yapımı",
    service: "Anahtar Teslim Yapı Geliştirme",
    date: "25 Nisan 2026",
    budget: "₺9M - ₺12M",
    price: "",
    note: "",
    answers: [
      ["Arsanız var mı?", "Evet"],
      ["Hedef yapı tipi", "Villa"],
      ["Yaklaşık m²", "320 m²"],
      ["Hedef kalite", "Signature"]
    ],
    files: ["Arsa konumu.pdf", "Referans villa görselleri.zip"]
  },
  {
    id: "app-demo-3",
    status: "offer",
    customer: "Murat Aydın",
    phone: "+90 542 909 33 41",
    phoneHref: "+905429093341",
    email: "murat@example.com",
    location: "Muğla / Bodrum",
    projectTitle: "Villa Satış Hazırlığı",
    service: "Gayrimenkul Satış Danışmanlığı",
    date: "23 Nisan 2026",
    budget: "₺18M beklenti",
    price: "17500000",
    note: "",
    answers: [
      ["İhtiyaç tipi", "Satmak"],
      ["Gayrimenkul tipi", "Villa"],
      ["Yaklaşık m²", "260 m²"],
      ["Beklenti", "Maksimum değer"]
    ],
    files: ["İlan fotoğrafları.zip", "Ekspertiz notu.pdf"]
  },
  {
    id: "app-demo-4",
    status: "approved",
    customer: "Ece Yılmaz",
    phone: "+90 533 700 19 64",
    phoneHref: "+905337001964",
    email: "ece@example.com",
    location: "Ankara / İncek",
    projectTitle: "Müstakil Konut Projesi",
    service: "Anahtar Teslim Yapı Geliştirme",
    date: "21 Nisan 2026",
    budget: "₺7M - ₺9M",
    price: "8600000",
    note: "Ön sözleşme hazırlığı yapılacak.",
    answers: [
      ["Arsanız var mı?", "Hayır"],
      ["Hedef yapı tipi", "Müstakil Konut"],
      ["Yaklaşık m²", "220 m²"],
      ["Hedef kalite", "Select"]
    ],
    files: ["Referans plan.pdf"]
  }
];
