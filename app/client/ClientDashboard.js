"use client";

import { useMemo, useState } from "react";
import {
  Camera,
  CheckCircle2,
  Clock3,
  CreditCard,
  FileText,
  MessageCircle,
  Phone,
  ShieldCheck
} from "lucide-react";
import {
  demoCustomer,
  demoDocuments,
  demoGallery,
  demoOffer,
  demoPaymentPlan,
  demoProject,
  demoRequests,
  demoWarranty,
  demoTimeline
} from "../../lib/demoData";

const areaFilters = ["Tümü", ...demoProject.areas];

export default function ClientDashboard() {
  const [galleryFilter, setGalleryFilter] = useState("Tümü");
  const [approved, setApproved] = useState(false);
  const [revisionOpen, setRevisionOpen] = useState(false);
  const [revisionNote, setRevisionNote] = useState("");
  const [revisionSent, setRevisionSent] = useState(false);
  const [visualMode, setVisualMode] = useState("gallery");
  const [requests, setRequests] = useState(demoRequests);
  const [requestType, setRequestType] = useState("Revize Talebi");
  const [requestArea, setRequestArea] = useState("Genel");
  const [requestMessage, setRequestMessage] = useState("");
  const [requestSent, setRequestSent] = useState(false);
  const [serviceSubject, setServiceSubject] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [serviceSent, setServiceSent] = useState(false);

  const filteredGallery = useMemo(() => {
    if (galleryFilter === "Tümü") return demoGallery;
    return demoGallery.filter((item) => item.area === galleryFilter);
  }, [galleryFilter]);

  return (
    <main className="min-h-screen bg-cream px-6 py-8 text-stoneDark">
      <div className="mx-auto max-w-7xl">
        <ProjectHero />

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Timeline />
          <OfferSection
            approved={approved}
            setApproved={setApproved}
            revisionOpen={revisionOpen}
            setRevisionOpen={setRevisionOpen}
            revisionNote={revisionNote}
            setRevisionNote={setRevisionNote}
            revisionSent={revisionSent}
            setRevisionSent={setRevisionSent}
          />
        </section>

        <section className="mt-8">
          <VisualProgress
            filter={galleryFilter}
            setFilter={setGalleryFilter}
            mode={visualMode}
            setMode={setVisualMode}
            items={filteredGallery}
          />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr_0.8fr]">
          <Payments />
          <Documents />
          <Contact />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <Requests
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
                  customer: demoCustomer.name,
                  type: requestType,
                  area: requestArea,
                  message: requestMessage || "Müşteri yeni talep oluşturdu.",
                  status: "Açık",
                  internalNote: "",
                  response: ""
                },
                ...current
              ]);
              setRequestSent(true);
              setRequestMessage("");
            }}
          />
          <HandoverWarranty
            serviceSubject={serviceSubject}
            setServiceSubject={setServiceSubject}
            serviceDescription={serviceDescription}
            setServiceDescription={setServiceDescription}
            serviceSent={serviceSent}
            setServiceSent={setServiceSent}
          />
        </section>
      </div>
    </main>
  );
}

function ProjectHero() {
  return (
    <header className="rounded-[2rem] bg-stoneDark p-8 text-white md:p-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-white/35">
            Müşteri Proje Paneli
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl">
            {demoProject.title}
          </h1>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-gold px-4 py-2 text-sm font-medium text-stoneDark">
              {demoProject.status.client}
            </span>
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/70">
              Tahmini teslim: {demoProject.estimatedDelivery}
            </span>
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/70">
              {demoCustomer.name}
            </span>
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/70">
              Başvuru No: {demoProject.applicationNo}
            </span>
          </div>
        </div>

        <a
          href="#teklif"
          className="inline-flex justify-center rounded-full bg-white px-7 py-4 text-sm font-medium text-stoneDark"
        >
          Teklifi İncele
        </a>
      </div>

      <div className="mt-10">
        <div className="mb-3 flex items-center justify-between text-sm text-white/55">
          <span>İlerleme</span>
          <span>%{demoProject.progress}</span>
        </div>
        <div className="h-3 rounded-full bg-white/10">
          <div
            className="h-3 rounded-full bg-gold"
            style={{ width: `${demoProject.progress}%` }}
          />
        </div>
        <p className="mt-4 text-white/60">Sıradaki adım: {demoProject.nextStep}</p>
      </div>
    </header>
  );
}

function Timeline() {
  return (
    <section className="rounded-[2rem] border border-black/10 bg-white/70 p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-black/35">
            Güncellemeler
          </p>
          <h2 className="mt-2 text-3xl font-semibold">Son saha hareketleri</h2>
        </div>
        <span className="rounded-full bg-stoneDark px-4 py-2 text-sm text-white">
          {demoTimeline.length} kayıt
        </span>
      </div>

      <div className="grid gap-4">
        {demoTimeline.map((update) => (
          <article key={update.id} className="rounded-[1.5rem] bg-cream p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm text-black/45">
                  <Clock3 size={15} />
                  {update.date} {update.time} - {update.area}
                </div>
                <p className="mt-2 text-lg font-medium">{update.description}</p>
              </div>
              <div className="flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-black/55">
                <Camera size={16} />
                {update.photos} fotoğraf
              </div>
            </div>
            <span className="mt-4 inline-flex rounded-full bg-white px-3 py-1 text-xs text-black/50">
              {update.status}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}

function VisualProgress({ filter, setFilter, mode, setMode, items }) {
  return (
    <section className="rounded-[2rem] border border-black/10 bg-white/70 p-6">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-black/35">
            Görsel İlerleme
          </p>
          <h2 className="mt-2 text-3xl font-semibold">Fotoğraf takip alanı</h2>
          <p className="mt-3 max-w-2xl leading-7 text-black/60">
            Yüklenen görseller, sahadaki ilerlemeyi tarih ve alan bazlı takip
            etmenizi sağlar.
          </p>
        </div>
        <div className="flex gap-2">
          {["gallery", "timeline"].map((item) => (
            <button
              key={item}
              onClick={() => setMode(item)}
              className={`rounded-full px-4 py-2 text-sm ${
                mode === item ? "bg-stoneDark text-white" : "bg-cream text-black/60"
              }`}
            >
              {item === "gallery" ? "Galeri" : "Zaman Akışı"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {areaFilters.map((area) => (
          <button
            key={area}
            onClick={() => setFilter(area)}
            className={`rounded-full px-4 py-2 text-sm ${
              filter === area
                ? "bg-stoneDark text-white"
                : "bg-cream text-black/60 hover:bg-stoneDark hover:text-white"
            }`}
          >
            {area}
          </button>
        ))}
      </div>

      <div className={mode === "gallery" ? "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" : "mt-6 grid gap-3"}>
        {items.map((item) => (
          <article
            key={item.id}
            className={`rounded-[1.5rem] bg-stoneDark p-5 text-white ${
              mode === "gallery" ? "aspect-[4/3]" : ""
            }`}
          >
            <div className="flex h-full flex-col justify-between gap-6">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">
                  {item.area}
                </span>
                <span className="rounded-full bg-gold px-3 py-1 text-xs text-stoneDark">
                  {item.stage}
                </span>
              </div>
              <div>
                <p className="text-sm text-white/45">
                  {item.date} {item.time}
                </p>
                <h3 className="mt-1 text-xl font-semibold">{item.note}</h3>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function OfferSection(props) {
  const {
    approved,
    setApproved,
    revisionOpen,
    setRevisionOpen,
    revisionNote,
    setRevisionNote,
    revisionSent,
    setRevisionSent
  } = props;

  return (
    <section id="teklif" className="rounded-[2rem] border border-black/10 bg-white/70 p-6">
      <p className="text-sm uppercase tracking-[0.25em] text-black/35">Teklif</p>
      <h2 className="mt-2 text-3xl font-semibold">Teklifiniz Hazır</h2>
      <p className="mt-4 text-5xl font-semibold">{demoOffer.price}</p>
      <p className="mt-4 leading-7 text-black/60">{demoOffer.scope}</p>
      <p className="mt-3 text-sm text-black/45">Geçerlilik: {demoOffer.validUntil}</p>

      <OfferList title="Dahil olan işler" items={demoOffer.included} />
      <OfferList title="Hariç olan işler" items={demoOffer.excluded} muted />

      {approved && (
        <div className="mt-6 rounded-2xl bg-cream p-5 text-black/70">
          Teklif onaylandı. Ekibimiz sözleşme ve başlangıç planı için sizinle
          iletişime geçecek.
        </div>
      )}

      {revisionSent && (
        <div className="mt-6 rounded-2xl bg-cream p-5 text-black/70">
          Revize talebiniz alındı.
        </div>
      )}

      {!approved && !revisionSent && (
        <div className="mt-6 grid gap-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              onClick={() => setApproved(true)}
              className="rounded-2xl bg-gold px-5 py-4 font-medium text-stoneDark"
            >
              Teklifi Onayla
            </button>
            <button
              onClick={() => setRevisionOpen(true)}
              className="rounded-2xl border border-black/10 px-5 py-4 font-medium"
            >
              Revize Talebi Gönder
            </button>
          </div>

          {revisionOpen && (
            <div className="rounded-2xl bg-cream p-4">
              <textarea
                value={revisionNote}
                onChange={(event) => setRevisionNote(event.target.value)}
                className="min-h-28 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none"
                placeholder="Revize talebinizi kısaca yazın"
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
      )}
    </section>
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
            <span className="text-sm text-black/65">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Payments() {
  return (
    <section className="rounded-[2rem] border border-black/10 bg-white/70 p-6">
      <div className="mb-5 flex items-center gap-3">
        <CreditCard />
        <h2 className="text-2xl font-semibold">Ödemeler</h2>
      </div>
      <div className="grid gap-3">
        <PaymentLine label="Toplam teklif" value={demoProject.offer} />
        <PaymentLine label="Ödenen" value={demoProject.paid} />
        <PaymentLine label="Kalan" value={demoProject.remaining} />
        <PaymentLine label="Sıradaki ödeme" value={demoProject.nextStep} />
      </div>

      <div className="mt-5 grid gap-3">
        {demoPaymentPlan.map((payment) => (
          <div key={payment.title} className="rounded-2xl bg-cream p-4">
            <div className="flex items-center justify-between gap-3">
              <strong>{payment.title}</strong>
              <span className="rounded-full bg-white px-3 py-1 text-xs text-black/55">
                {payment.status}
              </span>
            </div>
            <p className="mt-2 text-sm text-black/55">
              {payment.amount} · {payment.dueDate}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-5 rounded-2xl bg-cream p-4 text-sm text-black/60">
        Ödeme planı proje kapsamı ve onaylanan teklif üzerinden güncellenir.
      </p>
    </section>
  );
}

function Documents() {
  return (
    <section className="rounded-[2rem] border border-black/10 bg-white/70 p-6">
      <div className="mb-5 flex items-center gap-3">
        <FileText />
        <h2 className="text-2xl font-semibold">Belgeler</h2>
      </div>
      <div className="grid gap-3">
        {demoDocuments.map((doc) => (
          <div key={doc.name} className="rounded-2xl bg-cream p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="font-medium">{doc.name}</span>
                <p className="mt-1 text-sm text-black/45">{doc.type}</p>
              </div>
              <span className="text-sm text-black/50">{doc.status}</span>
            </div>
            <button className="mt-4 rounded-full bg-white px-4 py-2 text-sm text-black/60">
              Görüntüle
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="rounded-[2rem] border border-black/10 bg-stoneDark p-6 text-white">
      <div className="mb-5 flex items-center gap-3">
        <ShieldCheck />
        <h2 className="text-2xl font-semibold">İletişim</h2>
      </div>
      <p className="leading-7 text-white/60">
        Proje danışmanınız revize, onay ve saha sorularınız için ulaşılabilir.
      </p>
      <div className="mt-6 grid gap-3">
        <a
          href={`https://wa.me/${demoCustomer.phoneHref.replace(/\D/g, "")}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gold px-5 py-4 font-medium text-stoneDark"
        >
          <MessageCircle size={19} />
          WhatsApp
        </a>
        <a
          href={`tel:${demoCustomer.phoneHref}`}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 px-5 py-4 font-medium text-white"
        >
          <Phone size={19} />
          Telefon
        </a>
      </div>
    </section>
  );
}

function Requests(props) {
  const {
    requests,
    requestType,
    setRequestType,
    requestArea,
    setRequestArea,
    requestMessage,
    setRequestMessage,
    requestSent,
    onSubmit
  } = props;
  const requestTypes = ["Revize Talebi", "Ek İş Talebi", "Soru", "Sorun Bildirimi"];
  const requestAreas = ["Genel", ...demoProject.areas, "Ödeme", "Belgeler"];

  return (
    <section className="rounded-[2rem] border border-black/10 bg-white/70 p-6">
      <p className="text-sm uppercase tracking-[0.25em] text-black/35">
        Talep ve Mesajlar
      </p>
      <h2 className="mt-2 text-3xl font-semibold">Kontrollü iletişim alanı</h2>

      <div className="mt-6 grid gap-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <SelectDemo label="Talep tipi" value={requestType} onChange={setRequestType} items={requestTypes} />
          <SelectDemo label="İlgili alan" value={requestArea} onChange={setRequestArea} items={requestAreas} />
        </div>
        <textarea
          value={requestMessage}
          onChange={(event) => setRequestMessage(event.target.value)}
          className="min-h-28 rounded-2xl border border-black/10 bg-cream px-4 py-3 outline-none"
          placeholder="Talebinizi veya sorunuzu kısa ve net şekilde yazın."
        />
        <button
          onClick={onSubmit}
          className="rounded-2xl bg-stoneDark px-5 py-4 font-medium text-white"
        >
          Talebi Gönder
        </button>
        {requestSent && (
          <div className="rounded-2xl bg-cream p-4 text-sm text-black/65">
            Talebiniz alındı. Ekibimiz değerlendirdikten sonra sizinle iletişime geçecek.
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-3">
        {requests.map((request) => (
          <article key={request.id} className="rounded-2xl bg-cream p-4">
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
          </article>
        ))}
      </div>
    </section>
  );
}

function HandoverWarranty(props) {
  const {
    serviceSubject,
    setServiceSubject,
    serviceDescription,
    setServiceDescription,
    serviceSent,
    setServiceSent
  } = props;

  return (
    <section className="rounded-[2rem] border border-black/10 bg-white/70 p-6">
      <p className="text-sm uppercase tracking-[0.25em] text-black/35">
        Teslim ve Garanti
      </p>
      <h2 className="mt-2 text-3xl font-semibold">Teslim güvence alanı</h2>

      <div className="mt-6 grid gap-3">
        <PaymentLine label="Durum" value={demoWarranty.completionStatus} />
        <PaymentLine label="Teslim tarihi" value={demoWarranty.deliveryDate} />
        <PaymentLine label="Garanti başlangıcı" value={demoWarranty.warrantyStart} />
        <PaymentLine label="Garanti bitişi" value={demoWarranty.warrantyEnd} />
        <PaymentLine label="Sorumlu" value={demoWarranty.responsible} />
      </div>

      <div className="mt-6 grid gap-3">
        {demoWarranty.checklist.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between gap-4 rounded-2xl bg-cream p-4"
          >
            <span className="text-sm text-black/70">{item.label}</span>
            <span className="rounded-full bg-white px-3 py-1 text-xs text-black/55">
              {item.status}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button className="rounded-2xl border border-black/10 px-5 py-4 font-medium">
          Teslim Tutanağını Görüntüle
        </button>
        <button
          onClick={() => setServiceSent(false)}
          className="rounded-2xl bg-stoneDark px-5 py-4 font-medium text-white"
        >
          Servis Talebi Oluştur
        </button>
      </div>

      <div className="mt-5 rounded-2xl bg-cream p-4">
        <SelectDemo
          label="Alan"
          value={serviceSubject}
          onChange={setServiceSubject}
          items={["", ...demoProject.areas]}
        />
        <input
          value={serviceSubject}
          onChange={(event) => setServiceSubject(event.target.value)}
          className="mt-3 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none"
          placeholder="Konu"
        />
        <textarea
          value={serviceDescription}
          onChange={(event) => setServiceDescription(event.target.value)}
          className="mt-3 min-h-24 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none"
          placeholder="Açıklama"
        />
        <button
          onClick={() => setServiceSent(true)}
          className="mt-3 rounded-2xl bg-gold px-5 py-3 text-sm font-medium text-stoneDark"
        >
          Servis Talebi Gönder
        </button>
        {serviceSent && (
          <p className="mt-3 text-sm text-black/60">Servis talebiniz alındı.</p>
        )}
      </div>
    </section>
  );
}

function SelectDemo({ label, value, onChange, items }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-black/60">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-2xl border border-black/10 bg-cream px-4 py-3 outline-none"
      >
        {items.map((item) => (
          <option key={item} value={item}>
            {item || "Seçiniz"}
          </option>
        ))}
      </select>
    </label>
  );
}

function PaymentLine({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-cream p-4">
      <span className="text-black/55">{label}</span>
      <strong className="text-right">{value}</strong>
    </div>
  );
}
