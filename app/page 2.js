import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import SectionContainer from "../components/SectionContainer";
import {
  PhotoPlaceholder,
  ProjectImageSlot
} from "../components/PhotoPlaceholder";
import { featuredProjects } from "../lib/data/projects";
import {
  homeServices,
  processSteps,
  remoteFeatures
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
      <IntroSection />
      <HeroSection />
      <StudioDefinitionSection />
      <ServicesSection />
      <RemoteTeaserSection />
      <SelectedProjectsSection />
      <ProcessSection />
      <FaqSection />
      <FinalCtaSection />
    </main>
  );
}

function IntroSection() {
  return (
    <SectionContainer
      id="intro"
      as="section"
      className="home-snap-section relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#050505] px-0 text-white"
    >
      <div className="mx-auto flex min-h-[100svh] w-full max-w-4xl flex-col items-center justify-center px-4 pb-[clamp(5rem,10vh,7rem)] pt-[clamp(6rem,11vh,8.5rem)] text-center sm:px-6">
        <h1 className="reveal home-display-title max-w-4xl">
          BLAGG Studio
        </h1>
        <p className="reveal reveal-delay-1 mt-6 text-xs uppercase tracking-[0.32em] text-white/56 sm:text-sm">
          Özel Mimarlık & Renovasyon Stüdyosu
        </p>
        <p className="reveal reveal-delay-2 mt-6 text-[clamp(1rem,1.8vw,1.25rem)] tracking-[0.22em] text-white/78">
          Design. Build. Track.
        </p>
      </div>
      <Link
        href="#hero"
        aria-label="Hero bölümüne in"
        className="reveal reveal-delay-3 ambient-float absolute bottom-[clamp(1.5rem,4vh,3rem)] left-1/2 inline-flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border border-white/14 text-white/64"
      >
        <ArrowDown size={18} />
      </Link>
    </SectionContainer>
  );
}

function HeroSection() {
  return (
    <SectionContainer
      id="hero"
      className="home-snap-section home-section-space min-h-[100svh] scroll-mt-24"
    >
      <div className="grid min-h-[calc(100svh-clamp(9rem,14vh,11rem))] gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(21rem,0.72fr)] lg:items-center xl:gap-14">
        <div className="max-w-[48rem]">
          <p className="text-xs uppercase tracking-[0.3em] text-black/45">
            BLAGG STUDIO
          </p>
          <h2 className="home-hero-title mt-5 max-w-[12ch]">
            Design-led renovation.
            <br />
            Visible execution.
          </h2>
          <p className="home-body-large mt-6 max-w-2xl text-black/82">
            Tasarım, uygulama ve takip tek sistemde.
          </p>
          <p className="mt-5 max-w-2xl text-[clamp(1rem,1.15vw,1.125rem)] leading-[1.85] text-black/58">
            Seçilmiş projelerde tasarım kararından uygulama sürecine kadar tüm
            adımları görünür, belgeli ve kontrollü şekilde yönetiyoruz.
          </p>
          <div className="mt-9 grid gap-3 sm:flex sm:flex-wrap">
            <PrimaryLink href="/teklif-al">Projenizi Başlatın</PrimaryLink>
            <SecondaryLink href="/surec">Süreci Görün</SecondaryLink>
          </div>
        </div>

        <PhotoPlaceholder
          label="MİMARİ DETAY"
          title="Malzeme, mekân ve uygulama kararı"
          helperText="Seçili proje görsel alanı"
          ratio="portrait"
          className="ambient-float ambient-float-delay mx-auto w-full max-w-[32rem] lg:max-w-none"
        />
      </div>
    </SectionContainer>
  );
}

function StudioDefinitionSection() {
  return (
    <SectionContainer
      id="studio-definition"
      className="home-snap-section home-section-space border-t border-black/8"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-black/45">
            STUDIO TANIMI
          </p>
          <h2 className="home-section-title mt-5 max-w-[11ch]">
            Kısa, net ve kontrollü bir çalışma modeli.
          </h2>
        </div>

        <div className="grid gap-5">
          <p className="home-body-large max-w-3xl text-black/76">
            BLAGG Studio, tasarım kararını uygulama disipliniyle birleştiren özel
            mimarlık ve renovasyon stüdyosudur. Az sayıda projede derinlik,
            görünür süreç ve kontrollü teslim mantığıyla çalışır.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            <DefinitionCard
              title="Mimari yaklaşım"
              text="Tasarım, yalnızca estetik karar değil; kullanım, malzeme ve uygulama bütünlüğüdür."
            />
            <DefinitionCard
              title="İç mekân odağı"
              text="Yaşam kalitesini yükselten planlama, yüzey, ışık ve depolama kararları birlikte ele alınır."
            />
            <DefinitionCard
              title="Peyzaj bütünlüğü"
              text="Bahçe, giriş ve açık alanlar yapının devamı olarak aynı dil içinde kurgulanır."
            />
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
      className="home-snap-section home-section-space border-t border-black/8"
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(18rem,0.42fr)_minmax(0,0.58fr)]">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-black/45">
            HİZMET ALANI
          </p>
          <h2 className="home-section-title mt-5">Hizmetler</h2>
          <p className="home-body-large mt-5 max-w-lg text-black/58">
            BLAGG Studio, seçilmiş projelerde tasarım, uygulama ve takip süreçlerini
            tek sorumluluk altında yönetir.
          </p>
        </div>

        <div className="border-t border-black/10">
          {homeServices.map((service) => (
            <article
              key={service.number}
              className="group grid gap-5 border-b border-black/10 py-7 sm:grid-cols-[4.25rem_minmax(0,1fr)_auto] sm:items-start"
            >
              <p className="text-3xl text-black/30">{service.number}</p>
              <div className="max-w-2xl">
                <h3 className="text-2xl sm:text-[2rem]">{service.title}</h3>
                <p className="mt-3 text-base leading-7 text-black/56">
                  {service.text}
                </p>
              </div>
              <Link
                href={service.href}
                className="inline-flex items-center gap-2 self-start text-sm uppercase tracking-[0.18em] text-black/52 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-black"
              >
                İncele
                <ArrowRight size={16} />
              </Link>
            </article>
          ))}
          <PrimaryLink href="/teklif-al" className="mt-8">
            Projenizi Başlatın
          </PrimaryLink>
        </div>
      </div>
    </SectionContainer>
  );
}

function RemoteTeaserSection() {
  return (
    <SectionContainer
      id="remote"
      className="home-snap-section home-section-space bg-[#111111] text-white"
    >
      <div className="grid min-h-[min(100svh,56rem)] gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center xl:gap-12">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/44">
            BLAGG REMOTE
          </p>
          <h2 className="home-section-title mt-5 max-w-3xl">
            Projeniz uzakta olsa da kontrol sizde kalır.
          </h2>
          <p className="home-body-large mt-5 max-w-2xl text-white/62">
            Aktif projelerde size özel bir takip bağlantısı oluşturulur.
            Fotoğraflar, aşamalar, belgeler ve önemli kararlar proje ekranınızda
            görünür hale gelir.
          </p>
          <p className="mt-6 text-sm uppercase tracking-[0.22em] text-white/72">
            Uygulama indirmeniz gerekmez. Üyelik oluşturmanız gerekmez. Size özel
            bağlantı yeterlidir.
          </p>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/54">
            Bu alan bir yazılım değil; projenize ait görünür kayıt akışıdır.
            Takip alanınız, onaylanan fotoğrafları, belgeleri ve kritik kararları
            tek yerde toplar.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {remoteFeatures.map((item) => (
              <div
                key={item}
                className="border-t border-white/10 py-3 text-base text-white/74"
              >
                {item}
              </div>
            ))}
          </div>
          <PrimaryLink
            href="/blagg-remote"
            className="mt-8 bg-white text-black hover:bg-white"
          >
            BLAGG Remote&apos;u Görün
          </PrimaryLink>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-black/24 p-4 sm:p-6">
          <div className="rounded-[1.75rem] border border-white/10 bg-[#151515] p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/8 pb-5">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/42">
                  Proje kaydı
                </p>
                <h3 className="mt-2 text-2xl text-white">Villa K.</h3>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-[0.24em] text-white/42">
                  Güncel aşama
                </p>
                <p className="mt-2 text-sm text-white/72">Uygulama & Denetim</p>
              </div>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-white/40">
                  İlerleme
                </p>
                <p className="mt-3 text-[2.4rem] text-white">68%</p>
                <div className="mt-4 h-2 rounded-full bg-white/10">
                  <div className="h-2 w-[68%] rounded-full bg-white/70" />
                </div>
                <p className="mt-4 text-sm text-white/56">
                  Son güncelleme: Fotoğraf güncellemesi eklendi
                </p>
              </div>

              <div className="grid gap-3">
                <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/40">
                    Son fotoğraflar
                  </p>
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((item) => (
                      <div
                        key={item}
                        className="aspect-square rounded-[1.1rem] border border-white/10 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:18px_18px]"
                      />
                    ))}
                  </div>
                </div>
                <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/40">
                    Kayıt özeti
                  </p>
                  <div className="mt-4 grid gap-2 text-sm text-white/68">
                    <p>Belge alanı güncel</p>
                    <p>Ödeme planı onaylandı</p>
                    <p>Malzeme notu eklendi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}

function SelectedProjectsSection() {
  return (
    <SectionContainer id="projects" className="home-snap-section home-section-space">
      <div className="flex flex-col gap-5 border-b border-black/8 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-black/45">
            PROJELER
          </p>
          <h2 className="home-section-title mt-5">Seçili Projeler</h2>
          <p className="home-body-large mt-5 max-w-2xl text-black/58">
            Az sayıda, kontrollü ve belgelenmiş proje. Her çalışma tasarım,
            uygulama ve süreç yönetimiyle birlikte ele alınır.
          </p>
        </div>
        <SecondaryLink href="/projeler">Projeleri İnceleyin</SecondaryLink>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {featuredProjects.map((project) => (
          <article key={project.slug} className="space-y-4">
            <ProjectImageSlot project={project} />
            <div className="border-t border-black/10 pt-4">
              <p className="text-sm leading-7 text-black/58">{project.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </SectionContainer>
  );
}

function ProcessSection() {
  return (
    <SectionContainer
      id="process"
      className="home-snap-section home-section-space border-y border-black/8"
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(18rem,0.42fr)_minmax(0,0.58fr)]">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-black/45">
            GÖRÜNÜR SÜREÇ
          </p>
          <h2 className="home-section-title mt-5">Süreç</h2>
          <p className="home-body-large mt-5 max-w-lg text-black/58">
            BLAGG Studio&apos;da süreç yalnızca uygulanmaz; görünür, belgeli ve takip
            edilebilir şekilde yönetilir.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {processSteps.map((step) => (
              <article key={step.number} className="premium-panel premium-hover p-5 sm:p-6">
                <div className="relative z-10">
                  <p className="text-3xl text-black/32">{step.number}</p>
                  <h3 className="mt-3 text-2xl sm:text-[2rem]">{step.title}</h3>
                  <p className="mt-3 text-base leading-7 text-black/58">
                    {step.text}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <PhotoPlaceholder
              label="SÜREÇ GÖRSELİ"
              title="Şantiye, malzeme ve karar akışı"
              helperText="Saha kayıt görünümü"
              ratio="cinematic"
            />

            <PrimaryLink href="/surec" className="w-full sm:w-auto lg:min-w-[15rem]">
              Süreci Görün
            </PrimaryLink>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}

function FaqSection() {
  const faqs = [
    {
      question: "Her proje kabul ediliyor mu?",
      answer:
        "Hayır. BLAGG Studio sınırlı sayıda proje alır. Kapsam, lokasyon ve çalışma modelinin uyumu birlikte değerlendirilir."
    },
    {
      question: "BLAGG Remote nasıl çalışır?",
      answer:
        "Aktif projelerde size özel bir takip bağlantısı paylaşılır. Onaylı fotoğraflar, belgeler, ödeme planı ve süreç kayıtları bu alanda görünür."
    },
    {
      question: "İlk adımda ne paylaşmam gerekir?",
      answer:
        "Mülkün bulunduğu lokasyon, proje türü ve kısa ihtiyaç özeti yeterlidir. İlk değerlendirme için uzun evrak listesi gerekmez."
    },
    {
      question: "Süreç boyunca görünürlük nasıl sağlanır?",
      answer:
        "Saha fotoğrafları, önemli kararlar, belge akışı ve ödeme planı kayıt altına tutulur. Böylece proje yalnızca ilerlemez, görünür hale gelir."
    }
  ];

  return (
    <SectionContainer
      id="faq"
      className="home-snap-section home-section-space border-t border-black/8"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-black/45">
            KISA SORULAR
          </p>
          <h2 className="home-section-title mt-5 max-w-[10ch]">
            Karar sürecini sadeleştiren cevaplar.
          </h2>
          <p className="mt-5 max-w-lg text-[clamp(1rem,1.15vw,1.125rem)] leading-[1.85] text-black/58">
            Gereksiz satış dili olmadan, çalışma modelimizi en net haliyle
            anlatıyoruz.
          </p>
        </div>

        <div className="grid gap-3">
          {faqs.map((item) => (
            <article
              key={item.question}
              className="rounded-[1.75rem] border border-black/10 bg-white p-5 sm:p-6"
            >
              <h3 className="text-[1.35rem] leading-tight text-black">
                {item.question}
              </h3>
              <p className="mt-3 text-base leading-8 text-black/58">
                {item.answer}
              </p>
            </article>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}

function FinalCtaSection() {
  return (
    <SectionContainer
      id="final-cta"
      className="home-snap-section home-section-space flex min-h-[70svh] items-center bg-[#050505] text-white"
    >
      <div className="max-w-4xl border-t border-white/12 pt-8">
        <h2 className="home-section-title max-w-[12ch]">
          Projenizi birlikte başlatalım.
        </h2>
        <p className="home-body-large mt-5 max-w-2xl text-white/64">
          Kısa formu doldurun. Projenizi değerlendirip size uygun çalışma modelini
          netleştirelim.
        </p>
        <PrimaryLink href="/teklif-al" className="mt-8 w-full sm:w-auto">
          Projenizi Başlatın
        </PrimaryLink>
        <p className="mt-5 text-sm uppercase tracking-[0.22em] text-white/46">
          İlk adım yalnızca projenizi anlamak.
        </p>
      </div>
    </SectionContainer>
  );
}

function DefinitionCard({ title, text }) {
  return (
    <article className="premium-panel premium-hover p-5 sm:p-6">
      <p className="text-xs uppercase tracking-[0.24em] text-black/42">{title}</p>
      <p className="mt-4 text-sm leading-7 text-black/58">{text}</p>
    </article>
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
