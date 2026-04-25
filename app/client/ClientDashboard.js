"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  CreditCard,
  FileText,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck
} from "lucide-react";
import { statusChipClass } from "../../lib/designSystem";
import { useDemoRoleGuard } from "../../lib/demoAuth";
import { demoProjectUpdates, updateAreas, updateStages } from "../../lib/projectUpdates";
import DemoLogoutButton from "../../components/DemoLogoutButton";

const customer = {
  name: "Ali Atmaca",
  phone: "+90 5XX XXX XX XX",
  phoneHref: "+905XXXXXXXXX",
  location: "Sakarya / Akyazı"
};

const project = {
  applicationNo: "AG-2026-001",
  projectNo: "PRJ-2026-014",
  title: "Villa Renovasyon Süreci",
  serviceType: "Tadilat & Değer Artırma Çalışmaları",
  submittedDate: "25 Nisan 2026",
  status: "İnceleniyor",
  nextStep: "Ekibimiz başvuruyu değerlendiriyor ve teklif kapsamını netleştiriyor.",
  primaryCta: "Danışmanla Görüş",
  offer: "₺1.250.000",
  paid: "₺350.000",
  remaining: "₺900.000",
  nextPayment: "Malzeme başlangıcı - 03 Mayıs 2026",
  progress: 42,
  areas: updateAreas
};

const tabs = [
  ["application", "Başvuru Takibi"],
  ["project", "Proje Takibi"],
  ["offer", "Teklif & Ödeme"],
  ["documents", "Belgeler"],
  ["requests", "Talepler"],
  ["warranty", "Teslim ve Garanti"]
];

const applicationSteps = [
  ["Başvuru alındı", "Tamamlandı"],
  ["İnceleme başladı", "İnceleniyor"],
  ["Teklif hazırlanacak", "Bekliyor"],
  ["Onay sonrası proje başlatılacak", "Bekliyor"]
];

const timeline = [
  {
    id: "tl-1",
    date: "Bugün 14:30",
    area: "Mutfak",
    description: "Mutfak söküm işlemleri tamamlandı.",
    status: "Tamamlandı"
  },
  {
    id: "tl-2",
    date: "Bugün 11:10",
    area: "Mutfak",
    description: "Elektrik altyapı kontrolü yapıldı.",
    status: "İncelendi"
  },
  {
    id: "tl-3",
    date: "Dün 16:45",
    area: "Banyo",
    description: "Banyo seramik teslimatı sahaya alındı.",
    status: "Malzeme"
  },
  {
    id: "tl-4",
    date: "Dün 09:20",
    area: "Dış Cephe",
    description: "Dış cephe keşfi tamamlandı.",
    status: "Kontrol"
  }
];

const gallery = [
  { id: "ph-1", area: "Mutfak", stage: "Süreç", note: "Söküm tamamlandı", date: "Bugün" },
  { id: "ph-2", area: "Banyo", stage: "Malzeme", note: "Seramikler sahaya alındı", date: "Dün" },
  { id: "ph-3", area: "Salon", stage: "Kontrol", note: "Zemin ve boya yüzeyi incelendi", date: "Dün" },
  { id: "ph-4", area: "Dış Cephe", stage: "Öncesi", note: "Keşif fotoğrafları eklendi", date: "Dün" }
];

const offer = {
  scope:
    "Mutfak, banyo, salon ve dış cephe alanlarında değer artırma odaklı renovasyon; malzeme koordinasyonu ve teslim öncesi kalite kontrol dahil.",
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
  ]
};

const closingOffer = {
  status: "Teklif Hazır",
  validity: "Geçerlilik: 7 gün",
  price: "₺1.250.000",
  scope:
    "Mutfak, banyo, salon ve dış cephe alanlarında değer artırma odaklı renovasyon; malzeme koordinasyonu ve teslim öncesi kalite kontrol dahil.",
  included: [
    "Mutfak ve banyo yenileme",
    "Elektrik ve tesisat kontrolü",
    "Seramik, boya ve zemin uygulamaları",
    "Günlük görsel ilerleme takibi"
  ],
  excluded: [
    "Ruhsat ve belediye harçları",
    "Müşteri tarafından sonradan talep edilen ek işler",
    "Marka değişiminden doğan fiyat farkları"
  ],
  startPlan: [
    "Onay sonrası sözleşme taslağı paylaşılır.",
    "İlk saha planı ve ekip takvimi netleştirilir.",
    "Malzeme başlangıcı için ödeme adımı açılır."
  ]
};
const documents = [
  ["Teklif PDF", "Hazır"],
  ["Sözleşme Taslağı", "İnceleniyor"],
  ["Faturalar", "Bekliyor"],
  ["Garanti Belgeleri", "Bekleniyor"],
  ["Teslim Tutanağı", "Bekleniyor"]
];

const paymentMilestones = [
  { title: "Ön ödeme", amount: "₺350.000", dueDate: "Onay sonrası", status: "Ödendi" },
  { title: "Malzeme başlangıcı", amount: "₺300.000", dueDate: "03 Mayıs 2026", status: "Yaklaşan" },
  { title: "Ara ödeme", amount: "₺350.000", dueDate: "15 Mayıs 2026", status: "Bekliyor" },
  { title: "Teslim ödemesi", amount: "₺250.000", dueDate: "Teslim günü", status: "Bekliyor" }
];

const documentCards = [
  { name: "Teklif PDF", type: "PDF", status: "Hazır" },
  { name: "Sözleşme Taslağı", type: "DOC", status: "İnceleniyor" },
  { name: "Faturalar", type: "PDF", status: "Bekleniyor" },
  { name: "Garanti Belgeleri", type: "PDF", status: "Bekleniyor" },
  { name: "Teslim Tutanağı", type: "PDF", status: "Bekleniyor" }
];

const warrantyInfo = {
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
  ]
};

const initialRequests = [
  {
    id: "req-1",
    date: "Bugün 10:15",
    type: "Revize Talebi",
    area: "Mutfak",
    message: "Mutfak dolabı kulp modelini daha sade bir alternatifle değerlendirebilir miyiz?",
    status: "İnceleniyor"
  },
  {
    id: "req-2",
    date: "Dün 18:20",
    type: "Soru",
    area: "Ödeme",
    message: "Malzeme başlangıcı ödemesi için tarih netleşti mi?",
    status: "Açık"
  }
];

export default function ClientDashboard() {
  const canView = useDemoRoleGuard("client");
  const [activeTab, setActiveTab] = useState("application");
  const [areaFilter, setAreaFilter] = useState("Tümü");
  const [stageFilter, setStageFilter] = useState("Tümü");
  const [approved, setApproved] = useState(false);
  const [revisionOpen, setRevisionOpen] = useState(false);
  const [revisionNote, setRevisionNote] = useState("");
  const [revisionSent, setRevisionSent] = useState(false);
  const [requests, setRequests] = useState(initialRequests);
  const [requestType, setRequestType] = useState("Revize Talebi");
  const [requestArea, setRequestArea] = useState("Genel");
  const [requestMessage, setRequestMessage] = useState("");
  const [requestSent, setRequestSent] = useState(false);
  const [serviceArea, setServiceArea] = useState("Mutfak");
  const [serviceSubject, setServiceSubject] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [serviceSent, setServiceSent] = useState(false);

  const filteredProofUpdates = useMemo(() => {
    return demoProjectUpdates.filter((item) => {
      const areaMatches = areaFilter === "Tümü" || item.area === areaFilter;
      const stageMatches = stageFilter === "Tümü" || item.stage === stageFilter;
      return areaMatches && stageMatches;
    });
  }, [areaFilter, stageFilter]);

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
    <main className="min-h-screen bg-cream px-4 py-6 text-stoneDark sm:px-6 lg:py-8">
      <div className="mx-auto max-w-7xl">
        <TopStatusHero activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="my-5 rounded-[1.5rem] border border-border bg-surface p-2">
          <div className="mobile-scroll">
            {tabs.map(([id, label]) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`rounded-full px-4 py-3 text-sm font-medium transition ${
                  activeTab === id ? "bg-stoneDark text-white" : "bg-cream text-muted"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "application" && <ApplicationMode />}
        {activeTab === "project" && (
          <ProjectMode
            areaFilter={areaFilter}
            setAreaFilter={setAreaFilter}
            stageFilter={stageFilter}
            setStageFilter={setStageFilter}
            filteredProofUpdates={filteredProofUpdates}
          />
        )}
        {activeTab === "offer" && (
          <OfferPaymentMode
            approved={approved}
            setApproved={setApproved}
            revisionOpen={revisionOpen}
            setRevisionOpen={setRevisionOpen}
            revisionNote={revisionNote}
            setRevisionNote={setRevisionNote}
            revisionSent={revisionSent}
            setRevisionSent={setRevisionSent}
          />
        )}
        {activeTab === "documents" && <DocumentsMode />}
        {activeTab === "warranty" && (
          <WarrantyMode
            serviceArea={serviceArea}
            setServiceArea={setServiceArea}
            serviceSubject={serviceSubject}
            setServiceSubject={setServiceSubject}
            serviceDescription={serviceDescription}
            setServiceDescription={setServiceDescription}
            serviceSent={serviceSent}
            setServiceSent={setServiceSent}
          />
        )}
        {activeTab === "requests" && (
          <RequestsMode
            requests={requests}
            requestType={requestType}
            setRequestType={setRequestType}
            requestArea={requestArea}
            setRequestArea={setRequestArea}
            requestMessage={requestMessage}
            setRequestMessage={setRequestMessage}
            requestSent={requestSent}
            onSubmit={() => {
              setRequests((current) => [
                {
                  id: `req-${current.length + 1}`,
                  date: "Bugün",
                  type: requestType,
                  area: requestArea,
                  message: requestMessage || "Müşteri yeni talep oluşturdu.",
                  status: "Açık"
                },
                ...current
              ]);
              setRequestSent(true);
              setRequestMessage("");
            }}
          />
        )}
      </div>
    </main>
  );
}

function TopStatusHero({ activeTab, setActiveTab }) {
  const activeProject = activeTab === "project";

  return (
    <header className="rounded-[2rem] bg-stoneDark p-6 text-white sm:p-8 lg:p-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.28em] text-white/35">
            Müşteri Paneli
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Merhaba {customer.name}
          </h1>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/70">
              {activeProject ? `Proje No: ${project.projectNo}` : `Başvuru No: ${project.applicationNo}`}
            </span>
            <span className="rounded-full bg-gold px-4 py-2 text-sm font-medium text-stoneDark">
              {project.status}
            </span>
          </div>
          <div className="mt-6 grid gap-3 text-white/65 sm:grid-cols-2">
            <StatusLine label="Mevcut durum" value={project.status} />
            <StatusLine label="Sıradaki adım" value={project.nextStep} />
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <button
            onClick={() => setActiveTab("offer")}
            className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-4 text-sm font-medium text-stoneDark"
          >
            {project.primaryCta}
          </button>
          <DemoLogoutButton dark />
        </div>
      </div>
    </header>
  );
}

function StatusLine({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-white/35">{label}</p>
      <p className="mt-2 leading-6 text-white/80">{value}</p>
    </div>
  );
}

function ApplicationMode() {
  return (
    <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-[2rem] border border-border bg-surface p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.25em] text-black/35">Başvuru Takibi</p>
        <h2 className="mt-3 text-3xl font-semibold">Başvurunuz güvenle kayıtta.</h2>
        <p className="mt-4 leading-7 text-muted">
          Şu anda ekibimiz ihtiyaçları ve kapsamı inceliyor. Teklif hazırlığı öncesi
          eksik bilgi olursa sizinle iletişime geçilecek.
        </p>

        <div className="mt-6 grid gap-3">
          <InfoRow label="Başvuru No" value={project.applicationNo} />
          <InfoRow label="Hizmet tipi" value={project.serviceType} />
          <InfoRow label="Gönderim tarihi" value={project.submittedDate} />
          <InfoRow label="Durum" value={project.status} chip />
        </div>

        <div className="mt-6 rounded-2xl bg-cream p-4">
          <p className="text-sm font-medium">Sıradaki adım</p>
          <p className="mt-2 text-sm leading-6 text-muted">{project.nextStep}</p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <a
            href={`https://wa.me/${customer.phoneHref.replace(/\D/g, "")}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gold px-5 py-4 font-medium text-stoneDark"
          >
            <MessageCircle size={19} />
            WhatsApp
          </a>
          <a
            href={`tel:${customer.phoneHref}`}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border px-5 py-4 font-medium"
          >
            <Phone size={19} />
            Telefon
          </a>
        </div>
      </div>

      <div className="rounded-[2rem] border border-border bg-surface p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.25em] text-black/35">Süreç</p>
        <h2 className="mt-3 text-3xl font-semibold">Başvuru zaman çizgisi</h2>
        <div className="mt-6 grid gap-3">
          {applicationSteps.map(([label, status], index) => (
            <div key={label} className="flex items-center gap-4 rounded-2xl bg-cream p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold">
                {index + 1}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium">{label}</p>
                <p className="mt-1 text-sm text-muted">
                  {index < 2 ? "Bu adım aktif takip ediliyor." : "Sonraki aşamada güncellenecek."}
                </p>
              </div>
              <span className={statusChipClass(status)}>{status}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectMode({
  areaFilter,
  setAreaFilter,
  stageFilter,
  setStageFilter,
  filteredProofUpdates
}) {
  const areaFilters = ["Tümü", ...project.areas];
  const stageFilters = ["Tümü", ...updateStages];

  return (
    <section className="grid gap-6">
      <div className="rounded-[2rem] border border-border bg-surface p-6 sm:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-black/35">Proje Takibi</p>
            <h2 className="mt-2 text-3xl font-semibold">{project.title}</h2>
            <p className="mt-3 max-w-2xl leading-7 text-muted">
              Yüklenen görseller, sahadaki ilerlemeyi tarih ve alan bazlı takip etmenizi sağlar.
            </p>
          </div>
          <div className="rounded-2xl bg-cream p-5">
            <p className="text-sm text-muted">İlerleme</p>
            <p className="mt-1 text-4xl font-semibold">%{project.progress}</p>
          </div>
        </div>
        <div className="mt-6 h-3 rounded-full bg-cream">
          <div className="h-3 rounded-full bg-gold" style={{ width: `${project.progress}%` }} />
        </div>
      </div>

      <ProofProgress
        areaFilters={areaFilters}
        areaFilter={areaFilter}
        setAreaFilter={setAreaFilter}
        stageFilters={stageFilters}
        stageFilter={stageFilter}
        setStageFilter={setStageFilter}
        items={filteredProofUpdates}
      />
    </section>
  );
}

function ProofProgress({
  areaFilters,
  areaFilter,
  setAreaFilter,
  stageFilters,
  stageFilter,
  setStageFilter,
  items
}) {
  return (
    <section className="rounded-[2rem] border border-border bg-surface p-5 shadow-premium sm:p-6 lg:p-8">
      <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-black/35">Kanıtlı İlerleme</p>
          <h2 className="mt-2 text-3xl font-semibold">Zaman çizgisi ve fotoğraf kanıtları</h2>
          <p className="mt-3 max-w-3xl leading-7 text-muted">
            Yüklenen görseller, sahadaki ilerlemeyi tarih ve alan bazlı takip etmenizi sağlar.
          </p>
        </div>
        <div className="rounded-2xl bg-cream p-4 text-sm text-muted">
          <strong className="block text-2xl text-stoneDark">{items.length}</strong>
          filtrelenmiş kayıt
        </div>
      </div>

      <FilterGroup label="Alan" filters={areaFilters} value={areaFilter} onChange={setAreaFilter} />
      <FilterGroup label="Aşama" filters={stageFilters} value={stageFilter} onChange={setStageFilter} />

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <TimelineProof items={items} />
        <PhotoProofGallery items={items} />
      </div>
    </section>
  );
}

function FilterGroup({ label, filters, value, onChange }) {
  return (
    <div className="mt-5">
      <p className="mb-2 text-sm font-semibold text-muted">{label}</p>
      <div className="mobile-scroll">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onChange(filter)}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              value === filter ? "bg-stoneDark text-white" : "bg-cream text-muted"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}

function TimelineProof({ items }) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <Clock3 className="text-muted" size={20} />
        <h3 className="text-2xl font-semibold">Timeline</h3>
      </div>
      <div className="grid gap-3">
        {items.map((item) => (
          <article key={item.id} className="relative rounded-2xl bg-cream p-4 pl-6">
            <span className="absolute left-2 top-5 h-[calc(100%-2.5rem)] w-px bg-gold/45" />
            <span className="absolute left-[5px] top-5 h-2.5 w-2.5 rounded-full bg-gold" />
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/35">
                {item.date} · {item.time} · {item.area}
              </p>
              <FileImage className="shrink-0 text-muted" size={16} />
            </div>
            <p className="mt-2 text-sm font-medium leading-6">{item.note}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-muted">
                {item.photoCount} fotoğraf
              </span>
              <span className={statusChipClass(item.stage)}>{item.stage}</span>
              <span className={statusChipClass(item.status)}>{item.status}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function PhotoProofGallery({ items }) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <FileImage className="text-muted" size={20} />
        <h3 className="text-2xl font-semibold">Galeri önizleme</h3>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <article key={`${item.id}-photo`} className="overflow-hidden rounded-[1.5rem] bg-stoneDark text-white">
            <div className="flex aspect-[4/3] items-center justify-center bg-[linear-gradient(135deg,#2a2926,#5f4a16)]">
              <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/70">
                {item.photoCount} fotoğraf
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/65">
                  {item.area}
                </span>
                <span className="rounded-full bg-gold px-3 py-1 text-xs font-semibold text-stoneDark">
                  {item.stage}
                </span>
              </div>
              <p className="mt-4 text-xs text-white/45">
                {item.date} · {item.time}
              </p>
              <p className="mt-1 line-clamp-2 text-sm font-medium leading-6">{item.note}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function OfferPaymentMode(props) {
  return (
    <section className="grid gap-6">
      <OfferSection {...props} />
    </section>
  );
}

function OfferSection({
  approved,
  setApproved,
  revisionOpen,
  setRevisionOpen,
  revisionNote,
  setRevisionNote,
  revisionSent,
  setRevisionSent
}) {
  return (
    <div className="grid gap-6">
      <section className="rounded-[2rem] bg-stoneDark p-6 text-white sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm uppercase tracking-[0.25em] text-white/35">
                Teklif & Ödeme
              </p>
              <span className={statusChipClass(closingOffer.status)}>
                {closingOffer.status}
              </span>
            </div>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Teklifiniz Hazır
            </h2>
            <p className="mt-5 text-5xl font-semibold tracking-tight text-gold sm:text-6xl">
              {closingOffer.price}
            </p>
            <p className="mt-4 text-sm text-white/55">{closingOffer.validity}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:min-w-72 lg:grid-cols-1">
            <button
              onClick={() => setApproved(true)}
              disabled={approved || revisionSent}
              className="rounded-2xl bg-gold px-5 py-4 font-medium text-stoneDark disabled:cursor-not-allowed disabled:opacity-60"
            >
              Teklifi Onayla
            </button>
            <button
              onClick={() => setRevisionOpen(true)}
              disabled={approved || revisionSent}
              className="rounded-2xl border border-white/15 px-5 py-4 font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              Revize Talebi Gönder
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-border bg-surface p-6 sm:p-8">
          <p className="text-sm uppercase tracking-[0.25em] text-black/35">Kapsam Özeti</p>
          <p className="mt-4 leading-7 text-muted">{closingOffer.scope}</p>
          <OfferList title="Dahil olan işler" items={closingOffer.included} />
          <OfferList title="Hariç olan işler" items={closingOffer.excluded} muted />
        </div>

        <div className="grid gap-6">
          <div className="rounded-[2rem] border border-border bg-surface p-6 sm:p-8">
            <p className="text-sm uppercase tracking-[0.25em] text-black/35">
              Tahmini Başlangıç Planı
            </p>
            <div className="mt-5 grid gap-3">
              {closingOffer.startPlan.map((item, index) => (
                <div key={item} className="flex gap-3 rounded-2xl bg-cream p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-6 text-muted">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <PaymentSummary />
        </div>
      </section>

      {approved && <Notice text="Teklif onaylandı. Ekibimiz sözleşme ve başlangıç planı için sizinle iletişime geçecek." />}
      {revisionSent && <Notice text="Revize talebiniz alındı." />}

      {!approved && !revisionSent && revisionOpen && (
        <div className="rounded-[2rem] border border-border bg-surface p-5">
          <textarea
            value={revisionNote}
            onChange={(event) => setRevisionNote(event.target.value)}
            className="min-h-28 w-full rounded-2xl border border-border bg-cream px-4 py-3 outline-none"
            placeholder="Revize talebinizi yazın"
          />
          <button
            onClick={() => setRevisionSent(true)}
            className="mt-3 rounded-2xl bg-stoneDark px-5 py-3 text-sm font-medium text-white"
          >
            Revize Talebini İlet
          </button>
        </div>
      )}
    </div>
  );
}
function OfferList({ title, items, muted = false }) {
  return (
    <div className="mt-6">
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-3 grid gap-2">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-3">
            <CheckCircle2 className={muted ? "text-black/30" : "text-gold"} size={18} />
            <span className="text-sm text-muted">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PaymentSummary() {
  return (
    <div className="rounded-[2rem] border border-border bg-surface p-6 sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <CreditCard />
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-black/35">Ödemeler</p>
          <h2 className="mt-1 text-2xl font-semibold">Ödeme Özeti</h2>
        </div>
      </div>
      <div className="grid gap-3">
        <InfoRow label="Toplam teklif" value={closingOffer.price} />
        <InfoRow label="Ödenen" value="₺350.000" />
        <InfoRow label="Kalan" value="₺900.000" />
        <InfoRow label="Sıradaki ödeme" value="Malzeme başlangıcı - 03 Mayıs 2026" />
      </div>
      <div className="mt-6 grid gap-3">
        {paymentMilestones.map((payment, index) => (
          <article key={payment.title} className="rounded-2xl bg-cream p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-semibold">{payment.title}</h3>
                  <p className="mt-1 text-sm text-muted">{payment.amount} - {payment.dueDate}</p>
                </div>
              </div>
              <span className={statusChipClass(payment.status)}>{payment.status}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
function DocumentsMode() {
  return (
    <section className="rounded-[2rem] border border-border bg-surface p-6 sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <FileText />
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-black/35">Belgeler</p>
          <h2 className="mt-1 text-3xl font-semibold">Dosya merkezi</h2>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {documentCards.map((doc) => (
          <article key={doc.name} className="rounded-2xl bg-cream p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <FileText size={22} className="text-muted" />
                <h3 className="mt-4 font-semibold">{doc.name}</h3>
                <p className="mt-1 text-sm text-muted">{doc.type}</p>
              </div>
              <span className={statusChipClass(doc.status)}>{doc.status}</span>
            </div>
            <button className="mt-5 rounded-full bg-white px-4 py-2 text-sm font-medium text-muted hover:text-stoneDark">
              Görüntüle
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
function RequestsMode({
  requests,
  requestType,
  setRequestType,
  requestArea,
  setRequestArea,
  requestMessage,
  setRequestMessage,
  requestSent,
  onSubmit
}) {
  const requestTypes = ["Revize Talebi", "Ek İş Talebi", "Soru", "Sorun Bildirimi"];
  const requestAreas = ["Genel", "Mutfak", "Banyo", "Salon", "Dış Cephe", "Ödeme", "Belgeler"];

  return (
    <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-[2rem] border border-border bg-surface p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.25em] text-black/35">Yeni Talep</p>
        <h2 className="mt-2 text-3xl font-semibold">Kontrollü talep oluşturun</h2>
        <p className="mt-3 text-sm leading-6 text-muted">
          WhatsApp yerine kayıtlı, takip edilebilir bir talep iletin.
        </p>
        <div className="mt-6 grid gap-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <SelectDemo label="Talep tipi" value={requestType} onChange={setRequestType} items={requestTypes} />
            <SelectDemo label="İlgili alan" value={requestArea} onChange={setRequestArea} items={requestAreas} />
          </div>
          <textarea
            value={requestMessage}
            onChange={(event) => setRequestMessage(event.target.value)}
            className="min-h-32 rounded-2xl border border-border bg-cream px-4 py-3 outline-none"
            placeholder="Talebinizi veya sorunuzu kısa ve net şekilde yazın."
          />
          <button
            onClick={onSubmit}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-stoneDark px-5 py-4 font-medium text-white"
          >
            <Send size={18} />
            Talebi Gönder
          </button>
          {requestSent && <Notice text="Talebiniz alındı. Ekibimiz değerlendirdikten sonra sizinle iletişime geçecek." />}
        </div>
      </div>

      <div className="rounded-[2rem] border border-border bg-surface p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.25em] text-black/35">Talep Listesi</p>
        <h2 className="mt-2 text-3xl font-semibold">Kayıtlı talepler</h2>
        <div className="mt-6 grid gap-3">
          {requests.map((request) => (
            <article key={request.id} className="rounded-2xl bg-cream p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-black/35">{request.date}</p>
                  <p className="mt-2 font-medium">
                    {request.type} - {request.area}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-muted">{request.message}</p>
                </div>
                <span className={statusChipClass(request.status)}>{request.status}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function WarrantyMode({
  serviceArea,
  setServiceArea,
  serviceSubject,
  setServiceSubject,
  serviceDescription,
  setServiceDescription,
  serviceSent,
  setServiceSent
}) {
  const serviceAreas = ["Mutfak", "Banyo", "Salon", "Dış Cephe", "Elektrik", "Tesisat", "Diğer"];

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
      <div className="rounded-[2rem] border border-border bg-surface p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.25em] text-black/35">Teslim ve Garanti</p>
        <h2 className="mt-2 text-3xl font-semibold">Teslim güvence alanı</h2>
        <div className="mt-6 grid gap-3">
          <InfoRow label="Proje durumu" value={warrantyInfo.completionStatus} />
          <InfoRow label="Teslim tarihi" value={warrantyInfo.deliveryDate} />
          <InfoRow label="Garanti başlangıcı" value={warrantyInfo.warrantyStart} />
          <InfoRow label="Garanti bitişi" value={warrantyInfo.warrantyEnd} />
          <InfoRow label="Sorumlu" value={warrantyInfo.responsible} />
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button className="rounded-2xl border border-border bg-cream px-5 py-4 font-medium hover:border-gold hover:bg-white">
            Teslim Tutanağını Görüntüle
          </button>
          <button
            onClick={() => setServiceSent(false)}
            className="rounded-2xl bg-stoneDark px-5 py-4 font-medium text-white"
          >
            Servis Talebi Oluştur
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="rounded-[2rem] border border-border bg-surface p-6 sm:p-8">
          <p className="text-sm uppercase tracking-[0.25em] text-black/35">Son Kontrol</p>
          <h2 className="mt-2 text-2xl font-semibold">Teslim checklist</h2>
          <div className="mt-5 grid gap-3">
            {warrantyInfo.checklist.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-4 rounded-2xl bg-cream p-4">
                <span className="text-sm font-medium">{item.label}</span>
                <span className={statusChipClass(item.status)}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-border bg-surface p-6 sm:p-8">
          <p className="text-sm uppercase tracking-[0.25em] text-black/35">Servis Talebi</p>
          <div className="mt-5 grid gap-3">
            <SelectDemo label="Alan" value={serviceArea} onChange={setServiceArea} items={serviceAreas} />
            <input
              value={serviceSubject}
              onChange={(event) => setServiceSubject(event.target.value)}
              className="rounded-2xl border border-border bg-cream px-4 py-3 outline-none"
              placeholder="Konu"
            />
            <textarea
              value={serviceDescription}
              onChange={(event) => setServiceDescription(event.target.value)}
              className="min-h-24 rounded-2xl border border-border bg-cream px-4 py-3 outline-none"
              placeholder="Açıklama"
            />
            <button
              onClick={() => setServiceSent(true)}
              className="rounded-2xl bg-gold px-5 py-4 font-medium text-stoneDark"
            >
              Servis Talebi Gönder
            </button>
            {serviceSent && <Notice text="Servis talebiniz alındı." />}
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ label, value, chip = false }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-cream p-4">
      <span className="text-sm text-muted">{label}</span>
      {chip ? <span className={statusChipClass(value)}>{value}</span> : <strong className="text-right">{value}</strong>}
    </div>
  );
}

function SelectDemo({ label, value, onChange, items }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-muted">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-2xl border border-border bg-cream px-4 py-3 outline-none"
      >
        {items.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
}

function Notice({ text }) {
  return (
    <div className="mt-6 flex gap-3 rounded-2xl bg-cream p-4 text-sm leading-6 text-muted">
      <ShieldCheck className="mt-0.5 shrink-0 text-gold" size={18} />
      {text}
    </div>
  );
}
