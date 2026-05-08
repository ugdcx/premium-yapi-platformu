"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Camera, Filter, MapPin } from "lucide-react";
import { portfolioProjects, projectFilters } from "../../lib/data/portfolioProjects";

export default function ProjectsClient() {
  const [activeFilter, setActiveFilter] = useState("Tümü");
  const visibleProjects = useMemo(
    () => filterProjects(portfolioProjects, activeFilter),
    [activeFilter]
  );

  return (
    <main className="min-h-screen bg-cream px-4 py-6 text-stoneDark sm:px-6 sm:py-8">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-[2rem] bg-stoneDark p-6 text-white md:p-10">
          <p className="text-sm uppercase tracking-[0.25em] text-white/35">
            BLAGG portföy
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
            Projeler ve Uygulama Örnekleri
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/65">
            Villa, konut tadilatı, dış cephe, banyo, mutfak ve satışa hazırlık projelerinde süreci fotoğraf, kapsam ve malzeme bilgileriyle kayıt altına alıyoruz.
          </p>
        </header>

        <ProjectFilters activeFilter={activeFilter} onChange={setActiveFilter} />
        <ProjectGrid projects={visibleProjects} />
      </div>
    </main>
  );
}

function ProjectFilters({ activeFilter, onChange }) {
  return (
    <section className="mt-6 rounded-[2rem] border border-border bg-surface p-4 shadow-card">
      <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-muted">
        <Filter size={18} />
        Filtrele
      </div>
      <div className="mobile-scroll">
        {projectFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => onChange(filter)}
            className={`min-h-12 rounded-full border px-5 py-3 text-sm font-semibold ${
              activeFilter === filter
                ? "border-stoneDark bg-stoneDark text-white"
                : "border-border bg-cream text-stoneDark"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </section>
  );
}

function ProjectGrid({ projects }) {
  return (
    <section className="mt-6">
      {projects.length ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="rounded-[2rem] border border-border bg-surface p-6 text-muted shadow-card">
          Bu filtrede proje bulunamadı.
        </div>
      )}
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-border bg-surface shadow-card">
      <ProjectVisual label={project.category} status={project.status} />
      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          <Badge>{project.status}</Badge>
          <Badge>{project.duration}</Badge>
        </div>
        <h2 className="mt-5 text-2xl font-semibold">{project.title}</h2>
        <div className="mt-3 flex items-center gap-2 text-sm text-muted">
          <MapPin size={17} />
          {project.location}
        </div>
        <p className="mt-3 text-sm font-semibold text-stoneDark">{project.serviceType}</p>
        <p className="mt-3 leading-7 text-muted">{project.summary}</p>
        <a
          href={`/projeler/${project.slug}`}
          className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-stoneDark px-5 py-3 font-semibold text-white"
        >
          Detay Gör
          <ArrowRight size={17} />
        </a>
      </div>
    </article>
  );
}

function ProjectVisual({ label, status }) {
  return (
    <div className="relative min-h-64 bg-soft p-5">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(198,168,91,0.18),transparent_45%),linear-gradient(90deg,rgba(17,17,17,0.06)_1px,transparent_1px),linear-gradient(0deg,rgba(17,17,17,0.05)_1px,transparent_1px)] bg-[length:auto,42px_42px,42px_42px]" />
      <div className="relative flex h-full min-h-56 flex-col justify-between">
        <div className="flex justify-between gap-3">
          <Badge>{label}</Badge>
          <Badge>{status}</Badge>
        </div>
        <div>
          <Camera className="text-gold" size={34} />
          <p className="mt-3 max-w-xs text-sm font-semibold text-muted">
            Gerçek proje görselleri eklendiğinde bu alan kapak fotoğrafıyla değişir.
          </p>
        </div>
      </div>
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-stoneDark shadow-sm">
      {children}
    </span>
  );
}

function filterProjects(projects, filter) {
  if (filter === "Tümü") return projects;
  if (filter === "Devam Eden" || filter === "Tamamlanan") {
    return projects.filter((project) => project.status === filter);
  }
  if (filter === "Mutfak") {
    return projects.filter((project) => project.scope?.some((item) => item.includes("Mutfak")) || project.category === "Mutfak");
  }
  return projects.filter((project) => project.category === filter || project.serviceType.includes(filter));
}

