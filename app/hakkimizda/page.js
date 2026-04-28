import { ArrowRight, Building2, CheckCircle2, DraftingCompass, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Hakkımızda | BLAAG Construction and Architecture",
  description:
    "BLAAG Construction and Architecture; yapı, tadilat ve gayrimenkul kararlarını planlı, şeffaf ve hizmet odaklı şekilde yönetir."
};

const principles = [
  "Kapsamı, takvimi ve karar noktalarını iş başlamadan önce netleştirme",
  "Uygulama boyunca müşteriye düzenli ve anlaşılır süreç görünürlüğü sağlama",
  "Yapı, tadilat ve gayrimenkul kararlarını tek profesyonel yönetim altında toplama",
  "Teslim aşamasında kalite kontrol, belge düzeni ve kapanış disiplinini koruma"
];

const capabilities = [
  {
    title: "Planlama",
    text: "İhtiyacı, mülk hedefini ve yatırım beklentisini okuyarak doğru kapsamı oluştururuz."
  },
  {
    title: "Koordinasyon",
    text: "Saha, çözüm ortakları, malzeme kararları ve müşteri bilgilendirmesini tek akışta yönetiriz."
  },
  {
    title: "Şeffaflık",
    text: "Önemli aşamaları fotoğraflı güncellemeler ve düzenli bilgilendirme ile görünür kılarız."
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-cream px-4 py-8 text-stoneDark sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <header className="bg-stoneDark p-7 text-white md:p-12">
          <div className="flex flex-wrap gap-5 text-sm text-white/55">
            <a href="/">Ana sayfa</a>
            <a href="/hizmetler">Hizmetler</a>
            <a href="/surec">Süreç</a>
          </div>
          <div className="mt-16 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/35">
                Hakkımızda
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-7xl">
                Yapı ve gayrimenkul kararlarını daha net yönetmek için varız.
              </h1>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-white/65">
              BLAAG Construction and Architecture, yapı geliştirme, tadilat ve
              gayrimenkul danışmanlığı süreçlerinde müşterinin karar yükünü
              azaltan; planlama, koordinasyon ve takip disiplinini tek hizmet
              yaklaşımında birleştiren profesyonel bir ekiptir.
            </p>
          </div>
        </header>

        <section className="mt-10 grid gap-8 bg-surface p-7 md:p-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <Building2 className="text-gold" size={30} />
            <h2 className="mt-6 text-3xl font-semibold tracking-tight md:text-5xl">
              Hizmet odaklı, sade ve kontrollü bir çalışma modeli.
            </h2>
            <p className="mt-5 leading-8 text-muted">
              Amacımız yalnızca uygulama yapmak değil; doğru kararı, doğru
              sırayla ve doğru ekip koordinasyonuyla ilerletmektir.
            </p>
          </div>
          <div className="grid gap-4">
            {principles.map((item) => (
              <div key={item} className="flex items-start gap-3 border border-border bg-cream p-5">
                <CheckCircle2 className="mt-1 shrink-0 text-gold" size={18} />
                <span className="leading-7 text-muted">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {capabilities.map((item, index) => (
            <article key={item.title} className="border-t border-border bg-soft p-6">
              <p className="text-sm text-black/35">{String(index + 1).padStart(2, "0")}</p>
              <DraftingCompass className="mt-7 text-gold" size={26} />
              <h2 className="mt-6 text-2xl font-semibold">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-muted">{item.text}</p>
            </article>
          ))}
        </section>

        <section className="mt-10 bg-stoneDark p-7 text-white md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <ShieldCheck className="text-gold" size={30} />
              <h2 className="mt-6 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
                Projenizi netleştirmek için ilk bilgileri paylaşın.
              </h2>
              <p className="mt-5 max-w-2xl leading-8 text-white/60">
                Ekibimiz ihtiyacınızı inceleyerek uygun hizmet kapsamı için sizinle iletişime geçer.
              </p>
            </div>
            <a href="/teklif-al" className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 font-medium text-stoneDark">
              Projemi Başlat
              <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
