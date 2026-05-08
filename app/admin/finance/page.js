import { BriefcaseBusiness, TrendingUp, Wallet } from "lucide-react";
import { projects } from "../../../lib/data/mockData";
import { formatCurrency } from "../../../lib/helpers/format";

export const metadata = {
  title: "Finans | BLAGG Control",
  description: "BLAGG Control finans ve proje kârlılığı görünümü."
};

const tabs = [
  "Genel Özet",
  "Müşteri Tahsilatları",
  "Usta Ödemeleri",
  "Tedarikçi Ödemeleri",
  "Genel Giderler",
  "Proje Kârlılığı"
];

export default function AdminFinancePage() {
  const totalSales = projects.reduce((sum, project) => sum + Number(project.totalAmount || 0), 0);
  const collected = projects.reduce((sum, project) => sum + Number(project.paidAmount || 0), 0);
  const pending = projects.reduce((sum, project) => sum + Number(project.remainingAmount || 0), 0);
  const materialCost = Math.round(totalSales * 0.34);
  const workerCost = Math.round(totalSales * 0.24);
  const supplierCost = Math.round(totalSales * 0.12);
  const overhead = Math.round(totalSales * 0.06);
  const totalCost = materialCost + workerCost + supplierCost + overhead;
  const netProfit = collected - totalCost;
  const margin = totalSales ? Math.round((netProfit / totalSales) * 100) : 0;

  const summary = [
    ["Toplam Tahsilat", formatCurrency(collected), Wallet],
    ["Bekleyen Tahsilat", formatCurrency(pending), Wallet],
    ["Toplam Gider", formatCurrency(totalCost), BriefcaseBusiness],
    ["Usta Ödemeleri", formatCurrency(workerCost), BriefcaseBusiness],
    ["Tedarikçi Ödemeleri", formatCurrency(supplierCost), BriefcaseBusiness],
    ["Genel Giderler", formatCurrency(overhead), BriefcaseBusiness],
    ["Net Kâr", formatCurrency(netProfit), TrendingUp],
    ["Kâr Marjı", `%${margin}`, TrendingUp],
    ["Kasa Durumu", formatCurrency(collected - Math.round(totalCost * 0.4)), Wallet]
  ];

  return (
    <main className="min-h-screen bg-cream px-4 py-8 text-stoneDark sm:px-6">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-[2rem] bg-stoneDark p-7 text-white md:p-12">
          <p className="text-sm uppercase tracking-[0.25em] text-white/35">BLAGG Control / Finans</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            Finans ve proje kârlılığı
          </h1>
          <p className="mt-5 max-w-2xl leading-8 text-white/65">
            Tahsilat, gider, usta ve tedarikçi ödemeleri proje kayıtları üzerinden ayrıştırılır.
          </p>
        </header>

        <nav className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {tabs.map((tab, index) => (
            <span key={tab} className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${index === 0 ? "bg-stoneDark text-white" : "border border-border bg-surface text-muted"}`}>
              {tab}
            </span>
          ))}
        </nav>

        <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {summary.map(([label, value, Icon]) => (
            <article key={label} className="rounded-[1.5rem] border border-border bg-surface p-5 shadow-card">
              <Icon className="text-graphite" size={23} />
              <p className="mt-4 text-sm text-muted">{label}</p>
              <p className="mt-2 text-3xl font-semibold">{value}</p>
            </article>
          ))}
        </section>

        <section className="mt-6 rounded-[2rem] border border-border bg-surface p-5 shadow-card md:p-6">
          <h2 className="text-3xl font-semibold">Proje kârlılığı</h2>
          <div className="mt-5 grid gap-3">
            {projects.map((project) => {
              const projectCost = Math.round(Number(project.totalAmount || 0) * 0.62);
              const profit = Number(project.paidAmount || 0) - projectCost;
              return (
                <article key={project.id} className="grid gap-3 rounded-2xl bg-cream p-4 md:grid-cols-4 md:items-center">
                  <div>
                    <p className="font-semibold">{project.title}</p>
                    <p className="mt-1 text-sm text-muted">{project.serviceType}</p>
                  </div>
                  <Cell label="Proje satış tutarı" value={formatCurrency(project.totalAmount)} />
                  <Cell label="Toplam maliyet" value={formatCurrency(projectCost)} />
                  <Cell label="Net kâr" value={formatCurrency(profit)} />
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

function Cell({ label, value }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.16em] text-black/35">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}

