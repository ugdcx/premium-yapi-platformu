import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import SectionContainer from "../../../components/SectionContainer";
import { PublicImageFallback } from "../../../components/PhotoPlaceholder";
import { findServiceBySlug, services } from "../../../lib/data/services";
import { createSeoMetadata } from "../../../lib/seo";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }) {
  const service = findServiceBySlug(params.slug);

  if (!service) {
    return createSeoMetadata({
      title: "Hizmet | BLAGG Studio",
      path: "/hizmetler"
    });
  }

  return createSeoMetadata({
    title: `${service.title} | BLAGG Studio`,
    description: service.shortDescription,
    path: `/hizmetler/${service.slug}`
  });
}

export default function ServiceDetailPage({ params }) {
  const service = findServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="bg-[#F7F7F5] pt-24 text-[#111111]">
      <SectionContainer className="pb-16 pt-6 sm:pb-20">
        <header className="grid gap-7 rounded-[2rem] bg-black p-6 text-white sm:p-8 lg:min-h-[calc(62svh-6rem)] lg:grid-cols-[minmax(0,0.94fr)_minmax(22rem,0.62fr)] lg:items-stretch lg:p-10">
          <div className="flex flex-col justify-between">
            <div>
              <Link
                href="/hizmetler"
                className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-white/56"
              >
                <ArrowLeft size={16} />
                Hizmetlere dön
              </Link>

              <p className="mt-9 text-xs uppercase tracking-[0.3em] text-white/42">
                Uzmanlık alanı
              </p>
              <h1 className="mt-5 max-w-5xl text-[2.55rem] leading-[0.92] sm:text-[3.75rem] lg:text-[4.75rem]">
                {service.title}
              </h1>
            </div>

            <div className="mt-8 grid gap-7 lg:grid-cols-[minmax(0,1fr)_12rem] lg:items-end">
              <p className="max-w-3xl text-lg leading-8 text-white/64">
                {service.promise || service.description}
              </p>
              <p className="border-t border-white/10 pt-5 text-xs uppercase tracking-[0.22em] text-white/36">
                {service.disciplinePrinciple || "BLAGG yaklaşımı"}
              </p>
            </div>
          </div>

          <div className="grid min-h-[24rem] grid-rows-[1fr_auto] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#101010]">
            {service.image ? (
              <div className="relative min-h-[15rem]">
                <Image
                  src={service.image}
                  alt={`${service.title} görseli`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 28vw"
                  className="object-cover grayscale contrast-110 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/16" />
              </div>
            ) : (
              <PublicImageFallback ratio="wide" className="min-h-[15rem] rounded-none" />
            )}
            <div className="border-t border-white/10 p-5 sm:p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-white/38">
                Çalışma odağı
              </p>
              <p className="mt-4 text-2xl leading-tight text-white/86">
                Net kapsam. Kontrollü saha. Görünür süreç.
              </p>
            </div>
          </div>
        </header>

        <section className="grid gap-9 py-10 lg:grid-cols-[0.32fr_0.68fr]">
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <p className="text-xs uppercase tracking-[0.3em] text-black/45">
              Uzmanlık çerçevesi
            </p>
            <h2 className="mt-5 max-w-sm text-[2.05rem] leading-tight sm:text-[2.7rem]">
              Doğru kapsam, doğru uygulama dili.
            </h2>
          </aside>

          <div className="grid gap-10">
            <EditorialList title="Kimler için?" items={service.suitableFor} />
            <EditorialList
              title="Kapsamda değerlendirilen başlıklar"
              items={service.scope}
            />
          </div>
        </section>

        <section className="grid gap-8 rounded-[2rem] bg-black p-6 text-white sm:p-8 lg:grid-cols-[0.74fr_1.26fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/42">
              BLAGG yaklaşımı
            </p>
            <h2 className="mt-5 text-[2.15rem] leading-tight sm:text-[2.9rem]">
              Her kapsam bir tasarım ve uygulama kararıdır.
            </h2>
          </div>
          <div>
            <p className="max-w-3xl text-base leading-8 text-white/62 sm:text-lg">
              {service.approach || service.quality}
            </p>
            <p className="mt-6 border-t border-white/10 pt-5 text-sm leading-7 text-white/46">
              {service.tracking}
            </p>
          </div>
        </section>

        <section className="grid gap-8 border-t border-black/8 pt-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-black/45">
              Başlat
            </p>
            <h2 className="mt-5 text-[2.05rem] leading-tight sm:text-[2.65rem]">
              Proje kapsamınızı birlikte değerlendirelim.
            </h2>
          </div>
          <div>
            <p className="max-w-3xl text-base leading-8 text-black/58 sm:text-lg">
              Önce kapsam ve uyum netleşir; ardından çalışma çerçevesi kurulur.
            </p>
            <PrimaryLink href="/teklif-al" className="mt-8">
              Projenizi Başlatın
            </PrimaryLink>
          </div>
        </section>
      </SectionContainer>
    </main>
  );
}

function EditorialList({ title, items }) {
  return (
    <section>
      <p className="text-xs uppercase tracking-[0.3em] text-black/45">{title}</p>
      <div className="mt-6 grid gap-0 border-t border-black/10">
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

function PrimaryLink({ href, children, className = "" }) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-base font-medium text-white ${className}`}
    >
      {children}
      <ArrowRight size={18} />
    </Link>
  );
}
