"use client";

import { useMemo, useState } from "react";
import {
  Building2,
  CalendarDays,
  CheckCircle2,
  FileImage,
  FileText,
  Mail,
  MapPin,
  Phone,
  ReceiptText,
  UserRound,
  Wallet,
  X
} from "lucide-react";
import {
  demoApplications,
  demoDocuments,
  demoOffer,
  demoPaymentPlan,
  demoRequests,
  demoWarranty
} from "../../lib/demoData";

const columns = [
  { id: "new", title: "Yeni" },
  { id: "review", title: "İnceleniyor" },
  { id: "offer", title: "Teklif Hazır" },
  { id: "approved", title: "Onaylandı" }
];

export default function AdminKanban() {
  const [applications, setApplications] = useState(demoApplications);
  const [selectedId, setSelectedId] = useState(demoApplications[0].id);

  const selectedApplication = applications.find((item) => item.id === selectedId);
  const metrics = useMemo(
    () => ({
      total: applications.length,
      review: applications.filter((item) => item.status === "review").length,
      offer: applications.filter((item) => item.status === "offer").length,
      approved: applications.filter((item) => item.status === "approved").length
    }),
    [applications]
  );

  function updateApplication(id, patch) {
    setApplications((current) =>
      current.map((item) => (item.id === id ? { ...item, ...patch } : item))
    );
  }

  function moveSelected(status) {
    if (!selectedApplication) return;
    updateApplication(selectedApplication.id, { status });
  }

  return (
    <main className="min-h-screen bg-cream px-4 py-6 text-stoneDark sm:px-6 sm:py-8">
      <div className="mx-auto max-w-[1600px]">
        <header className="rounded-[2rem] bg-stoneDark p-6 text-white md:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/35">
                Operasyon Merkezi
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
                Başvuru Kanban Paneli
              </h1>
              <p className="mt-4 max-w-3xl leading-8 text-white/60">
                Müşteri başvurularını, teklifleri, ödemeleri, belgeleri ve
                teslim sürecini tek merkezden yönetin.
              </p>
            </div>
            <a
              href="/teklif-al"
              className="w-fit rounded-full bg-gold px-6 py-3 text-sm font-medium text-stoneDark"
            >
              Yeni başvuru akışını aç
            </a>
          </div>
        </header>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Metric icon={UserRound} label="Toplam başvuru" value={metrics.total} />
          <Metric icon={ReceiptText} label="İnceleniyor" value={metrics.review} />
          <Metric icon={Wallet} label="Teklif hazır" value={metrics.offer} />
          <Metric icon={Building2} label="Onaylandı" value={metrics.approved} />
        </section>

        <section className="mt-8 overflow-x-auto pb-4">
          <div className="grid min-w-[1120px] grid-cols-4 gap-5">
            {columns.map((column) => (
              <KanbanColumn
                key={column.id}
                column={column}
                items={applications.filter((item) => item.status === column.id)}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            ))}
          </div>
        </section>
      </div>

      {selectedApplication && (
        <ApplicationPanel
          application={selectedApplication}
          onClose={() => setSelectedId("")}
          onMove={moveSelected}
          onChange={(patch) => updateApplication(selectedApplication.id, patch)}
        />
      )}
    </main>
  );
}

function Metric({ icon: Icon, label, value }) {
  return (
    <div className="rounded-[2rem] border border-black/10 bg-white/65 p-5">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-stoneDark text-white">
        <Icon size={20} />
      </div>
      <p className="text-sm text-black/45">{label}</p>
      <p className="mt-1 text-3xl font-semibold">{value}</p>
    </div>
  );
}

function KanbanColumn({ column, items, selectedId, onSelect }) {
  return (
    <div className="rounded-[2rem] border border-black/10 bg-white/55 p-4">
      <div className="mb-4 flex items-center justify-between px-1">
        <h2 className="text-lg font-semibold">{column.title}</h2>
        <span className="rounded-full bg-cream px-3 py-1 text-xs text-black/50">
          {items.length}
        </span>
      </div>
      <div className="grid gap-3">
        {items.map((item) => (
          <ApplicationCard
            key={item.id}
            application={item}
            selected={selectedId === item.id}
            onClick={() => onSelect(item.id)}
          />
        ))}
      </div>
    </div>
  );
}

function ApplicationCard({ application, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-[1.5rem] border p-4 text-left shadow-sm ${
        selected
          ? "border-gold bg-stoneDark text-white"
          : "border-black/10 bg-cream hover:border-gold hover:bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{application.customer}</h3>
          <p className={selected ? "mt-1 text-sm text-white/55" : "mt-1 text-sm text-black/50"}>
            {application.service}
          </p>
          {application.applicationNo && (
            <p className={selected ? "mt-1 text-xs text-white/45" : "mt-1 text-xs text-black/40"}>
              {application.applicationNo} · {application.source}
            </p>
          )}
        </div>
        <span className={selected ? "rounded-full bg-white/10 px-3 py-1 text-xs text-white/70" : "rounded-full bg-white px-3 py-1 text-xs text-black/50"}>
          {application.date}
        </span>
      </div>
      <div className="mt-5 grid gap-2 text-sm">
        <CardLine icon={Phone} text={application.phone} selected={selected} />
        <CardLine icon={MapPin} text={application.location} selected={selected} />
        <CardLine icon={CalendarDays} text={application.budget} selected={selected} />
      </div>
    </button>
  );
}

function CardLine({ icon: Icon, text, selected }) {
  return (
    <div className={`flex items-center gap-2 ${selected ? "text-white/60" : "text-black/55"}`}>
      <Icon size={15} />
      <span>{text}</span>
    </div>
  );
}

function ApplicationPanel({ application, onClose, onMove, onChange }) {
  const [requests, setRequests] = useState(demoRequests);
  const [documents, setDocuments] = useState(demoDocuments);
  const [checklist, setChecklist] = useState(demoWarranty.checklist);
  const [serviceRequests, setServiceRequests] = useState(demoWarranty.serviceRequests);
  const whatsappPhone = application.phoneHref.replace(/\D/g, "");

  function updateRequest(id, patch) {
    setRequests((current) =>
      current.map((request) => (request.id === id ? { ...request, ...patch } : request))
    );
  }

  return (
    <aside className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto border-l border-black/10 bg-cream p-4 shadow-2xl shadow-black/20 sm:max-w-2xl sm:p-5">
      <div className="rounded-[2rem] bg-stoneDark p-6 text-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-white/45">{application.projectTitle}</p>
            <h2 className="mt-1 text-3xl font-semibold">{application.customer}</h2>
            <p className="mt-2 text-sm text-white/55">{application.service}</p>
            {application.applicationNo && (
              <p className="mt-2 text-sm text-white/55">
                Başvuru No: {application.applicationNo} · {application.source}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10"
            aria-label="Paneli kapat"
          >
            <X size={18} />
          </button>
        </div>
        <div className="mt-6 grid gap-3 text-sm text-white/65">
          <InfoLine icon={Phone} text={application.phone} />
          <InfoLine icon={Mail} text={application.email} />
          <InfoLine icon={MapPin} text={application.location} />
          <InfoLine icon={CalendarDays} text={application.date} />
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href={`tel:${application.phoneHref}`} className="inline-flex justify-center rounded-full bg-gold px-5 py-3 text-sm font-medium text-stoneDark">
            Hızlı ara
          </a>
          <a href={`https://wa.me/${whatsappPhone}`} target="_blank" rel="noreferrer" className="inline-flex justify-center rounded-full border border-white/15 px-5 py-3 text-sm text-white">
            WhatsApp ile iletişim
          </a>
        </div>
      </div>

      <PanelSection title="Başvuru detayları">
        <div className="grid gap-3">
          {application.answers.map(([label, value]) => (
            <InfoBox key={label} label={label} value={value} />
          ))}
        </div>
      </PanelSection>

      <PanelSection title="Teklif Oluştur">
        <div className="grid gap-3">
          <InputDemo label="Teklif başlığı" value={demoOffer.title} />
          <InputDemo label="Tek fiyat inputu (₺)" value={application.price || "1250000"} />
          <TextDemo label="Kapsam özeti" value={demoOffer.scope} />
          <TextDemo label="Dahil olan işler" value={demoOffer.included.join(", ")} />
          <TextDemo label="Hariç olan işler" value={demoOffer.excluded.join(", ")} />
          <InputDemo label="Geçerlilik tarihi" value={demoOffer.validUntil} />
          <TextDemo label="Admin iç notu" value={demoOffer.internalNote} />
          <div className="grid gap-3 sm:grid-cols-3">
            <button className="rounded-2xl bg-stoneDark px-4 py-3 text-sm font-medium text-white">
              Teklifi Hazırla
            </button>
            <button onClick={() => onMove("offer")} className="rounded-2xl bg-gold px-4 py-3 text-sm font-medium text-stoneDark">
              Teklif Hazır Olarak İşaretle
            </button>
            <button disabled className="rounded-2xl border border-black/10 px-4 py-3 text-sm text-black/40">
              PDF Önizleme
            </button>
          </div>
        </div>
      </PanelSection>

      <PanelSection title="Ödeme Planı">
        <div className="grid gap-3">
          <InfoBox label="Toplam teklif" value={application.budget} />
          <InfoBox label="Ödenen" value="₺350.000" />
          <InfoBox label="Kalan" value="₺900.000" />
          {demoPaymentPlan.map((payment) => (
            <InfoBox key={payment.title} label={payment.title} value={`${payment.amount} · ${payment.status}`} />
          ))}
          <button className="rounded-2xl bg-cream px-4 py-3 text-sm font-medium text-black/65">
            Ödeme kilometre taşı ekle / düzenle
          </button>
        </div>
      </PanelSection>

      <PanelSection title="Belgeler">
        <div className="grid gap-3">
          <button
            onClick={() =>
              setDocuments((current) => [
                ...current,
                { name: "Yeni Belge", type: "PDF", status: "İnceleniyor" }
              ])
            }
            className="rounded-2xl bg-stoneDark px-4 py-3 text-sm font-medium text-white"
          >
            Belge Yükle
          </button>
          {documents.map((doc) => (
            <div key={doc.name} className="rounded-2xl bg-cream p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium">{doc.name}</p>
                  <p className="text-sm text-black/45">{doc.type}</p>
                </div>
                <span className="text-sm text-black/55">{doc.status}</span>
              </div>
            </div>
          ))}
        </div>
      </PanelSection>

      <PanelSection title="Müşteri Talepleri">
        <div className="grid gap-3">
          {requests.map((request) => (
            <div key={request.id} className="rounded-2xl bg-cream p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-medium">{request.type} · {request.area}</p>
                  <p className="mt-1 text-sm text-black/60">{request.message}</p>
                  <p className="mt-1 text-xs text-black/40">{request.date}</p>
                </div>
                <span className="w-fit rounded-full bg-white px-3 py-1 text-xs text-black/55">
                  {request.status}
                </span>
              </div>
              <textarea
                value={request.internalNote}
                onChange={(event) => updateRequest(request.id, { internalNote: event.target.value })}
                className="mt-3 min-h-20 w-full rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm outline-none"
                placeholder="İç not"
              />
              <textarea
                value={request.response}
                onChange={(event) => updateRequest(request.id, { response: event.target.value })}
                className="mt-2 min-h-20 w-full rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm outline-none"
                placeholder="Yanıt"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {["İnceleniyor", "Yanıtlandı", "Tamamlandı"].map((status) => (
                  <button key={status} onClick={() => updateRequest(request.id, { status })} className="rounded-full bg-white px-3 py-2 text-xs text-black/60">
                    {status}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PanelSection>

      <PanelSection title="Teslim & Garanti">
        <div className="grid gap-3">
          <InfoBox label="Teslim tarihi" value={demoWarranty.deliveryDate} />
          <InfoBox label="Garanti başlangıcı" value={demoWarranty.warrantyStart} />
          <InfoBox label="Garanti bitişi" value={demoWarranty.warrantyEnd} />
          {checklist.map((item, index) => (
            <button
              key={item.label}
              onClick={() =>
                setChecklist((current) =>
                  current.map((entry, entryIndex) =>
                    entryIndex === index ? { ...entry, status: "Tamamlandı" } : entry
                  )
                )
              }
              className="flex items-center justify-between gap-3 rounded-2xl bg-cream p-4 text-left"
            >
              <span>{item.label}</span>
              <span className="rounded-full bg-white px-3 py-1 text-xs text-black/55">
                {item.status}
              </span>
            </button>
          ))}
          <div className="grid gap-2 sm:grid-cols-3">
            <button className="rounded-2xl bg-stoneDark px-4 py-3 text-sm text-white">Teslim Tamamlandı</button>
            <button className="rounded-2xl bg-stoneDark px-4 py-3 text-sm text-white">Garanti Sürecini Başlat</button>
            <button
              onClick={() =>
                setServiceRequests((current) =>
                  current.map((request) => ({ ...request, status: "Tamamlandı" }))
                )
              }
              className="rounded-2xl bg-gold px-4 py-3 text-sm text-stoneDark"
            >
              Servis Talebini Tamamlandı İşaretle
            </button>
          </div>
          {serviceRequests.map((request) => (
            <InfoBox key={request.id} label={`${request.area} · ${request.subject}`} value={`${request.description} · ${request.status}`} />
          ))}
        </div>
      </PanelSection>
    </aside>
  );
}

function PanelSection({ title, children }) {
  return (
    <section className="mt-5 rounded-[2rem] border border-black/10 bg-white/70 p-5">
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function InfoBox({ label, value }) {
  return (
    <div className="rounded-2xl bg-cream p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-black/35">{label}</p>
      <p className="mt-1 text-black/70">{value}</p>
    </div>
  );
}

function InputDemo({ label, value }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-black/60">{label}</span>
      <input defaultValue={value} className="rounded-2xl border border-black/10 bg-cream px-4 py-3 outline-none" />
    </label>
  );
}

function TextDemo({ label, value }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-black/60">{label}</span>
      <textarea defaultValue={value} className="min-h-24 rounded-2xl border border-black/10 bg-cream px-4 py-3 outline-none" />
    </label>
  );
}

function InfoLine({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={16} />
      <span>{text}</span>
    </div>
  );
}
