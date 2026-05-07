import {
  ArrowRight,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  PackageCheck,
  Route,
  ShieldCheck
} from "lucide-react";
import { processSteps, trackingSystemPoints } from "../../lib/data/processSteps";
import { createSeoMetadata } from "../../lib/seo";

export const metadata = createSeoMetadata({
  title: "Süreç | BLAAG Construction and Architecture",
  description:
    "Ön başvurudan teslimata kadar BLAAG'in kontrollü ve takip edilebilir inşaat/tadilat süreci.",
  path: "/surec"
});

const stepIcons = [FileText, ClipboardCheck, ShieldCheck, PackageCheck, FileText, CheckCircle2, Camera, FileText, ClipboardCheck, ShieldCheck];

export default function ProcessPage() {
  return (
    <main className="min-h-screen bg-cream px-4 py-8 text-stoneDark sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <ProcessHero />
        <ProcessTimeline />
        <TrackingSystemSection />
        <ProcessCTA />
      </div>
    </main>
  );
}

function ProcessHero() {
  return (
    <header className="rounded-[2rem] bg-stoneDark p-7 text-white md:p-12">
      <div className="flex flex-wrap gap-5 text-sm text-white/55">
        <a href="/">Ana sayfa</a>
        <a href="/hizmetler">Hizmetler</a>
      </div>
      <div className="mt-14 max-w-5xl">
        <p className="text-sm uppercase tracking-[0.25em] text-white/35">
          Hizmet Süreci
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-7xl">
          BLAAG Süreci Nasıl İşler?
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">
          Keşiften teslimata kadar her adımı planlı, kayıtlı ve takip edilebilir şekilde yönetiyoruz.
        </p>
      </div>
    </header>
  );
}

function ProcessTimeline() {
  return (
    <section className="mt-10 grid gap-5">
      {processSteps.map((step, index) => {
        const Icon = stepIcons[index] || ShieldCheck;
        return <ProcessStepCard key={step.title} step={step} index={index} icon={Icon} />;
      })}
    </section>
  );
}

function ProcessStepCard({ step, index, icon: Icon }) {
  return (
    <article className="grid gap-5 rounded-[2rem] border border-border bg-surface p-5 shadow-card md:grid-cols-[auto_1fr] md:p-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-stoneDark text-gold">
        <Icon size={28} />
      </div>
      <div>
        <p className="text-sm font-semibold text-gold">{String(index + 1).padStart(2, "0")}</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">{step.title}</h2>
        <p className="mt-3 max-w-3xl text-lg leading-8 text-muted">{step.description}</p>
        <div className="mt-5 grid gap-3 lg:grid-cols-3">
          <ProcessInfo title="Müşteri ne yapar?" text={step.customer} />
          <ProcessInfo title="BLAAG ne yapar?" text={step.blaag} />
          <ProcessInfo title="Çıktı nedir?" text={step.output} />
        </div>
      </div>
    </article>
  );
}

function TrackingSystemSection() {
  return (
    <section className="mt-10 grid gap-8 rounded-[2rem] border border-border bg-soft p-7 shadow-card md:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div>
        <Route className="text-gold" size={32} />
        <h2 className="mt-6 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
          Proje Takip Sistemi bu süreçte nerede devreye girer?
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
          Onaydan sonra süreç yalnızca sahada ilerlemez; müşteri ve saha ekipleri için ayrı bağlantılarla kayıt altına alınır.
        </p>
      </div>
      <div className="grid gap-4">
        {trackingSystemPoints.map((item) => (
          <div key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-5 shadow-card">
            <CheckCircle2 className="mt-1 shrink-0 text-gold" size={21} />
            <span className="text-lg leading-7 text-muted">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProcessCTA() {
  return (
    <section className="mt-10 rounded-[2rem] bg-stoneDark p-7 text-white md:p-12">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-white/35">Ön başvuru</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
            Projenizi planlamak için ön başvuru oluşturun.
          </h2>
          <p className="mt-5 max-w-2xl leading-8 text-white/60">
            Ekibimiz kapsamı inceler, eksik bilgileri netleştirir ve size uygun yolu çıkarır.
          </p>
        </div>
        <a href="/teklif-al" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 font-semibold text-stoneDark">
          Ön Başvuru Oluştur
          <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}

function ProcessInfo({ title, text }) {
  return (
    <div className="rounded-2xl bg-cream p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-black/35">{title}</p>
      <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
    </div>
  );
}
