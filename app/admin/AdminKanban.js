"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ClipboardList,
  FileText,
  FolderKanban,
  Hammer,
  LayoutDashboard,
  Mail,
  MessageCircle,
  Phone,
  ReceiptText,
  Settings,
  ShieldCheck,
  Upload,
  UserRound,
  UsersRound,
  Wallet,
  X
} from "lucide-react";
import {
  demoApplications,
  demoCustomer,
  demoDocuments,
  demoOffer,
  demoPaymentPlan,
  demoProject,
  demoRequests,
  demoTimeline,
  demoWarranty
} from "../../lib/demoData";
import { statusChipClass } from "../../lib/designSystem";
import { useDemoRoleGuard } from "../../lib/demoAuth";
import DemoLogoutButton from "../../components/DemoLogoutButton";

const sections = [
  { id: "home", label: "Ana Ekran", icon: LayoutDashboard },
  { id: "applications", label: "Başvurular", icon: ClipboardList },
  { id: "offers", label: "Teklifler", icon: ReceiptText },
  { id: "projects", label: "Projeler", icon: FolderKanban },
  { id: "customers", label: "Müşteriler", icon: UsersRound },
  { id: "workers", label: "Ustalar", icon: Hammer },
  { id: "links", label: "Proje linkleri", icon: ShieldCheck },
  { id: "updates", label: "Fotoğraf onayları", icon: Upload },
  { id: "descriptions", label: "Açıklama yazımı", icon: FileText },
  { id: "payments", label: "Ödemeler", icon: Wallet },
  { id: "documents", label: "Belgeler", icon: FileText },
  { id: "requests", label: "Talepler", icon: MessageCircle },
  { id: "handover", label: "Teslim & Garanti", icon: ShieldCheck },
  { id: "settings", label: "Ayarlar", icon: Settings }
];

const applicationStatusLabels = {
  new: "Yeni",
  review: "İnceleniyor",
  preparing: "Teklif Hazırlanıyor",
  sent: "Teklif Gönderildi",
  approved: "Onaylandı",
  rejected: "Reddedildi",
  offer: "Teklif Gönderildi"
};

const adminApplications = demoApplications.map((application, index) => ({
  ...application,
  applicationNo: application.applicationNo || `AG-2026-00${index + 2}`,
  statusLabel: applicationStatusLabels[application.status] || "Yeni",
  assignedWorker: index === 0 ? "Mehmet Usta" : "Atama bekliyor"
}));

const offers = [
  {
    id: "offer-001",
    no: "TKF-2026-001",
    customer: demoCustomer.name,
    service: demoProject.serviceType,
    amount: demoOffer.price,
    status: "Gönderildi",
    validUntil: demoOffer.validUntil,
    pdfStatus: "Hazır",
    scope: demoOffer.scope,
    included: demoOffer.included,
    excluded: demoOffer.excluded
  },
  {
    id: "offer-002",
    no: "TKF-2026-002",
    customer: "Murat Aydın",
    service: "Gayrimenkul Satış Danışmanlığı",
    amount: "₺17.500.000",
    status: "Revize İstendi",
    validUntil: "10 Mayıs 2026",
    pdfStatus: "Revize bekliyor",
    scope: "Satış stratejisi, değer artırma önerileri ve portföy sunum hazırlığı.",
    included: ["Piyasa analizi", "İlan hazırlığı", "Satış danışmanlığı"],
    excluded: ["Resmi ekspertiz", "Tapu harçları"]
  },
  {
    id: "offer-003",
    no: "TKF-2026-003",
    customer: "Ece Yılmaz",
    service: "Anahtar Teslim Yapı Geliştirme",
    amount: "₺8.600.000",
    status: "Onaylandı",
    validUntil: "20 Mayıs 2026",
    pdfStatus: "Arşivlendi",
    scope: "Müstakil konut proje planlama, uygulama ve teslim koordinasyonu.",
    included: ["Proje planlama", "Kaba yapı", "İnce işler", "Teslim hazırlığı"],
    excluded: ["Ruhsat harçları", "Arsa bedeli"]
  }
];

const projects = [
  {
    title: demoProject.title,
    status: "Uygulamada",
    worker: "Mehmet Usta / Elektrik ekibi",
    progress: `${demoProject.progress}%`
  },
  {
    title: "Müstakil Konut Projesi",
    status: "Sözleşme Hazırlığı",
    worker: "Atama bekliyor",
    progress: "12%"
  },
  {
    title: "Villa Satış Hazırlığı",
    status: "Danışmanlık",
    worker: "Portföy ekibi",
    progress: "64%"
  }
];

const customers = adminApplications.map((application) => ({
  name: application.customer,
  phone: application.phone,
  email: application.email,
  related: application.projectTitle,
  status: applicationStatusLabels[application.status] || "Yeni"
}));

const workers = [
  {
    name: "Mehmet Usta",
    phone: "0532 001 00 02",
    accessCode: "32001",
    specialty: "Elektrik",
    project: demoProject.title,
    status: "Aktif"
  },
  {
    name: "Ayhan Usta",
    phone: "0532 444 18 20",
    accessCode: "44120",
    specialty: "Tesisat",
    project: "Banyo yenileme işleri",
    status: "Aktif"
  },
  {
    name: "Saha Fotoğraf Ekibi",
    phone: "0532 700 44 11",
    accessCode: "70411",
    specialty: "Görsel raporlama",
    project: "Genel saha kontrolleri",
    status: "Pasif"
  }
];


const handoverDemo = {
  completionStatus: "Teslime Hazırlanıyor",
  deliveryDate: "30 Mayıs 2026",
  warrantyStart: "01 Haziran 2026",
  warrantyEnd: "01 Haziran 2028",
  responsible: "Proje Danışmanı: Ayşe Demir",
  checklist: [
    { id: "handover-1", label: "İş kapsamı tamamlandı", status: "Bekliyor" },
    { id: "handover-2", label: "Alan temizliği yapıldı", status: "Bekliyor" },
    { id: "handover-3", label: "Malzeme ve uygulama kontrol edildi", status: "Tamamlandı" },
    { id: "handover-4", label: "Belgeler teslim edildi", status: "Bekliyor" },
    { id: "handover-5", label: "Garanti süreci başlatıldı", status: "Bekliyor" }
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

const quickActions = [
  "Yeni başvuru incele",
  "Teklif hazırla",
  "Usta ata",
  "Güncelleme kontrol et"
];

const photoDescriptionTemplates = [
  "Söküm işlemi tamamlandı.",
  "Altyapı kontrolü yapıldı.",
  "Malzeme sahaya alındı.",
  "Uygulama aşaması tamamlandı.",
  "Teslim öncesi son kontrol yapıldı."
];

const initialPhotoApprovals = [
  {
    id: "photo-approval-1",
    project: demoProject.title,
    area: "Mutfak",
    worker: "Mehmet Usta",
    uploadedAt: "Bugün 14:30",
    photoCount: 6,
    internalNote: "Usta notu: söküm bitti, elektrikçi bekleniyor.",
    customerDescription: "Mutfak söküm işlemi tamamlandı. Elektrik altyapı kontrolü için alan hazırlandı.",
    status: "Onay Bekliyor"
  },
  {
    id: "photo-approval-2",
    project: demoProject.title,
    area: "Banyo",
    worker: "Ayhan Usta",
    uploadedAt: "Bugün 11:10",
    photoCount: 4,
    internalNote: "Usta notu: tesisat çıkışları kontrol edildi.",
    customerDescription: "Banyo altyapı kontrolü yapıldı. Uygulama öncesi hazırlıklar devam ediyor.",
    status: "Yayına Hazır"
  },
  {
    id: "photo-approval-3",
    project: "Villa Satış Hazırlığı",
    area: "Dış Cephe",
    worker: "Saha Fotoğraf Ekibi",
    uploadedAt: "Dün 16:45",
    photoCount: 8,
    internalNote: "Ham fotoğraflarda ışık iyi, açıklama sadeleştirilmeli.",
    customerDescription: "Dış cephe mevcut durumu kayıt altına alındı. Değer artırma önerileri için görseller inceleniyor.",
    status: "Yayınlandı"
  },
  {
    id: "photo-approval-4",
    project: "Müstakil Konut Projesi",
    area: "Elektrik",
    worker: "Mehmet Usta",
    uploadedAt: "Dün 09:20",
    photoCount: 3,
    internalNote: "Bazı fotoğraflar net değil, yeniden istenecek.",
    customerDescription: "",
    status: "Revize Gerekli"
  }
];

export default function AdminKanban() {
  const canView = useDemoRoleGuard("admin");
  const [selectedSection, setSelectedSection] = useState("home");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [pdfPreviewOffer, setPdfPreviewOffer] = useState(null);
  const [applications, setApplications] = useState(adminApplications);
  const [offerRows, setOfferRows] = useState(offers);
  const [paymentRows, setPaymentRows] = useState(() =>
    demoPaymentPlan.map((payment, index) => ({ ...payment, id: `payment-${index + 1}` }))
  );
  const [documentRows, setDocumentRows] = useState(() =>
    demoDocuments.map((document, index) => ({ ...document, id: `document-${index + 1}` }))
  );
  const [requestRows, setRequestRows] = useState(() =>
    demoRequests.map((request) => ({
      ...request,
      internalNote: request.internalNote || "",
      response: request.response || ""
    }))
  );
  const [handoverStatus, setHandoverStatus] = useState(handoverDemo.completionStatus);
  const [warrantyStarted, setWarrantyStarted] = useState(false);
  const [handoverChecklist, setHandoverChecklist] = useState(handoverDemo.checklist);
  const [serviceRows, setServiceRows] = useState(handoverDemo.serviceRequests);

  const metrics = useMemo(
    () => [
      ["Yeni başvurular", applications.filter((item) => item.statusLabel === "Yeni").length],
      ["İncelenen başvurular", applications.filter((item) => item.statusLabel === "İnceleniyor").length],
      ["Gönderilen teklifler", offerRows.filter((item) => item.status.includes("nderildi")).length],
      ["Onaylanan işler", applications.filter((item) => item.statusLabel === "Onaylandı").length],
      ["Aktif projeler", projects.length],
      ["Bekleyen müşteri talepleri", requestRows.filter((item) => item.status !== "Tamamlandı" && item.status !== "TamamlandÄ±").length]
    ],
    [applications, offerRows, requestRows]
  );

  function completeHandover() {
    setHandoverStatus("Teslim Tamamlandı");
    setHandoverChecklist((current) =>
      current.map((item) => ({ ...item, status: "Tamamlandı" }))
    );
  }

  function startWarranty() {
    setWarrantyStarted(true);
    setHandoverChecklist((current) =>
      current.map((item) =>
        item.label.includes("Garanti") ? { ...item, status: "Tamamlandı" } : item
      )
    );
  }

  function completeServiceRequest(id) {
    setServiceRows((current) =>
      current.map((item) => (item.id === id ? { ...item, status: "Tamamlandı" } : item))
    );
  }

  function updateHandoverChecklistStatus(id, status) {
    setHandoverChecklist((current) =>
      current.map((item) => (item.id === id ? { ...item, status } : item))
    );
  }

  function updateRequestStatus(id, status) {
    setRequestRows((current) =>
      current.map((item) => (item.id === id ? { ...item, status } : item))
    );
  }

  function updateRequestField(id, field, value) {
    setRequestRows((current) =>
      current.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  }

  function updatePaymentStatus(id, status) {
    setPaymentRows((current) =>
      current.map((item) => (item.id === id ? { ...item, status } : item))
    );
  }

  function updateDocumentStatus(id, status) {
    setDocumentRows((current) =>
      current.map((item) => (item.id === id ? { ...item, status } : item))
    );
  }

  function addDemoDocument() {
    setDocumentRows((current) => [
      ...current,
      {
        id: `document-${current.length + 1}`,
        name: "Yeni Belge",
        type: "PDF",
        status: "Bekleniyor"
      }
    ]);
  }

  function updateOfferStatus(id, status) {
    setOfferRows((current) =>
      current.map((item) => (item.id === id ? { ...item, status } : item))
    );
    setSelectedOffer((current) => (current ? { ...current, status } : current));
  }

  function updateApplicationStatus(id, statusLabel) {
    setApplications((current) =>
      current.map((item) => (item.id === id ? { ...item, statusLabel } : item))
    );
    setSelectedApplication((current) => (current ? { ...current, statusLabel } : current));
  }

  if (!canView) {
    return (
      <main className="min-h-screen bg-cream px-6 py-10 text-stoneDark">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-border bg-surface p-8">
          Oturum kontrol ediliyor...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream px-4 py-6 text-stoneDark sm:px-6 sm:py-8">
      <div className="mx-auto max-w-[1600px]">
        <header className="rounded-[2rem] bg-stoneDark p-6 text-white md:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/35">
                Şirket Operasyon Merkezi
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
                Yönetim Paneli
              </h1>
              <p className="mt-4 max-w-3xl leading-8 text-white/60">
                Başvurular, teklifler, projeler, müşteriler, ustalar, proje linkleri,
                fotoğraf onayları, açıklama yazımı, ödemeler, belgeler, talepler
                ve teslim süreçleri tek iç operasyon düzeninde yönetilir.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="/teklif-al"
                className="inline-flex justify-center rounded-full bg-gold px-6 py-3 text-sm font-medium text-stoneDark"
              >
                Yeni başvuru akışını aç
              </a>
              <DemoLogoutButton dark />
            </div>
          </div>
        </header>

        <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-[2rem] border border-border bg-surface p-3 lg:sticky lg:top-28 lg:self-start">
            <nav className="mobile-scroll lg:mx-0 lg:grid lg:px-0 lg:pb-0">
              {sections.map((section) => {
                const Icon = section.icon;
                const active = selectedSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => setSelectedSection(section.id)}
                    className={`flex min-w-fit items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium ${
                      active
                        ? "bg-stoneDark text-white"
                        : "text-muted hover:bg-cream hover:text-stoneDark"
                    }`}
                  >
                    <Icon size={17} />
                    {section.label}
                  </button>
                );
              })}
            </nav>
          </aside>

          <section className="min-w-0">
            {selectedSection === "home" && <HomeSection metrics={metrics} />}
            {selectedSection === "applications" && (
              <ApplicationsSection
                applications={applications}
                onSelect={setSelectedApplication}
              />
            )}
            {selectedSection === "offers" && (
              <OffersSection offers={offerRows} onSelect={setSelectedOffer} />
            )}
            {selectedSection === "projects" && <ProjectsSection />}
            {selectedSection === "customers" && <CustomersSection />}
            {selectedSection === "workers" && <WorkersSection />}
            {selectedSection === "links" && <ProjectLinksSection />}
            {selectedSection === "updates" && <UpdatesSection />}
            {selectedSection === "descriptions" && <DescriptionsSection />}
            {selectedSection === "payments" && (
              <PaymentsSection payments={paymentRows} onStatusChange={updatePaymentStatus} />
            )}
            {selectedSection === "documents" && (
              <DocumentsSection
                documents={documentRows}
                onStatusChange={updateDocumentStatus}
                onAddDocument={addDemoDocument}
              />
            )}
            {selectedSection === "requests" && (
              <RequestsSection
                requests={requestRows}
                onStatusChange={updateRequestStatus}
                onFieldChange={updateRequestField}
              />
            )}
            {selectedSection === "handover" && (
              <HandoverSection
                status={handoverStatus}
                warrantyStarted={warrantyStarted}
                checklist={handoverChecklist}
                serviceRequests={serviceRows}
                onCompleteHandover={completeHandover}
                onStartWarranty={startWarranty}
                onCompleteService={completeServiceRequest}
                onChecklistStatusChange={updateHandoverChecklistStatus}
              />
            )}
            {selectedSection === "settings" && <SettingsSection />}
          </section>
        </div>
      </div>

      {selectedApplication && (
        <ApplicationDetailPanel
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
          onStatusChange={updateApplicationStatus}
        />
      )}

      {selectedOffer && (
        <OfferDetailPanel
          offer={selectedOffer}
          onClose={() => setSelectedOffer(null)}
          onStatusChange={updateOfferStatus}
          onPreviewPdf={setPdfPreviewOffer}
        />
      )}

      {pdfPreviewOffer && (
        <PdfPreviewModal offer={pdfPreviewOffer} onClose={() => setPdfPreviewOffer(null)} />
      )}
    </main>
  );
}

function HomeSection({ metrics }) {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map(([label, value]) => (
          <MetricCard key={label} label={label} value={value} />
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <Panel title="Son hareketler" eyebrow="Operasyon akışı">
          <div className="grid gap-3">
            {[
              "Yeni başvuru AG-2026-001 inceleme kuyruğuna düştü.",
              "TKF-2026-001 müşteriye gönderildi.",
              "Mehmet Usta mutfak güncellemesi ekledi.",
              "Revize talebi müşteri talepleri alanında bekliyor."
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-cream p-4 text-sm text-muted">
                {item}
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Hızlı aksiyonlar" eyebrow="Kısayollar">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            {quickActions.map((action) => (
              <button
                key={action}
                className="rounded-2xl border border-border bg-cream px-4 py-3 text-left text-sm font-medium hover:border-gold hover:bg-white"
              >
                {action}
              </button>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

function ApplicationsSection({ applications, onSelect }) {
  return (
    <Panel title="Gelen Başvurular" eyebrow="Başvuru yönetimi">
      <div className="admin-scroll">
        <div className="grid min-w-[920px] gap-3 lg:min-w-0">
        {applications.map((application) => (
          <button
            key={application.id}
            onClick={() => onSelect(application)}
            className="grid gap-3 rounded-2xl border border-border bg-cream p-4 text-left hover:border-gold hover:bg-white lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_0.8fr_auto]"
          >
            <Cell label="Başvuru No" value={application.applicationNo} />
            <Cell label="Müşteri" value={application.customer} />
            <Cell label="Telefon" value={application.phone} />
            <Cell label="Hizmet" value={application.service} />
            <Cell label="Konum" value={application.location} />
            <Cell label="Tarih" value={application.date} />
            <span className={statusChipClass(application.statusLabel)}>
              {application.statusLabel}
            </span>
          </button>
        ))}
        </div>
      </div>
    </Panel>
  );
}

function OffersSection({ offers, onSelect }) {
  return (
    <Panel title="Giden Teklifler" eyebrow="Teklif yönetimi">
      <div className="admin-scroll">
        <div className="grid min-w-[900px] gap-3 lg:min-w-0">
        {offers.map((offer) => (
          <button
            key={offer.id}
            onClick={() => onSelect(offer)}
            className="grid gap-3 rounded-2xl border border-border bg-cream p-4 text-left hover:border-gold hover:bg-white lg:grid-cols-[0.8fr_1fr_1.2fr_0.8fr_auto_0.8fr_0.8fr]"
          >
            <Cell label="Teklif No" value={offer.no} />
            <Cell label="Müşteri" value={offer.customer} />
            <Cell label="Hizmet" value={offer.service} />
            <Cell label="Tutar" value={offer.amount} />
            <span className={statusChipClass(offer.status)}>{offer.status}</span>
            <Cell label="Geçerlilik" value={offer.validUntil} />
            <Cell label="PDF" value={offer.pdfStatus} />
          </button>
        ))}
        </div>
      </div>
    </Panel>
  );
}

function ProjectsSection() {
  return (
    <SimpleGrid
      title="Projeler"
      eyebrow="Proje yönetimi"
      items={projects}
      fields={[
        ["Proje", "title"],
        ["Durum", "status"],
        ["Sorumlu ekip", "worker"],
        ["İlerleme", "progress"]
      ]}
    />
  );
}

function CustomersSection() {
  return (
    <SimpleGrid
      title="Müşteriler"
      eyebrow="Müşteri kayıtları"
      items={customers}
      fields={[
        ["Müşteri", "name"],
        ["Telefon", "phone"],
        ["E-posta", "email"],
        ["İlgili iş", "related"],
        ["Durum", "status"]
      ]}
    />
  );
}

function WorkersSection() {
  return (
    <SimpleGrid
      title="Ustalar / Saha Ekibi"
      eyebrow="Ekip erişimleri"
      items={workers}
      fields={[
        ["Usta", "name"],
        ["Telefon", "phone"],
        ["Erişim kodu", "accessCode"],
        ["Uzmanlık", "specialty"],
        ["Atanan proje", "project"],
        ["Durum", "status"]
      ]}
    />
  );
}

function ProjectLinksSection() {
  const links = [
    {
      title: demoProject.title,
      customerLink: "/ahmet-sezer/proje-takip/1234567",
      workerLink: "/ahmet-sezer/usta-takip/1234567",
      status: "Aktif"
    },
    {
      title: "Villa Satış Hazırlığı",
      customerLink: "/murat-aydin/proje-takip/demo",
      workerLink: "/murat-aydin/usta-takip/demo",
      status: "Taslak"
    }
  ];

  return (
    <Panel title="Proje linkleri" eyebrow="Özel erişim yönetimi">
      <p className="mb-5 max-w-3xl text-sm leading-6 text-muted">
        Müşteri ve usta hesap açmaz. Her proje için müşteriye özel takip
        bağlantısı ve ustaya özel fotoğraf yükleme bağlantısı hazırlanır.
      </p>
      <div className="grid gap-4">
        {links.map((link) => (
          <article key={link.title} className="rounded-2xl bg-cream p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold">{link.title}</h3>
                <span className={`mt-3 ${statusChipClass(link.status)}`}>{link.status}</span>
              </div>
            </div>
            <div className="mt-5 grid gap-3 lg:grid-cols-2">
              <LinkBox label="Müşteri takip bağlantısı" href={link.customerLink} />
              <LinkBox label="Usta fotoğraf yükleme bağlantısı" href={link.workerLink} />
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}

function LinkBox({ label, href }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-black/35">{label}</p>
      <a href={href} className="mt-2 block break-all text-sm font-medium text-stoneDark">
        {href}
      </a>
      <button
        type="button"
        onClick={() => navigator.clipboard?.writeText(href)}
        className="mt-4 rounded-full bg-stoneDark px-4 py-2 text-sm font-medium text-white"
      >
        Kopyala
      </button>
    </div>
  );
}

function DescriptionsSection() {
  return <UpdatesSection focusDescriptions />;
}

function UpdatesSection({ focusDescriptions = false }) {
  const [projectFilter, setProjectFilter] = useState("Tümü");
  const [areaFilter, setAreaFilter] = useState("Tümü");
  const [rows, setRows] = useState(initialPhotoApprovals);

  const projectsForFilter = ["Tümü", ...new Set(initialPhotoApprovals.map((item) => item.project))];
  const areasForFilter = ["Tümü", ...new Set(initialPhotoApprovals.map((item) => item.area))];
  const visibleRows = rows.filter((item) => {
    const projectMatches = projectFilter === "Tümü" || item.project === projectFilter;
    const areaMatches = areaFilter === "Tümü" || item.area === areaFilter;
    return projectMatches && areaMatches;
  });

  function updatePhotoRow(id, field, value) {
    setRows((current) =>
      current.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  }

  function appendTemplate(id, template) {
    setRows((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              customerDescription: item.customerDescription
                ? `${item.customerDescription} ${template}`
                : template
            }
          : item
      )
    );
  }

  return (
    <Panel
      title={focusDescriptions ? "Açıklama yazımı" : "Onay Bekleyen Fotoğraflar"}
      eyebrow="Fotoğraf onay akışı"
    >
      <p className="mb-5 max-w-4xl text-sm leading-6 text-muted">
        Usta fotoğrafları yalnızca sahadan yükler. Müşteri ham usta notunu görmez;
        admin fotoğrafları inceler, iç notu değerlendirir, profesyonel müşteri
        açıklamasını yazar ve yayına alır.
      </p>

      <div className="mb-5 grid gap-3 md:grid-cols-2">
        <FilterSelect label="Proje filtresi" value={projectFilter} options={projectsForFilter} onChange={setProjectFilter} />
        <FilterSelect label="Alan filtresi" value={areaFilter} options={areasForFilter} onChange={setAreaFilter} />
      </div>

      <div className="grid gap-5">
        {visibleRows.map((item) => (
          <article key={item.id} className="rounded-[2rem] border border-border bg-cream p-4">
            <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
              <div>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-black/35">
                      {item.project}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold">{item.area}</h3>
                    <p className="mt-2 text-sm text-muted">
                      {item.worker} · {item.uploadedAt}
                    </p>
                  </div>
                  <span className={statusChipClass(item.status)}>{item.status}</span>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2">
                  {Array.from({ length: Math.min(item.photoCount, 6) }).map((_, index) => (
                    <div key={`${item.id}-preview-${index}`} className="aspect-square rounded-2xl border border-border bg-surface p-2">
                      <div className="h-full rounded-xl bg-soft" />
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-sm text-muted">{item.photoCount} fotoğraf yüklendi.</p>
              </div>

              <div className="grid gap-4">
                <label className="grid gap-2">
                  <span className="text-sm font-medium text-muted">İç not</span>
                  <textarea
                    value={item.internalNote}
                    onChange={(event) => updatePhotoRow(item.id, "internalNote", event.target.value)}
                    className="min-h-20 rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none"
                    placeholder="Sadece admin ekibinin göreceği not"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-medium text-muted">
                    Müşteriye gösterilecek açıklama
                  </span>
                  <textarea
                    value={item.customerDescription}
                    onChange={(event) => updatePhotoRow(item.id, "customerDescription", event.target.value)}
                    className="min-h-28 rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none"
                    placeholder="Müşteriye anlaşılır ve profesyonel açıklama yazın"
                  />
                </label>

                <div>
                  <p className="mb-2 text-sm font-medium text-muted">Açıklama Şablonu Kullan</p>
                  <div className="flex flex-wrap gap-2">
                    {photoDescriptionTemplates.map((template) => (
                      <button
                        key={template}
                        type="button"
                        onClick={() => appendTemplate(item.id, template)}
                        className="rounded-full bg-white px-4 py-2 text-xs font-medium text-muted hover:bg-stoneDark hover:text-white"
                      >
                        {template}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 border-t border-border pt-4">
                  <button
                    type="button"
                    onClick={() => updatePhotoRow(item.id, "status", "Yayına Hazır")}
                    className="rounded-full bg-white px-4 py-2 text-sm font-medium text-muted hover:bg-stoneDark hover:text-white"
                  >
                    Yayına Hazır İşaretle
                  </button>
                  <button
                    type="button"
                    onClick={() => updatePhotoRow(item.id, "status", "Yayınlandı")}
                    className="rounded-full bg-gold px-4 py-2 text-sm font-medium text-stoneDark"
                  >
                    Müşteriye Yayınla
                  </button>
                  <button
                    type="button"
                    onClick={() => updatePhotoRow(item.id, "status", "Revize Gerekli")}
                    className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-muted hover:border-gold"
                  >
                    Revize İste
                  </button>
                  <button
                    type="button"
                    onClick={() => updatePhotoRow(item.id, "status", "Reddedildi")}
                    className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-muted hover:border-gold"
                  >
                    Reddet
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}

function FilterSelect({ label, value, options, onChange }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-muted">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-2xl border border-border bg-cream px-4 py-3 text-sm outline-none"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function PaymentsSection({ payments, onStatusChange }) {
  return (
    <Panel title="Ödemeler" eyebrow="Tahsilat planı yönetimi">
      <p className="mb-5 max-w-3xl text-sm leading-6 text-muted">
        Müşteri panelinde görünen ödeme planını buradan demo olarak yönetin. Her kilometre taşı
        tutar, vade ve durum bilgisiyle şeffaf şekilde takip edilir.
      </p>
      <div className="grid gap-4 lg:grid-cols-4">
        <MetricCard label="Toplam teklif" value={normalizeCurrency(demoProject.offer)} />
        <MetricCard label="Ödenen" value={normalizeCurrency(demoProject.paid)} />
        <MetricCard label="Kalan" value={normalizeCurrency(demoProject.remaining)} />
        <MetricCard label="Sıradaki ödeme" value="Malzeme başlangıcı" />
      </div>
      <div className="admin-scroll mt-6">
        <div className="grid min-w-[760px] gap-3 lg:min-w-0">
          {payments.map((payment, index) => (
            <article key={payment.id} className="relative rounded-2xl bg-cream p-4 pl-6">
            <span className="absolute left-3 top-5 h-[calc(100%-2.5rem)] w-px bg-gold/45" />
            <span className="absolute left-[7px] top-5 h-3 w-3 rounded-full bg-gold" />
            <div className="grid gap-4 lg:grid-cols-[0.5fr_1fr_0.9fr_0.9fr_auto] lg:items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-semibold">
                {index + 1}
              </div>
              <Cell label="Kilometre taşı" value={payment.title} />
              <Cell label="Tutar" value={normalizeCurrency(payment.amount)} />
              <Cell label="Vade" value={payment.dueDate} />
              <span className={statusChipClass(payment.status)}>{payment.status}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Ödendi", "Yaklaşan", "Bekliyor"].map((status) => (
                <button
                  key={status}
                  onClick={() => onStatusChange(payment.id, status)}
                  className="rounded-full bg-white px-4 py-2 text-sm font-medium text-muted hover:bg-stoneDark hover:text-white"
                >
                  {status} İşaretle
                </button>
              ))}
            </div>
            </article>
          ))}
        </div>
      </div>
    </Panel>
  );
}
function DocumentsSection({ documents, onStatusChange, onAddDocument }) {
  return (
    <Panel title="Belgeler" eyebrow="Dosya yönetimi">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <p className="max-w-2xl text-sm leading-6 text-muted">
          Müşterinin gördüğü teklif, sözleşme, fatura, garanti ve teslim belgelerini demo durumlarıyla yönetin.
        </p>
        <button
          onClick={onAddDocument}
          className="rounded-2xl bg-stoneDark px-5 py-3 text-sm font-medium text-white"
        >
          Belge Ekle
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {documents.map((document) => (
          <article key={document.id} className="rounded-2xl bg-cream p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <FileText className="text-muted" size={22} />
                <h3 className="mt-4 font-semibold">{document.name}</h3>
                <p className="mt-1 text-sm text-muted">{document.type}</p>
              </div>
              <span className={statusChipClass(document.status)}>{document.status}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="rounded-full bg-white px-4 py-2 text-sm font-medium text-muted hover:bg-stoneDark hover:text-white">
                Görüntüle
              </button>
              <button
                onClick={() => onStatusChange(document.id, "Hazır")}
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-muted hover:bg-stoneDark hover:text-white"
              >
                Hazır İşaretle
              </button>
              <button
                onClick={() => onStatusChange(document.id, "İnceleniyor")}
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-muted hover:bg-stoneDark hover:text-white"
              >
                İnceleniyor İşaretle
              </button>
              <button
                onClick={() => onStatusChange(document.id, "Bekleniyor")}
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-muted hover:bg-stoneDark hover:text-white"
              >
                Bekleniyor İşaretle
              </button>
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}
function RequestsSection({ requests, onStatusChange, onFieldChange }) {
  const statuses = ["İnceleniyor", "Yanıtlandı", "Tamamlandı"];

  return (
    <Panel title="Talepler" eyebrow="Kontrollü talep yönetimi">
      <p className="mb-5 max-w-3xl text-sm leading-6 text-muted">
        Müşteri talepleri sohbet gibi dağılmadan; tip, alan, durum, iç not ve yanıt taslağıyla kontrollü yönetilir.
      </p>
      <div className="grid gap-3">
        {requests.map((request) => (
          <article key={request.id} className="rounded-2xl bg-cream p-4">
            <div className="grid gap-4 xl:grid-cols-[1fr_1.2fr_1fr]">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-black/35">Tarih / saat</p>
                <p className="mt-1 text-sm font-medium">{request.date}</p>
                <h3 className="mt-2 font-semibold">{request.customer}</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-muted">
                    {request.type}
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-muted">
                    {request.area}
                  </span>
                </div>
                <span className={`mt-3 ${statusChipClass(request.status)}`}>{request.status}</span>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-black/35">Mesaj</p>
                <p className="mt-2 text-sm leading-6 text-stoneDark">{request.message}</p>
              </div>
              <div className="grid gap-3">
                <label className="grid gap-2">
                  <span className="text-sm font-medium text-muted">Admin iç notu</span>
                  <textarea
                    value={request.internalNote || ""}
                    onChange={(event) => onFieldChange(request.id, "internalNote", event.target.value)}
                    className="min-h-20 rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none"
                    placeholder="İç not ekle"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-medium text-muted">Müşteri yanıtı demo</span>
                  <textarea
                    value={request.response || ""}
                    onChange={(event) => onFieldChange(request.id, "response", event.target.value)}
                    className="min-h-20 rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none"
                    placeholder="Yanıt taslağı"
                  />
                </label>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => onStatusChange(request.id, status)}
                  className="rounded-full bg-white px-4 py-2 text-sm font-medium text-muted hover:bg-stoneDark hover:text-white"
                >
                  {status} İşaretle
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}
function HandoverSection({
  status,
  warrantyStarted,
  checklist,
  serviceRequests,
  onCompleteHandover,
  onStartWarranty,
  onCompleteService,
  onChecklistStatusChange
}) {
  return (
    <div className="grid gap-6">
      <Panel title="Teslim & Garanti" eyebrow="Teslim yönetimi">
        <p className="mb-5 max-w-3xl text-sm leading-6 text-muted">
          Proje kapanışı, garanti tarihleri ve servis talepleri müşteriye güven veren tek bir teslim sistemi içinde izlenir.
        </p>
        <div className="grid gap-4 lg:grid-cols-5">
          <MetricCard label="Proje durumu" value={status} />
          <MetricCard label="Teslim tarihi" value={handoverDemo.deliveryDate} />
          <MetricCard label="Garanti başlangıcı" value={handoverDemo.warrantyStart} />
          <MetricCard label="Garanti bitişi" value={handoverDemo.warrantyEnd} />
          <MetricCard label="Sorumlu" value={handoverDemo.responsible} />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={onCompleteHandover}
            className="rounded-2xl bg-stoneDark px-5 py-4 text-sm font-medium text-white"
          >
            Teslim Tamamlandı
          </button>
          <button
            onClick={onStartWarranty}
            className="rounded-2xl bg-gold px-5 py-4 text-sm font-medium text-stoneDark"
          >
            Garanti Sürecini Başlat
          </button>
          {warrantyStarted && <span className={statusChipClass("Tamamlandı")}>Garanti aktif</span>}
        </div>
      </Panel>

      <Panel title="Teslim checklist" eyebrow="Son kontrol">
        <div className="grid gap-3">
          {checklist.map((item) => (
            <div key={item.id} className="grid gap-3 rounded-2xl bg-cream p-4 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <span className="font-medium">{item.label}</span>
                <div className="mt-2">
                  <span className={statusChipClass(item.status)}>{item.status}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Tamamlandı", "Bekliyor"].map((statusOption) => (
                  <button
                    key={statusOption}
                    onClick={() => onChecklistStatusChange(item.id, statusOption)}
                    className="rounded-full bg-white px-4 py-2 text-sm font-medium text-muted hover:bg-stoneDark hover:text-white"
                  >
                    {statusOption} İşaretle
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Servis talepleri" eyebrow="Garanti sonrası destek">
        <div className="grid gap-3">
          {serviceRequests.map((request) => (
            <article key={request.id} className="rounded-2xl bg-cream p-4">
              <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-start">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-black/35">{request.area}</p>
                  <h3 className="mt-2 font-semibold">{request.subject}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">{request.description}</p>
                </div>
                <span className={statusChipClass(request.status)}>{request.status}</span>
              </div>
              <button
                onClick={() => onCompleteService(request.id)}
                className="mt-4 rounded-full bg-white px-4 py-2 text-sm font-medium text-muted hover:bg-stoneDark hover:text-white"
              >
                Servis Talebini Tamamlandı İşaretle
              </button>
            </article>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function SettingsSection() {
  const settings = [
    { label: "Şirket bilgileri", value: "BLAAG Construction and Architecture iç operasyon profili" },
    { label: "Demo erişim modeli", value: "Admin girişi gizli; müşteri ve usta erişimi özel bağlantı modeliyle temsil edilir" },
    { label: "Bildirim tercihleri", value: "WhatsApp, telefon ve panel içi uyarılar" },
    { label: "Hizmet kategorileri", value: "Yapı geliştirme, tadilat, gayrimenkul danışmanlığı" }
  ];

  return (
    <SimpleGrid
      title="Ayarlar"
      eyebrow="İç operasyon yapılandırması"
      items={settings}
      fields={[
        ["Alan", "label"],
        ["Değer", "value"]
      ]}
    />
  );
}

function ApplicationDetailPanel({ application, onClose, onStatusChange }) {
  return (
    <DetailShell title={application.customer} subtitle={application.applicationNo} onClose={onClose}>
      <InfoBlock title="Müşteri bilgileri">
        <InfoLine icon={Phone} text={application.phone} />
        <InfoLine icon={Mail} text={application.email} />
        <InfoLine icon={Building2} text={application.service} />
        <InfoLine icon={CalendarDays} text={application.date} />
        <InfoLine icon={BriefcaseBusiness} text={`Kaynak: ${application.source || "Ön Başvuru Formu"}`} />
      </InfoBlock>
      <InfoBlock title="Başvuru cevapları">
        <div className="grid gap-3">
          {application.answers.map(([label, value]) => (
            <Cell key={label} label={label} value={value} />
          ))}
        </div>
      </InfoBlock>
      <InfoBlock title="Dosya ve fotoğraf alanı">
        <div className="grid gap-3">
          {application.files.map((file) => (
            <div key={file} className="rounded-2xl bg-cream p-4 text-sm text-muted">
              {file}
            </div>
          ))}
        </div>
      </InfoBlock>
      <InfoBlock title="Admin iç notu">
        <textarea
          defaultValue={application.note}
          className="min-h-24 w-full rounded-2xl border border-border bg-cream px-4 py-3 outline-none"
        />
      </InfoBlock>
      <InfoBlock title="Durum güncelle">
        <div className="flex flex-wrap gap-2">
          {["Yeni", "İnceleniyor", "Teklif Hazırlanıyor", "Teklif Gönderildi", "Onaylandı", "Reddedildi"].map((status) => (
            <button
              key={status}
              onClick={() => onStatusChange(application.id, status)}
              className="rounded-full bg-cream px-4 py-2 text-sm font-medium text-muted hover:bg-stoneDark hover:text-white"
            >
              {status}
            </button>
          ))}
        </div>
      </InfoBlock>
      <button className="w-full rounded-2xl bg-gold px-5 py-4 font-medium text-stoneDark">
        Teklif Hazırla
      </button>
    </DetailShell>
  );
}

function OfferDetailPanel({ offer, onClose, onStatusChange, onPreviewPdf }) {
  const price = normalizeCurrency(offer.amount);
  const statusActions = [
    ["Taslak", "Taslak Kaydet"],
    ["Gönderildi", "Teklif Gönderildi İşaretle"],
    ["Onaylandı", "Onaylandı İşaretle"],
    ["Revize İstendi", "Revize İstendi İşaretle"]
  ];

  return (
    <DetailShell title={offer.no} subtitle={offer.customer} onClose={onClose}>
      <section className="rounded-[2rem] bg-stoneDark p-6 text-white">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-white/35">Teklif Yönetimi</p>
            <h3 className="mt-3 text-3xl font-semibold">{offer.title || "Villa Renovasyon Değer Artırma Teklifi"}</h3>
            <p className="mt-4 text-5xl font-semibold text-gold">{price}</p>
          </div>
          <span className={statusChipClass(offer.status)}>{offer.status}</span>
        </div>
      </section>

      <InfoBlock title="Teklif alanları">
        <div className="grid gap-4">
          <AdminField label="Teklif başlığı" defaultValue={offer.title || "Villa Renovasyon Değer Artırma Teklifi"} />
          <AdminField label="Tek fiyat" defaultValue={price} />
          <AdminTextarea label="Kapsam özeti" defaultValue={offer.scope} />
          <AdminTextarea label="Dahil olan işler" defaultValue={offer.included.join("\n")} />
          <AdminTextarea label="Hariç olan işler" defaultValue={offer.excluded.join("\n")} />
          <AdminField label="Geçerlilik tarihi" defaultValue={offer.validUntil} />
          <AdminTextarea label="Admin iç notu" defaultValue={offer.adminNote || "Müşteri fiyat ve başlangıç takvimi konusunda net bilgilendirilecek."} />
        </div>
      </InfoBlock>

      <InfoBlock title="Teklif aksiyonları">
        <div className="grid gap-3 sm:grid-cols-2">
          {statusActions.map(([status, label]) => (
            <button
              key={status}
              onClick={() => onStatusChange(offer.id, status)}
              className={`rounded-2xl px-5 py-4 text-sm font-medium ${
                offer.status === status
                  ? "bg-stoneDark text-white"
                  : "border border-border bg-cream text-stoneDark hover:border-gold hover:bg-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </InfoBlock>

      <InfoBlock title="Demo PDF">
        <p className="mb-4 text-sm leading-6 text-muted">
          Bu demo ortamında gerçek PDF üretilmez. Önizleme, müşteriye gidecek teklifin nasıl görüneceğini temsil eder.
        </p>
        <button
          onClick={() => onPreviewPdf(offer)}
          className="w-full rounded-2xl border border-border bg-cream px-5 py-4 font-medium hover:border-gold hover:bg-white"
        >
          Teklif PDF Önizleme
        </button>
      </InfoBlock>
    </DetailShell>
  );
}

function PdfPreviewModal({ offer, onClose }) {
  const price = normalizeCurrency(offer.amount);

  return (
    <div className="fixed inset-0 z-[60] flex items-end bg-black/35 p-4 sm:items-center sm:justify-center">
      <div className="w-full max-w-2xl rounded-[2rem] bg-cream p-4 shadow-2xl shadow-black/30">
        <div className="rounded-[1.5rem] border border-border bg-surface p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-black/35">PDF Önizleme</p>
              <h3 className="mt-2 text-3xl font-semibold">{offer.no}</h3>
              <p className="mt-2 text-muted">{offer.customer}</p>
            </div>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-cream"
              aria-label="PDF önizlemeyi kapat"
            >
              <X size={18} />
            </button>
          </div>
          <div className="mt-6 rounded-2xl bg-stoneDark p-6 text-white">
            <p className="text-sm text-white/50">Tek fiyat</p>
            <p className="mt-2 text-5xl font-semibold text-gold">{price}</p>
            <p className="mt-4 text-sm text-white/55">Geçerlilik: {offer.validUntil}</p>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-cream p-4">
              <p className="font-semibold">Kapsam özeti</p>
              <p className="mt-2 text-sm leading-6 text-muted">{offer.scope}</p>
            </div>
            <div className="rounded-2xl bg-cream p-4">
              <p className="font-semibold">Durum</p>
              <span className={`mt-3 ${statusChipClass(offer.status)}`}>{offer.status}</span>
            </div>
          </div>
          <p className="mt-5 rounded-2xl bg-cream p-4 text-sm text-muted">
            Demo önizleme: PDF indirme veya gerçek dosya üretimi bu sürümde yoktur.
          </p>
        </div>
      </div>
    </div>
  );
}

function AdminField({ label, defaultValue }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-muted">{label}</span>
      <input
        defaultValue={defaultValue}
        className="rounded-2xl border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
      />
    </label>
  );
}

function AdminTextarea({ label, defaultValue }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-muted">{label}</span>
      <textarea
        defaultValue={defaultValue}
        className="min-h-28 rounded-2xl border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
      />
    </label>
  );
}

function normalizeCurrency(value) {
  return String(value || "").replace(/^[^0-9]+/, "₺");
}
function SimpleGrid({ title, eyebrow, items, fields }) {
  return (
    <Panel title={title} eyebrow={eyebrow}>
      <div className="grid gap-3">
        {items.map((item, index) => (
          <div key={`${title}-${index}`} className="grid gap-3 rounded-2xl bg-cream p-4 md:grid-cols-2 xl:grid-cols-3">
            {fields.map(([label, key]) => (
              <Cell key={label} label={label} value={item[key]} />
            ))}
          </div>
        ))}
      </div>
    </Panel>
  );
}

function Panel({ title, eyebrow, children }) {
  return (
    <section className="rounded-[2rem] border border-border bg-surface p-5 shadow-premium md:p-6">
      <p className="text-sm uppercase tracking-[0.25em] text-black/35">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function MetricCard({ label, value }) {
  return (
    <div className="rounded-[2rem] border border-border bg-surface p-5 shadow-sm shadow-black/5">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-2 text-4xl font-semibold">{value}</p>
    </div>
  );
}

function Cell({ label, value }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.16em] text-black/35">{label}</p>
      <p className="mt-1 text-sm font-medium text-stoneDark">{value || "Belirtilmedi"}</p>
    </div>
  );
}

function DetailShell({ title, subtitle, onClose, children }) {
  return (
    <aside className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto border-l border-border bg-cream p-4 shadow-2xl shadow-black/20 sm:max-w-2xl sm:p-5">
      <div className="rounded-[2rem] bg-stoneDark p-6 text-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-white/45">{subtitle}</p>
            <h2 className="mt-1 text-3xl font-semibold">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10"
            aria-label="Paneli kapat"
          >
            <X size={18} />
          </button>
        </div>
      </div>
      <div className="mt-5 grid gap-5">{children}</div>
    </aside>
  );
}

function InfoBlock({ title, children }) {
  return (
    <section className="rounded-[2rem] border border-border bg-surface p-5">
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function InfoLine({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted">
      <Icon size={16} />
      <span>{text}</span>
    </div>
  );
}

function BulletList({ items }) {
  return (
    <div className="grid gap-2">
      {items.map((item) => (
        <div key={item} className="flex items-center gap-3 text-sm text-muted">
          <ShieldCheck className="text-gold" size={17} />
          {item}
        </div>
      ))}
    </div>
  );
}
