"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  Camera,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  FileImage,
  FileText,
  MapPin,
  Phone,
  RotateCcw,
  Send,
  ShieldCheck
} from "lucide-react";
import { statusChipClass } from "../../lib/designSystem";
import { useDemoRoleGuard } from "../../lib/demoAuth";
import {
  demoProjectUpdates,
  updateAreas,
  updateStages
} from "../../lib/projectUpdates";
import DemoLogoutButton from "../../components/DemoLogoutButton";

const customer = {
  name: "Ali Atmaca",
  phone: "+90 5XX XXX XX XX",
  location: "Sakarya / Akyazı"
};

const project = {
  applicationNo: "AG-2026-001",
  projectNo: "PRJ-2026-014",
  title: "Villa Renovasyon Süreci",
  serviceType: "Tadilat & Değer Artırma Çalışmaları",
  submittedDate: "25 Nisan 2026",
  status: "İnceleniyor",
  nextStep:
    "Ekibimiz başvuruyu değerlendiriyor ve teklif kapsamını netleştiriyor.",
  progress: 42
};

const tabs = [
  ["application", "Başvuru"],
  ["project", "Proje"],
  ["offer", "Teklif & Ödeme"],
  ["documents", "Belgeler"],
  ["requests", "Talepler"],
  ["warranty", "Teslim & Garanti"]
];

const applicationSteps = [
  ["Başvuru alındı", "Tamamlandı"],
  ["İnceleme başladı", "İnceleniyor"],
  ["Teklif hazırlanacak", "Bekliyor"],
  ["Onay sonrası proje başlatılacak", "Bekliyor"]
];

const documentCards = [
  { name: "Teklif PDF", type: "PDF", status: "Hazır" },
  { name: "Sözleşme Taslağı", type: "DOC", status: "İnceleniyor" },
  { name: "Faturalar", type: "PDF", status: "Bekleniyor" },
  { name: "Garanti Belgeleri", type: "PDF", status: "Bekleniyor" }
];

const paymentMilestones = [
  { title: "Ön ödeme", amount: "₺350.000", dueDate: "Onay sonrası", status: "Ödendi" },
  { title: "Malzeme başlangıcı", amount: "₺300.000", dueDate: "03 Mayıs 2026", status: "Yaklaşan" },
  { title: "Ara ödeme", amount: "₺350.000", dueDate: "15 Mayıs 2026", status: "Bekliyor" }
];

const requestsSeed = [
  {
    id: "req-1",
    date: "Bugün 10:15",
    type: "Revize Talebi",
    area: "Mutfak",
    message:
      "Mutfak dolabı kulp modelini daha sade bir alternatifle değerlendirebilir miyiz?",
    status: "İnceleniyor"
  }
];

const warrantyChecklist = [
  { label: "İş kapsamı tamamlandı", status: "Bekliyor" },
  { label: "Alan temizliği yapıldı", status: "Bekliyor" },
  { label: "Malzeme ve uygulama kontrol edildi", status: "Tamamlandı" },
  { label: "Belgeler teslim edildi", status: "Bekliyor" }
];

export default function ClientDashboard() {
  const canView = useDemoRoleGuard("client");
  const [activeTab, setActiveTab] = useState("application");
  const [areaFilter, setAreaFilter] = useState("Tümü");
  const [stageFilter, setStageFilter] = useState("Tümü");
  const [requests, setRequests] = useState(requestsSeed);
  const [requestType, setRequestType] = useState("Revize Talebi");
  const [requestArea, setRequestArea] = useState("Genel");
  const [requestMessage, setRequestMessage] = useState("");
  const [requestSent, setRequestSent] = useState(false);

  const filteredProofUpdates = useMemo(() => {
    return demoProjectUpdates.filter((item) => {
      const areaMatches = areaFilter === "Tümü" || item.area === areaFilter;
      const stageMatches = stageFilter === "Tümü" || item.stage === stageFilter;
      return areaMatches && stageMatches;
    });
  }, [areaFilter, stageFilter]);

  if (!canView) {
    return (
      <main className="min-h-screen bg-[#F7F7F5] px-6 py-10 text-[#111111]">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-black/10 bg-white p-8">
          Oturum kontrol ediliyor...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-4 py-6 text-[#111111] sm:px-6 lg:py-8">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-[2rem] border border-black/10 bg-black p-6 text-white sm:p-8 lg:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.3em] text-white/42">
                BLAGG Remote
              </p>
              <h1 className="mt-4 text-[2.8rem] leading-[0.98] sm:text-[4rem]">
                Merhaba {customer.name}
              </h1>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm text-white/70">
                  Başvuru No: {project.applicationNo}
                </span>
                <span className="rounded-full border border-white/12 bg-white px-4 py-2 text-sm text-black">
                  Proje No: {project.projectNo}
                </span>
              </div>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/62">
                Durum, ilerleme, teklif ve belge adımları sadeleştirilmiş görünümle burada tutulur.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:min-w-80 lg:grid-cols-1">
              <a
                href={`tel:${customer.phone}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm text-black"
              >
                <Phone size={16} />
                Telefon
              </a>
              <DemoLogoutButton dark />
            </div>
          </div>
        </header>

        <div className="my-5 rounded-[1.5rem] border border-black/10 bg-white p-2">
          <div className="mobile-scroll">
            {tabs.map(([id, label]) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`rounded-full px-4 py-3 text-sm ${
                  activeTab === id
                    ? "bg-black text-white"
                    : "bg-[#F7F7F5] text-black/64"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "application" ? (
          <ApplicationMode />
        ) : null}
        {activeTab === "project" ? (
          <ProjectMode
            areaFilter={areaFilter}
            setAreaFilter={setAreaFilter}
            stageFilter={stageFilter}
            setStageFilter={setStageFilter}
            filteredProofUpdates={filteredProofUpdates}
            onResetFilters={() => {
              setAreaFilter("Tümü");
              setStageFilter("Tümü");
            }}
          />
        ) : null}
        {activeTab === "offer" ? <OfferMode /> : null}
        {activeTab === "documents" ? <DocumentsMode /> : null}
        {activeTab === "requests" ? (
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
              if (!requestMessage.trim()) return;
              setRequests((current) => [
                {
                  id: `req-${current.length + 1}`,
                  date: "Bugün",
                  type: requestType,
                  area: requestArea,
                  message: requestMessage.trim(),
                  status: "Açık"
                },
                ...current
              ]);
              setRequestSent(true);
              setRequestMessage("");
            }}
          />
        ) : null}
        {activeTab === "warranty" ? <WarrantyMode /> : null}
      </div>
    </main>
  );
}

function ApplicationMode() {
  return (
    <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <Panel
        eyebrow="Başvuru Takibi"
        title="Başvurunuz güvenle kayıtta."
        text="İlk değerlendirme ve teklif hazırlık adımları bu alanda görünür kalır."
      >
        <div className="grid gap-3">
          <InfoRow label="Başvuru No" value={project.applicationNo} />
          <InfoRow label="Hizmet tipi" value={project.serviceType} />
          <InfoRow label="Gönderim tarihi" value={project.submittedDate} />
          <InfoRow label="Durum" value={project.status} chip />
        </div>
      </Panel>

      <Panel
        eyebrow="Süreç"
        title="Başvuru zaman çizgisi"
        text="Her adım kapalı ve okunur bir sırayla gösterilir."
      >
        <div className="grid gap-3">
          {applicationSteps.map(([label, status], index) => (
            <div
              key={label}
              className="flex items-center gap-4 rounded-[1.25rem] border border-black/10 bg-[#F7F7F5] p-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-sm">
                {index + 1}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{label}</p>
              </div>
              <span className={statusChipClass(status)}>{status}</span>
            </div>
          ))}
        </div>
      </Panel>
    </section>
  );
}

function ProjectMode({
  areaFilter,
  setAreaFilter,
  stageFilter,
  setStageFilter,
  filteredProofUpdates,
  onResetFilters
}) {
  const areaFilters = ["Tümü", ...updateAreas];
  const stageFilters = ["Tümü", ...updateStages];

  return (
    <section className="grid gap-6">
      <Panel
        eyebrow="Proje Takibi"
        title={project.title}
        text="Onaylanmış ilerleme kayıtları alan ve aşama bazında filtrelenebilir."
      >
        <div className="grid gap-3 sm:grid-cols-4">
          <MetricCard label="İlerleme" value={`%${project.progress}`} icon={ShieldCheck} />
          <MetricCard label="Müşteri" value={customer.name} icon={ClipboardList} />
          <MetricCard label="Lokasyon" value={customer.location} icon={MapPin} />
          <MetricCard label="Durum" value={project.status} icon={CalendarDays} />
        </div>
      </Panel>

      <Panel
        eyebrow="Kanıtlı İlerleme"
        title="Zaman çizgisi ve fotoğraf kayıtları"
        text="Filtreler yalnızca görünür kayıtlarda çalışır."
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-black/54">
            Görünen kayıt: {filteredProofUpdates.length}
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#F7F7F5] px-4 py-2 text-sm text-black/64"
          >
            <RotateCcw size={14} />
            Filtreleri Sıfırla
          </button>
        </div>
        <FilterGroup label="Alan" filters={areaFilters} value={areaFilter} onChange={setAreaFilter} />
        <FilterGroup label="Aşama" filters={stageFilters} value={stageFilter} onChange={setStageFilter} />

        {filteredProofUpdates.length ? (
          <div className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="grid gap-3">
              {filteredProofUpdates.map((item) => (
                <article
                  key={item.id}
                  className="rounded-[1.25rem] border border-black/10 bg-[#F7F7F5] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-black/38">
                        {item.date} · {item.time} · {item.area}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-black/64">{item.note}</p>
                    </div>
                    <span className={statusChipClass(item.status)}>{item.status}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className={statusChipClass(item.stage)}>{item.stage}</span>
                    <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-black/54">
                      {item.photoCount} fotoğraf
                    </span>
                  </div>
                </article>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {filteredProofUpdates.map((item) => (
                <article
                  key={`${item.id}-visual`}
                  className="overflow-hidden rounded-[1.5rem] border border-black/10 bg-white"
                >
                  <div className="flex aspect-[4/3] items-center justify-center border-b border-black/10 bg-[#F3F3F1]">
                    <div className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-black/58">
                      {item.photoCount} fotoğraf
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-2">
                      <span className={statusChipClass(item.area)}>{item.area}</span>
                      <span className={statusChipClass(item.stage)}>{item.stage}</span>
                    </div>
                    <p className="mt-4 text-xs uppercase tracking-[0.16em] text-black/38">
                      {item.date} · {item.time}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-black/64">{item.note}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : (
          <Notice text="Bu filtrelerde görünür kayıt bulunamadı." className="mt-6" />
        )}
      </Panel>
    </section>
  );
}

function OfferMode() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <Panel
        eyebrow="Teklif & Ödeme"
        title="Teklifiniz hazır"
        text="Teklif, ödeme adımları ve başlangıç planı aynı ekranda görünür."
      >
        <div className="grid gap-3 sm:grid-cols-3">
          <MetricCard label="Toplam teklif" value="₺1.250.000" icon={CreditCard} />
          <MetricCard label="Ödenen" value="₺350.000" icon={CheckCircle2} />
          <MetricCard label="Kalan" value="₺900.000" icon={CalendarDays} />
        </div>
        <div className="mt-6 grid gap-3">
          {paymentMilestones.map((payment) => (
            <article
              key={payment.title}
              className="rounded-[1.25rem] border border-black/10 bg-[#F7F7F5] p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-medium">{payment.title}</h3>
                  <p className="mt-1 text-sm text-black/54">
                    {payment.amount} · {payment.dueDate}
                  </p>
                </div>
                <span className={statusChipClass(payment.status)}>{payment.status}</span>
              </div>
            </article>
          ))}
        </div>
      </Panel>

      <Panel
        eyebrow="Teklif Kapsamı"
        title="Kısa kapsam özeti"
        text="Mutfak, banyo, salon ve dış cephe alanlarında değer artırma odaklı renovasyon; malzeme koordinasyonu ve teslim öncesi kalite kontrol dahil."
      >
        <div className="grid gap-3">
          {[
            "Mutfak ve banyo yenileme",
            "Elektrik ve tesisat kontrolü",
            "Seramik, boya ve zemin uygulamaları",
            "Günlük görsel ilerleme takibi"
          ].map((item) => (
            <div
              key={item}
              className="rounded-[1.25rem] border border-black/10 bg-[#F7F7F5] p-4 text-sm text-black/64"
            >
              {item}
            </div>
          ))}
        </div>
      </Panel>
    </section>
  );
}

function DocumentsMode() {
  return (
    <Panel eyebrow="Belgeler" title="Dosya merkezi" text="Teklif, sözleşme ve garanti belgeleri burada toplanır.">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {documentCards.map((doc) => (
          <article
            key={doc.name}
            className="rounded-[1.25rem] border border-black/10 bg-[#F7F7F5] p-5"
          >
            <FileText className="text-black/62" size={22} />
            <h3 className="mt-4 text-sm font-medium">{doc.name}</h3>
            <p className="mt-1 text-sm text-black/54">{doc.type}</p>
            <div className="mt-4">
              <span className={statusChipClass(doc.status)}>{doc.status}</span>
            </div>
          </article>
        ))}
      </div>
    </Panel>
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
      <Panel eyebrow="Yeni Talep" title="Kayıtlı talep oluşturun" text="Talep ve sorular aynı akışta izlenir.">
        <div className="grid gap-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <SelectDemo
              label="Talep tipi"
              value={requestType}
              onChange={(value) => {
                setRequestType(value);
                setRequestSent(false);
              }}
              items={requestTypes}
            />
            <SelectDemo
              label="İlgili alan"
              value={requestArea}
              onChange={(value) => {
                setRequestArea(value);
                setRequestSent(false);
              }}
              items={requestAreas}
            />
          </div>
          <textarea
            value={requestMessage}
            onChange={(event) => {
              setRequestMessage(event.target.value);
              setRequestSent(false);
            }}
            className="min-h-32 rounded-[1rem] border border-black/10 bg-[#F7F7F5] px-4 py-3 outline-none"
            placeholder="Talebinizi kısa ve net şekilde yazın."
            maxLength={500}
          />
          <p className="text-sm text-black/46">{requestMessage.length}/500 karakter</p>
          <button
            type="button"
            onClick={onSubmit}
            disabled={!requestMessage.trim()}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-black px-5 py-4 text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send size={16} />
            Talebi Gönder
          </button>
          {requestSent ? <Notice text="Talebiniz alındı." /> : null}
        </div>
      </Panel>

      <Panel eyebrow="Talep Listesi" title="Kayıtlı talepler" text="Açık ve incelenen talepler burada görünür.">
        <div className="grid gap-3">
          {requests.map((request) => (
            <article
              key={request.id}
              className="rounded-[1.25rem] border border-black/10 bg-[#F7F7F5] p-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-black/38">{request.date}</p>
                  <p className="mt-2 text-sm font-medium">
                    {request.type} · {request.area}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-black/58">{request.message}</p>
                </div>
                <span className={statusChipClass(request.status)}>{request.status}</span>
              </div>
            </article>
          ))}
        </div>
      </Panel>
    </section>
  );
}

function WarrantyMode() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
      <Panel eyebrow="Teslim & Garanti" title="Teslim güvence alanı" text="Teslim sonrası görünür kayıt ve garanti kontrolü aynı yüzeydedir.">
        <div className="grid gap-3">
          <InfoRow label="Proje durumu" value="Teslime Hazırlanıyor" chip />
          <InfoRow label="Teslim tarihi" value="30 Mayıs 2026" />
          <InfoRow label="Garanti başlangıcı" value="01 Haziran 2026" />
          <InfoRow label="Garanti bitişi" value="01 Haziran 2028" />
        </div>
      </Panel>

      <Panel eyebrow="Kontrol Listesi" title="Teslim checklist" text="Son kontroller tamamlandıkça kayıt burada güncellenir.">
        <div className="grid gap-3">
          {warrantyChecklist.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-4 rounded-[1.25rem] border border-black/10 bg-[#F7F7F5] p-4"
            >
              <span className="text-sm text-black/64">{item.label}</span>
              <span className={statusChipClass(item.status)}>{item.status}</span>
            </div>
          ))}
        </div>
      </Panel>
    </section>
  );
}

function Panel({ eyebrow, title, text, children }) {
  return (
    <section className="rounded-[2rem] border border-black/10 bg-white p-6 sm:p-8">
      <p className="text-xs uppercase tracking-[0.28em] text-black/42">{eyebrow}</p>
      <h2 className="mt-3 text-[2rem] sm:text-[2.5rem]">{title}</h2>
      {text ? <p className="mt-3 max-w-3xl text-sm leading-6 text-black/56">{text}</p> : null}
      <div className="mt-6">{children}</div>
    </section>
  );
}

function MetricCard({ label, value, icon: Icon }) {
  return (
    <article className="rounded-[1.25rem] border border-black/10 bg-[#F7F7F5] p-4">
      <Icon className="text-black/62" size={20} />
      <p className="mt-3 text-xs uppercase tracking-[0.16em] text-black/38">{label}</p>
      <p className="mt-2 text-sm text-black">{value}</p>
    </article>
  );
}

function FilterGroup({ label, filters, value, onChange }) {
  return (
    <div className="mt-4">
      <p className="mb-2 text-sm text-black/54">{label}</p>
      <div className="mobile-scroll">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onChange(filter)}
            className={`rounded-full px-4 py-2 text-sm ${
              value === filter ? "bg-black text-white" : "bg-[#F7F7F5] text-black/64"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}

function InfoRow({ label, value, chip = false }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-[1.25rem] border border-black/10 bg-[#F7F7F5] p-4">
      <span className="text-sm text-black/54">{label}</span>
      {chip ? <span className={statusChipClass(value)}>{value}</span> : <strong className="text-sm text-black">{value}</strong>}
    </div>
  );
}

function SelectDemo({ label, value, onChange, items }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm text-black/54">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-[1rem] border border-black/10 bg-[#F7F7F5] px-4 py-3 outline-none"
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

function Notice({ text, className = "" }) {
  return (
    <div className={`rounded-[1.25rem] border border-black/10 bg-[#F7F7F5] p-4 text-sm text-black/58 ${className}`}>
      {text}
    </div>
  );
}
