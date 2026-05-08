import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Building2,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Layers3,
  PackageCheck,
  ShieldCheck,
  Smartphone,
  WalletCards
} from "lucide-react";
import {
  heroTrustItems,
  homePortfolioPreview,
  homeServices,
  materialCategories,
  trackingFeatures,
  workSteps
} from "../lib/data/homePage";
import { createSeoMetadata } from "../lib/seo";

export const metadata = createSeoMetadata({
  title: "BLAGG Studio | Design. Build. Track.",
  description:
    "Renovasyon sürecinizi tasarımdan teslimata kadar görünür hale getiren premium yapı stüdyosu.",
  path: "/"
});

const serviceIcons = [Building2, Layers3, BadgeCheck, PackageCheck, ShieldCheck, Smartphone];
const trackingIcons = [Camera, WalletCards, ClipboardCheck];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-cream text-stoneDark">
      <IntroSection />
      <HeroSection />
      <SignatureStatement />
      <BlaggRemoteSection />
      <ServicesSection />
      <ProjectFlowSection />
      <PortfolioPreviewSection />
      <ControlSignalSection />
      <FinalCtaSection />
    </main>
  );
}

function IntroSection() {
  return (
    <section className="flex min-h-[100svh] items-center justify-center bg-stoneDark px-4 text-white">
      <div className="text-center">
        <h1 className="text-5xl font-semibold tracking-[0.12em] sm:text-6xl md:text-7xl">
          BLAGG Studio
        </h1>
        <p className="mt-5 text-sm uppercase tracking-[0.24em] text-white/50">
          Private Architecture & Renovation Studio
        </p>
        <p className="mt-10 text-xl tracking-[0.18em] text-white/75">
          Design. Build. Track.
        </p>
        <a href="#hero" aria-label="Ana içeriğe geç" className="mx-auto mt-16 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/70">
          <ArrowDown size={20} />
        </a>
      </div>
    </section>
  );
}

function HeroSection() {
  return (
    <section id="hero" className="px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-muted">BLAGG Studio</p>
          <h2 className="mt-5 max-w-5xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-7xl">
            Renovasyon sürecinizi tasarımdan teslimata kadar görünür hale getiriyoruz.
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
            BLAGG Studio; seçilmiş yapı ve renovasyon projelerini tasarım, uygulama ve takip sistemiyle yöneten premium proje stüdyosudur.
          </p>
          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
            <PrimaryLink href="/teklif-al">Projenizi Başlatın</PrimaryLink>
            <SecondaryLink href="/blagg-remote">BLAGG Remote'u Görün</SecondaryLink>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {heroTrustItems.map((item) => (
              <div key={item.title} className="border-t border-border pt-4">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-border bg-surface p-4 shadow-card">
          <div className="aspect-[4/5] rounded-[1.5rem] bg-stoneDark p-5 text-white">
            <div className="flex h-full flex-col justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-white/40">Private Project Access</p>
                <h3 className="mt-4 text-4xl font-semibold">BLAGG Remote</h3>
              </div>
              <div className="grid gap-3">
                {["Onaylı fotoğraflar", "Ödeme planı", "Belgeler"].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/8 p-4">
                    <p className="font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SignatureStatement() {
  return (
    <section className="bg-stoneDark px-4 py-16 text-white sm:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-7xl">
          <p>Selected projects.</p>
          <p>Controlled execution.</p>
          <p>Visible progress.</p>
        </div>
        <p className="mt-8 max-w-2xl text-lg leading-8 text-white/60">
          Seçilmiş projeler. Kontrollü uygulama. Görünür ilerleme.
        </p>
      </div>
    </section>
  );
}

function BlaggRemoteSection() {
  return (
    <section className="px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionIntro
          eyebrow="BLAGG Remote"
          title="Projenize özel bağlantı ile ilerlemeyi tek ekrandan izleyin."
          text="Fotoğraflar, ödemeler, belgeler ve ilerleme notları kayıt olmadan görüntülenir."
        />
        <div className="grid gap-3 sm:grid-cols-3">
          {trackingFeatures.map((feature, index) => {
            const Icon = trackingIcons[index] || ShieldCheck;
            return <FeatureCard key={feature} icon={Icon} title={feature} />;
          })}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="bg-soft px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Studio Services"
          title="Tasarım, renovasyon ve uygulama yönetimi."
          text="Her hizmet kısa kapsam, net aksiyon ve takip edilebilir teslim mantığıyla ele alınır."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {homeServices.map((service, index) => {
            const Icon = serviceIcons[index] || Building2;
            return (
              <article key={service.title} className="rounded-[1.5rem] border border-border bg-surface p-5 shadow-card">
                <Icon className="text-graphite" size={25} />
                <h3 className="mt-5 text-2xl font-semibold">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{service.text}</p>
                <a href={service.href} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-stoneDark">
                  Detay
                  <ArrowRight size={16} />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectFlowSection() {
  return (
    <section className="px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Three-step project flow."
          title="Karmaşık renovasyon sürecini üç net aşamada yönetiyoruz."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {workSteps.map((step, index) => (
            <article key={step.title} className="rounded-[1.5rem] border border-border bg-surface p-6 shadow-card">
              <p className="text-sm font-semibold text-graphite">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-5 text-3xl font-semibold">{step.title}</h3>
              <p className="mt-3 leading-7 text-muted">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioPreviewSection() {
  return (
    <section className="bg-soft px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionIntro
            eyebrow="Selected Projects"
            title="Gerçek uygulamalar ve süreç kayıtları burada yer alır."
          />
          <a href="/projeler" className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 font-medium">
            Projeleri Gör
            <ArrowRight size={17} />
          </a>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {homePortfolioPreview.map((project) => (
            <article key={project.title} className="rounded-[1.5rem] border border-border bg-surface p-4 shadow-card">
              <div className="aspect-[4/3] rounded-2xl bg-[linear-gradient(135deg,#0A0A0A_0%,#1F2937_55%,#E5E7EB_100%)] p-4">
                <span className="rounded-full bg-white/90 px-3 py-2 text-xs font-medium text-stoneDark">
                  {project.stage}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-semibold">{project.title}</h3>
              <p className="mt-2 text-sm text-muted">{project.category}</p>
              <p className="mt-1 text-sm text-muted">{project.location}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ControlSignalSection() {
  return (
    <section className="px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] bg-stoneDark p-7 text-white md:p-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-white/35">BLAGG Control</p>
          <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
            Behind every project, a controlled operating system.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/60">
            Başvurular, teklifler, fotoğraflar, ödemeler ve saha ilerlemesi BLAGG Control üzerinden yönetilir.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {materialCategories.slice(0, 6).map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/8 p-4 font-medium text-white/75">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section className="px-4 pb-16 sm:px-6 md:pb-24">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-border bg-surface p-7 shadow-card md:p-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-muted">Start</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
              Projenizi görünür hale getirelim.
            </h2>
          </div>
          <PrimaryLink href="/teklif-al">Projenizi Başlatın</PrimaryLink>
        </div>
      </div>
    </section>
  );
}

function SectionIntro({ eyebrow, title, text }) {
  return (
    <div>
      <p className="text-sm uppercase tracking-[0.25em] text-muted">{eyebrow}</p>
      <h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {text && <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{text}</p>}
    </div>
  );
}

function FeatureCard({ icon: Icon, title }) {
  return (
    <div className="rounded-[1.5rem] border border-border bg-surface p-5 shadow-card">
      <Icon className="text-graphite" size={24} />
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
    </div>
  );
}

function PrimaryLink({ href, children }) {
  return (
    <a href={href} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-stoneDark px-7 py-4 font-semibold text-white">
      {children}
      <ArrowRight size={18} />
    </a>
  );
}

function SecondaryLink({ href, children }) {
  return (
    <a href={href} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-border bg-white px-7 py-4 font-semibold text-stoneDark">
      {children}
      <ArrowRight size={18} />
    </a>
  );
}

