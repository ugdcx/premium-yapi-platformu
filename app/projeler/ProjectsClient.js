"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectImageSlot } from "../../components/PhotoPlaceholder";
import { featuredProjects } from "../../lib/data/projects";

const filters = ["Tümü", "Konut Yenileme", "İç Mekân Dönüşümü", "Devam Ediyor", "Planlama Aşamasında"];

export default function ProjectsClient() {
  const [activeFilter, setActiveFilter] = useState("Tümü");
  const projects = useMemo(() => {
    if (activeFilter === "Tümü") return featuredProjects;
    return featuredProjects.filter(
      (project) =>
        project.scope === activeFilter || project.status === activeFilter
    );
  }, [activeFilter]);

  return (
    <main className="bg-[#F7F7F5] pt-24 text-[#111111]">
      <section className="mx-auto max-w-[90rem] px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
        <header className="max-w-5xl border-b border-black/8 pb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-black/45">
            Projeler
          </p>
          <h1 className="mt-5 text-[3rem] leading-[0.98] sm:text-[4.5rem]">
            Seçili projeler ve kontrollü uygulama kayıtları
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-black/58">
            Az sayıda, kontrollü ve belgelenmiş proje. Burada yalnızca sonuç değil,
            sürecin mimari dili ve uygulama ritmi de görünür olur.
          </p>
        </header>

        <section className="grid gap-4 py-8 sm:grid-cols-3">
          {[
            "Konut yenileme",
            "İç mekân dönüşümü",
            "Planlama ve uygulama kayıtları"
          ].map((item) => (
            <div
              key={item}
              className="premium-panel premium-hover px-4 py-4 text-sm text-black/62"
            >
              {item}
            </div>
          ))}
        </section>

        <section className="mt-8">
          <div className="mobile-scroll">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-5 py-3 text-sm uppercase tracking-[0.14em] transition-[background-color,border-color,color,transform] duration-300 ${
                  activeFilter === filter
                    ? "border-black bg-black text-white shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
                    : "border-black/10 bg-white text-black/68 hover:-translate-y-0.5 hover:border-black/20 hover:text-black"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <article key={project.slug} className="space-y-4">
              <ProjectImageSlot project={project} />
              <div className="border-t border-black/10 pt-4">
                <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-black/44">
                  <span>{project.scope}</span>
                  <span>{project.location}</span>
                  <span>{project.status}</span>
                </div>
                <p className="mt-4 max-w-2xl text-base leading-7 text-black/58">
                  {project.summary}
                </p>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-12 grid gap-8 border-t border-black/8 pt-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-black/45">
              Çalışma seçimi
            </p>
            <h2 className="mt-5 text-[2.3rem] leading-tight sm:text-[3rem]">
              Her proje bu arşive girmez.
            </h2>
          </div>
          <div>
            <p className="max-w-3xl text-base leading-8 text-black/58 sm:text-lg">
              BLAGG Studio, görsel yoğunluk için değil; kontrollü süreç ve net sonuç
              üreten projeler için çalışır.
            </p>
            <Link
              href="/teklif-al"
              className="premium-button mt-8"
            >
              Projenizi Başlatın
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
