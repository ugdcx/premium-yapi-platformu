"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Copy,
  FileText,
  FolderKanban,
  ImageIcon,
  MapPin,
  Phone,
  ReceiptText,
  TrendingUp,
  Wallet,
  X
} from "lucide-react";
import { leadApplications, projects as baseProjects } from "../../lib/data/mockData";
import { formatCurrency, formatDate } from "../../lib/helpers/format";
import { getApplications, updateApplicationStatus as persistApplicationStatus } from "../../lib/localStorageRecords";
import { useDemoRoleGuard } from "../../lib/demoAuth";
import DemoLogoutButton from "../../components/DemoLogoutButton";

const kanbanStatuses = [
  "Yeni",
  "İnceleniyor",
  "Eksik Bilgi",
  "Teklif Hazırlanıyor",
  "Teklif Gönderildi",
  "Onaylandı",
  "İptal"
];

const projectStatuses = ["Planlama", "Uygulamada", "Beklemede", "Teslime Hazırlanıyor", "Tamamlandı"];

const statusClasses = {
  Yeni: "bg-blue-50 text-blue-700 border-blue-100",
  İnceleniyor: "bg-amber-50 text-amber-700 border-amber-100",
  "Eksik Bilgi": "bg-orange-50 text-orange-700 border-orange-100",
  "Teklif Hazırlanıyor": "bg-purple-50 text-purple-700 border-purple-100",
  "Teklif Gönderildi": "bg-indigo-50 text-indigo-700 border-indigo-100",
  Onaylandı: "bg-emerald-50 text-emerald-700 border-emerald-100",
  İptal: "bg-red-50 text-red-700 border-red-100",
  Planlama: "bg-blue-50 text-blue-700 border-blue-100",
  Uygulamada: "bg-amber-50 text-amber-700 border-amber-100",
  Beklemede: "bg-orange-50 text-orange-700 border-orange-100",
  "Teslime Hazırlanıyor": "bg-purple-50 text-purple-700 border-purple-100",
  Tamamlandı: "bg-emerald-50 text-emerald-700 border-emerald-100"
};

export default function AdminKanban() {
  const canView = useDemoRoleGuard("admin");
  const [applications, setApplications] = useState(() => leadApplications.map(mapLeadApplication));
  const [projects, setProjects] = useState(() => baseProjects.map(mapProject));
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const storedApplications = getApplications().map(mapStoredApplication);
    if (storedApplications.length) {
      setApplications((current) => mergeApplications(storedApplications, current));
    }
  }, []);

  const stats = useMemo(() => buildDashboardStats(applications, projects), [applications, projects]);

  function updateApplicationStatus(id, status) {
    setApplications((current) =>
      current.map((application) => (application.id === id ? { ...application, status, updatedAt: new Date().toISOString() } : application))
    );
    setSelectedApplication((current) => (current?.id === id ? { ...current, status } : current));
    persistApplicationStatus(id, status);
  }

  function convertApplicationToProject(application) {
    const slug = slugify(`${application.fullName}-${application.serviceType}`);
    const projectExists = projects.some((project) => project.sourceApplicationId === application.id);
    if (projectExists) {
      setSelectedApplication(null);
      return;
    }

    const project = {
      id: `project-${application.id}`,
      sourceApplicationId: application.id,
      title: `${application.fullName} - ${application.serviceType}`,
      customerName: application.fullName,
      customerPhone: application.phone,
      slug,
      clientToken: makeToken("client"),
      workerToken: makeToken("worker"),
      location: `${application.city} / ${application.district}`,
      startDate: new Date().toISOString().slice(0, 10),
      estimatedEndDate: "",
      serviceType: application.serviceType,
      status: "Planlama",
      progress: 0,
      totalAmount: 0,
      paidAmount: 0,
      remainingAmount: 0,
      payments: [],
      materials: [],
      photos: [],
      documents: [],
      updatedAt: new Date().toISOString()
    };

    setProjects((current) => [project, ...current]);
    updateApplicationStatus(application.id, "Onaylandı");
    setSelectedApplication(null);
  }

  if (!canView) {
    return (
      <main className="min-h-screen bg-cream px-6 py-10 text-stoneDark">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-border bg-surface p-8 shadow-card">
          Oturum kontrol ediliyor...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream px-4 py-6 text-stoneDark sm:px-6 sm:py-8">
      <div className="mx-auto max-w-[1700px]">
        <header className="rounded-[2rem] bg-stoneDark p-6 text-white md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-white/35">
                BLAGG Control
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
                Operasyon, proje ve onay merkezi
              </h1>
              <p className="mt-4 max-w-3xl leading-8 text-white/65">
                Başvurular, teklifler, projeler, fotoğraf onayları, finans ve saha ilerlemesi tek kontrol alanında izlenir.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:min-w-72 lg:grid-cols-1">
              <a href="/teklif-al" className="inline-flex min-h-12 items-center justify-center rounded-full bg-gold px-6 py-3 font-medium text-stoneDark">
                Projenizi Başlatın
              </a>
              <DemoLogoutButton dark />
            </div>
          </div>
        </header>

        <div className="mt-6 grid gap-6">
          <AdminDashboardStats stats={stats} />
          <ControlModules />
          <PhotoApprovalBoard projects={projects} />
          <FinanceSnapshot projects={projects} />
          <ApplicationKanban
            applications={applications}
            onSelect={setSelectedApplication}
            onStatusChange={updateApplicationStatus}
          />
          <ProjectTable projects={projects} onSelect={setSelectedProject} />
        </div>

        {selectedApplication && (
          <ApplicationDetail
            application={selectedApplication}
            onClose={() => setSelectedApplication(null)}
            onStatusChange={updateApplicationStatus}
            onConvert={convertApplicationToProject}
          />
        )}

        {selectedProject && (
          <ProjectDetailPanel project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </div>
    </main>
  );
}

function AdminDashboardStats({ stats }) {
  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <article key={stat.label} className="rounded-[1.5rem] border border-border bg-surface p-5 shadow-card">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-muted">{stat.label}</p>
                <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
              </div>
              <Icon className="text-gold" size={23} />
            </div>
          </article>
        );
      })}
    </section>
  );
}

function ControlModules() {
  const modules = [
    "Genel Bakış",
    "Projeler",
    "Başvurular",
    "Teklifler",
    "Müşteriler",
    "Ustalar",
    "Tedarikçiler",
    "Onaylar",
    "Finans",
    "Belgeler",
    "Ayarlar"
  ];

  return (
    <section className="grid gap-4 rounded-[2rem] border border-border bg-surface p-4 shadow-card lg:grid-cols-[16rem_1fr]">
      <aside className="rounded-[1.5rem] bg-stoneDark p-4 text-white">
        <p className="text-sm uppercase tracking-[0.25em] text-white/35">BLAGG Control</p>
        <nav className="mt-5 grid gap-1">
          {modules.map((module, index) => (
            <a
              key={module}
              href={module === "Finans" ? "/admin/finance" : "#"}
              className={`flex min-h-11 items-center rounded-2xl px-4 text-sm font-medium ${
                index === 0 ? "bg-gold text-stoneDark" : "text-white/70 hover:bg-white/8 hover:text-white"
              }`}
            >
              {module}
            </a>
          ))}
        </nav>
      </aside>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Başvurudan projeye", "Başvuru açılır, teklif hazırlanır, onaylanınca proje kaydı oluşur."],
          ["Fotoğraf onayı", "Usta yükler, admin inceler, müşteri yalnızca onaylananı görür."],
          ["Finans görünümü", "Tahsilat, gider, usta ve tedarikçi ödemeleri proje bazında ayrılır."]
        ].map(([title, text]) => (
          <article key={title} className="rounded-[1.5rem] border border-border bg-cream p-5">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function PhotoApprovalBoard({ projects }) {
  const photos = projects.flatMap((project) =>
    (project.photos || []).map((photo) => ({ ...photo, projectTitle: project.title }))
  );
  const pending = photos.filter((photo) => photo.status === "pending_review");
  const approved = photos.filter((photo) => photo.status === "approved" && photo.visible_to_customer);

  return (
    <section className="rounded-[2rem] border border-border bg-surface p-4 shadow-card md:p-6">
      <SectionHeader
        eyebrow="Fotoğraf Onay Sistemi"
        title="Usta → Admin Onayı → Müşteri"
        text="Fotoğraflar pending_review, approved veya rejected statüsüyle tutulur. Müşteri yalnızca approved ve visible_to_customer kayıtlarını görür."
      />
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <PhotoApprovalColumn title="Onay bekliyor" photos={pending} empty="Onay bekleyen fotoğraf yok." />
        <PhotoApprovalColumn title="Müşteriye görünür" photos={approved} empty="Yayınlanan fotoğraf yok." />
      </div>
    </section>
  );
}

function PhotoApprovalColumn({ title, photos, empty }) {
  return (
    <div className="rounded-[1.5rem] bg-cream p-4">
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="mt-4 grid gap-3">
        {photos.length ? (
          photos.map((photo) => (
            <article key={photo.id} className="rounded-2xl border border-border bg-surface p-4">
              <div className="grid gap-4 sm:grid-cols-[8rem_1fr]">
                <div className="flex aspect-square items-center justify-center rounded-2xl bg-soft">
                  <ImageIcon className="text-graphite" size={28} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-black/35">{photo.projectTitle}</p>
                  <p className="mt-2 font-semibold">{photo.caption}</p>
                  <textarea
                    defaultValue={photo.caption}
                    className="mt-3 min-h-20 w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none"
                    aria-label="Fotoğraf açıklaması"
                  />
                  <label className="mt-3 flex items-center gap-2 text-sm font-medium text-muted">
                    <input type="checkbox" defaultChecked={photo.visible_to_customer} />
                    Müşteriye göster
                  </label>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button type="button" className="rounded-full bg-stoneDark px-4 py-2 text-sm font-semibold text-white">
                      Onayla
                    </button>
                    <button type="button" className="rounded-full border border-border px-4 py-2 text-sm font-semibold">
                      Reddet
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))
        ) : (
          <EmptyState text={empty} />
        )}
      </div>
    </div>
  );
}

function FinanceSnapshot({ projects }) {
  const totalRevenue = projects.reduce((sum, project) => sum + Number(project.paidAmount || 0), 0);
  const pendingRevenue = projects.reduce((sum, project) => sum + Number(project.remainingAmount || 0), 0);
  const totalOffer = projects.reduce((sum, project) => sum + Number(project.totalAmount || 0), 0);
  const totalExpense = Math.round(totalOffer * 0.62);
  const netProfit = totalRevenue - totalExpense;
  const margin = totalOffer ? Math.round((netProfit / totalOffer) * 100) : 0;

  const items = [
    ["Toplam Tahsilat", formatCurrency(totalRevenue)],
    ["Bekleyen Tahsilat", formatCurrency(pendingRevenue)],
    ["Toplam Gider", formatCurrency(totalExpense)],
    ["Usta Ödemeleri", formatCurrency(Math.round(totalExpense * 0.38))],
    ["Tedarikçi Ödemeleri", formatCurrency(Math.round(totalExpense * 0.44))],
    ["Genel Giderler", formatCurrency(Math.round(totalExpense * 0.18))],
    ["Net Kâr", formatCurrency(netProfit)],
    ["Kâr Marjı", `%${margin}`],
    ["Kasa Durumu", formatCurrency(totalRevenue - Math.round(totalExpense * 0.4))]
  ];

  return (
    <section className="rounded-[2rem] border border-border bg-surface p-4 shadow-card md:p-6">
      <SectionHeader
        eyebrow="Finans / Muhasebe"
        title="Tahsilat, gider ve proje kârlılığı"
        text="Bu alan Supabase bağlantısında müşteri tahsilatları, usta ödemeleri, tedarikçi ödemeleri ve genel gider kayıtlarına bağlanacak."
      />
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(([label, value]) => (
          <article key={label} className="rounded-2xl border border-border bg-cream p-4">
            <p className="text-sm text-muted">{label}</p>
            <p className="mt-2 text-2xl font-semibold">{value}</p>
          </article>
        ))}
      </div>
      <a href="/admin/finance" className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-stoneDark px-5 py-3 font-semibold text-white">
        Finans ekranını aç
      </a>
    </section>
  );
}

function ApplicationKanban({ applications, onSelect, onStatusChange }) {
  return (
    <section className="rounded-[2rem] border border-border bg-surface p-4 shadow-card md:p-6">
      <SectionHeader
        eyebrow="Başvuru Kanban"
        title="Teklif başvuruları"
        text="Kartı açarak detayları görüntüleyin, durumu değiştirin veya projeye dönüştürün."
      />
      <div className="mt-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-7">
          {kanbanStatuses.map((status) => {
            const columnApplications = applications.filter((application) => application.status === status);
            return (
              <div key={status} className="rounded-[1.5rem] border border-border bg-cream p-3">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <StatusBadge status={status} />
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-muted">
                    {columnApplications.length}
                  </span>
                </div>
                <div className="grid gap-3">
                  {columnApplications.length ? (
                    columnApplications.map((application) => (
                      <ApplicationCard
                        key={application.id}
                        application={application}
                        onSelect={onSelect}
                        onStatusChange={onStatusChange}
                      />
                    ))
                  ) : (
                    <EmptyState text="Bu kolonda başvuru yok." />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ApplicationCard({ application, onSelect, onStatusChange }) {
  return (
    <article className="rounded-2xl border border-border bg-surface p-4 shadow-card">
      <button type="button" onClick={() => onSelect(application)} className="w-full text-left">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">{application.fullName}</h3>
            <p className="mt-1 text-sm text-muted">{application.serviceType}</p>
          </div>
          <StatusBadge status={application.status} />
        </div>
        <div className="mt-4 grid gap-2 text-sm text-muted">
          <InfoRow icon={Phone} text={application.phone} />
          <InfoRow icon={MapPin} text={`${application.city} / ${application.district}`} />
          <InfoRow icon={CalendarDays} text={formatDate(application.createdAt)} />
        </div>
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted">{application.description}</p>
        <div className="mt-4">
          <span className="rounded-full bg-cream px-3 py-2 text-xs font-semibold text-muted">
            {application.photos.length ? "Fotoğraf var" : "Fotoğraf yok"}
          </span>
        </div>
      </button>
      <select
        value={application.status}
        onChange={(event) => onStatusChange(application.id, event.target.value)}
        className="mt-4 w-full rounded-2xl border border-border bg-white px-3 py-2 text-sm outline-none"
      >
        {kanbanStatuses.map((status) => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>
    </article>
  );
}

function ApplicationDetail({ application, onClose, onStatusChange, onConvert }) {
  return (
    <DetailShell title={application.fullName} subtitle={application.applicationNo} onClose={onClose}>
      <InfoBlock title="Müşteri bilgileri">
        <div className="grid gap-3 sm:grid-cols-2">
          <Cell label="Ad Soyad" value={application.fullName} />
          <Cell label="Telefon" value={application.phone} />
          <Cell label="Lokasyon" value={`${application.city} / ${application.district}`} />
          <Cell label="Hizmet Tipi" value={application.serviceType} />
          <Cell label="Başvuru Tarihi" value={formatDate(application.createdAt)} />
          <Cell label="Yaklaşık Bütçe" value={application.budgetRange} />
          <Cell label="Başlama Zamanı" value={application.startTime} />
          <Cell label="Durum" value={application.status} />
        </div>
      </InfoBlock>

      <InfoBlock title="Açıklama">
        <p className="leading-7 text-muted">{application.description}</p>
      </InfoBlock>

      <InfoBlock title="Yüklenen fotoğraflar">
        {application.photos.length ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {application.photos.map((photo) => (
              <div key={photo} className="rounded-2xl border border-border bg-cream p-4 text-sm text-muted">
                <ImageIcon className="mb-3 text-gold" size={22} />
                {photo}
              </div>
            ))}
          </div>
        ) : (
          <EmptyState text="Bu başvuruda fotoğraf yok." />
        )}
      </InfoBlock>

      <InfoBlock title="Admin notları">
        <textarea
          defaultValue={application.adminNotes}
          className="min-h-28 w-full rounded-2xl border border-border bg-cream px-4 py-3 outline-none"
          placeholder="Admin notu"
        />
      </InfoBlock>

      <InfoBlock title="Durum değiştir">
        <div className="flex flex-wrap gap-2">
          {kanbanStatuses.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => onStatusChange(application.id, status)}
              className="rounded-full border border-border bg-cream px-4 py-2 text-sm font-medium hover:border-gold hover:bg-white"
            >
              {status}
            </button>
          ))}
        </div>
      </InfoBlock>

      <button
        type="button"
        onClick={() => onConvert(application)}
        className="w-full rounded-2xl bg-gold px-5 py-4 font-semibold text-stoneDark"
      >
        Projeye Dönüştür
      </button>
    </DetailShell>
  );
}

function ProjectTable({ projects, onSelect }) {
  return (
    <section className="rounded-[2rem] border border-border bg-surface p-4 shadow-card md:p-6">
      <SectionHeader
        eyebrow="Proje listesi"
        title="Aktif ve dönüştürülen projeler"
        text="Müşteri ve usta takip linkleri proje kaydı üzerinden oluşturulur."
      />
      <div className="mt-6">
        <div className="grid gap-3">
          {projects.length ? (
            projects.map((project) => (
              <article key={project.id} className="grid gap-3 rounded-2xl border border-border bg-surface p-4 shadow-card md:grid-cols-2 xl:grid-cols-[1.4fr_1fr_0.7fr_0.7fr_0.8fr_0.8fr_0.8fr_0.9fr_0.8fr_0.8fr] xl:items-center">
                <button type="button" onClick={() => onSelect(project)} className="text-left">
                  <Cell label="Proje" value={project.title} />
                </button>
                <Cell label="Müşteri" value={project.customerName} />
                <StatusBadge status={project.status} />
                <Cell label="İlerleme" value={`${project.progress}%`} />
                <Cell label="Toplam" value={formatCurrency(project.totalAmount)} />
                <Cell label="Tahsil" value={formatCurrency(project.paidAmount)} />
                <Cell label="Kalan" value={formatCurrency(project.remainingAmount)} />
                <Cell label="Son güncelleme" value={formatDate(project.updatedAt)} />
                <CopyLinkButton label="Müşteri Linki" value={`/client/${project.slug}/proje-takip/${project.clientToken}`} />
                <CopyLinkButton label="Usta Linki" value={`/field/${project.slug}/usta-takip/${project.workerToken}`} />
              </article>
            ))
          ) : (
            <EmptyState text="Henüz proje yok." />
          )}
        </div>
      </div>
    </section>
  );
}

function ProjectDetailPanel({ project, onClose }) {
  return (
    <DetailShell title={project.title} subtitle={project.slug} onClose={onClose}>
      <InfoBlock title="Proje alanları">
        <div className="grid gap-3 sm:grid-cols-2">
          <Cell label="Proje adı" value={project.title} />
          <Cell label="Müşteri" value={project.customerName} />
          <Cell label="Slug" value={project.slug} />
          <Cell label="Müşteri takip token" value={project.clientToken} />
          <Cell label="Usta takip token" value={project.workerToken} />
          <Cell label="Lokasyon" value={project.location} />
          <Cell label="Başlangıç tarihi" value={project.startDate ? formatDate(project.startDate) : "Belirtilmedi"} />
          <Cell label="Tahmini bitiş" value={project.estimatedEndDate ? formatDate(project.estimatedEndDate) : "Belirtilmedi"} />
          <Cell label="Hizmet türü" value={project.serviceType} />
          <Cell label="Proje durumu" value={project.status} />
          <Cell label="Toplam teklif" value={formatCurrency(project.totalAmount)} />
          <Cell label="Tahsil edilen" value={formatCurrency(project.paidAmount)} />
          <Cell label="Kalan bakiye" value={formatCurrency(project.remainingAmount)} />
        </div>
      </InfoBlock>

      <InfoBlock title="Ödeme planı">
        <MiniList items={project.payments.map((payment) => `${payment.title} - ${formatCurrency(payment.amount)} - ${payment.status}`)} empty="Ödeme planı yok." />
      </InfoBlock>
      <InfoBlock title="Malzeme listesi">
        <MiniList items={project.materials.map((material) => `${material.category}: ${material.brand} ${material.model} - ${material.status}`)} empty="Malzeme kaydı yok." />
      </InfoBlock>
      <InfoBlock title="Fotoğraf timeline">
        <MiniList items={project.photos.map((photo) => `${formatDate(photo.createdAt)} - ${photo.caption}`)} empty="Fotoğraf kaydı yok." />
      </InfoBlock>
      <InfoBlock title="Belgeler">
        <MiniList items={project.documents.map((document) => `${document.title} - ${document.type}`)} empty="Belge yok." />
      </InfoBlock>
    </DetailShell>
  );
}

function CopyLinkButton({ label, value }) {
  return (
    <button
      type="button"
      onClick={() => navigator.clipboard?.writeText(value)}
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-xs font-semibold hover:border-gold"
      title={value}
    >
      <Copy size={15} />
      {label}
    </button>
  );
}

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs font-semibold ${statusClasses[status] || "border-border bg-cream text-muted"}`}>
      {status}
    </span>
  );
}

function SectionHeader({ eyebrow, title, text }) {
  return (
    <div>
      <p className="text-sm uppercase tracking-[0.25em] text-black/35">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight">{title}</h2>
      {text && <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">{text}</p>}
    </div>
  );
}

function DetailShell({ title, subtitle, onClose, children }) {
  return (
    <aside className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto border-l border-border bg-cream p-4 shadow-2xl shadow-black/20 sm:max-w-3xl sm:p-5">
      <div className="rounded-[2rem] bg-stoneDark p-6 text-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="break-all text-sm text-white/45">{subtitle}</p>
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
    <section className="rounded-[2rem] border border-border bg-surface p-5 shadow-card">
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="mt-5">{children}</div>
    </section>
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

function InfoRow({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={15} />
      <span>{text}</span>
    </div>
  );
}

function MiniList({ items, empty }) {
  if (!items.length) return <EmptyState text={empty} />;
  return (
    <div className="grid gap-2">
      {items.map((item) => (
        <div key={item} className="rounded-2xl border border-border bg-cream p-4 text-sm text-muted">
          {item}
        </div>
      ))}
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-white/70 p-4 text-sm text-muted">
      {text}
    </div>
  );
}

function buildDashboardStats(applications, projects) {
  const totalRevenue = projects.reduce((sum, project) => sum + Number(project.paidAmount || 0), 0);
  const totalOffer = projects.reduce((sum, project) => sum + Number(project.totalAmount || 0), 0);
  const estimatedCost = Math.round(totalOffer * 0.62);
  const netProfit = totalRevenue - estimatedCost;

  return [
    { label: "Aktif Projeler", value: projects.filter((project) => project.status === "Uygulamada").length, icon: FolderKanban },
    { label: "Yeni Başvurular", value: countByStatus(applications, "Yeni"), icon: ClipboardList },
    { label: "Bekleyen Teklifler", value: countByStatus(applications, "Teklif Hazırlanıyor"), icon: ReceiptText },
    { label: "Onay Bekleyen Fotoğraflar", value: projects.flatMap((project) => project.photos || []).filter((photo) => photo.status === "pending_review").length, icon: ImageIcon },
    { label: "Bugünkü Tahsilatlar", value: formatCurrency(totalRevenue), icon: Wallet },
    { label: "Yaklaşan Usta Ödemeleri", value: formatCurrency(Math.round(estimatedCost * 0.18)), icon: BriefcaseBusiness },
    { label: "Yaklaşan Tedarikçi Ödemeleri", value: formatCurrency(Math.round(estimatedCost * 0.22)), icon: BriefcaseBusiness },
    { label: "Toplam Gelir", value: formatCurrency(totalRevenue), icon: Wallet },
    { label: "Toplam Gider", value: formatCurrency(estimatedCost), icon: BriefcaseBusiness },
    { label: "Net Kâr", value: formatCurrency(netProfit), icon: TrendingUp },
    { label: "Kasa Durumu", value: formatCurrency(totalRevenue - Math.round(estimatedCost * 0.4)), icon: Wallet }
  ];
}

function countByStatus(applications, status) {
  return applications.filter((application) => application.status === status).length;
}

function mapLeadApplication(application, index) {
  return {
    id: application.id,
    applicationNo: `BLAGG-2026-${String(index + 1).padStart(3, "0")}`,
    fullName: application.fullName,
    phone: application.phone,
    normalizedPhone: application.normalizedPhone,
    city: application.city,
    district: application.district,
    serviceType: application.serviceType,
    description: application.description,
    budgetRange: application.budgetRange,
    startTime: application.startTime,
    photos: application.photos || [],
    status: normalizeApplicationStatus(application.status),
    createdAt: application.createdAt,
    updatedAt: application.updatedAt,
    adminNotes: application.adminNotes || ""
  };
}

function mapStoredApplication(application) {
  const [city = "", district = ""] = String(application.location || "").split("/").map((part) => part.trim());
  return {
    id: application.id,
    applicationNo: application.applicationNo || application.id,
    fullName: application.fullName || application.customer || "Belirtilmedi",
    phone: application.phone || "Belirtilmedi",
    normalizedPhone: application.normalizedPhone || "",
    city: application.city || city || "Belirtilmedi",
    district: application.district || district || "Belirtilmedi",
    serviceType: application.serviceType || application.service || "Belirtilmedi",
    description: application.description || application.projectScale || application.note || "Açıklama yok.",
    budgetRange: application.budgetRange || "Belirtilmedi",
    startTime: application.startTime || "Belirtilmedi",
    photos: application.photos || application.files || [],
    status: normalizeApplicationStatus(application.status || application.statusLabel || "Yeni"),
    createdAt: application.createdAt || new Date().toISOString(),
    updatedAt: application.updatedAt || application.createdAt || new Date().toISOString(),
    adminNotes: application.adminNotes || application.note || ""
  };
}

function mapProject(project) {
  return {
    id: project.id,
    sourceApplicationId: project.sourceApplicationId || "",
    title: project.title,
    customerName: project.customerName,
    customerPhone: project.customerPhone,
    slug: project.slug,
    clientToken: project.clientToken,
    workerToken: project.workerToken,
    location: project.location,
    startDate: project.startDate,
    estimatedEndDate: project.estimatedEndDate,
    serviceType: project.serviceType,
    status: projectStatuses.includes(project.status) ? project.status : "Planlama",
    progress: project.progress || 0,
    totalAmount: project.totalAmount || 0,
    paidAmount: project.paidAmount || 0,
    remainingAmount: project.remainingAmount || 0,
    payments: project.payments || [],
    materials: project.materials || [],
    photos: project.photos || [],
    documents: project.documents || [],
    updatedAt: project.updatedAt || project.estimatedEndDate || new Date().toISOString()
  };
}

function mergeApplications(primary, fallback) {
  const seen = new Set(primary.map((application) => application.id));
  return [...primary, ...fallback.filter((application) => !seen.has(application.id))];
}

function normalizeApplicationStatus(status) {
  const legacyMap = {
    approved: "Onaylandı",
    rejected: "İptal",
    new: "Yeni",
    review: "İnceleniyor",
    offer: "Teklif Gönderildi",
    preparing: "Teklif Hazırlanıyor"
  };

  const normalized = legacyMap[status] || status;
  return kanbanStatuses.includes(normalized) ? normalized : "Yeni";
}

function slugify(value) {
  return String(value || "proje")
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function makeToken(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}
