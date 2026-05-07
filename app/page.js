import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Hammer,
  Home,
  Layers3,
  MessageCircle,
  PackageCheck,
  ReceiptText,
  ShieldCheck,
  Smartphone,
  WalletCards
} from "lucide-react";
import {
  expatTrackingItems,
  heroTrustItems,
  homePortfolioPreview,
  homeServices,
  materialCategories,
  qualityItems,
  trackingFeatures,
  valueRenovationItems,
  workSteps
} from "../lib/data/homePage";
import { createWhatsAppLink } from "../lib/helpers/whatsapp";
import { createSeoMetadata } from "../lib/seo";

export const metadata = createSeoMetadata({
  title:
    "BLAAG Construction and Architecture | Fotoğraflı İnşaat ve Tadilat Takibi",
  description:
    "Tadilat ve inşaat sürecinizi fotoğraflı proje takip sistemiyle şeffaf hale getirin.",
  path: "/"
});

const serviceIcons = [Building2, Home, Hammer, Layers3, ShieldCheck, BadgeCheck, Smartphone, PackageCheck];
const trackingIcons = [Camera, ClipboardCheck, WalletCards, PackageCheck, FileText, ShieldCheck, Smartphone];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-cream text-stoneDark">
      <HeroSection />
      <ProjectTrackingSection />
      <ServicesSection />
      <WorkFlowSection />
      <PortfolioPreviewSection />
      <MaterialTransparencySection />
      <QualitySection />
      <ValueRenovationSection />
      <ExpatTrackingSection />
      <FinalCtaSection />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="bg-stoneDark px-4 py-12 text-white sm:px-6 md:py-16">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-white/35">
            BLAAG Construction and Architecture
          </p>
          <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Tadilat ve İnşaat Sürecinizi Fotoğraflı Takip Sistemiyle Şeffaf Hale Getiriyoruz
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/68">
            BLAAG Construction and Architecture; konut, villa, tadilat ve değer artırma projelerinde keşiften teslimata kadar tüm süreci planlar, belgelendirir ve takip edilebilir hale getirir.
          </p>
          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
            <PrimaryLink href="/teklif-al">Teklif Al</PrimaryLink>
            <SecondaryLink href="#proje-takip">Proje Takip Sistemini Gör</SecondaryLink>
            <SecondaryLink href={createWhatsAppLink()} icon={MessageCircle}>WhatsApp ile İletişime Geç</SecondaryLink>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white p-5 text-stoneDark shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
          <div className="rounded-[1.5rem] bg-cream p-5">
            <p className="text-sm font-medium text-muted">Özel proje takip ekranı</p>
            <h2 className="mt-3 text-3xl font-semibold">Villa Renovasyon Süreci</h2>
            <div className="mt-6 grid gap-3">
              {[
                ["Bugün", "Mutfak söküm işlemi tamamlandı."],
                ["Sıradaki adım", "Elektrik altyapı kontrolü."],
                ["Durum", "BLAAG onaylı güncelleme"]
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-white p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-black/35">{label}</p>
                  <p className="mt-2 font-medium">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {["Öncesi", "Süreç", "Teslim"].map((label) => (
                <div key={label} className="aspect-[4/3] rounded-2xl border border-border bg-soft p-3 text-xs font-semibold text-muted">
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-7xl gap-3 md:grid-cols-3">
        {heroTrustItems.map((item) => (
          <div key={item.title} className="rounded-2xl border border-white/10 bg-white/8 p-5">
            <CheckCircle2 className="text-gold" size={22} />
            <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-white/60">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectTrackingSection() {
  return (
    <section id="proje-takip" className="px-4 py-14 sm:px-6 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionIntro
          eyebrow="Proje Takip Sistemi"
          title="Müşteriye Özel Proje Takip Linki"
          text="Projeniz başladıktan sonra size özel bağlantı oluşturulur. Kayıt olmadan fotoğrafları, iş durumunu, ödeme planını, kullanılan malzemeleri ve belgeleri tek ekrandan takip edebilirsiniz."
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {trackingFeatures.map((feature, index) => {
            const Icon = trackingIcons[index] || ShieldCheck;
            return (
              <FeatureCard key={feature} icon={Icon} title={feature} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="bg-soft px-4 py-14 sm:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Hizmetler"
          title="İnşaat, tadilat ve değer artırma işleri tek merkezden yönetilir."
          text="Her hizmette kapsam, malzeme, ödeme ve teslim adımları açık tutulur."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {homeServices.map((service, index) => {
            const Icon = serviceIcons[index] || Building2;
            return (
              <article key={service.title} className="rounded-[1.5rem] border border-border bg-surface p-5 shadow-card">
                <Icon className="text-gold" size={25} />
                <h3 className="mt-5 text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{service.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WorkFlowSection() {
  return (
    <section className="px-4 py-14 sm:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Nasıl Çalışıyoruz?"
          title="Sade adımlar, kayıtlı süreç, kontrollü teslim."
        />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {workSteps.map((step, index) => (
            <div key={step} className="rounded-[1.5rem] border border-border bg-surface p-5 shadow-card">
              <p className="text-sm font-semibold text-gold">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-5 text-xl font-semibold">{step}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioPreviewSection() {
  return (
    <section className="bg-soft px-4 py-14 sm:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionIntro
            eyebrow="Öncesi / Sonrası Projeler"
            title="Filtrelenebilir proje kartları için kısa önizleme."
            text="Her proje; konum, hizmet tipi ve aşama bilgisiyle kayıt altına alınır."
          />
          <a href="/hizmetler" className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 font-medium">
            Tüm Hizmetleri Gör
            <ArrowRight size={17} />
          </a>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {homePortfolioPreview.map((project) => (
            <article key={project.title} className="rounded-[1.5rem] border border-border bg-surface p-4 shadow-card">
              <div className="aspect-[4/3] rounded-2xl bg-cream p-4">
                <span className="rounded-full bg-stoneDark px-3 py-2 text-xs font-medium text-white">
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

function MaterialTransparencySection() {
  return (
    <section className="px-4 py-14 sm:px-6 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <SectionIntro
          eyebrow="Malzeme ve Marka Şeffaflığı"
          title="Hangi malzeme kullanılıyor, hangi aşamada, tek ekranda görünür."
          text="Malzeme listesi müşteri için anlaşılır, admin için yönetilebilir şekilde tutulur."
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {materialCategories.map((category) => (
            <div key={category} className="rounded-2xl border border-border bg-surface p-4 text-center font-semibold shadow-card">
              {category}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QualitySection() {
  return (
    <section className="bg-stoneDark px-4 py-14 text-white sm:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          dark
          eyebrow="Kalite / Teslim Kontrol Sistemi"
          title="Kontrollü Şantiye, Kayıtlı Süreç"
          text="BLAAG, sahadaki işi yalnızca uygulamaz; kayıt altına alır, kontrol eder ve teslim öncesi netleştirir."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {qualityItems.map((item) => (
            <div key={item} className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5">
              <ShieldCheck className="text-gold" size={24} />
              <h3 className="mt-5 text-xl font-semibold">{item}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ValueRenovationSection() {
  return (
    <section className="px-4 py-14 sm:px-6 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:items-center">
        <SectionIntro
          eyebrow="Değer Artırma Tadilatı"
          title="Satış öncesi doğru tadilat, gayrimenkulün algısını güçlendirir."
          text="BLAAG, hangi müdahalenin değer üreteceğini belirler ve işi kontrollü şekilde uygular."
        />
        <Checklist items={valueRenovationItems} />
      </div>
    </section>
  );
}

function ExpatTrackingSection() {
  return (
    <section className="bg-soft px-4 py-14 sm:px-6 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:items-center">
        <SectionIntro
          eyebrow="Gurbetçi Ev Takip Sistemi"
          title="Uzaktayken de projenizin ne durumda olduğunu net görün."
          text="Kayıt gerekmez. Size özel bağlantıdan fotoğrafları, belgeleri, ödemeleri ve ilerlemeyi takip edersiniz."
        />
        <Checklist items={expatTrackingItems} />
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section className="px-4 py-14 sm:px-6 md:py-20">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-stoneDark p-6 text-white sm:p-8 md:p-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-white/35">Teklif Al</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
              Projenizi kısa form ile başlatın.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-white/65">
              Ekibimiz kapsamı inceler ve sizinle doğrudan iletişime geçer.
            </p>
          </div>
          <div className="grid gap-3 sm:min-w-72">
            <PrimaryLink href="/teklif-al">Teklif Al</PrimaryLink>
            <SecondaryLink href={createWhatsAppLink()} icon={MessageCircle}>WhatsApp ile İletişime Geç</SecondaryLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionIntro({ eyebrow, title, text, dark = false }) {
  return (
    <div>
      <p className={`text-sm uppercase tracking-[0.25em] ${dark ? "text-white/35" : "text-black/40"}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-4 max-w-4xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl ${dark ? "text-white" : "text-stoneDark"}`}>
        {title}
      </h2>
      {text && (
        <p className={`mt-5 max-w-3xl text-lg leading-8 ${dark ? "text-white/65" : "text-muted"}`}>
          {text}
        </p>
      )}
    </div>
  );
}

function FeatureCard({ icon: Icon, title }) {
  return (
    <div className="rounded-[1.5rem] border border-border bg-surface p-5 shadow-card">
      <Icon className="text-gold" size={24} />
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
    </div>
  );
}

function Checklist({ items }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <div key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-5 shadow-card">
          <CheckCircle2 className="mt-1 shrink-0 text-gold" size={22} />
          <p className="text-lg font-medium">{item}</p>
        </div>
      ))}
    </div>
  );
}

function PrimaryLink({ href, children }) {
  return (
    <a href={href} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 font-semibold text-stoneDark">
      {children}
      <ArrowRight size={18} />
    </a>
  );
}

function SecondaryLink({ href, children, icon: Icon }) {
  const isExternal = href.startsWith("http");

  return (
    <a href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/18 px-7 py-4 font-semibold text-white hover:bg-white/5">
      {Icon && <Icon size={18} />}
      {children}
    </a>
  );
}
