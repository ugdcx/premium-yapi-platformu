"use client";

import {
  AlertCircle,
  CalendarDays,
  Camera,
  CheckCircle2,
  ClipboardList,
  FileText,
  MapPin,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  WalletCards
} from "lucide-react";
import { projects } from "../../../../../lib/data/mockData";
import { formatCurrency, formatDate, formatDateTime } from "../../../../../lib/helpers/format";
import { createWhatsAppLink } from "../../../../../lib/helpers/whatsapp";

const authorizedPerson = "BLAAG Proje Ekibi";

export default function ClientProjectTrackingPage({ params }) {
  const project = projects.find(
    (item) => item.slug === params.slug && item.clientToken === params.token
  );

  if (!project) return <NotFoundProject />;

  const activeWorkItem = project.workItems.find((item) => item.status === "Uygulamada");
  const completedCount = project.workItems.filter((item) => item.status === "Tamamlandı").length;
  const remainingCount = project.workItems.filter((item) => item.status !== "Tamamlandı").length;
  const lastPhoto = [...project.photos].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

  return (
    <main className="min-h-screen bg-cream px-4 py-5 text-stoneDark sm:px-6 sm:py-8">
      <div className="mx-auto max-w-7xl">
        <ClientProjectHeader project={project} lastPhoto={lastPhoto} />
        <ProjectProgressSummary
          project={project}
          activeWorkItem={activeWorkItem}
          completedCount={completedCount}
          remainingCount={remainingCount}
          lastPhoto={lastPhoto}
        />

        <div className="mt-6 grid gap-6">
          <Panel title="Genel Durum" icon={ShieldCheck}>
            <div className="grid gap-3 md:grid-cols-3">
              <InfoTile label="Proje durumu" value={toClientStatus(project.status)} />
              <InfoTile label="Kapsam" value="Zemin, Boya, Banyo, Mutfak, Dış cephe" />
              <InfoTile label="Yetkili kişi" value={authorizedPerson} />
            </div>
          </Panel>

          <PhotoTimeline photos={project.photos} workItems={project.workItems} />
          <WorkItemsList items={project.workItems} />
          <PaymentPlan project={project} />
          <MaterialList materials={project.materials} />
          <DocumentList documents={project.documents} />
          <ProjectNotes notes={project.notes} />
        </div>
      </div>
    </main>
  );
}

function ClientProjectHeader({ project, lastPhoto }) {
  return (
    <header className="rounded-[2rem] bg-stoneDark p-5 text-white sm:p-7 md:p-10">
      <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-white/35">
            BLAAG Construction and Architecture
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-white/65">
            Kayıt olmadan, size özel bağlantı ile projenizin güncel durumunu takip edebilirsiniz.
          </p>
        </div>

        <a
          href={createWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-gold px-6 py-4 font-semibold text-stoneDark"
        >
          <MessageCircle size={19} />
          WhatsApp
        </a>
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <HeaderInfo icon={ClipboardList} label="Müşteri" value={project.customerName} />
        <HeaderInfo icon={MapPin} label="Lokasyon" value={project.location} />
        <HeaderInfo icon={ShieldCheck} label="Durum" value={toClientStatus(project.status)} />
        <HeaderInfo icon={CalendarDays} label="Başlangıç" value={formatDate(project.startDate)} />
        <HeaderInfo icon={CalendarDays} label="Tahmini teslim" value={formatDate(project.estimatedEndDate)} />
        <HeaderInfo icon={Camera} label="Son güncelleme" value={lastPhoto ? formatDateTime(lastPhoto.createdAt) : "Henüz yok"} />
        <HeaderInfo icon={CheckCircle2} label="Yetkili" value={authorizedPerson} />
        <HeaderInfo icon={MessageCircle} label="İletişim" value="BLAAG ekibi" />
      </div>
    </header>
  );
}

function ProjectProgressSummary({ project, activeWorkItem, completedCount, remainingCount, lastPhoto }) {
  return (
    <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
      <SummaryCard label="İlerleme" value={`%${project.progress}`} icon={ShieldCheck} />
      <SummaryCard label="Aktif iş kalemi" value={activeWorkItem?.title || "Planlama"} icon={ClipboardList} />
      <SummaryCard label="Tamamlanan" value={completedCount} icon={CheckCircle2} />
      <SummaryCard label="Kalan iş" value={remainingCount} icon={AlertCircle} />
      <SummaryCard label="Son fotoğraf" value={lastPhoto ? formatDate(lastPhoto.createdAt) : "Yok"} icon={Camera} />
      <SummaryCard label="Kalan ödeme" value={formatCurrency(project.remainingAmount)} icon={WalletCards} />
    </section>
  );
}

function PhotoTimeline({ photos, workItems }) {
  const grouped = groupByDate(photos);

  return (
    <Panel title="Fotoğraflı İlerleme" icon={Camera}>
      {!photos.length ? (
        <EmptyState text="Henüz fotoğraf güncellemesi yok." />
      ) : (
        <div className="grid gap-5">
          {Object.entries(grouped).map(([date, items]) => (
            <section key={date} className="rounded-[1.5rem] bg-cream p-4">
              <h3 className="text-xl font-semibold">{date}</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((photo) => (
                  <article key={photo.id} className="overflow-hidden rounded-2xl border border-border bg-surface">
                    <div className="flex aspect-square items-center justify-center bg-soft">
                      <Camera className="text-gold" size={34} />
                    </div>
                    <div className="p-4">
                      <span className="rounded-full bg-stoneDark px-3 py-1 text-xs font-semibold text-white">
                        {photo.stage === "Süreç" ? "Devam" : photo.stage}
                      </span>
                      <p className="mt-3 font-semibold">{photo.caption}</p>
                      <p className="mt-2 text-sm text-muted">
                        Yükleyen: {photo.uploadedBy === "worker" ? "Usta" : "Admin"}
                      </p>
                      <p className="mt-1 text-sm text-muted">
                        İş kalemi: {workItems.find((item) => item.id === photo.workItemId)?.title || "Genel"}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </Panel>
  );
}

function WorkItemsList({ items }) {
  return (
    <Panel title="Yapılacak İşler" icon={ClipboardList}>
      <div className="grid gap-3">
        {items.map((item) => (
          <article key={item.id} className="rounded-2xl border border-border bg-cream p-4">
            <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-start">
              <div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 leading-7 text-muted">{item.description}</p>
              </div>
              <StatusBadge status={toWorkStatus(item.status)} />
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <InfoTile label="Planlanan tarih" value={formatDate(item.plannedDate)} />
              <InfoTile label="Tamamlanma tarihi" value={item.completedDate ? formatDate(item.completedDate) : "Bekliyor"} />
              <InfoTile label="Not" value={item.notes || "Not yok"} />
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}

function PaymentPlan({ project }) {
  return (
    <Panel title="Ödeme Planı" icon={WalletCards}>
      <div className="grid gap-3 md:grid-cols-3">
        <InfoTile label="Toplam teklif" value={formatCurrency(project.totalAmount)} />
        <InfoTile label="Ödenen" value={formatCurrency(project.paidAmount)} />
        <InfoTile label="Kalan" value={formatCurrency(project.remainingAmount)} />
      </div>
      <div className="mt-5 grid gap-3">
        {project.payments.map((payment) => (
          <article key={payment.id} className="grid gap-3 rounded-2xl border border-border bg-cream p-4 md:grid-cols-[1fr_auto_auto] md:items-center">
            <div>
              <h3 className="font-semibold">{payment.title}</h3>
              <p className="mt-1 text-sm text-muted">Ödeme tarihi: {payment.paidDate ? formatDate(payment.paidDate) : formatDate(payment.dueDate)}</p>
            </div>
            <strong>{formatCurrency(payment.amount)}</strong>
            <StatusBadge status={payment.status} />
          </article>
        ))}
      </div>
    </Panel>
  );
}

function MaterialList({ materials }) {
  return (
    <Panel title="Malzeme Listesi" icon={PackageCheck}>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {materials.map((material) => (
          <article key={material.id} className="rounded-2xl border border-border bg-cream p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-black/35">{material.category}</p>
            <h3 className="mt-2 text-xl font-semibold">{material.brand} {material.model}</h3>
            <p className="mt-2 text-sm text-muted">{material.quantity} {material.unit}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <StatusBadge status={material.status} />
              {material.documentUrl && <a href={material.documentUrl} className="text-sm font-semibold">Belge</a>}
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}

function DocumentList({ documents }) {
  return (
    <Panel title="Belgeler / Faturalar" icon={FileText}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {documents.map((document) => (
          <a key={document.id} href={document.url} className="rounded-2xl border border-border bg-cream p-4">
            <FileText className="text-gold" size={24} />
            <h3 className="mt-3 font-semibold">{document.title}</h3>
            <p className="mt-1 text-sm text-muted">{document.type} · {formatDate(document.createdAt)}</p>
          </a>
        ))}
      </div>
    </Panel>
  );
}

function ProjectNotes({ notes }) {
  const clientNotes = notes.filter((note) => note.visibility === "client");

  return (
    <Panel title="Notlar" icon={ShieldCheck}>
      {!clientNotes.length ? (
        <EmptyState text="Müşteriye açık not bulunmuyor." />
      ) : (
        <div className="grid gap-3">
          {clientNotes.map((note) => (
            <article key={note.id} className="rounded-2xl border border-border bg-cream p-4">
              <p className="text-sm text-muted">{formatDateTime(note.createdAt)}</p>
              <p className="mt-2 font-medium">{note.content}</p>
            </article>
          ))}
        </div>
      )}
    </Panel>
  );
}

function NotFoundProject() {
  return (
    <main className="min-h-screen bg-cream px-4 py-8 text-stoneDark sm:px-6">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-2xl items-center">
        <div className="w-full rounded-[2rem] border border-border bg-surface p-6 text-center shadow-card sm:p-10">
          <AlertCircle className="mx-auto text-gold" size={42} />
          <h1 className="mt-6 text-4xl font-semibold">Proje bulunamadı</h1>
          <p className="mt-4 leading-7 text-muted">
            Bu bağlantı hatalı veya süresi dolmuş olabilir. Lütfen BLAAG ekibiyle iletişime geçin.
          </p>
          <a href="/" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-stoneDark px-6 py-3 font-semibold text-white">
            Ana sayfaya dön
          </a>
        </div>
      </section>
    </main>
  );
}

function Panel({ title, icon: Icon, children }) {
  return (
    <section className="rounded-[2rem] border border-border bg-surface p-5 shadow-card sm:p-6">
      <div className="flex items-center gap-3">
        <Icon className="text-gold" size={24} />
        <h2 className="text-2xl font-semibold sm:text-3xl">{title}</h2>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function SummaryCard({ label, value, icon: Icon }) {
  return (
    <article className="rounded-[1.5rem] border border-border bg-surface p-5 shadow-card">
      <Icon className="text-gold" size={22} />
      <p className="mt-4 text-sm text-muted">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </article>
  );
}

function HeaderInfo({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <Icon className="text-gold" size={20} />
      <p className="mt-3 text-xs uppercase tracking-[0.16em] text-white/35">{label}</p>
      <p className="mt-1 font-semibold text-white">{value}</p>
    </div>
  );
}

function InfoTile({ label, value }) {
  return (
    <div className="rounded-2xl border border-border bg-cream p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-black/35">{label}</p>
      <p className="mt-2 font-semibold">{value}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span className="inline-flex w-fit rounded-full bg-stoneDark px-3 py-1 text-xs font-semibold text-white">
      {status}
    </span>
  );
}

function EmptyState({ text }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-cream p-5 text-muted">
      {text}
    </div>
  );
}

function groupByDate(items) {
  return items.reduce((groups, item) => {
    const key = formatDate(item.createdAt);
    return { ...groups, [key]: [...(groups[key] || []), item] };
  }, {});
}

function toClientStatus(status) {
  if (status === "Uygulamada") return "Devam Ediyor";
  if (status === "Planlama") return "Planlama";
  if (status === "Tamamlandı") return "Tamamlandı";
  return status;
}

function toWorkStatus(status) {
  const map = {
    Planlandı: "Bekliyor",
    Uygulamada: "Devam Ediyor",
    Tamamlandı: "Tamamlandı",
    Revize: "Sorun Var"
  };
  return map[status] || status;
}
