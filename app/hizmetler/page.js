import { ArrowRight, CheckCircle2, HelpCircle, ShieldCheck } from "lucide-react";
import { services } from "../../lib/data/services";
import { createSeoMetadata } from "../../lib/seo";

export const metadata = createSeoMetadata({
  title: "Studio Services | BLAGG Studio",
  description:
    "BLAGG Studio tasarım, renovasyon, uygulama yönetimi ve uzaktan proje takibi hizmetleri.",
  path: "/hizmetler"
});

const guideItems = [
  ["Yeni yapı istiyorum", "Anahtar Teslim İnşaat"],
  ["Villamı yenilemek istiyorum", "Villa Renovasyonu"],
  ["Evi satmadan önce hazırlamak istiyorum", "Satış Öncesi Değer Artırma"],
  ["Şehir dışından takip etmek istiyorum", "BLAGG Remote"]
];

const processSteps = ["Planla", "Uygula", "Takip Et"];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-cream px-4 py-8 text-stoneDark sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <ServiceHero />

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </section>

        <section className="mt-10 rounded-[2rem] border border-border bg-surface p-6 shadow-card md:p-8">
          <div className="flex items-center gap-3">
            <HelpCircle className="text-gold" size={25} />
            <h2 className="text-3xl font-semibold">Hangi hizmet size uygun?</h2>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {guideItems.map(([need, answer]) => (
              <div key={need} className="rounded-2xl bg-cream p-5">
                <p className="text-sm text-muted">{need}</p>
                <p className="mt-2 text-xl font-semibold">{answer}</p>
              </div>
            ))}
          </div>
        </section>

        <ServiceProcess steps={processSteps} />
        <ServiceCTA />
      </div>
    </main>
  );
}

function ServiceHero() {
  return (
    <header className="rounded-[2rem] bg-stoneDark p-7 text-white md:p-12">
      <p className="text-sm uppercase tracking-[0.25em] text-white/35">Studio Services</p>
      <h1 className="mt-4 max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-7xl">
        Her hizmet ayrı bir problem, net bir çözüm.
      </h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">
        Tasarım, renovasyon ve uygulama yönetimini sade kapsam, güçlü takip ve kontrollü teslim yaklaşımıyla yürütürüz.
      </p>
      <a href="/teklif-al" className="mt-9 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-4 font-semibold text-stoneDark">
        Projenizi Başlatın
        <ArrowRight size={18} />
      </a>
    </header>
  );
}

function ServiceCard({ service }) {
  return (
    <article className="rounded-[2rem] border border-border bg-surface p-5 shadow-card">
      <div className="flex items-start justify-between gap-4">
        <ShieldCheck className="text-gold" size={27} />
        {service.featured && (
          <span className="rounded-full bg-stoneDark px-3 py-2 text-xs font-semibold text-white">
            Öne çıkan
          </span>
        )}
      </div>
      <h2 className="mt-6 text-2xl font-semibold">{service.title}</h2>
      <p className="mt-3 leading-7 text-muted">{service.shortDescription}</p>

      <div className="mt-5 grid gap-4">
        <MiniList title="Kimler için uygun?" items={service.suitableFor.slice(0, 2)} />
        <MiniList title="Kapsama neler girebilir?" items={service.scope.slice(0, 3)} />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <a href={`/hizmetler/${service.slug}`} className="inline-flex min-h-12 items-center justify-center rounded-full border border-border px-5 py-3 font-semibold">
          Detay
        </a>
        <a href="/teklif-al" className="inline-flex min-h-12 items-center justify-center rounded-full bg-gold px-5 py-3 font-semibold text-stoneDark">
          Projenizi Başlatın
        </a>
      </div>
    </article>
  );
}

function ServiceProcess({ steps }) {
  return (
    <section className="mt-10 rounded-[2rem] border border-border bg-soft p-6 shadow-card md:p-8">
      <h2 className="text-3xl font-semibold">Süreç özeti</h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
        {steps.map((step, index) => (
          <div key={step} className="rounded-2xl bg-surface p-4">
            <p className="text-sm font-semibold text-gold">{String(index + 1).padStart(2, "0")}</p>
            <p className="mt-3 font-semibold">{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServiceCTA() {
  return (
    <section className="mt-10 rounded-[2rem] bg-stoneDark p-7 text-white md:p-12">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-white/35">Başlangıç</p>
          <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight">
            Hangi hizmetin doğru olduğunu birlikte netleştirelim.
          </h2>
        </div>
        <a href="/teklif-al" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 font-semibold text-stoneDark">
          Projemi Anlatayım
          <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}

function MiniList({ title, items }) {
  return (
    <div>
      <p className="text-sm font-semibold text-stoneDark">{title}</p>
      <div className="mt-2 grid gap-2">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-2 text-sm leading-6 text-muted">
            <CheckCircle2 className="mt-0.5 shrink-0 text-gold" size={16} />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
