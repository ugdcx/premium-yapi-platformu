import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionContainer from "../../components/SectionContainer";
import { createSeoMetadata } from "../../lib/seo";

export const metadata = createSeoMetadata({
  title: "Süreç | BLAGG Studio",
  description:
    "BLAGG Studio süreci; keşif, planlama, hazırlık, uygulama ve teslim adımlarını görünür hale getirir.",
  path: "/surec"
});

const rituals = [
  {
    number: "01",
    title: "Dinleme",
    principle: "Doğru kapsam, doğru soruyla başlar.",
    text: "Mekân, ihtiyaç ve beklenti ilk görüşmede sade bir proje çerçevesine alınır."
  },
  {
    number: "02",
    title: "Tasarım Kararı",
    principle: "Güzel görünen değil, uygulanabilir olan seçilir.",
    text: "Plan, malzeme, ışık ve kullanım kararları sahada karşılığı olan bir dile çevrilir."
  },
  {
    number: "03",
    title: "Planlama",
    principle: "Ritim kurulmadan sahaya girilmez.",
    text: "Kapsam, zamanlama ve hazırlık teslim akışını bozmayacak şekilde netleşir."
  },
  {
    number: "04",
    title: "Uygulama",
    principle: "Saha, tasarım kararının gerçek sınavıdır.",
    text: "İlerleme kontrollü, kayıtlı ve kritik kararları görünür tutacak biçimde yürütülür."
  },
  {
    number: "05",
    title: "Görünür Takip",
    principle: "Müşteri ham akışı değil, onaylı kaydı görür.",
    text: "Fotoğraflar, belgeler ve önemli notlar şirket kontrolünden sonra paylaşılır."
  },
  {
    number: "06",
    title: "Teslim",
    principle: "Bitiş, kayıtlı kapanışla tamamlanır.",
    text: "Son kontroller, teslim notları ve kapanış belgeleri aynı disiplinle düzenlenir."
  }
];

const principles = [
  "Kapsam netleşmeden agresif taahhüt verilmez.",
  "Ham saha bilgisi müşteriye kontrolsüz açılmaz.",
  "Kararlar, belgeler ve fotoğraflar proje hafızasında tutulur."
];

export default function ProcessPage() {
  return (
    <main className="bg-[#F7F7F5] pt-24 text-[#111111]">
      <SectionContainer className="pb-16 pt-6 sm:pb-20">
        <header className="grid gap-8 rounded-[2rem] bg-black p-6 text-white sm:p-8 lg:min-h-[calc(62svh-6rem)] lg:grid-cols-[minmax(0,0.95fr)_minmax(20rem,0.55fr)] lg:items-end lg:p-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/42">
              Süreç ritüeli
            </p>
            <h1 className="mt-6 max-w-6xl text-[2.65rem] leading-[0.92] sm:text-[4rem] lg:text-[4.95rem]">
              Bir renovasyonun iyi ilerlemesi tesadüf değildir.
            </h1>
          </div>

          <div className="border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-6">
            <p className="text-xl leading-8 text-white/68">
              Tasarımdan teslimata kadar her kararın yeri, zamanı ve kaydı olur.
            </p>
            <div className="mt-7 flex items-center gap-4 text-xs uppercase tracking-[0.22em] text-white/36">
              <span>Aşağı</span>
              <span className="h-px flex-1 bg-white/14" />
              <span>06 aşama</span>
            </div>
          </div>
        </header>

        <section className="grid gap-0 py-10 lg:grid-cols-[0.32fr_0.68fr]">
          <aside className="pb-10 lg:sticky lg:top-28 lg:h-fit lg:pr-10">
            <p className="text-xs uppercase tracking-[0.3em] text-black/45">
              Prensip
            </p>
            <h2 className="mt-5 max-w-sm text-[2.1rem] leading-tight sm:text-[2.8rem]">
              Sade görünen sürecin arkasında disiplin vardır.
            </h2>
            <div className="mt-8 grid gap-5">
              {principles.map((item) => (
                <p
                  key={item}
                  className="border-t border-black/10 pt-4 text-sm leading-7 text-black/56"
                >
                  {item}
                </p>
              ))}
            </div>
          </aside>

          <div className="relative border-l border-black/10 pl-5 sm:pl-8 lg:pl-12">
            <div className="absolute left-0 top-0 h-full w-px bg-black/10" aria-hidden="true" />
            {rituals.map((step, index) => (
              <article
                key={step.number}
                className={`group relative grid gap-8 border-b border-black/10 py-10 sm:py-12 lg:min-h-[42svh] lg:grid-cols-[10rem_minmax(0,1fr)] lg:items-center ${
                  index === rituals.length - 1 ? "border-b-0" : ""
                }`}
              >
                <span className="absolute -left-[1.62rem] top-16 h-3 w-3 rounded-full bg-black sm:-left-[2.12rem] lg:top-1/2" />
                <p className="text-[3.8rem] leading-none text-black/10 transition-colors duration-300 group-hover:text-black sm:text-[4.8rem]">
                  {step.number}
                </p>
                <div>
                  <p className="text-xs uppercase tracking-[0.26em] text-black/38">
                    {step.principle}
                  </p>
                  <h2 className="mt-4 text-[2.35rem] leading-[0.98] sm:text-[3.35rem]">
                    {step.title}
                  </h2>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-black/60 sm:text-lg">
                    {step.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 rounded-[2rem] bg-black p-6 text-white sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/42">
              Sonuç
            </p>
            <h2 className="mt-5 text-[2.15rem] leading-tight sm:text-[2.9rem]">
              İş bittiğinde süreç de anlaşılır kalır.
            </h2>
          </div>
          <div>
            <p className="max-w-3xl text-base leading-8 text-white/60 sm:text-lg">
              Kararlar, belgeler, fotoğraflar ve teslim notları sade bir kayıt diliyle
              kapanır.
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
