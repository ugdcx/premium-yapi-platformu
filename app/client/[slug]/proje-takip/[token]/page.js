"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  Camera,
  ClipboardList,
  FileText,
  MapPin,
  PackageCheck,
  ShieldCheck,
  WalletCards
} from "lucide-react";
import { projects } from "../../../../../lib/data/mockData";
import {
  formatCurrency,
  formatDate,
  formatDateTime
} from "../../../../../lib/helpers/format";
import { statusChipClass } from "../../../../../lib/designSystem";
import { getApprovedProjectUpdates } from "../../../../../lib/localStorageRecords";

export default function ClientProjectTrackingPage({ params }) {
  const project = projects.find(
    (item) => item.slug === params.slug && item.clientToken === params.token
  );
  const [approvedUploads, setApprovedUploads] = useState([]);

  useEffect(() => {
    if (!project?.slug) return;
    setApprovedUploads(getApprovedProjectUpdates(project.slug));
  }, [project?.slug]);

  if (!project) return <NotFoundProject />;

  const visiblePhotos = project.photos.filter(
    (photo) => photo.status === "approved" && photo.visible_to_customer
  );
  const timelineRecords = [
    ...visiblePhotos.map((photo) => ({
      id: photo.id,
      stage: photo.stage,
      title: photo.caption,
      note: photo.caption,
      createdAt: photo.createdAt,
      photoCount: 1,
      photos: [],
      source: "mock"
    })),
    ...approvedUploads.map((upload) => ({
      id: upload.id,
      stage: upload.workItem,
      title: upload.workItem,
      note: upload.adminNote || upload.note || "Şirket tarafından onaylanan saha kaydı.",
      createdAt: upload.approvedAt || upload.createdAt,
      photoCount: upload.photos?.length || 0,
      photos: upload.photos || [],
      source: "worker"
    }))
  ].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-4 py-5 text-[#111111] sm:px-6 sm:py-8">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-[2rem] border border-black/10 bg-black p-5 text-white sm:p-7 md:p-10">
          <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/42">
                BLAGG Remote
              </p>
              <h1 className="mt-5 text-[2.8rem] leading-[0.98] md:text-[4rem]">
                {project.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/62">
                Onaylanmış fotoğraflar, ödeme planı, belgeler ve görünür saha kayıtları bu bağlantıda toplanır.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <Metric label="Müşteri" value={project.customerName} />
              <Metric label="Lokasyon" value={project.location} />
            </div>
          </div>
        </header>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Durum" value={toClientStatus(project.status)} icon={ShieldCheck} />
          <MetricCard label="İlerleme" value={`%${project.progress}`} icon={ClipboardList} />
          <MetricCard label="Kalan ödeme" value={formatCurrency(project.remainingAmount)} icon={WalletCards} />
          <MetricCard label="Son kayıt" value={timelineRecords[0] ? formatDate(timelineRecords[0].createdAt) : "Henüz yok"} icon={Camera} />
        </section>

        <div className="mt-6 grid gap-6">
          <Panel title="Genel Durum" icon={ShieldCheck}>
            <div className="grid gap-3 md:grid-cols-3">
              <InfoTile label="Durum" value={toClientStatus(project.status)} />
              <InfoTile label="Başlangıç" value={formatDate(project.startDate)} />
              <InfoTile label="Tahmini teslim" value={formatDate(project.estimatedEndDate)} />
            </div>
          </Panel>

          <Panel title="Şirket tarafından onaylanan saha kayıtları" icon={Camera}>
            {timelineRecords.length ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {timelineRecords.map((record) => (
                  <article
                    key={record.id}
                    className="overflow-hidden rounded-[1.5rem] border border-black/10 bg-white"
                  >
                    <div className="flex aspect-square items-center justify-center border-b border-black/10 bg-[#F3F3F1]">
                      {record.photos?.[0]?.url ? (
                        <img
                          src={record.photos[0].url}
                          alt={record.photos[0].name || "Onaylı saha kaydı"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Camera className="text-black/46" size={28} />
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex flex-wrap gap-2">
                        <span className={statusChipClass(record.stage)}>{record.stage}</span>
                        <span className={statusChipClass("Onaylandı")}>BLAGG onaylı</span>
                      </div>
                      <p className="mt-3 text-sm font-medium">{record.note}</p>
                      <p className="mt-2 text-sm text-black/54">
                        {formatDateTime(record.createdAt)}
                      </p>
                      {record.photoCount > 1 ? (
                        <p className="mt-2 text-xs text-black/42">
                          {record.photoCount} fotoğraf şirket kontrolünden geçti.
                        </p>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState text="Henüz müşteriye açık fotoğraf kaydı yok." />
            )}
          </Panel>

          <Panel title="İş Kalemleri" icon={ClipboardList}>
            <div className="grid gap-3">
              {project.workItems.map((item) => (
                <article
                  key={item.id}
                  className="rounded-[1.25rem] border border-black/10 bg-[#F7F7F5] p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-black/58">
                        {item.description}
                      </p>
                    </div>
                    <span className={statusChipClass(toWorkStatus(item.status))}>
                      {toWorkStatus(item.status)}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </Panel>

          <Panel title="Ödeme Planı" icon={WalletCards}>
            <div className="grid gap-3 md:grid-cols-3">
              <InfoTile label="Toplam teklif" value={formatCurrency(project.totalAmount)} />
              <InfoTile label="Ödenen" value={formatCurrency(project.paidAmount)} />
              <InfoTile label="Kalan" value={formatCurrency(project.remainingAmount)} />
            </div>
            <div className="mt-5 grid gap-3">
              {project.payments.map((payment) => (
                <article
                  key={payment.id}
                  className="grid gap-3 rounded-[1.25rem] border border-black/10 bg-[#F7F7F5] p-4 md:grid-cols-[1fr_auto_auto] md:items-center"
                >
                  <div>
                    <h3 className="text-sm font-medium">{payment.title}</h3>
                    <p className="mt-1 text-sm text-black/54">
                      {payment.paidDate ? formatDate(payment.paidDate) : formatDate(payment.dueDate)}
                    </p>
                  </div>
                  <strong className="text-sm">{formatCurrency(payment.amount)}</strong>
                  <span className={statusChipClass(payment.status)}>{payment.status}</span>
                </article>
              ))}
            </div>
          </Panel>

          <Panel title="Malzeme Listesi" icon={PackageCheck}>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {project.materials.map((material) => (
                <article
                  key={material.id}
                  className="rounded-[1.25rem] border border-black/10 bg-[#F7F7F5] p-4"
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-black/38">
                    {material.category}
                  </p>
                  <h3 className="mt-2 text-lg">
                    {material.brand} {material.model}
                  </h3>
                  <p className="mt-2 text-sm text-black/54">
                    {material.quantity} {material.unit}
                  </p>
                  <div className="mt-4">
                    <span className={statusChipClass(material.status)}>{material.status}</span>
                  </div>
                </article>
              ))}
            </div>
          </Panel>

          <Panel title="Belgeler" icon={FileText}>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {project.documents.map((document) => (
                <a
                  key={document.id}
                  href={document.url}
                  className="rounded-[1.25rem] border border-black/10 bg-[#F7F7F5] p-4"
                >
                  <FileText className="text-black/62" size={22} />
                  <h3 className="mt-3 text-sm font-medium">{document.title}</h3>
                  <p className="mt-1 text-sm text-black/54">
                    {document.type} · {formatDate(document.createdAt)}
                  </p>
                </a>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </main>
  );
}

function NotFoundProject() {
  return (
    <main className="min-h-screen bg-[#F7F7F5] px-4 py-8 text-[#111111] sm:px-6">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-2xl items-center">
        <div className="w-full rounded-[2rem] border border-black/10 bg-white p-6 text-center sm:p-10">
          <AlertCircle className="mx-auto text-black/62" size={42} />
          <h1 className="mt-6 text-[2.5rem]">Proje bulunamadı</h1>
          <p className="mt-4 leading-7 text-black/58">
            Bu bağlantı hatalı veya süresi dolmuş olabilir. Lütfen BLAGG Studio ile iletişime geçin.
          </p>
          <a
            href="/"
            className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-black px-6 py-3 text-white"
          >
            Ana sayfaya dön
          </a>
        </div>
      </section>
    </main>
  );
}

function Panel({ title, icon: Icon, children }) {
  return (
    <section className="rounded-[2rem] border border-black/10 bg-white p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <Icon className="text-black/62" size={22} />
        <h2 className="text-[1.8rem]">{title}</h2>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-white/8 p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-white/42">{label}</p>
      <p className="mt-2 text-sm text-white">{value}</p>
    </div>
  );
}

function MetricCard({ label, value, icon: Icon }) {
  return (
    <article className="rounded-[1.5rem] border border-black/10 bg-white p-5">
      <Icon className="text-black/62" size={22} />
      <p className="mt-4 text-sm text-black/48">{label}</p>
      <p className="mt-2 text-2xl">{value}</p>
    </article>
  );
}

function InfoTile({ label, value }) {
  return (
    <div className="rounded-[1.25rem] border border-black/10 bg-[#F7F7F5] p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-black/38">{label}</p>
      <p className="mt-2 text-sm text-black">{value}</p>
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <div className="rounded-[1.25rem] border border-dashed border-black/10 bg-[#F7F7F5] p-5 text-black/54">
      {text}
    </div>
  );
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
