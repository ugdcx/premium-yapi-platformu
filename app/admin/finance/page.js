"use client";

import {
  BriefcaseBusiness,
  TrendingUp,
  Wallet
} from "lucide-react";
import { projects } from "../../../lib/data/mockData";
import { formatCurrency } from "../../../lib/helpers/format";
import { statusChipClass } from "../../../lib/designSystem";
import { useDemoRoleGuard } from "../../../lib/demoAuth";

const tabs = [
  "Genel Özet",
  "Müşteri Tahsilatları",
  "Usta Ödemeleri",
  "Tedarikçi Ödemeleri",
  "Genel Giderler",
  "Proje Kârlılığı"
];

export default function AdminFinancePage() {
  const canView = useDemoRoleGuard("admin");
  const totalSales = projects.reduce(
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
    ["Net Kâr", formatCurrency(netProfit), TrendingUp],
    ["Kâr Marjı", `%${margin}`, TrendingUp]
  ];

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
    <main className="min-h-screen bg-[#F7F7F5] px-4 py-8 text-[#111111] sm:px-6">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-[2rem] border border-black/10 bg-black p-7 text-white md:p-12">
          <p className="text-xs uppercase tracking-[0.3em] text-white/42">
            BLAGG Control / Finans
          </p>
          <h1 className="mt-4 text-[2.8rem] leading-[0.98] md:text-[4rem]">
            Finans ve proje kârlılığı
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/62">
            Tahsilat, gider, usta ve tedarikçi ödemeleri proje kayıtları üzerinden ayrıştırılır.
          </p>
        </header>

        <nav className="mt-6 mobile-scroll">
          {tabs.map((tab, index) => (
            <span
              key={tab}
              className={`shrink-0 rounded-full px-4 py-3 text-sm ${
                index === 0
                  ? "bg-black text-white"
                  : "border border-black/10 bg-white text-black/64"
              }`}
            >
              {tab}
            </span>
          ))}
        </nav>

        <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {summary.map(([label, value, Icon]) => (
            <article
              key={label}
              className="rounded-[1.5rem] border border-black/10 bg-white p-5"
            >
              <Icon className="text-black/72" size={22} />
              <p className="mt-4 text-sm text-black/48">{label}</p>
              <p className="mt-2 text-3xl">{value}</p>
            </article>
          ))}
        </section>

        <section className="mt-6 rounded-[2rem] border border-black/10 bg-white p-5 md:p-6">
          <h2 className="text-[2rem]">Proje kârlılığı</h2>
          <div className="mt-5 grid gap-3">
            {projects.map((project) => {
              const projectCost = Math.round(Number(project.totalAmount || 0) * 0.62);
              const profit = Number(project.paidAmount || 0) - projectCost;
              return (
                <article
                  key={project.id}
                  className="grid gap-3 rounded-[1.25rem] border border-black/10 bg-[#F7F7F5] p-4 md:grid-cols-4 md:items-center"
                >
                  <div>
                    <p className="font-medium">{project.title}</p>
                    <p className="mt-1 text-sm text-black/54">{project.serviceType}</p>
                  </div>
                  <Cell label="Satış" value={formatCurrency(project.totalAmount)} />
                  <Cell label="Maliyet" value={formatCurrency(projectCost)} />
                  <div>
                    <Cell label="Net kâr" value={formatCurrency(profit)} />
                    <div className="mt-2">
                      <span className={statusChipClass(profit >= 0 ? "Onaylandı" : "Sorun Var")}>
                        {profit >= 0 ? "Pozitif" : "Negatif"}
                      </span>
                    </div>
                  </div>
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
      <p className="text-xs uppercase tracking-[0.16em] text-black/38">{label}</p>
      <p className="mt-1 text-sm text-black">{value}</p>
    </div>
  );
}
