import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionContainer from "../../components/SectionContainer";
import { createSeoMetadata } from "../../lib/seo";

export const metadata = createSeoMetadata({
  title: "BLAGG Remote | BLAGG Studio",
  description:
    "BLAGG Remote, aktif BLAGG Studio müşterileri için oluşturulan özel proje görünürlük alanıdır.",
  path: "/blagg-remote"
});

const trustNotes = ["Üyelik yok.", "Uygulama yok.", "Size özel bağlantı."];

const visibleItems = [
  ["Proje durumu", "Güncel aşama ve kısa karar notu"],
  ["Onaylı fotoğraflar", "Şirket kontrolünden geçmiş saha kayıtları"],
  ["Belgeler", "Proje için gerekli temel dosyalar"],
  ["Ödeme planı", "Sadeleştirilmiş ödeme ve kalan bakiye özeti"]
];

const visibilityFlow = [
  {
    step: "01",
    title: "Saha kaydı oluşur",
    text: "Fotoğraf, not veya belge önce BLAGG Studio kontrolüne gelir."
  },
  {
    step: "02",
    title: "Şirket onaylar",
    text: "Ham bilgi sadeleştirilir; müşteriye yalnızca net ve doğru kayıt açılır."
  },
  {
    step: "03",
    title: "Siz görürsünüz",
    text: "Onaylı gelişmeler size özel bağlantıda sessiz ve okunur kalır."
  }
];

export default function BlaggRemotePage() {
  return (
    <main className="bg-[#050505] pt-24 text-white">
      <SectionContainer className="pb-16 pt-6 sm:pb-20">
        <header className="grid gap-8 lg:min-h-[calc(66svh-6rem)] lg:grid-cols-[minmax(0,0.82fr)_minmax(22rem,0.78fr)] lg:items-stretch">
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/42">
                BLAGG Remote
              </p>
              <h1 className="mt-5 max-w-5xl text-[2.65rem] leading-[0.92] sm:text-[4rem] lg:text-[4.9rem]">
                Projenize açılan özel görünürlük alanı.
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/60">
                Üyelik yok. Uygulama yok. Size özel bağlantı.
              </p>
            </div>

            <div className="mt-8 grid gap-0 border-y border-white/10 sm:grid-cols-3">
              {trustNotes.map((item) => (
                <div
                  key={item}
                  className="border-white/10 py-5 text-lg text-white/80 sm:border-r sm:px-5 first:sm:pl-0 last:sm:border-r-0"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <VisibilityWindow />
        </header>

        <section className="grid gap-8 border-t border-white/10 py-10 lg:grid-cols-[0.62fr_1.38fr]">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <p className="text-xs uppercase tracking-[0.3em] text-white/42">
              Ne görünür?
            </p>
            <h2 className="mt-5 text-[2.15rem] leading-tight sm:text-[3.1rem]">
              Yalnızca gerekli bilgi görünür olur.
            </h2>
          </div>

          <div className="grid gap-0 border-t border-white/10">
            {visibleItems.map(([title, text], index) => (
              <article
                key={title}
                className="group grid gap-5 border-b border-white/10 py-7 sm:grid-cols-[5rem_minmax(0,1fr)]"
              >
                <p className="text-3xl text-white/18 transition-colors duration-300 group-hover:text-white">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div>
                  <h3 className="text-[1.9rem] leading-tight">{title}</h3>
                  <p className="mt-3 max-w-2xl text-base leading-8 text-white/56">
                    {text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 border-t border-white/10 py-10 lg:grid-cols-[0.62fr_1.38fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/42">
              Nasıl çalışır?
            </p>
            <h2 className="mt-5 text-[2.15rem] leading-tight sm:text-[3.1rem]">
              Şirket onaylar. Siz görürsünüz. Süreç kayıt altında kalır.
            </h2>
          </div>

          <div className="grid gap-0 border-t border-white/10">
            {visibilityFlow.map((item) => (
              <article
                key={item.step}
                className="group grid gap-5 border-b border-white/10 py-7 sm:grid-cols-[5rem_minmax(0,1fr)]"
              >
                <p className="text-3xl text-white/18 transition-colors duration-300 group-hover:text-white">
                  {item.step}
                </p>
                <div>
                  <h3 className="text-[1.9rem] leading-tight">{item.title}</h3>
                  <p className="mt-3 max-w-2xl text-base leading-8 text-white/56">
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 border-t border-white/10 pt-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/42">
              Başlangıç
            </p>
            <h2 className="mt-5 text-[2.15rem] leading-tight sm:text-[2.9rem]">
              Görünür takip proje başladıktan sonra kurulur.
            </h2>
          </div>
          <div>
            <p className="max-w-3xl text-base leading-8 text-white/58 sm:text-lg">
              Önce kapsam netleşir. Sonra müşteri ve saha bağlantıları proje ritmine
              göre hazırlanır.
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

function VisibilityWindow() {
  return (
    <div className="flex min-h-[29rem] flex-col justify-between rounded-[2rem] border border-white/10 bg-[#101010] p-5 sm:p-7">
      <div>
        <div className="flex items-start justify-between gap-5 border-b border-white/10 pb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-white/38">
              Özel proje bağlantısı
            </p>
            <h2 className="mt-4 text-[2.2rem] leading-tight">Onaylı proje kaydı</h2>
          </div>
          <span className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs uppercase tracking-[0.16em] text-white/58">
            Onaylı kayıt
          </span>
        </div>

        <div className="mt-7 grid gap-0 border-y border-white/10">
          {visibleItems.map(([title, text]) => (
            <div key={title} className="grid gap-3 border-b border-white/10 py-5 last:border-b-0 sm:grid-cols-[11rem_minmax(0,1fr)]">
              <p className="text-xs uppercase tracking-[0.22em] text-white/36">
                {title}
              </p>
              <p className="text-sm leading-7 text-white/66">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-7 border-t border-white/10 pt-5 text-sm leading-7 text-white/48">
        Müşteri ham saha akışını değil, şirket kontrolünden geçmiş proje kaydını görür.
      </p>
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
