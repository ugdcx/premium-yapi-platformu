import { ArrowLeft, ArrowRight, Camera, CheckCircle2, MapPin, MessageCircle, PackageCheck, ShieldCheck } from "lucide-react";
import { portfolioProjects } from "../../../lib/data/portfolioProjects";
import { createProjectWhatsAppLink } from "../../../lib/helpers/whatsapp";
import { createSeoMetadata } from "../../../lib/seo";

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }) {
  const project = portfolioProjects.find((item) => item.slug === params.slug);
  return createSeoMetadata({
    title: project ? `${project.title} | BLAGG` : "Proje Detayı | BLAGG",
    description: project?.summary || "BLAGG proje detayı.",
    path: project ? `/projeler/${project.slug}` : "/projeler"
  });
}

export default function ProjectDetailPage({ params }) {
  const project = portfolioProjects.find((item) => item.slug === params.slug);

  if (!project) {
    return (
      <main className="min-h-screen bg-cream px-4 py-8 text-stoneDark sm:px-6">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-border bg-surface p-8 shadow-card">
          <h1 className="text-4xl font-semibold">Proje bulunamadı</h1>
          <a href="/projeler" className="mt-6 inline-flex rounded-full bg-stoneDark px-6 py-3 font-semibold text-white">
            Projelere dön
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream px-4 py-6 text-stoneDark sm:px-6 sm:py-8">
      <div className="mx-auto max-w-7xl">
        <ProjectDetailHero project={project} />

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <ProjectScopeList title="Kapsam" items={project.scope} />
          <ProjectScopeList title="Yapılan İşler" items={project.works} />
        </div>

        <BeforeAfterGallery project={project} />

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <ProjectScopeList title="Kullanılan Ana Malzemeler" items={project.materials} icon={PackageCheck} />
          <ProjectScopeList title="Teslim Kontrol Listesi" items={project.checklist} icon={ShieldCheck} />
        </div>

        <ProjectCTA project={project} />
      </div>
    </main>
  );
}

function ProjectDetailHero({ project }) {
  return (
    <header className="rounded-[2rem] bg-stoneDark p-6 text-white md:p-10">
      <a href="/projeler" className="inline-flex items-center gap-2 text-sm text-white/65">
        <ArrowLeft size={17} />
        Projelere dön
      </a>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-white/35">{project.serviceType}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/65">
            {project.summary}
          </p>
          <a
            href={createProjectWhatsAppLink(project.title)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/18 px-7 py-4 font-semibold text-white hover:bg-white/5"
          >
            <MessageCircle size={18} />
            Benzer proje için WhatsApp
          </a>
        </div>
        <div className="grid gap-3 rounded-[1.5rem] bg-white/10 p-5">
          <HeroInfo label="Lokasyon" value={project.location} icon={MapPin} />
          <HeroInfo label="Durum" value={project.status} icon={CheckCircle2} />
          <HeroInfo label="Süre" value={project.duration} icon={ShieldCheck} />
        </div>
      </div>
    </header>
  );
}

function ProjectCTA({ project }) {
  return (
    <section className="mt-8 rounded-[2rem] bg-stoneDark p-6 text-white md:p-10">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-white/35">Benzer proje</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight">
            Benzer proje için teklif al
          </h2>
        </div>
        <div className="grid gap-3 sm:min-w-64">
          <a href="/teklif-al" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 font-semibold text-stoneDark">
            Projenizi Başlatın
            <ArrowRight size={18} />
          </a>
          <a
            href={createProjectWhatsAppLink(project.title)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/18 px-7 py-4 font-semibold text-white hover:bg-white/5"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function BeforeAfterGallery({ project }) {
  return (
    <section className="mt-6 rounded-[2rem] border border-border bg-surface p-5 shadow-card md:p-6">
      <div className="flex items-center gap-3">
        <Camera className="text-gold" size={24} />
        <h2 className="text-3xl font-semibold">Öncesi / Sonrası Görseller</h2>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {["Öncesi", "Süreç", "Sonrası"].map((label) => (
          <div key={label} className="min-h-72 rounded-[1.5rem] bg-soft p-5">
            <div className="flex h-full min-h-60 flex-col justify-between">
              <span className="w-fit rounded-full bg-stoneDark px-3 py-2 text-xs font-semibold text-white">
                {label}
              </span>
              <div>
                <Camera className="text-gold" size={30} />
                <p className="mt-3 text-sm font-semibold text-muted">
                  {project.title} için gerçek görsel eklendiğinde bu alan güncellenecek.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectScopeList({ title, items = [], icon: Icon = CheckCircle2 }) {
  return (
    <section className="rounded-[2rem] border border-border bg-surface p-5 shadow-card md:p-6">
      <h2 className="text-3xl font-semibold">{title}</h2>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3 rounded-2xl bg-cream p-4">
            <Icon className="mt-0.5 shrink-0 text-gold" size={20} />
            <span className="font-medium">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function HeroInfo({ label, value, icon: Icon }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <Icon className="text-gold" size={20} />
      <p className="mt-3 text-xs uppercase tracking-[0.16em] text-white/35">{label}</p>
      <p className="mt-1 font-semibold text-white">{value}</p>
    </div>
  );
}

