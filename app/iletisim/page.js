import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionContainer from "../../components/SectionContainer";
import { contactInfo } from "../../lib/data/contact";
import { createSeoMetadata } from "../../lib/seo";

export const metadata = createSeoMetadata({
  title: "Proje Başvurusu | BLAGG Studio",
  description:
    "BLAGG Studio proje başvurularını kapsam, lokasyon, zamanlama ve tasarım beklentisine göre değerlendirir.",
  path: "/iletisim"
});

const intakeSteps = [
  ["01", "Proje kapsamı"],
  ["02", "Lokasyon ve zamanlama"],
  ["03", "Tasarım beklentisi"],
  ["04", "Uygunluk değerlendirmesi"]
];

export default function ContactPage() {
  return (
    <main className="bg-[#F7F7F5] pt-24 text-[#111111]">
      <SectionContainer className="pb-16 pt-6 sm:pb-20">
        <section className="grid gap-6 lg:min-h-[calc(66svh-6rem)] lg:grid-cols-[minmax(0,1.02fr)_minmax(22rem,0.72fr)] lg:items-stretch">
          <div className="flex min-h-[31rem] flex-col justify-between overflow-hidden rounded-[2rem] bg-black p-6 text-white sm:p-8 lg:p-10">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.28em] text-white/38">
                <span>Özel proje başvurusu</span>
                <span className="hidden h-px w-12 bg-white/16 sm:block" />
                <span>BLAGG Studio</span>
              </div>
              <h1 className="mt-7 max-w-5xl text-[2.55rem] leading-[0.94] sm:text-[3.9rem] lg:text-[4.65rem]">
                Projenizi birlikte değerlendirelim.
              </h1>
            </div>

            <div className="mt-9 grid gap-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(12rem,0.44fr)] lg:items-end">
              <div>
                <p className="max-w-3xl text-lg leading-8 text-white/64">
                  Her başvuruyu kapsam, lokasyon, zamanlama ve tasarım beklentisiyle
                  birlikte değerlendiriyoruz.
                </p>
                <p className="mt-6 max-w-2xl border-l border-white/16 pl-5 text-base leading-7 text-white/54">
                  Başvuru, projenizi doğru anlamak için ilk adımdır.
                </p>
              </div>

              <div className="border-t border-white/10 pt-5">
                <p className="text-xs uppercase tracking-[0.24em] text-white/36">
                  Kabul ilkesi
                </p>
                <p className="mt-4 text-2xl leading-tight text-white/84">
                  Seçici, net ve güven veren bir başlangıç.
                </p>
              </div>
            </div>
          </div>

          <aside className="flex min-h-[29rem] flex-col justify-between rounded-[2rem] border border-black/10 bg-white p-6 sm:p-8 lg:p-10">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-black/42">
                Başlangıç
              </p>
              <h2 className="mt-5 text-[1.9rem] leading-tight sm:text-[2.35rem]">
              Kısa bilgi yeterli. Kapsamı birlikte netleştiririz.
              </h2>
              <p className="mt-5 text-base leading-8 text-black/56">
                Uygun projelerde çalışma modeli ve takip düzeni netleşir.
              </p>
            </div>

            <div className="mt-10">
              <Link
                href="/teklif-al"
                className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-base font-medium text-white"
              >
                Projenizi Başlatın
                <ArrowRight size={18} />
              </Link>
              <div className="mt-6 border-t border-black/10 pt-5">
                <p className="text-xs uppercase tracking-[0.22em] text-black/38">
                  İkincil temas
                </p>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="mt-3 block break-all text-sm text-black/54 transition-colors duration-200 hover:text-black"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>
          </aside>
        </section>

        <section className="grid gap-8 py-10 lg:grid-cols-[0.62fr_1.38fr]">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <p className="text-xs uppercase tracking-[0.3em] text-black/45">
              Başvuru akışı
            </p>
            <h2 className="mt-5 max-w-xl text-[1.95rem] leading-tight sm:text-[2.45rem]">
              İlk görüşmeden önce neye baktığımız nettir.
            </h2>
          </div>

          <div className="grid gap-0 border-t border-black/10">
            {intakeSteps.map(([number, item]) => (
              <article
                key={number}
                className="group grid gap-5 border-b border-black/10 py-5 sm:grid-cols-[5rem_minmax(0,1fr)] sm:items-center"
              >
                <p className="text-3xl leading-none text-black/18 transition-colors duration-300 group-hover:text-black">
                  {number}
                </p>
                <h3 className="text-[1.55rem] leading-tight sm:text-[2.05rem]">
                  {item}
                </h3>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 border-t border-black/8 pt-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-black/45">
              Sonraki adım
            </p>
            <h2 className="mt-5 text-[2.05rem] leading-tight sm:text-[2.65rem]">
              Kapsam netleşirse süreç görünür şekilde başlar.
            </h2>
          </div>

          <div>
            <p className="max-w-3xl text-base leading-8 text-black/58 sm:text-lg">
              Uygun projelerde tasarım, uygulama ve takip aynı çalışma çerçevesinde
              kurulur.
            </p>
            <Link href="/teklif-al" className="premium-button mt-8">
              Projenizi Başlatın
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </SectionContainer>
    </main>
  );
}
