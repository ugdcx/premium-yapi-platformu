import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import SectionContainer from "../../components/SectionContainer";
import { PublicImageFallback } from "../../components/PhotoPlaceholder";
import { serviceDisciplines } from "../../lib/data/services";
import { createSeoMetadata } from "../../lib/seo";

export const metadata = createSeoMetadata({
  title: "Hizmetler | BLAGG Studio",
  description:
    "BLAGG Studio, seçilmiş projelerde tasarım, uygulama ve takip süreçlerini tek sorumluluk altında yönetir.",
  path: "/hizmetler"
});

const disciplineIndex = ["Tasarım", "Uygulama", "Takip", "Teslim"];

export default function ServicesPage() {
  return (
    <main className="bg-[#F7F7F5] pt-24 text-[#111111]">
      <SectionContainer className="pb-16 pt-6 sm:pb-20">
        <header className="grid gap-7 border-b border-black/8 pb-8 lg:min-h-[calc(52svh-6rem)] lg:grid-cols-[minmax(0,0.78fr)_minmax(18rem,0.5fr)] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-black/45">
              Stüdyo disiplinleri
            </p>
            <h1 className="mt-5 max-w-4xl text-[2.65rem] leading-[0.94] sm:text-[3.8rem] lg:text-[4.65rem]">
              Kapsam değil, kontrol edilen disiplinler.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-black/58 sm:text-lg">
              Her hizmet aynı prensiple ilerler: net kapsam, kontrollü uygulama,
              görünür süreç.
            </p>
          </div>

          <div className="grid gap-0 border-y border-black/10 sm:grid-cols-2 lg:grid-cols-1">
            {disciplineIndex.map((item) => (
              <div
                key={item}
                className="border-black/10 py-4 text-base text-black/66 sm:border-r sm:px-4 lg:border-b lg:border-r-0 last:border-0"
              >
                {item}
              </div>
            ))}
          </div>
        </header>

        <section className="mt-8 border-t border-black/10">
          {serviceDisciplines.map((service) => (
            <article
              key={service.title}
              className="group grid gap-6 border-b border-black/10 py-8 transition-colors duration-300 hover:bg-white/42 lg:grid-cols-[6rem_minmax(0,0.82fr)_minmax(18rem,0.48fr)] lg:items-center"
            >
              <p className="text-[3.4rem] leading-none text-black/12 transition-colors duration-300 group-hover:text-black">
                {service.disciplineNumber}
              </p>
              <div>
                <h2 className="max-w-[16ch] text-[2.05rem] leading-tight sm:text-[2.85rem]">
                  {service.title}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-black/58 sm:text-lg">
                  {service.disciplineText}
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.22em] text-black/34">
                  {service.disciplinePrinciple}
                </p>
                <Link
                  href={`/hizmetler/${service.slug}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-black/48 transition-colors duration-300 group-hover:text-black"
                >
                  İncele
                  <ArrowRight size={16} />
                </Link>
              </div>

              <VisualSurface src={service.image} title={service.title} />
            </article>
          ))}
        </section>

        <section className="mt-10 grid gap-8 rounded-[2rem] bg-black p-6 text-white sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/42">
              Çalışma ilkesi
            </p>
            <h2 className="mt-5 text-[2.15rem] leading-tight sm:text-[2.9rem]">
              Az proje. Net sorumluluk. Kontrollü teslim.
            </h2>
          </div>
          <div>
            <p className="max-w-3xl text-base leading-8 text-white/58 sm:text-lg">
              Her proje önce kapsam ve uyum açısından değerlendirilir.
            </p>
            <PrimaryLink href="/teklif-al" className="mt-8 bg-white text-black">
              Projenizi Başlatın
            </PrimaryLink>
          </div>
        </section>
      </SectionContainer>
    </main>
  );
}

function VisualSurface({ src, title }) {
  if (!src) {
    return <PublicImageFallback ratio="wide" className="min-h-[15rem] lg:min-h-[18rem]" />;
  }

  return (
    <div className="relative min-h-[15rem] overflow-hidden rounded-[2rem] bg-black lg:min-h-[18rem]">
      <Image
        src={src}
        alt={`${title} görseli`}
        fill
        sizes="(max-width: 1024px) 100vw, 28vw"
        className="object-cover grayscale contrast-110 transition-transform duration-700 group-hover:scale-[1.025]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/68 via-black/12 to-black/18" />
    </div>
  );
}

function PrimaryLink({ href, children, className = "" }) {
  return (
    <Link href={href} className={`premium-button ${className}`}>
      {children}
      <ArrowRight size={18} />
    </Link>
  );
}
