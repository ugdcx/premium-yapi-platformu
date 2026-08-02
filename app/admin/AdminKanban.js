"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  CalendarDays,
  ClipboardList,
  Copy,
  FolderKanban,
  ImageIcon,
  Menu,
  MapPin,
  Wallet,
  X
} from "lucide-react";
import { projects as baseProjects } from "../../lib/data/mockData";
import { formatCurrency, formatDate } from "../../lib/helpers/format";
import {
  getWorkerUploads,
  updateWorkerUpload
} from "../../lib/localStorageRecords";
import { statusChipClass } from "../../lib/designSystem";
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

const leadStatusOptions = [
  ["new", "Yeni"],
  ["contacted", "İnceleniyor"],
  ["qualified", "İnceleniyor"],
  ["site_visit_planned", "İnceleniyor"],
  ["quote_preparing", "Teklif Hazırlanıyor"],
  ["quote_sent", "Teklif Gönderildi"],
  ["negotiation", "Teklif Gönderildi"],
  ["won", "Onaylandı"],
  ["converted_to_project", "Onaylandı"],
  ["lost", "İptal"],
  ["unsuitable", "İptal"],
  ["archived", "İptal"]
];

const leadStatusLabels = Object.fromEntries(leadStatusOptions);
const leadStatusByLabel = {
  Yeni: "new",
  İnceleniyor: "contacted",
  "Eksik Bilgi": "contacted",
  "Teklif Hazırlanıyor": "quote_preparing",
  "Teklif Gönderildi": "quote_sent",
  Onaylandı: "won",
  İptal: "lost"
};

const projectStatuses = [
  "Planlama",
  "Uygulamada",
  "Beklemede",
  "Teslime Hazırlanıyor",
  "Tamamlandı"
];

const applicationGroups = [
  {
    title: "Yeni",
    statuses: ["Yeni", "Eksik Bilgi"]
  },
  {
    title: "İnceleniyor",
    statuses: ["İnceleniyor"]
  },
  {
    title: "Teklif / Onay",
    statuses: ["Teklif Hazırlanıyor", "Teklif Gönderildi", "Onaylandı", "İptal"]
  }
];

const controlModules = [
  {
    id: "overview",
    label: "Genel Bakış",
    description: "Günlük karar ve risk merkezi",
    icon: AlertTriangle
  },
  {
    id: "applications",
    label: "Başvurular",
    description: "Teklif öncesi müşteri dosyaları",
    icon: ClipboardList
  },
  {
    id: "projects",
    label: "Projeler",
    description: "Aktif operasyon kayıtları",
    icon: FolderKanban
  },
  {
    id: "field",
    label: "Saha Onayları",
    description: "Field kayıt kontrolü",
    icon: ImageIcon
  },
  {
    id: "finance",
    label: "Finans",
    description: "Nakit ve tahmini durum",
    icon: Wallet
  },
  {
    id: "links",
    label: "Bağlantılar",
    description: "Müşteri ve saha linkleri",
    icon: Copy
  }
];

export default function AdminKanban() {
  const router = useRouter();
  const [applications, setApplications] = useState([]);
  const [projects, setProjects] = useState(() => baseProjects.map(mapProject));
  const [workerUploads, setWorkerUploads] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeModule, setActiveModule] = useState("overview");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [leadFilters, setLeadFilters] = useState({
    status: "",
    source: "",
    search: "",
    range: "recent",
    page: 1
  });
  const [leadPagination, setLeadPagination] = useState({
    page: 1,
    pageSize: 20,
    total: 0,
    totalPages: 1
  });
  const [leadLoading, setLeadLoading] = useState(false);
  const [leadDetailLoading, setLeadDetailLoading] = useState(false);
  const [leadError, setLeadError] = useState("");
  const [leadErrorKind, setLeadErrorKind] = useState("");
  const [leadReloadKey, setLeadReloadKey] = useState(0);
  const [updatingLeadIds, setUpdatingLeadIds] = useState(() => new Set());

  useEffect(() => {
    setWorkerUploads(getWorkerUploads());
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadLeads() {
      setLeadLoading(true);
      setLeadError("");
      setLeadErrorKind("");

      try {
        const response = await fetch(buildLeadListUrl(leadFilters), {
          headers: {
            Accept: "application/json"
          }
        });
        const result = await response.json().catch(() => null);

        if (response.status === 401) {
          router.replace("/control?next=/admin");
          return;
        }

        if (response.status === 403) {
          setLeadError("Bu alana erişim yetkiniz yok.");
          setLeadErrorKind("forbidden");
          return;
        }

        if (!response.ok || !result?.success) {
          throw new Error(result?.message || "Lead listesi alınamadı.");
        }

        if (cancelled) return;

        const nextApplications = Array.isArray(result.data)
          ? result.data.map(mapAdminLeadApplication)
          : [];

        setApplications(nextApplications);
        setLeadPagination(result.pagination || {
          page: 1,
          pageSize: 20,
          total: nextApplications.length,
          totalPages: 1
        });
        setSelectedApplication((current) =>
          current
            ? nextApplications.find((application) => application.id === current.id) || current
            : current
        );
      } catch {
        if (!cancelled) {
          setLeadError("Lead listesi şu anda alınamadı.");
          setLeadErrorKind("temporary");
        }
      } finally {
        if (!cancelled) {
          setLeadLoading(false);
        }
      }
    }

    loadLeads();

    return () => {
      cancelled = true;
    };
  }, [
    router,
    leadFilters.status,
    leadFilters.source,
    leadFilters.search,
    leadFilters.range,
    leadFilters.page,
    leadReloadKey
  ]);

  const kpis = useMemo(
    () => buildOperationalKpis(applications, projects, workerUploads),
    [applications, projects, workerUploads]
  );
  const attentionItems = useMemo(
    () => buildAttentionItems(applications, projects, workerUploads),
    [applications, projects, workerUploads]
  );
  const finance = useMemo(() => buildFinanceSummary(projects), [projects]);

  async function selectApplication(application) {
    setSelectedApplication(application);
    setSelectedProject(null);
    setActiveModule("applications");

    setLeadDetailLoading(true);
    setLeadError("");
    setLeadErrorKind("");

    try {
      const response = await fetch(`/api/admin/leads/${application.id}`, {
        headers: {
          Accept: "application/json"
        }
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        if (response.status === 401) {
          router.replace("/control?next=/admin");
          return;
        }
        if (response.status === 403) {
          setLeadError("Bu alana erişim yetkiniz yok.");
          setLeadErrorKind("forbidden");
          return;
        }
        throw new Error(result?.message || "Lead detayı alınamadı.");
      }

      setSelectedApplication(mapAdminLeadApplication(result.data));
    } catch {
      setLeadError("Lead detayı şu anda alınamadı.");
      setLeadErrorKind("temporary");
    } finally {
      setLeadDetailLoading(false);
    }
  }

  function selectProject(project) {
    setSelectedProject(project);
    setSelectedApplication(null);
    setActiveModule("projects");
  }

  function selectModule(moduleId) {
    setActiveModule(moduleId);
    setIsNavOpen(false);
  }

  function openAttentionItem(item) {
    if (item.type === "application") {
      const application = applications.find((entry) => entry.id === item.refId);
      if (application) selectApplication(application);
      return;
    }

    const project =
      item.type === "upload"
        ? projects.find((entry) => entry.slug === item.projectSlug)
        : projects.find((entry) => entry.id === item.refId);
    if (project) {
      setActiveModule(item.type === "upload" ? "field" : "projects");
      setSelectedProject(project);
      setSelectedApplication(null);
    }
  }

  async function updateApplicationStatus(id, status) {
    const apiStatus = leadStatusByLabel[status] || status;
    if (updatingLeadIds.has(id)) return;

    setUpdatingLeadIds((current) => new Set(current).add(id));
    setLeadError("");
    setLeadErrorKind("");

    try {
      const response = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: apiStatus })
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        if (response.status === 401) {
          router.replace("/control?next=/admin");
          return;
        }
        if (response.status === 403) {
          setLeadError("Bu alana erişim yetkiniz yok.");
          setLeadErrorKind("forbidden");
          return;
        }
        throw new Error(result?.message || "Lead durumu güncellenemedi.");
      }

      const updatedApplication = mapAdminLeadApplication(result.data);
      setApplications((current) =>
        current.map((application) =>
          application.id === id ? updatedApplication : application
        )
      );
      setSelectedApplication((current) =>
        current?.id === id ? updatedApplication : current
      );
    } catch {
      setLeadError("Lead durumu şu anda güncellenemedi.");
      setLeadErrorKind("temporary");
    } finally {
      setUpdatingLeadIds((current) => {
        const next = new Set(current);
        next.delete(id);
        return next;
      });
    }
  }

  function updateLeadFilters(updates) {
    setLeadFilters((current) => ({
      ...current,
      ...updates,
      page: updates.page || 1
    }));
  }

  function convertApplicationToProject(application) {
    const slug = slugify(`${application.fullName}-${application.serviceType}`);
    const projectExists = projects.some(
      (project) => project.sourceApplicationId === application.id
    );

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

  function reviewWorkerUpload(id, approvalStatus) {
    const now = new Date().toISOString();
    const updates =
      approvalStatus === "approved"
        ? {
            approvalStatus: "approved",
            status: "approved",
            visibleToClient: true,
            visible_to_customer: true,
            approvedAt: now,
            rejectedAt: ""
          }
        : {
            approvalStatus: "rejected",
            status: "rejected",
            visibleToClient: false,
            visible_to_customer: false,
            approvedAt: "",
            rejectedAt: now
          };

    setWorkerUploads(updateWorkerUpload(id, updates));
  }

  const activeModuleConfig =
    controlModules.find((module) => module.id === activeModule) || controlModules[0];
  const detailPanel = (
    <OperationalRecordPanel
      selectedApplication={selectedApplication}
      selectedProject={selectedProject}
      workerUploads={workerUploads}
      onApplicationStatusChange={updateApplicationStatus}
      onConvertApplication={convertApplicationToProject}
      updatingLeadIds={updatingLeadIds}
      leadDetailLoading={leadDetailLoading}
      onClear={() => {
        setSelectedApplication(null);
        setSelectedProject(null);
      }}
    />
  );

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-4 py-4 text-[#111111] sm:px-6 lg:px-5">
      <div className="mx-auto max-w-[1900px]">
        <div className="mb-4 flex items-center justify-between rounded-[1.25rem] border border-black/10 bg-white p-3 lg:hidden">
          <button
            type="button"
            onClick={() => setIsNavOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white"
            aria-label="BLAGG Control menüsünü aç"
          >
            <Menu size={18} />
          </button>
          <div className="text-right">
            <p className="text-sm font-medium">BLAGG Control</p>
            <p className="text-xs text-black/46">{activeModuleConfig.label}</p>
          </div>
        </div>

        {isNavOpen ? (
          <div className="fixed inset-0 z-50 bg-black/35 p-3 lg:hidden">
            <ControlSidebar
              activeModule={activeModule}
              onSelect={selectModule}
              onClose={() => setIsNavOpen(false)}
              mobile
            />
          </div>
        ) : null}

        <div className="grid gap-5 lg:grid-cols-[18.5rem_minmax(0,1fr)]">
          <ControlSidebar activeModule={activeModule} onSelect={selectModule} />

          <section className="min-w-0">
            <ModuleHeader module={activeModuleConfig} />

            {activeModule === "overview" ? (
              <div className="mt-5 grid gap-5">
                <KpiStrip items={kpis} />
                <section className="grid gap-5 xl:grid-cols-[minmax(20rem,0.82fr)_minmax(28rem,1.05fr)_minmax(24rem,0.82fr)]">
                  <AttentionPanel items={attentionItems} onSelect={openAttentionItem} />
                  <PhotoApprovalBoard
                    projects={projects}
                    workerUploads={workerUploads}
                    onApprove={(id) => reviewWorkerUpload(id, "approved")}
                    onReject={(id) => reviewWorkerUpload(id, "rejected")}
                    compact
                  />
                  <FinanceSnapshot finance={finance} compact />
                </section>
              </div>
            ) : null}

            {activeModule === "applications" ? (
              <section className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.25fr)_minmax(25rem,0.75fr)]">
                <ApplicationManagement
                  applications={applications}
                  selectedApplication={selectedApplication}
                  onSelect={selectApplication}
                  onStatusChange={updateApplicationStatus}
                  leadFilters={leadFilters}
                  leadPagination={leadPagination}
                  leadLoading={leadLoading}
                  leadError={leadError}
                  leadErrorKind={leadErrorKind}
                  updatingLeadIds={updatingLeadIds}
                  onFilterChange={updateLeadFilters}
                  onRetry={() => setLeadReloadKey((current) => current + 1)}
                />
                {detailPanel}
              </section>
            ) : null}

            {activeModule === "projects" ? (
              <section className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(25rem,0.65fr)]">
                <ProjectOperationsTable
                  projects={projects}
                  workerUploads={workerUploads}
                  selectedProject={selectedProject}
                  onSelect={selectProject}
                />
                {detailPanel}
              </section>
            ) : null}

            {activeModule === "field" ? (
              <section className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(25rem,0.65fr)]">
                <PhotoApprovalBoard
                  projects={projects}
                  workerUploads={workerUploads}
                  onApprove={(id) => reviewWorkerUpload(id, "approved")}
                  onReject={(id) => reviewWorkerUpload(id, "rejected")}
                />
                {detailPanel}
              </section>
            ) : null}

            {activeModule === "finance" ? (
              <div className="mt-5 max-w-5xl">
                <FinanceSnapshot finance={finance} />
              </div>
            ) : null}

            {activeModule === "links" ? (
              <div className="mt-5">
                <LinkManagement projects={projects} onSelect={selectProject} selectedProject={selectedProject} />
              </div>
            ) : null}
          </section>
        </div>
      </div>
    </main>
  );
}

function ControlSidebar({ activeModule, onSelect, onClose, mobile = false }) {
  return (
    <aside
      className={`${
        mobile ? "h-full max-w-sm" : "sticky top-4 hidden h-[calc(100vh-2rem)] lg:flex"
      } flex-col rounded-[2rem] border border-black/10 bg-black p-4 text-white`}
    >
      <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-white/38">
            Studio Operating System
          </p>
          <h1 className="mt-3 text-2xl">BLAGG Control</h1>
        </div>
        {mobile ? (
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/8"
            aria-label="Menüyü kapat"
          >
            <X size={16} />
          </button>
        ) : null}
      </div>

      <nav className="mt-5 grid gap-2">
        {controlModules.map((module) => {
          const Icon = module.icon;
          const active = activeModule === module.id;
          return (
            <button
              key={module.id}
              type="button"
              onClick={() => onSelect(module.id)}
              className={`grid grid-cols-[2.5rem_1fr] items-center gap-3 rounded-[1.1rem] border p-3 text-left ${
                active
                  ? "border-white bg-white text-black"
                  : "border-white/10 bg-white/8 text-white/68 hover:bg-white/12"
              }`}
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  active ? "bg-black text-white" : "bg-black/25 text-white"
                }`}
              >
                <Icon size={17} />
              </span>
              <span>
                <span className="block text-sm font-medium">{module.label}</span>
                <span className={`mt-1 block text-xs ${active ? "text-black/54" : "text-white/42"}`}>
                  {module.description}
                </span>
              </span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-white/10 pt-4">
        <DemoLogoutButton dark />
      </div>
    </aside>
  );
}

function ModuleHeader({ module }) {
  const today = new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date());

  return (
    <header className="rounded-[2rem] border border-black/10 bg-black p-6 text-white sm:p-8 lg:p-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/42">
            {module.description}
          </p>
          <h1 className="mt-4 text-[2.8rem] leading-[0.96] sm:text-[4.2rem]">
            {module.label}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/62">
            {moduleIntro(module.id)}
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[22rem] lg:grid-cols-1">
          <div className="rounded-[1.25rem] border border-white/10 bg-white/8 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.18em] text-white/38">Bugün</p>
            <p className="mt-2 text-sm text-white">{today}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href="/admin/finance"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-medium text-black"
            >
              Finans görünümü
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function moduleIntro(moduleId) {
  const copy = {
    overview: "Günün kararlarını, saha onaylarını, riskli işleri ve nakit görünümünü tek odakta okuyun.",
    applications: "Yeni müşteri başvurularını hızlı tarayın, durum güncelleyin ve uygun kayıtları projeye dönüştürün.",
    projects: "Aktif projelerde saha, finans, risk ve bağlantı bağlamını tek operasyon listesinde yönetin.",
    field: "Field tarafından gönderilen kayıtları şirket kontrolünden geçirip yalnızca onaylananları müşteriye açın.",
    finance: "Ana nakit göstergelerini izleyin; detaylı hakediş ve finans ayrımı için finans görünümüne geçin.",
    links: "Müşteri ve saha bağlantılarını proje bazında kontrollü şekilde kopyalayın."
  };
  return copy[moduleId] || copy.overview;
}

function KpiStrip({ items }) {
  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <article
            key={item.label}
            className="min-h-36 rounded-[1.5rem] border border-black/10 bg-white p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm leading-5 text-black/48">{item.label}</p>
                <p className="mt-3 text-[2rem] leading-none">{item.value}</p>
              </div>
              <Icon className="text-black/62" size={22} />
            </div>
            <p className="mt-5 text-sm leading-6 text-black/50">{item.note}</p>
          </article>
        );
      })}
    </section>
  );
}

function AttentionPanel({ items, onSelect }) {
  return (
    <section className="rounded-[2rem] border border-black/10 bg-white p-5 lg:p-6">
      <SectionHeader
        eyebrow="Karar listesi"
        title="Bugün dikkat isteyenler"
        text="Operasyonda bekleyen karar, risk ve takip noktaları."
      />
      <div className="mt-6 grid gap-3">
        {items.length ? (
          items.map((item) => (
            <button
              type="button"
              key={`${item.title}-${item.subject}`}
              onClick={() => onSelect(item)}
              className="grid gap-3 rounded-[1.25rem] border border-black/10 bg-[#F7F7F5] p-4 text-left transition-colors hover:border-black/28 hover:bg-white md:grid-cols-[1fr_auto] md:items-start"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={priorityClass(item.priority)}>{item.priority}</span>
                  <p className="text-xs uppercase tracking-[0.16em] text-black/38">
                    {item.subject}
                  </p>
                </div>
                <h3 className="mt-3 text-lg">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-black/58">{item.description}</p>
              </div>
              <span className={statusChipClass(item.status)}>{item.status}</span>
            </button>
          ))
        ) : (
          <EmptyState text="Bugün için kritik operasyon uyarısı yok." />
        )}
      </div>
    </section>
  );
}

function ProjectOperationsTable({ projects, workerUploads, selectedProject, onSelect }) {
  return (
    <section className="rounded-[2rem] border border-black/10 bg-white p-5 lg:p-6">
      <SectionHeader
        eyebrow="Aktif projeler"
        title="Proje operasyon listesi"
        text="Saha, ödeme, ilerleme ve bağlantı yönetimi tek satırda izlenir."
      />
      <div className="mt-6 overflow-x-auto">
        <div className="min-w-[1180px]">
          <div className="grid grid-cols-[1.35fr_0.9fr_0.9fr_0.72fr_0.7fr_1fr_0.9fr_0.65fr_1.15fr] gap-3 border-b border-black/10 px-3 pb-3 text-xs uppercase tracking-[0.14em] text-black/36">
            <span>Proje</span>
            <span>Müşteri</span>
            <span>Konum</span>
            <span>Aşama</span>
            <span>İlerleme</span>
            <span>Son saha kaydı</span>
            <span>Tahsilat</span>
            <span>Risk</span>
            <span>Bağlantılar</span>
          </div>
          <div className="grid gap-2 pt-3">
            {projects.map((project) => {
              const latestUpload = findLatestProjectUpload(project.slug, workerUploads);
              const risk = projectRisk(project, latestUpload);
              return (
                <article
                  key={project.id}
                  className={`grid grid-cols-[1.35fr_0.9fr_0.9fr_0.72fr_0.7fr_1fr_0.9fr_0.65fr_1.15fr] items-center gap-3 rounded-[1.25rem] border px-3 py-4 ${
                    selectedProject?.id === project.id
                      ? "border-black/35 bg-white"
                      : "border-black/10 bg-[#F7F7F5]"
                  }`}
                >
                  <button type="button" onClick={() => onSelect(project)} className="text-left">
                    <p className="text-sm font-medium text-black">{project.title}</p>
                    <p className="mt-1 text-xs text-black/46">{project.serviceType}</p>
                  </button>
                  <p className="text-sm text-black/64">{project.customerName}</p>
                  <p className="text-sm text-black/54">{project.location}</p>
                  <span className={statusChipClass(project.status)}>{project.status}</span>
                  <ProgressMeter value={project.progress} />
                  <div>
                    <p className="text-sm text-black/64">
                      {latestUpload ? latestUpload.workItem : "Kayıt yok"}
                    </p>
                    <p className="mt-1 text-xs text-black/42">
                      {latestUpload ? formatDate(latestUpload.createdAt) : "Saha bekleniyor"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-black">{formatCurrency(project.remainingAmount)}</p>
                    <p className="mt-1 text-xs text-black/42">kalan ödeme</p>
                  </div>
                  <span className={priorityClass(risk.priority)}>{risk.label}</span>
                  <div className="grid gap-2">
                    <CopyLinkButton
                      label="Müşteri bağlantısını kopyala"
                      value={`/client/${project.slug}/proje-takip/${project.clientToken}`}
                    />
                    <CopyLinkButton
                      label="Saha bağlantısını kopyala"
                      value={`/field/${project.slug}/usta-takip/${project.workerToken}`}
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function PhotoApprovalBoard({ projects, workerUploads, onApprove, onReject }) {
  const photos = projects.flatMap((project) =>
    (project.photos || []).map((photo) => ({
      id: photo.id,
      projectTitle: project.title,
      workItem: photo.stage,
      note: photo.caption,
      photoCount: 1,
      createdAt: photo.createdAt,
      approvalStatus:
        photo.status === "approved"
          ? "approved"
          : photo.status === "rejected"
            ? "rejected"
            : "pending",
      visibleToClient: Boolean(photo.visible_to_customer),
      source: "mock"
    }))
  );
  const uploads = workerUploads.map((upload) => ({
    ...upload,
    projectTitle: upload.projectName,
    photoCount: upload.photos?.length || 0,
    source: "worker"
  }));
  const records = [...uploads, ...photos].sort(
    (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
  );
  const pending = records.filter((record) => record.approvalStatus === "pending");
  const approved = records.filter(
    (record) => record.approvalStatus === "approved" && record.visibleToClient
  );
  const rejected = records.filter((record) => record.approvalStatus === "rejected");

  return (
    <section className="rounded-[2rem] border border-black/10 bg-white p-5 lg:p-6">
      <SectionHeader
        eyebrow="Saha onay merkezi"
        title="Field kayıtları şirket kontrolünden geçer"
        text="Pending kayıtlar müşteri ekranına düşmez. Sadece onaylanan ve görünür işaretlenen kayıtlar BLAGG Remote tarafında yayınlanır."
      />
      <div className="mt-6 grid gap-4 xl:grid-cols-[1.15fr_0.95fr_0.8fr]">
        <PhotoApprovalColumn
          title="Onay bekliyor"
          records={pending}
          empty="Onay bekleyen saha kaydı yok."
          onApprove={onApprove}
          onReject={onReject}
          primary
        />
        <PhotoApprovalColumn
          title="Müşteriye görünür"
          records={approved}
          empty="Henüz yayınlanan kayıt yok."
          onApprove={onApprove}
          onReject={onReject}
        />
        <PhotoApprovalColumn
          title="Reddedildi"
          records={rejected}
          empty="Reddedilen kayıt yok."
          onApprove={onApprove}
          onReject={onReject}
        />
      </div>
    </section>
  );
}

function PhotoApprovalColumn({ title, records, empty, onApprove, onReject, primary = false }) {
  return (
    <div className="rounded-[1.5rem] border border-black/10 bg-[#F7F7F5] p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-2xl">{title}</h3>
        <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-black/54">
          {records.length}
        </span>
      </div>
      <div className="mt-4 grid gap-3">
        {records.length ? (
          records.map((record) => (
            <article
              key={record.id}
              className={`rounded-[1.25rem] border border-black/10 bg-white p-4 ${
                primary ? "ring-1 ring-black/8" : ""
              }`}
            >
              <div className="grid gap-4 sm:grid-cols-[6rem_1fr]">
                <div className="flex aspect-square items-center justify-center rounded-[1rem] border border-black/10 bg-[#F3F3F1]">
                  <ImageIcon className="text-black/46" size={22} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-black/38">
                    {record.projectTitle}
                  </p>
                  <h4 className="mt-2 text-base font-medium">
                    {record.workItem || "Saha kaydı"}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-black/58">
                    {record.adminNote || record.note || "Açıklama girilmedi."}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className={statusChipClass(approvalStatusLabel(record.approvalStatus))}>
                      {approvalStatusLabel(record.approvalStatus)}
                    </span>
                    <span className="rounded-full border border-black/10 bg-[#F7F7F5] px-3 py-1 text-xs text-black/54">
                      {record.photoCount} fotoğraf
                    </span>
                    <span className="rounded-full border border-black/10 bg-[#F7F7F5] px-3 py-1 text-xs text-black/54">
                      {formatDate(record.createdAt)}
                    </span>
                  </div>
                  {record.source === "worker" ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => onApprove(record.id)}
                        className="rounded-full bg-black px-4 py-2 text-sm text-white"
                      >
                        Onayla
                      </button>
                      <button
                        type="button"
                        onClick={() => onReject(record.id)}
                        className="rounded-full border border-black/12 px-4 py-2 text-sm text-black"
                      >
                        Reddet
                      </button>
                    </div>
                  ) : null}
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

function OperationalRecordPanel({
  selectedApplication,
  selectedProject,
  workerUploads,
  onApplicationStatusChange,
  onConvertApplication,
  updatingLeadIds,
  leadDetailLoading,
  onClear
}) {
  return (
    <aside className="rounded-[2rem] border border-black/10 bg-black p-5 text-white xl:sticky xl:top-5 xl:max-h-[calc(100vh-2.5rem)] xl:overflow-y-auto">
      {!selectedApplication && !selectedProject ? (
        <div className="flex min-h-[34rem] flex-col justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/38">
              Operasyon Kaydı
            </p>
            <h2 className="mt-5 text-[2.35rem] leading-tight">
              Operasyon kaydı açmak için bir başvuru veya proje seçin.
            </h2>
            <p className="mt-5 text-sm leading-7 text-white/58">
              BLAGG Control, seçtiğiniz müşteri veya proje için karar bağlamını burada toplar: aksiyon, saha, finans, risk ve bağlantılar.
            </p>
          </div>
          <div className="grid gap-3 border-t border-white/10 pt-5 text-sm text-white/56">
            <p>Başvuru seçimi müşteri dosyasını açar.</p>
            <p>Proje seçimi operasyon kaydını açar.</p>
            <p>Saha onayı yalnızca şirket kontrolünden sonra müşteriye görünür.</p>
          </div>
        </div>
      ) : null}

      {selectedApplication ? (
        <ApplicationRecordDetail
          application={selectedApplication}
          onStatusChange={onApplicationStatusChange}
          onConvert={onConvertApplication}
          updating={updatingLeadIds.has(selectedApplication.id)}
          detailLoading={leadDetailLoading}
          onClear={onClear}
        />
      ) : null}

      {selectedProject ? (
        <ProjectRecordDetail
          project={selectedProject}
          workerUploads={workerUploads}
          onClear={onClear}
        />
      ) : null}
    </aside>
  );
}

function ApplicationRecordDetail({
  application,
  onStatusChange,
  onConvert,
  updating,
  detailLoading,
  onClear
}) {
  const nextAction = nextApplicationAction(application.status);

  return (
    <div>
      <RecordHeader
        eyebrow="Başvuru Detayı"
        title={application.fullName}
        subtitle={application.applicationNo}
        onClear={onClear}
      />

      <div className="mt-5 grid gap-3">
        {detailLoading ? (
          <DarkBlock title="Detay yükleniyor">
            <p className="text-sm leading-7 text-white/68">
              Lead detay bilgileri getiriliyor.
            </p>
          </DarkBlock>
        ) : null}

        <DarkBlock title="Sonraki Aksiyon">
          <p className="text-sm leading-7 text-white/68">{nextAction}</p>
        </DarkBlock>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          <DarkFact title="Kim?" value={application.fullName} />
          <DarkFact title="Ne istiyor?" value={application.serviceType} />
          <DarkFact title="Nerede?" value={`${application.city} / ${application.district}`} />
          <DarkFact title="Ne zaman geldi?" value={formatDate(application.createdAt)} />
          <DarkFact title="Telefon" value={application.phone} />
          <DarkFact title="E-posta" value={application.email} />
          <DarkFact title="Kaynak" value={application.source} />
          <DarkFact title="Ne bekliyor?" value={applicationStateLabel(application)} />
        </div>

        <DarkBlock title="Talep açıklaması">
          <p className="text-sm leading-7 text-white/68">{application.description}</p>
        </DarkBlock>

        <DarkBlock title="Seçilen hizmetler">
          <div className="flex flex-wrap gap-2">
            {application.selectedServices?.length ? (
              application.selectedServices.map((service) => (
                <span
                  key={service.slug}
                  className="rounded-full border border-white/14 bg-white/8 px-3 py-1 text-xs text-white/72"
                >
                  {service.name}
                </span>
              ))
            ) : (
              <p className="text-sm leading-7 text-white/68">
                Bu lead için seçili hizmet kaydı yok.
              </p>
            )}
          </div>
        </DarkBlock>

        <DarkBlock title="Ek bilgiler">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            <DarkFact title="Zamanlama" value={application.timeline} />
            <DarkFact title="Bütçe alt" value={formatOptionalCurrency(application.budgetMin)} />
            <DarkFact title="Bütçe üst" value={formatOptionalCurrency(application.budgetMax)} />
            <DarkFact
              title="Form seçimi"
              value={application.projectDetails?.selectedProjectType}
            />
          </div>
        </DarkBlock>

        <div className="rounded-[1.25rem] border border-white/10 bg-white/8 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-white/38">
            Durum yönetimi
          </p>
          <select
            value={application.status}
            onChange={(event) => onStatusChange(application.id, event.target.value)}
            disabled={updating}
            className="mt-3 w-full rounded-[1rem] border border-white/10 bg-black px-3 py-3 text-sm text-white outline-none"
          >
            {kanbanStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          {updating ? (
            <p className="mt-2 text-xs text-white/46">Durum güncelleniyor...</p>
          ) : null}
          <button
            type="button"
            onClick={() => onConvert(application)}
            disabled={updating}
            className="mt-3 min-h-12 w-full rounded-full bg-white px-5 py-3 text-sm text-black"
          >
            Projeye dönüştür
          </button>
        </div>
      </div>
    </div>
  );
}

function ProjectRecordDetail({ project, workerUploads, onClear }) {
  const latestUpload = findLatestProjectUpload(project.slug, workerUploads);
  const pendingUploads = workerUploads.filter(
    (upload) => upload.projectSlug === project.slug && upload.approvalStatus === "pending"
  );
  const approvedUploads = workerUploads.filter(
    (upload) => upload.projectSlug === project.slug && upload.approvalStatus === "approved"
  );
  const risk = projectRisk(project, latestUpload);

  return (
    <div>
      <RecordHeader
        eyebrow="Proje Operasyon Kaydı"
        title={project.title}
        subtitle={project.slug}
        onClear={onClear}
      />

      <div className="mt-5 grid gap-3">
        <DarkBlock title="Durum">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            <DarkFact title="Müşteri" value={project.customerName} />
            <DarkFact title="Konum" value={project.location} />
            <DarkFact title="Aşama" value={project.status} />
            <DarkFact title="İlerleme" value={`%${project.progress}`} />
          </div>
        </DarkBlock>

        <DarkBlock title="Saha">
          <div className="grid gap-3">
            <DarkFact
              title="Son saha kaydı"
              value={
                latestUpload
                  ? `${latestUpload.workItem || "Saha"} / ${formatDate(latestUpload.createdAt)}`
                  : "Kayıt yok"
              }
            />
            <DarkFact title="Onay bekleyen" value={pendingUploads.length} />
            <DarkFact title="Müşteriye görünür" value={approvedUploads.length} />
          </div>
        </DarkBlock>

        <DarkBlock title="Finans">
          <div className="grid gap-3">
            <DarkFact title="Toplam teklif" value={formatCurrency(project.totalAmount)} />
            <DarkFact title="Tahsil edilen" value={formatCurrency(project.paidAmount)} />
            <DarkFact title="Kalan ödeme" value={formatCurrency(project.remainingAmount)} />
          </div>
        </DarkBlock>

        <DarkBlock title="Risk / Sonraki adım">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-white/14 bg-white px-3 py-1 text-xs text-black">
              {risk.label}
            </span>
            <span className="rounded-full border border-white/14 bg-white/8 px-3 py-1 text-xs text-white/66">
              {project.status}
            </span>
          </div>
          <p className="mt-3 text-sm leading-7 text-white/68">{risk.description}</p>
        </DarkBlock>

        <DarkBlock title="Belgeler">
          {project.documents?.length ? (
            <div className="grid gap-2">
              {project.documents.slice(0, 3).map((document) => (
                <div
                  key={document.id}
                  className="rounded-[1rem] border border-white/10 bg-white/8 p-3"
                >
                  <p className="text-sm text-white">{document.title}</p>
                  <p className="mt-1 text-xs text-white/44">
                    {document.type} / {formatDate(document.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-white/58">Bu proje için kayıtlı belge yok.</p>
          )}
        </DarkBlock>

        <DarkBlock title="Bağlantılar">
          <div className="grid gap-2">
            <CopyLinkButton
              label="Müşteri bağlantısını kopyala"
              value={`/client/${project.slug}/proje-takip/${project.clientToken}`}
              dark
            />
            <CopyLinkButton
              label="Saha bağlantısını kopyala"
              value={`/field/${project.slug}/usta-takip/${project.workerToken}`}
              dark
            />
          </div>
        </DarkBlock>
      </div>
    </div>
  );
}

function RecordHeader({ eyebrow, title, subtitle, onClear }) {
  return (
    <div className="border-b border-white/10 pb-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/38">{eyebrow}</p>
          <h2 className="mt-4 text-[2.1rem] leading-tight">{title}</h2>
          <p className="mt-2 break-all text-xs text-white/42">{subtitle}</p>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/8"
          aria-label="Operasyon kaydını kapat"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

function DarkBlock({ title, children }) {
  return (
    <section className="rounded-[1.25rem] border border-white/10 bg-white/8 p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-white/38">{title}</p>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function DarkFact({ title, value }) {
  return (
    <div className="rounded-[1rem] border border-white/10 bg-black/20 p-3">
      <p className="text-xs uppercase tracking-[0.14em] text-white/34">{title}</p>
      <p className="mt-2 text-sm leading-6 text-white">{value || "Belirtilmedi"}</p>
    </div>
  );
}

function ApplicationManagement({
  applications,
  selectedApplication,
  onSelect,
  onStatusChange,
  leadFilters,
  leadPagination,
  leadLoading,
  leadError,
  leadErrorKind,
  updatingLeadIds,
  onFilterChange,
  onRetry
}) {
  const activeApplication = selectedApplication;
  const activeApplications = applications.filter(isApplicationActive);
  const archivedApplications = applications.filter(
    (application) => !isApplicationDeleted(application) && isApplicationArchived(application)
  );

  return (
    <section className="rounded-[2rem] border border-black/10 bg-white p-5 lg:p-6">
      <SectionHeader
        eyebrow="Başvuru yönetimi"
        title="Teklif öncesi karar akışı"
        text="Başvurular üç ana grupta izlenir. Durum değişikliği ve projeye dönüştürme korunur."
      />
      <div className="mt-6 grid gap-3 rounded-[1.5rem] border border-black/10 bg-[#F7F7F5] p-4 lg:grid-cols-[1fr_0.65fr_0.65fr_0.55fr_auto] lg:items-end">
        <label className="grid gap-2">
          <span className="text-xs uppercase tracking-[0.14em] text-black/42">
            Arama
          </span>
          <input
            value={leadFilters.search}
            onChange={(event) => onFilterChange({ search: event.target.value })}
            placeholder="İsim, telefon veya e-posta"
            className="min-h-11 rounded-[1rem] border border-black/10 bg-white px-4 text-sm outline-none"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-xs uppercase tracking-[0.14em] text-black/42">
            Durum
          </span>
          <select
            value={leadFilters.status}
            onChange={(event) => onFilterChange({ status: event.target.value })}
            className="min-h-11 rounded-[1rem] border border-black/10 bg-white px-4 text-sm outline-none"
          >
            <option value="">Tümü</option>
            {leadStatusOptions.map(([value, label]) => (
              <option key={value} value={value}>
                {label} ({value})
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2">
          <span className="text-xs uppercase tracking-[0.14em] text-black/42">
            Kaynak
          </span>
          <input
            value={leadFilters.source}
            onChange={(event) => onFilterChange({ source: event.target.value })}
            placeholder="website"
            className="min-h-11 rounded-[1rem] border border-black/10 bg-white px-4 text-sm outline-none"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-xs uppercase tracking-[0.14em] text-black/42">
            Zaman
          </span>
          <select
            value={leadFilters.range}
            onChange={(event) => onFilterChange({ range: event.target.value })}
            className="min-h-11 rounded-[1rem] border border-black/10 bg-white px-4 text-sm outline-none"
          >
            <option value="recent">Son 30 gün</option>
            <option value="all">Tümü</option>
          </select>
        </label>
        {leadErrorKind !== "forbidden" ? (
          <button
            type="button"
            onClick={onRetry}
            className="min-h-11 rounded-full bg-black px-5 py-2 text-sm text-white"
          >
            Yenile
          </button>
        ) : null}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-black/52">
        <p>
          {leadLoading
            ? "Lead listesi yükleniyor..."
            : `${leadPagination.total} kayıt / ${leadPagination.page}. sayfa`}
        </p>
        {leadPagination.totalPages > 1 ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={leadPagination.page <= 1}
              onClick={() => onFilterChange({ page: leadPagination.page - 1 })}
              className="rounded-full border border-black/10 px-4 py-2 disabled:opacity-40"
            >
              Önceki
            </button>
            <button
              type="button"
              disabled={leadPagination.page >= leadPagination.totalPages}
              onClick={() => onFilterChange({ page: leadPagination.page + 1 })}
              className="rounded-full border border-black/10 px-4 py-2 disabled:opacity-40"
            >
              Sonraki
            </button>
          </div>
        ) : null}
      </div>
      {leadError ? (
        <div className="mt-4 rounded-[1.25rem] border border-black/10 bg-[#F7F7F5] p-4 text-sm text-black/62">
          <p>{leadError}</p>
          {leadErrorKind !== "forbidden" ? (
            <button
              type="button"
              onClick={onRetry}
              className="mt-3 rounded-full bg-black px-4 py-2 text-sm text-white"
            >
              Tekrar dene
            </button>
          ) : null}
        </div>
      ) : null}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {applicationGroups.map((group) => {
          const groupApplications = activeApplications.filter((application) =>
            group.statuses.includes(application.status)
          );
          return (
            <div
              key={group.title}
              className="rounded-[1.5rem] border border-black/10 bg-[#F7F7F5] p-4"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-xl">{group.title}</h3>
                <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-black/54">
                  {groupApplications.length}
                </span>
              </div>
              <div className="grid gap-3">
                {groupApplications.length ? (
                  groupApplications.map((application) => (
                    <ApplicationCard
                      key={application.id}
                      application={application}
                      selected={activeApplication?.id === application.id}
                      onSelect={onSelect}
                      onStatusChange={onStatusChange}
                      updating={updatingLeadIds.has(application.id)}
                    />
                  ))
                ) : (
                  <EmptyState text="Bu grupta kayıt yok." />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-[1.5rem] border border-black/10 bg-[#F7F7F5] p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-xl">İptal / Arşiv</h3>
            <p className="mt-1 text-sm text-black/48">
              Aktif teklif akışından düşen başvurular burada izlenir.
            </p>
          </div>
          <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-black/54">
            {archivedApplications.length}
          </span>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {archivedApplications.length ? (
            archivedApplications.map((application) => (
              <ApplicationArchiveCard
                key={application.id}
                application={application}
                selected={activeApplication?.id === application.id}
                onSelect={onSelect}
              />
            ))
          ) : (
            <EmptyState text="İptal edilen veya arşivlenen başvuru yok." />
          )}
        </div>
      </div>
    </section>
  );
}

function ApplicationCard({ application, selected, onSelect, onStatusChange, updating }) {
  return (
    <article
      className={`rounded-[1.25rem] border bg-white p-4 ${
        selected ? "border-black/30" : "border-black/10"
      }`}
    >
      <button type="button" onClick={() => onSelect(application)} className="w-full text-left">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-medium">{application.fullName}</h3>
            <p className="mt-1 text-sm text-black/54">{application.serviceType}</p>
            <p className="mt-1 text-xs text-black/42">{application.source}</p>
          </div>
          <span className={statusChipClass(application.status)}>{application.status}</span>
        </div>
        <div className="mt-4 grid gap-2 text-sm text-black/54">
          <InfoLine icon={MapPin} text={`${application.city} / ${application.district}`} />
          <InfoLine icon={CalendarDays} text={formatDate(application.createdAt)} />
          <p>{application.phone}</p>
          {application.email ? <p>{application.email}</p> : null}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {application.selectedServices?.length ? (
            application.selectedServices.map((service) => (
              <span
                key={service.slug}
                className="rounded-full border border-black/10 bg-[#F7F7F5] px-3 py-1 text-xs text-black/54"
              >
                {service.name}
              </span>
            ))
          ) : (
            <span className="rounded-full border border-black/10 bg-[#F7F7F5] px-3 py-1 text-xs text-black/54">
              Hizmet seçilmedi
            </span>
          )}
        </div>
        <p className="mt-4 line-clamp-2 text-sm leading-6 text-black/56">
          {application.description}
        </p>
      </button>
      <select
        value={application.status}
        onChange={(event) => onStatusChange(application.id, event.target.value)}
        disabled={updating}
        className="mt-4 w-full rounded-[1rem] border border-black/10 bg-[#F7F7F5] px-3 py-3 text-sm outline-none"
      >
        {kanbanStatuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      {updating ? <p className="mt-2 text-xs text-black/42">Güncelleniyor...</p> : null}
    </article>
  );
}

function ApplicationArchiveCard({ application, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(application)}
      className={`rounded-[1.25rem] border bg-white p-4 text-left ${
        selected ? "border-black/30" : "border-black/10"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-medium">{application.fullName}</h3>
          <p className="mt-1 text-sm text-black/54">{application.serviceType}</p>
        </div>
        <span className="rounded-full border border-black/10 bg-[#F3F3F1] px-3 py-1 text-xs text-black/62">
          {applicationStateLabel(application)}
        </span>
      </div>
      <p className="mt-4 text-sm text-black/54">
        {application.cancelReason || application.adminNotes || "Operasyon arşivinde tutuluyor."}
      </p>
      <div className="mt-4 grid gap-2 text-sm text-black/54">
        <InfoLine icon={MapPin} text={`${application.city} / ${application.district}`} />
        <InfoLine
          icon={CalendarDays}
          text={formatDate(application.cancelledAt || application.archivedAt || application.updatedAt)}
        />
      </div>
    </button>
  );
}

function FinanceSnapshot({ finance }) {
  const items = [
    ["Toplam sözleşme", formatCurrency(finance.totalOffer)],
    ["Tahsil edilen", formatCurrency(finance.collected)],
    ["Bekleyen tahsilat", formatCurrency(finance.pending)],
    ["Tahmini gider", formatCurrency(finance.estimatedCost)],
    ["Tahmini net durum", formatCurrency(finance.net)]
  ];

  return (
    <section className="rounded-[2rem] border border-black/10 bg-white p-5 lg:p-6">
      <SectionHeader
        eyebrow="Finans özeti"
        title="Nakit ve tahmini kârlılık"
        text="Detaylı hakediş ve ödeme ayrımı finans modülünde izlenir."
      />
      <div className="mt-6 grid gap-3">
        {items.map(([label, value]) => (
          <article
            key={label}
            className="rounded-[1.25rem] border border-black/10 bg-[#F7F7F5] p-4"
          >
            <p className="text-sm text-black/48">{label}</p>
            <p className="mt-2 text-2xl">{value}</p>
          </article>
        ))}
      </div>
      <a
        href="/admin/finance"
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-black px-5 py-3 text-sm text-white"
      >
        Finans görünümüne geç
      </a>
    </section>
  );
}

function LinkManagement({ projects, selectedProject, onSelect }) {
  return (
    <section className="rounded-[2rem] border border-black/10 bg-white p-5 lg:p-6">
      <SectionHeader
        eyebrow="Bağlantılar"
        title="Müşteri ve saha erişimleri"
        text="Proje bazlı özel bağlantıları kaba URL göstermeden kopyalayın."
      />
      <div className="mt-6 grid gap-3">
        {projects.map((project) => (
          <article
            key={project.id}
            className={`grid gap-4 rounded-[1.25rem] border p-4 lg:grid-cols-[1fr_auto] lg:items-center ${
              selectedProject?.id === project.id
                ? "border-black/35 bg-white"
                : "border-black/10 bg-[#F7F7F5]"
            }`}
          >
            <button type="button" onClick={() => onSelect(project)} className="text-left">
              <p className="text-lg text-black">{project.title}</p>
              <p className="mt-1 text-sm text-black/54">
                {project.customerName} / {project.location}
              </p>
            </button>
            <div className="grid gap-2 sm:grid-cols-2">
              <CopyLinkButton
                label="Müşteri bağlantısını kopyala"
                value={`/client/${project.slug}/proje-takip/${project.clientToken}`}
              />
              <CopyLinkButton
                label="Saha bağlantısını kopyala"
                value={`/field/${project.slug}/usta-takip/${project.workerToken}`}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CopyLinkButton({ label, value, dark = false }) {
  return (
    <button
      type="button"
      onClick={() => navigator.clipboard?.writeText(value)}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-4 py-2 text-xs ${
        dark
          ? "border-white/12 bg-white text-black"
          : "border-black/10 bg-white text-black"
      }`}
      title={value}
    >
      <Copy size={14} />
      {label}
    </button>
  );
}

function SectionHeader({ eyebrow, title, text }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.28em] text-black/42">{eyebrow}</p>
      <h2 className="mt-3 text-[2rem] leading-tight sm:text-[2.6rem]">{title}</h2>
      {text ? <p className="mt-3 max-w-3xl text-sm leading-6 text-black/56">{text}</p> : null}
    </div>
  );
}

function Cell({ label, value }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.16em] text-black/38">{label}</p>
      <p className="mt-1 text-sm text-black">{value || "Belirtilmedi"}</p>
    </div>
  );
}

function InfoLine({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={15} />
      <span>{text}</span>
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <div className="rounded-[1.25rem] border border-dashed border-black/10 bg-white p-4 text-sm text-black/54">
      {text}
    </div>
  );
}

function ProgressMeter({ value }) {
  const progress = Math.max(0, Math.min(100, Number(value || 0)));
  return (
    <div>
      <div className="h-2 overflow-hidden rounded-full bg-black/10">
        <div className="h-full rounded-full bg-black" style={{ width: `${progress}%` }} />
      </div>
      <p className="mt-2 text-xs text-black/48">%{progress}</p>
    </div>
  );
}

function buildOperationalKpis(applications, projects, workerUploads) {
  const finance = buildFinanceSummary(projects);
  const activeApplications = applications.filter(isApplicationActive);
  const activeProjects = projects.filter((project) =>
    ["Uygulamada", "Planlama", "Teslime Hazırlanıyor"].includes(project.status)
  );
  const pendingUploads = workerUploads.filter(
    (upload) => upload.approvalStatus === "pending"
  );
  const pendingApplications = activeApplications.filter((application) =>
    ["Yeni", "İnceleniyor", "Eksik Bilgi"].includes(application.status)
  );
  const upcomingDeliveries = projects.filter((project) =>
    ["Uygulamada", "Teslime Hazırlanıyor"].includes(project.status)
  );
  const riskyProjects = projects.filter((project) => projectRisk(project).priority === "Yüksek");

  return [
    {
      label: "Aktif projeler",
      value: activeProjects.length,
      note: "Planlama ve uygulamadaki işler",
      icon: FolderKanban
    },
    {
      label: "Bekleyen başvurular",
      value: pendingApplications.length,
      note: "İnceleme veya eksik bilgi bekliyor",
      icon: ClipboardList
    },
    {
      label: "Onay bekleyen saha kayıtları",
      value: pendingUploads.length,
      note: "Müşteriye yayınlanmadan önce kontrol",
      icon: ImageIcon
    },
    {
      label: "Bekleyen tahsilat",
      value: formatCurrency(finance.pending),
      note: "Projeler toplam kalan bakiye",
      icon: Wallet
    },
    {
      label: "Yaklaşan teslimler",
      value: upcomingDeliveries.length,
      note: "Teslim takibi isteyen aktif işler",
      icon: CalendarDays
    },
    {
      label: "Riskli işler",
      value: riskyProjects.length,
      note: "Ödeme, durum veya saha kaydı riski",
      icon: AlertTriangle
    }
  ];
}

function buildAttentionItems(applications, projects, workerUploads) {
  const activeApplications = applications.filter(isApplicationActive);
  const uploadItems = workerUploads
    .filter((upload) => upload.approvalStatus === "pending")
    .slice(0, 4)
    .map((upload) => ({
      title: "Saha kaydı onay bekliyor",
      subject: upload.projectName,
      type: "upload",
      projectSlug: upload.projectSlug,
      priority: "Yüksek",
      status: "Onay bekliyor",
      description: `${upload.workItem || "Saha"} kaydı müşteri ekranına düşmeden önce kontrol edilmeli.`
    }));

  const applicationItems = activeApplications
    .filter((application) =>
      ["Yeni", "Eksik Bilgi", "Teklif Hazırlanıyor"].includes(application.status)
    )
    .slice(0, 4)
    .map((application) => ({
      title:
        application.status === "Teklif Hazırlanıyor"
          ? "Teklif hazırlığı takip edilmeli"
          : "Başvuru değerlendirme bekliyor",
      subject: application.fullName,
      type: "application",
      refId: application.id,
      priority: application.status === "Eksik Bilgi" ? "Orta" : "Yüksek",
      status: application.status,
      description: `${application.serviceType} başvurusu için sonraki operasyon adımı netleştirilmeli.`
    }));

  const projectItems = projects
    .filter((project) => projectRisk(project).priority !== "Düşük")
    .slice(0, 4)
    .map((project) => {
      const risk = projectRisk(project);
      return {
        title: "Proje operasyon takibi gerekli",
        subject: project.title,
        type: "project",
        refId: project.id,
        priority: risk.priority,
        status: project.status,
        description: risk.description
      };
    });

  return [...uploadItems, ...applicationItems, ...projectItems].slice(0, 8);
}

function buildFinanceSummary(projects) {
  const totalOffer = projects.reduce(
    (sum, project) => sum + Number(project.totalAmount || 0),
    0
  );
  const collected = projects.reduce(
    (sum, project) => sum + Number(project.paidAmount || 0),
    0
  );
  const pending = projects.reduce(
    (sum, project) => sum + Number(project.remainingAmount || 0),
    0
  );
  const estimatedCost = Math.round(totalOffer * 0.62);

  return {
    totalOffer,
    collected,
    pending,
    estimatedCost,
    net: collected - estimatedCost
  };
}

function findLatestProjectUpload(projectSlug, workerUploads) {
  return workerUploads
    .filter((upload) => upload.projectSlug === projectSlug)
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))[0];
}

function projectRisk(project, latestUpload) {
  if (project.status === "Beklemede") {
    return {
      label: "Yüksek",
      priority: "Yüksek",
      description: "Proje beklemede. Operasyon nedeni ve sonraki karar netleşmeli."
    };
  }

  if (Number(project.remainingAmount || 0) > Number(project.paidAmount || 0) * 2) {
    return {
      label: "Orta",
      priority: "Orta",
      description: "Kalan ödeme tahsil edilen tutarın belirgin üzerinde."
    };
  }

  if (!latestUpload && project.status === "Uygulamada") {
    return {
      label: "Orta",
      priority: "Orta",
      description: "Aktif projede güncel saha kaydı görünmüyor."
    };
  }

  return {
    label: "Düşük",
    priority: "Düşük",
    description: "Operasyon riski düşük görünüyor."
  };
}

function priorityClass(priority) {
  const base =
    "inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-medium";
  if (priority === "Yüksek") return `${base} border-black bg-black text-white`;
  if (priority === "Orta") return `${base} border-black/16 bg-[#F3F3F1] text-black`;
  return `${base} border-black/10 bg-white text-black/60`;
}

function approvalStatusLabel(status) {
  if (status === "approved") return "Müşteriye görünür";
  if (status === "rejected") return "Reddedildi";
  return "Onay bekliyor";
}

function nextApplicationAction(status) {
  if (status === "Yeni") return "Başvuruyu inceleyin, kapsam ve lokasyon bilgisini netleştirin.";
  if (status === "İnceleniyor") return "Eksik bilgi varsa müşteriden isteyin veya teklif hazırlığına geçin.";
  if (status === "Eksik Bilgi") return "Eksik bilgi başlığını kapatmadan teklif aşamasına geçmeyin.";
  if (status === "Teklif Hazırlanıyor") return "Kapsam, metraj ve bütçe netleşince teklif gönderim durumuna alın.";
  if (status === "Teklif Gönderildi") return "Müşteri dönüşünü takip edin; onay sonrası projeye dönüştürün.";
  if (status === "Onaylandı") return "Projeye dönüştürerek müşteri ve saha bağlantılarını oluşturun.";
  if (status === "İptal") return "İptal gerekçesini operasyon notlarında kayıt altında tutun.";
  return "Sonraki operasyon adımını netleştirin.";
}

function isApplicationDeleted(application) {
  return Boolean(application.deleted);
}

function isApplicationArchived(application) {
  return Boolean(application.archived || application.cancelled);
}

function isApplicationActive(application) {
  return !isApplicationDeleted(application) && !isApplicationArchived(application);
}

function applicationStateLabel(application) {
  if (application.deleted) return "Kalıcı silindi";
  if (application.cancelled) return "İptal edildi";
  if (application.archived) return "Arşivlendi";
  return application.status;
}

function buildLeadListUrl(filters) {
  const params = new URLSearchParams({
    page: String(filters.page || 1),
    pageSize: "20"
  });

  if (filters.status) params.set("status", filters.status);
  if (filters.source.trim()) params.set("source", filters.source.trim());
  if (filters.search.trim()) params.set("search", filters.search.trim());

  if (filters.range === "recent") {
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - 30);
    params.set("dateFrom", dateFrom.toISOString());
  }

  return `/api/admin/leads?${params.toString()}`;
}

function mapAdminLeadApplication(lead) {
  const selectedServices = Array.isArray(lead.selectedServices)
    ? lead.selectedServices
    : [];
  const serviceType =
    lead.projectDetails?.selectedProjectType ||
    selectedServices.map((service) => service.name).join(", ") ||
    "Belirtilmedi";

  return {
    id: lead.id,
    applicationNo: lead.id,
    fullName: lead.fullName || "Belirtilmedi",
    phone: lead.phone || "Belirtilmedi",
    normalizedPhone: lead.phone || "",
    email: lead.email || "",
    city: lead.city || "Belirtilmedi",
    district: lead.district || "Belirtilmedi",
    source: lead.source || "website",
    serviceType,
    selectedServices,
    projectDetails: lead.projectDetails || {},
    description: lead.description || "Açıklama yok.",
    timeline: lead.timeline || "",
    budgetMin: lead.budgetMin ?? null,
    budgetMax: lead.budgetMax ?? null,
    status: leadStatusLabels[lead.status] || "Yeni",
    apiStatus: lead.status || "new",
    createdAt: lead.createdAt,
    updatedAt: lead.updatedAt,
    adminNotes: "",
    archived: false,
    archivedAt: "",
    cancelled: false,
    cancelledAt: "",
    cancelReason: "",
    deleted: false,
    deletedAt: ""
  };
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
    adminNotes: application.adminNotes || "",
    archived: Boolean(application.archived),
    archivedAt: application.archivedAt || "",
    cancelled: Boolean(application.cancelled),
    cancelledAt: application.cancelledAt || "",
    cancelReason: application.cancelReason || "",
    deleted: Boolean(application.deleted),
    deletedAt: application.deletedAt || ""
  };
}

function formatOptionalCurrency(value) {
  if (typeof value !== "number") return "Belirtilmedi";
  return formatCurrency(value);
}

function mapStoredApplication(application) {
  if (application.lifecycleOnly) {
    return {
      id: application.id,
      lifecycleOnly: true,
      status: normalizeApplicationStatus(
        application.status || application.statusLabel || "Yeni"
      ),
      updatedAt:
        application.updatedAt || application.createdAt || new Date().toISOString(),
      archived: Boolean(application.archived),
      archivedAt: application.archivedAt || "",
      cancelled: Boolean(application.cancelled),
      cancelledAt: application.cancelledAt || "",
      cancelReason: application.cancelReason || "",
      deleted: Boolean(application.deleted),
      deletedAt: application.deletedAt || ""
    };
  }

  const [city = "", district = ""] = String(application.location || "")
    .split("/")
    .map((part) => part.trim());

  return {
    id: application.id,
    applicationNo: application.applicationNo || application.id,
    fullName: application.fullName || application.customer || "Belirtilmedi",
    phone: application.phone || "Belirtilmedi",
    normalizedPhone: application.normalizedPhone || "",
    city: application.city || city || "Belirtilmedi",
    district: application.district || district || "Belirtilmedi",
    serviceType: application.serviceType || application.service || "Belirtilmedi",
    description:
      application.description ||
      application.projectScale ||
      application.note ||
      "Açıklama yok.",
    budgetRange: application.budgetRange || "Belirtilmedi",
    startTime: application.startTime || "Belirtilmedi",
    photos: application.photos || application.files || [],
    status: normalizeApplicationStatus(
      application.status || application.statusLabel || "Yeni"
    ),
    createdAt: application.createdAt || new Date().toISOString(),
    updatedAt:
      application.updatedAt || application.createdAt || new Date().toISOString(),
    adminNotes: application.adminNotes || application.note || "",
    archived: Boolean(application.archived),
    archivedAt: application.archivedAt || "",
    cancelled: Boolean(application.cancelled),
    cancelledAt: application.cancelledAt || "",
    cancelReason: application.cancelReason || "",
    deleted: Boolean(application.deleted),
    deletedAt: application.deletedAt || ""
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
    updatedAt:
      project.updatedAt || project.estimatedEndDate || new Date().toISOString()
  };
}

function mergeApplications(primary, fallback) {
  const fallbackById = new Map(fallback.map((application) => [application.id, application]));
  const mergedPrimary = primary.map((application) => ({
    ...(fallbackById.get(application.id) || {}),
    ...application
  }));
  const seen = new Set(primary.map((application) => application.id));
  return [
    ...mergedPrimary,
    ...fallback.filter((application) => !seen.has(application.id))
  ];
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
