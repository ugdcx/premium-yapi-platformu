import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import SectionContainer from "../components/SectionContainer";
import { ProjectImageSlot } from "../components/PhotoPlaceholder";
import { featuredProjects } from "../lib/data/projects";
import {
  heroServiceBand,
  heroStudioIndex,
  homeServices,
  remoteFeatures,
  studioPrinciples
} from "../lib/data/homePage";
import { createSeoMetadata } from "../lib/seo";

export const metadata = createSeoMetadata({
  title: "BLAGG Studio | Tasarla. Uygula. Takip Et.",
  description:
    "BLAGG Studio; tasarım, uygulama ve proje takibini tek sorumluluk altında birleştiren özel mimarlık ve renovasyon stüdyosudur.",
  path: "/"
});

export default function HomePage() {
  return (
    <main className="home-snap overflow-x-hidden bg-[#F7F7F5] text-[#111111]">
      <HeroSection />
      <StudioDefinitionSection />
      <ServicesSection />
      <RemoteTeaserSection />
      <SelectedProjectsSection />
      <FinalCtaSection />
    </main>
  );
}

function HeroSection() {
  return (
    <SectionContainer
      id="hero"
      className="home-snap-section relative flex min-h-[100svh] items-stretch overflow-hidden bg-[#050505] text-white"
    >
      <div className="grid min-h-[100svh] w-full gap-7 pb-[clamp(1.5rem,4vh,3.2rem)] pt-[clamp(6.25rem,10vh,8rem)] lg:grid-cols-[minmax(0,0.88fr)_minmax(24rem,0.82fr)] lg:grid-rows-[minmax(0,1fr)_auto] lg:items-stretch">
        <div className="flex flex-col justify-between lg:min-h-0">
          <div className="max-w-5xl">
            <div className="reveal flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.28em] text-white/42">
              <span>Butik renovasyon stüdyosu</span>
              <span className="hidden h-px w-12 bg-white/16 sm:block" />
              <span>Tasarla. Uygula. Takip Et.</span>
            </div>
            <h1 className="reveal reveal-delay-1 mt-6 max-w-[8.6ch] font-serif text-[clamp(3.65rem,8.8vw,8.4rem)] font-semibold leading-[0.86] tracking-[-0.04em]">
              BLAGG Studio
            </h1>
            <p className="reveal reveal-delay-2 mt-6 max-w-2xl text-[clamp(1.22rem,2vw,1.85rem)] leading-[1.32] text-white/84">
              Design-led renovation. Visible execution.
            </p>
            <p className="reveal reveal-delay-2 mt-7 max-w-2xl text-[clamp(1rem,1.35vw,1.22rem)] leading-[1.75] text-white/62">
              Tasarım, uygulama ve takip tek sistemde.
            </p>
            <div className="reveal reveal-delay-2 mt-8 flex flex-wrap items-center gap-5">
              <PrimaryLink href="/teklif-al" className="bg-white text-black hover:bg-white">
                Projenizi Başlatın
              </PrimaryLink>
              <p className="max-w-xs text-sm leading-6 text-white/42">
                İlk adım: kapsamı netleştirmek.
              </p>
            </div>
          </div>

          <div className="reveal reveal-delay-3 mt-12 grid gap-6 lg:mt-8">
            <div className="grid gap-5 border-l border-white/16 pl-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
              <p className="max-w-2xl text-base leading-7 text-white/64 sm:text-lg">
                Renovasyonu tasarım, saha disiplini ve görünür kayıtla yönetiyoruz.
              </p>
            </div>

            <div className="grid gap-0 border-y border-white/10">
              {heroStudioIndex.map((item) => (
                <div
                  key={item.number}
                  className="grid grid-cols-[4rem_minmax(0,1fr)_auto] items-center gap-4 border-b border-white/10 py-4 last:border-b-0 sm:grid-cols-[5rem_minmax(0,1fr)_10rem]"
                >
                  <p className="text-xs uppercase tracking-[0.24em] text-white/32">
                    {item.number}
                  </p>
                  <p className="text-lg text-white/82">{item.title}</p>
                  <p className="text-right text-sm text-white/38">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-5 text-xs uppercase tracking-[0.22em] text-white/36">
              <span>Studio sistemini keşfedin</span>
              <span className="hidden h-px flex-1 bg-white/12 sm:block" />
              <span>Aşağı</span>
            </div>
          </div>
        </div>

        <div className="reveal reveal-delay-3 relative min-h-[22rem] overflow-hidden rounded-[2rem] border border-white/10 bg-[#111111] sm:min-h-[28rem] lg:min-h-0">
          <Image
            src="/images/blagg/hero-architecture-01.jpg"
            alt="BLAGG Studio mimari renovasyon görseli"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover grayscale contrast-125 brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/86 via-black/20 to-black/24" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.46),transparent_42%,rgba(0,0,0,0.34))]" />
          <div className="absolute inset-x-5 top-5 grid grid-cols-[1fr_auto] items-start gap-4 text-xs uppercase tracking-[0.24em] text-white/38 sm:inset-x-8 sm:top-8">
            <span>Mimari renovasyon</span>
            <span className="rounded-full border border-white/12 bg-black/28 px-3 py-2 text-white/52">
              Kontrollü süreç
            </span>
          </div>
          <div className="absolute inset-x-5 bottom-5 sm:inset-x-8 sm:bottom-8">
            <div className="mb-6 h-px w-full bg-white/14" />
            <p className="text-xs uppercase tracking-[0.28em] text-white/38">
              Mimari karar + saha disiplini
            </p>
            <p className="mt-4 max-w-md text-[clamp(1.65rem,2.6vw,2.85rem)] leading-[1.02] text-white/88">
              Tek sorumluluk. Net kayıt. Kontrollü teslim.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-0 border-t border-white/10 text-sm text-white/50 sm:grid-cols-4">
            {heroServiceBand.map((item) => (
              <div
                key={item}
                className="border-b border-white/10 py-3.5 sm:border-b-0 sm:border-r sm:px-5 first:sm:pl-0 last:sm:border-r-0"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}

function StudioDefinitionSection() {
  return (
    <SectionContainer
      id="studio-definition"
      className="home-snap-section border-t border-black/8 py-16 sm:py-20"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(18rem,0.54fr)_minmax(0,1.46fr)] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="text-xs uppercase tracking-[0.3em] text-black/45">
            Studio Modeli
          </p>
          <h2 className="mt-5 max-w-[10ch] text-[2.25rem] leading-[0.98] sm:text-[3.25rem] lg:text-[4rem]">
            Az proje. Daha fazla kontrol.
          </h2>
          <p className="mt-6 max-w-sm text-base leading-7 text-black/52">
            Kapsam, saha ve takip aynı stüdyo disiplini içinde tutulur.
          </p>
        </div>

        <div>
          <div className="relative mb-7 aspect-[16/8.4] overflow-hidden rounded-[2rem] bg-[#111111]">
            <Image
              src="/images/blagg/studio-detail-01.jpg"
              alt="BLAGG Studio malzeme ve iç mekan detay görseli"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/42 via-transparent to-transparent" />
          </div>
          <p className="max-w-3xl text-[clamp(1.08rem,1.45vw,1.32rem)] leading-[1.65] text-black/72">
            Mimari karar ve saha uygulaması aynı çizgide ilerler. Süreç kısa,
            okunur ve kayıtlı kalır.
          </p>

          <div className="mt-7 grid gap-0 border-t border-black/10">
            {studioPrinciples.map((item) => (
              <article
                key={item.title}
                className="grid gap-4 border-b border-black/10 py-5 sm:grid-cols-[9rem_minmax(0,1fr)]"
              >
                <h3 className="text-2xl leading-tight">{item.title}</h3>
                <p className="max-w-2xl text-base leading-7 text-black/56">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}

function ServicesSection() {
  return (
    <SectionContainer
      id="services"
      className="home-snap-section border-t border-black/8 py-16 sm:py-20"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(16rem,0.34fr)_minmax(0,0.66fr)] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="text-xs uppercase tracking-[0.3em] text-black/45">
            Hizmetler
          </p>
          <h2 className="mt-5 text-[2.2rem] leading-[0.98] sm:text-[3.1rem]">
            Studio disiplinleri.
          </h2>
        </div>

        <div className="border-t border-black/10">
          {homeServices.map((service) => (
            <article
              key={service.number}
              className="group grid gap-5 border-b border-black/10 py-6 sm:grid-cols-[4rem_minmax(0,1fr)_auto] sm:items-start"
            >
              <p className="text-2xl text-black/28">{service.number}</p>
              <div className="max-w-2xl">
                {service.image ? (
                    <div className="relative mb-4 aspect-[16/7] overflow-hidden rounded-[1.5rem] bg-[#111111]">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/28 via-transparent to-transparent" />
                  </div>
                ) : null}
                <h3 className="text-2xl leading-tight sm:text-[2.15rem]">
                  {service.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-black/54">
                  {service.text}
                </p>
              </div>
              <Link
                href={service.href}
                className="inline-flex items-center gap-2 self-start text-sm uppercase tracking-[0.18em] text-black/46 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-black"
              >
                İncele
                <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}

function RemoteTeaserSection() {
  return (
    <SectionContainer
      id="remote"
      className="home-snap-section bg-[#050505] py-16 text-white sm:py-20"
    >
      <div className="grid min-h-[min(74svh,42rem)] gap-9 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/42">
            BLAGG Remote
          </p>
          <h2 className="home-section-title mt-5 max-w-[10ch]">
            Projenize ait sessiz takip alanı.
          </h2>
          <p className="mt-6 max-w-2xl text-[clamp(1.05rem,1.35vw,1.25rem)] leading-[1.8] text-white/62">
            Üyelik yok. Uygulama yok. Size özel bağlantı.
          </p>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-[#101010] p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-5 border-b border-white/10 pb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/38">
                Özel proje bağlantısı
              </p>
              <h3 className="mt-3 text-3xl leading-tight text-white">
                Özel proje kaydı
              </h3>
            </div>
            <span className="rounded-full border border-white/12 bg-white px-4 py-2 text-sm text-black">
              Onaylı
            </span>
          </div>

          <div className="mt-8 grid gap-0 border-y border-white/10">
            {remoteFeatures.map((item) => (
              <div key={item} className="border-b border-white/10 py-5 last:border-b-0">
                <p className="text-lg leading-7 text-white/72">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}

function SelectedProjectsSection() {
  const selectedProjects = featuredProjects.slice(0, 2);

  return (
    <SectionContainer id="projects" className="home-snap-section py-16 sm:py-20">
      <div className="flex flex-col gap-5 border-b border-black/8 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-black/45">
            Projeler
          </p>
          <h2 className="home-section-title mt-5">Seçili iki çalışma.</h2>
        </div>
        <SecondaryLink href="/projeler">Projeleri İnceleyin</SecondaryLink>
      </div>

      <div className="mt-10 grid gap-7 lg:grid-cols-2">
        {selectedProjects.map((project) => (
          <article key={project.slug} className="space-y-5">
            <ProjectImageSlot project={project} />
            <p className="max-w-2xl text-base leading-7 text-black/56">
              {project.summary}
            </p>
          </article>
        ))}
      </div>
    </SectionContainer>
  );
}

function FinalCtaSection() {
  return (
    <SectionContainer
      id="final-cta"
      className="home-snap-section home-section-space flex min-h-[56svh] items-center bg-[#050505] text-white"
    >
      <div className="max-w-4xl">
        <p className="text-xs uppercase tracking-[0.3em] text-white/42">
          İlk adım
        </p>
        <h2 className="home-section-title mt-5 max-w-[11ch]">
          Projenizi görünür şekilde başlatın.
        </h2>
        <PrimaryLink href="/teklif-al" className="mt-9 bg-white text-black hover:bg-white">
          Projenizi Başlatın
        </PrimaryLink>
      </div>
    </SectionContainer>
  );
}

function PrimaryLink({ href, children, className = "" }) {
  return (
    <Link
      href={href}
      className={`premium-button inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-base font-medium text-white ${className}`}
    >
      {children}
      <ArrowRight size={18} />
    </Link>
  );
}

function SecondaryLink({ href, children, className = "" }) {
  return (
    <Link
      href={href}
      className={`premium-outline-button inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-black/12 bg-white px-7 py-4 text-base font-medium text-black ${className}`}
    >
      {children}
      <ArrowRight size={18} />
    </Link>
  );
}
