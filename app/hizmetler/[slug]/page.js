import { ArrowLeft, ArrowRight, CheckCircle2, HelpCircle, MessageCircle, PackageCheck, Route, ShieldCheck } from "lucide-react";
import { services } from "../../../lib/data/services";
import { createServiceWhatsAppLink } from "../../../lib/helpers/whatsapp";
import { createSeoMetadata } from "../../../lib/seo";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }) {
  const service = services.find((item) => item.slug === params.slug);
  return createSeoMetadata({
    title: service ? `${service.title} | BLAAG Hizmetleri` : "Hizmet Detayı | BLAAG",
    description: service?.shortDescription || "BLAAG hizmet detayı.",
    path: service ? `/hizmetler/${service.slug}` : "/hizmetler"
  });
}

export default function ServiceDetailPage({ params }) {
  const service = services.find((item) => item.slug === params.slug);

  if (!service) {
    return (
      <main className="min-h-screen bg-cream px-4 py-8 text-stoneDark sm:px-6">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-border bg-surface p-8 shadow-card">
          <h1 className="text-4xl font-semibold">Hizmet bulunamadı</h1>
          <a href="/hizmetler" className="mt-6 inline-flex rounded-full bg-stoneDark px-6 py-3 font-semibold text-white">
            Hizmetlere dön
          </a>
        </div>
      </main>
    );
  }

  return <ServiceDetailLayout service={service} />;
}

function ServiceDetailLayout({ service }) {
  return (
    <main className="min-h-screen bg-cream px-4 py-6 text-stoneDark sm:px-6 sm:py-8">
      <div className="mx-auto max-w-7xl">
        <ServiceHero service={service} />

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <ServiceScope title="Bu hizmet kimler için?" items={service.suitableFor} />
          <ServiceScope title="Kapsama neler dahil olabilir?" items={service.scope} />
        </div>

        <ServiceProcess steps={service.process} />

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <InfoPanel
            icon={PackageCheck}
            title="Malzeme / kalite yaklaşımı"
            text={service.quality}
          />
          <InfoPanel
            icon={Route}
            title="Proje takip sistemi nasıl kullanılır?"
            text={service.tracking}
          />
        </section>

        <ServiceFAQ items={service.faq} />
        <ServiceCTA title={service.title} />
      </div>
    </main>
  );
}

function ServiceHero({ service }) {
  const whatsappHref = createServiceWhatsAppLink(service.title);

  return (
    <header className="rounded-[2rem] bg-stoneDark p-6 text-white md:p-10">
      <a href="/hizmetler" className="inline-flex items-center gap-2 text-sm text-white/65">
        <ArrowLeft size={17} />
        Hizmetlere dön
      </a>
      <p className="mt-10 text-sm uppercase tracking-[0.25em] text-white/35">BLAAG Hizmeti</p>
      <h1 className="mt-4 max-w-5xl text-4xl font-semibold tracking-tight md:text-6xl">
        {service.title}
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-white/65">
        {service.description}
      </p>
      <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
        <a href="/teklif-al" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 font-semibold text-stoneDark">
          Bu hizmet için teklif al
          <ArrowRight size={18} />
        </a>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/18 px-7 py-4 font-semibold text-white hover:bg-white/5"
        >
          <MessageCircle size={18} />
          WhatsApp
        </a>
      </div>
    </header>
  );
}

function ServiceScope({ title, items }) {
  return (
    <section className="rounded-[2rem] border border-border bg-surface p-5 shadow-card md:p-6">
      <h2 className="text-3xl font-semibold">{title}</h2>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3 rounded-2xl bg-cream p-4">
            <CheckCircle2 className="mt-0.5 shrink-0 text-gold" size={20} />
            <span className="font-medium">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServiceProcess({ steps }) {
  return (
    <section className="mt-6 rounded-[2rem] border border-border bg-soft p-5 shadow-card md:p-6">
      <h2 className="text-3xl font-semibold">Süreç nasıl işler?</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
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

function InfoPanel({ icon: Icon, title, text }) {
  return (
    <section className="rounded-[2rem] border border-border bg-surface p-5 shadow-card md:p-6">
      <Icon className="text-gold" size={27} />
      <h2 className="mt-5 text-3xl font-semibold">{title}</h2>
      <p className="mt-4 text-lg leading-8 text-muted">{text}</p>
    </section>
  );
}

function ServiceFAQ({ items }) {
  return (
    <section className="mt-6 rounded-[2rem] border border-border bg-surface p-5 shadow-card md:p-6">
      <div className="flex items-center gap-3">
        <HelpCircle className="text-gold" size={25} />
        <h2 className="text-3xl font-semibold">Sık sorulan sorular</h2>
      </div>
      <div className="mt-5 grid gap-3">
        {items.map(([question, answer]) => (
          <div key={question} className="rounded-2xl bg-cream p-5">
            <h3 className="text-xl font-semibold">{question}</h3>
            <p className="mt-2 leading-7 text-muted">{answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServiceCTA({ title }) {
  const whatsappHref = createServiceWhatsAppLink(title);

  return (
    <section className="mt-8 rounded-[2rem] bg-stoneDark p-6 text-white md:p-10">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <ShieldCheck className="text-gold" size={28} />
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight">
            {title} için net kapsam çıkaralım.
          </h2>
        </div>
        <div className="grid gap-3 sm:min-w-64">
          <a href="/teklif-al" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 font-semibold text-stoneDark">
            Teklif Al
            <ArrowRight size={18} />
          </a>
          <a
            href={whatsappHref}
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
