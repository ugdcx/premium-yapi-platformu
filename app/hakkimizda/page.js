import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import SectionContainer from "../../components/SectionContainer";

export const metadata = {
  title: "Hakkımızda | BLAGG Studio",
  description:
    "BLAGG Studio; yapı, renovasyon ve proje görünürlüğünü tek disiplin altında yöneten seçilmiş çalışma modelidir."
};

const principles = [
  "Kapsamı, takvimi ve karar noktalarını iş başlamadan önce netleştirme",
  "Uygulama boyunca müşteriye düzenli ve anlaşılır süreç görünürlüğü sağlama",
  "Tasarım, saha ve teslim akışını tek sorumluluk altında toplama",
  "Belge, kalite kontrol ve kapanış disiplinini koruma"
];

const values = [
  "Az sayıda proje alırız.",
  "Her projeyi aynı yoğunlukta takip ederiz.",
  "Gereksiz satış dili yerine net kapsam kurarız."
];

export default function AboutPage() {
  return (
    <main className="bg-[#F7F7F5] pt-24 text-[#111111]">
      <SectionContainer className="pb-20 pt-8 sm:pb-24">
        <header className="grid gap-10 border-b border-black/8 pb-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(18rem,0.72fr)] lg:items-end">
          <div>
            <div className="flex flex-wrap gap-5 text-sm text-black/46">
              <Link href="/">Ana sayfa</Link>
              <Link href="/hizmetler">Hizmetler</Link>
              <Link href="/surec">Süreç</Link>
            </div>
            <p className="mt-10 text-xs uppercase tracking-[0.3em] text-black/45">
              Hakkımızda
            </p>
            <h1 className="mt-5 max-w-5xl text-[3rem] leading-[0.98] sm:text-[4.4rem]">
              Tasarım, uygulama ve görünür takip için sade bir çalışma modeli.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-black/58">
              BLAGG Studio, yapı geliştirme ve renovasyon süreçlerinde karar yükünü
              azaltan; planlama, koordinasyon ve görünür takip disiplinini tek hizmet
              yaklaşımında birleştiren kontrollü çalışma modelidir.
            </p>
          </div>

          <div className="premium-panel p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-black/42">
              Çalışma ilkesi
            </p>
            <p className="mt-4 text-xl leading-8 text-black/78">
              Kısa, net ve kayıt altında ilerleyen proje yönetimi.
            </p>
          </div>
        </header>

        <section className="grid gap-8 py-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <h2 className="text-[2.2rem] sm:text-[3rem]">
              Kontrollü ve anlaşılır.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-black/58">
              Amacımız yalnızca uygulama yapmak değil; doğru kararı, doğru sırayla
              ve doğru ekip koordinasyonuyla ilerletmektir.
            </p>
            <div className="mt-8 grid gap-3">
              {values.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.25rem] border border-black/10 bg-white px-4 py-4 text-sm text-black/62"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            {principles.map((item) => (
              <div
                key={item}
                className="premium-panel p-5 sm:p-6"
              >
                <div className="relative z-10 flex items-start gap-3">
                  <CheckCircle2 className="mt-1 shrink-0 text-black/62" size={18} />
                  <span className="leading-7 text-black/58">{item}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-black/10 bg-black p-7 text-white md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <ShieldCheck className="text-white/72" size={26} />
              <h2 className="mt-6 max-w-3xl text-[2.3rem] leading-tight md:text-[3.5rem]">
                Projenizi netleştirmek için ilk bilgileri paylaşın.
              </h2>
              <p className="mt-5 max-w-2xl leading-8 text-white/60">
                Ekibimiz ihtiyacınızı inceleyerek uygun hizmet kapsamı için sizinle iletişime geçer.
              </p>
            </div>
            <Link
              href="/teklif-al"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-black"
            >
              Projenizi Başlatın
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </SectionContainer>
    </main>
  );
}
