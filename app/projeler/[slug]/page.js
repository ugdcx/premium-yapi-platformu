import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { portfolioProjects } from "../../../lib/data/portfolioProjects";
import { findProjectAtmosphere } from "../../../lib/data/projects";
import { createSeoMetadata } from "../../../lib/seo";

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }) {
  const project = portfolioProjects.find((item) => item.slug === params.slug);
  const atmosphere = findProjectAtmosphere(params.slug);

  return createSeoMetadata({
    title: project ? `${project.title} | BLAGG Studio` : "Proje Detayı | BLAGG Studio",
    description:
      atmosphere?.atmosphere || project?.summary || "BLAGG Studio proje detay görünümü.",
    path: project ? `/projeler/${project.slug}` : "/projeler"
  });
}

export default function ProjectDetailPage({ params }) {
  const project = portfolioProjects.find((item) => item.slug === params.slug);
  const atmosphere = findProjectAtmosphere(params.slug);

  if (!project) {
    return (
      <main className="bg-[#F7F7F5] px-4 py-8 text-[#111111] sm:px-6">
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-black p-8 text-white">
          <h1 className="text-[2.5rem]">Proje bulunamadı</h1>
          <Link
            href="/projeler"
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 text-black"
          >
            Projelere dön
          </Link>
        </div>
      </main>
    );
  }

  const record = {
    atmosphere: atmosphere?.atmosphere || project.summary,
    intent: atmosphere?.intent || project.stage || "Süreç kaydı",
    coverImage: atmosphere?.coverImage || project.coverImage || "",
    coverAlt: atmosphere?.coverAlt || `${project.title} atmosfer kaydı`
  };

  return (
    <main className="bg-[#F7F7F5] px-4 pb-8 pt-24 text-[#111111] sm:px-6">
      <div className="mx-auto max-w-[90rem]">
        <header className="overflow-hidden rounded-[2rem] bg-black text-white">
          <div className="grid lg:min-h-[calc(68svh-3rem)] lg:grid-cols-[minmax(0,1.12fr)_minmax(24rem,0.58fr)]">
            <ProjectHeroVisual project={project} record={record} />

            <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
              <div>
                <Link
                  href="/projeler"
                  className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-white/56"
                >
                  <ArrowLeft size={16} />
                  Projelere dön
                </Link>

                <p className="mt-9 text-xs uppercase tracking-[0.28em] text-white/42">
                  Proje kaydı
                </p>
                <h1 className="mt-5 text-[2.45rem] leading-[0.92] sm:text-[3.5rem] lg:text-[4.15rem]">
                  {project.title}
                </h1>
                <p className="mt-7 text-lg leading-8 text-white/62">
                  {record.atmosphere}
                </p>
              </div>

              <div className="mt-8 grid gap-0 border-y border-white/10">
                <HeroInfo label="Lokasyon" value={project.location} />
                <HeroInfo label="Kapsam" value={project.serviceType} />
                <HeroInfo label="Durum" value={project.status} />
                <HeroInfo label="Yıl" value={project.year} />
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-9 py-10 lg:grid-cols-[0.32fr_0.68fr]">
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <p className="text-xs uppercase tracking-[0.3em] text-black/45">
              Proje kaydı
            </p>
            <h2 className="mt-5 max-w-sm text-[2.05rem] leading-tight sm:text-[2.7rem]">
              Karar, uygulama ve süreç aynı yerde okunur.
            </h2>
          </aside>

          <div className="grid gap-10">
            <ProjectList title="Kapsam" items={project.scope} />
            <ProjectList title="Karar ve uygulama kaydı" items={project.works?.slice(0, 4)} />
          </div>
        </section>

        <section className="grid gap-8 rounded-[2rem] bg-black p-6 text-white sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-white/42">
              Kapanış
            </p>
            <h2 className="mt-5 text-[2.1rem] leading-tight sm:text-[2.85rem]">
              Proje yalnızca sonuç değil, okunabilir bir süreç kaydıdır.
            </h2>
          </div>
          <p className="max-w-3xl text-base leading-8 text-white/58 sm:text-lg">
            Malzeme, uygulama, kontrol ve teslim adımları proje kapsamına göre
            sadeleştirilir.
          </p>
        </section>

        <section className="grid gap-8 border-t border-black/8 pt-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-black/42">
              Benzer proje
            </p>
            <h2 className="mt-3 text-[2.1rem] leading-tight sm:text-[2.75rem]">
              Benzer bir proje başlatın.
            </h2>
          </div>

          <Link
            href="/teklif-al"
            className="premium-button inline-flex w-full min-h-14 items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-white sm:w-auto"
          >
            Projenizi Başlatın
            <ArrowRight size={18} />
          </Link>
        </section>
      </div>
    </main>
  );
}

function ProjectHeroVisual({ project, record }) {
  return (
    <div className="relative min-h-[26rem] overflow-hidden bg-[#111111] lg:min-h-0">
      {record.coverImage ? (
        <Image
          src={record.coverImage}
          alt={record.coverAlt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover grayscale contrast-110 brightness-90"
        />
      ) : (
        <div className="absolute inset-0 bg-[#111111]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/18 to-black/24" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.48),transparent_45%,rgba(0,0,0,0.22))]" />
      <div className="absolute inset-x-5 top-5 flex items-start justify-between gap-4 text-xs uppercase tracking-[0.24em] text-white/44 sm:inset-x-8 sm:top-8">
        <span>{record.intent}</span>
        <span>{project.stage}</span>
      </div>
      <div className="absolute inset-x-5 bottom-5 sm:inset-x-8 sm:bottom-8">
        <p className="max-w-3xl text-[1.8rem] leading-tight text-white sm:text-[3rem]">
          {project.summary}
        </p>
      </div>
    </div>
  );
}

function ProjectList({ title, items = [] }) {
  return (
    <section>
      <p className="text-xs uppercase tracking-[0.3em] text-black/45">{title}</p>
      <div className="mt-5 grid gap-0 border-t border-black/10">
        {items.map((item, index) => (
          <article
            key={item}
            className="grid gap-4 border-b border-black/10 py-5 sm:grid-cols-[4rem_minmax(0,1fr)]"
          >
            <p className="text-xl text-black/22">{String(index + 1).padStart(2, "0")}</p>
            <p className="text-base leading-8 text-black/64 sm:text-lg">{item}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HeroInfo({ label, value }) {
  return (
    <div className="grid gap-2 border-b border-white/10 py-5 last:border-b-0">
      <p className="text-xs uppercase tracking-[0.2em] text-white/42">{label}</p>
      <p className="text-lg text-white">{value}</p>
    </div>
  );
}
