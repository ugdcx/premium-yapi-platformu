import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredProjects } from "../../lib/data/projects";
import { createSeoMetadata } from "../../lib/seo";

export const metadata = createSeoMetadata({
  title: "Projeler | BLAGG Studio",
  description:
    "BLAGG Studio seçili konut yenileme, iç mekân dönüşümü ve kontrollü uygulama kayıtları.",
  path: "/projeler"
});

const archiveNotes = [
  "Az sayıda çalışma",
  "Büyük görsel yüzey",
  "Kontrollü süreç kaydı"
];

export default function ProjectsPage() {
  return (
    <main className="bg-[#F7F7F5] pt-24 text-[#111111]">
      <section className="mx-auto max-w-[90rem] px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
        <header className="grid gap-7 border-b border-black/8 pb-8 lg:min-h-[calc(54svh-6rem)] lg:grid-cols-[minmax(0,0.82fr)_minmax(18rem,0.5fr)] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-black/45">
              Seçili projeler
            </p>
            <h1 className="mt-5 max-w-5xl text-[2.65rem] leading-[0.92] sm:text-[4rem] lg:text-[4.95rem]">
              Az sayıda iş. Güçlü mekân etkisi.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-black/58 sm:text-lg">
              Proje arşivi kalabalık için değil; mimari karar, uygulama disiplini ve
              görünür süreç taşıyan işler için tutulur.
            </p>
          </div>

          <div className="grid gap-0 border-y border-black/10">
            {archiveNotes.map((item) => (
              <p
                key={item}
                className="border-b border-black/10 py-4 text-base text-black/62 last:border-b-0"
              >
                {item}
              </p>
            ))}
          </div>
        </header>

        <section className="mt-8 grid gap-12">
          {featuredProjects.map((project, index) => (
            <AtmosphereProject key={project.slug} project={project} index={index} />
          ))}
        </section>

        <section className="mt-10 grid gap-8 rounded-[2rem] bg-black p-6 text-white sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/42">
              Çalışma seçimi
            </p>
            <h2 className="mt-5 text-[2.15rem] leading-tight sm:text-[2.9rem]">
              Bu arşiv yalnızca seçili çalışmalar için tutulur.
            </h2>
          </div>
          <div>
            <p className="max-w-3xl text-base leading-8 text-white/58 sm:text-lg">
              Seçici çalışıyoruz. Kapsam, beklenti ve uygulama disiplini doğru
              örtüşüyorsa süreç görünür şekilde başlar.
            </p>
            <Link href="/teklif-al" className="premium-button mt-8 bg-white text-black">
              Projenizi Başlatın
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}

function AtmosphereProject({ project, index }) {
  const imagePriority = index === 0;

  return (
    <article className="group border-b border-black/10 pb-10 last:border-b-0">
      <div className="grid gap-7 lg:grid-cols-[minmax(0,1.18fr)_minmax(21rem,0.58fr)] lg:items-end">
        <div
          className={`relative min-h-[20rem] overflow-hidden rounded-[2rem] bg-black sm:min-h-[25rem] lg:min-h-[30rem] ${
            index % 2 === 1 ? "lg:order-2" : ""
          }`}
        >
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={project.coverAlt || `${project.name} proje atmosferi`}
              fill
              priority={imagePriority}
              sizes="(max-width: 1024px) 100vw, 62vw"
              className="object-cover grayscale contrast-110 brightness-90 transition-transform duration-700 ease-out group-hover:scale-[1.025]"
            />
          ) : (
            <div className="absolute inset-0 bg-[#111111]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/14 to-black/18" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.42),transparent_44%,rgba(0,0,0,0.24))]" />
          <div className="absolute inset-x-5 top-5 flex items-start justify-between gap-4 text-xs uppercase tracking-[0.24em] text-white/44 sm:inset-x-8 sm:top-8">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span>{project.intent}</span>
          </div>
          <div className="absolute inset-x-5 bottom-5 sm:inset-x-8 sm:bottom-8">
            <p className="max-w-2xl text-[1.85rem] leading-tight text-white sm:text-[2.8rem]">
              {project.name}
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-white/54">
              <span>{project.location}</span>
              <span>{project.scope}</span>
              <span>{project.status}</span>
            </div>
          </div>
        </div>

        <div className={index % 2 === 1 ? "lg:order-1" : ""}>
          <p className="text-xs uppercase tracking-[0.3em] text-black/38">
            Proje {String(index + 1).padStart(2, "0")}
          </p>
          <h2 className="mt-5 max-w-[12ch] text-[2.25rem] leading-tight sm:text-[3.2rem]">
            {project.atmosphere}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-black/58 sm:text-lg">
            {project.summary}
          </p>
          <div className="mt-8 grid gap-0 border-y border-black/10">
            <MetaRow label="Lokasyon" value={project.location} />
            <MetaRow label="Kapsam" value={project.scope} />
            <MetaRow label="Durum" value={project.status} />
          </div>
        </div>
      </div>
    </article>
  );
}

function MetaRow({ label, value }) {
  return (
    <div className="grid gap-3 border-b border-black/10 py-4 last:border-b-0 sm:grid-cols-[8rem_minmax(0,1fr)]">
      <p className="text-xs uppercase tracking-[0.22em] text-black/36">{label}</p>
      <p className="text-base text-black/70">{value}</p>
    </div>
  );
}
