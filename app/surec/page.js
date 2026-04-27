import {
  ArrowRight,
  Camera,
  ClipboardCheck,
  DraftingCompass,
  FileText,
  Handshake,
  MessageCircle,
  ShieldCheck
} from "lucide-react";

export const metadata = {
  title: "Süreç | BLAAG Construction and Architecture",
  description:
    "BLAAG hizmet akışı: ön başvuru, değerlendirme, teklif ve plan, uygulama, takip ve sonuç."
};

const steps = [
  {
    icon: MessageCircle,
    title: "Ön Başvuru",
    text: "İhtiyacınızı, konumu, hedefinizi ve varsa fotoğrafları paylaşırsınız."
  },
  {
    icon: ClipboardCheck,
    title: "Değerlendirme",
    text: "Ekibimiz kapsamı inceler, eksik bilgileri netleştirir ve doğru hizmet yolunu belirler."
  },
  {
    icon: FileText,
    title: "Teklif ve Plan",
    text: "Hizmet kapsamı, uygulama yaklaşımı ve iş takvimi anlaşılır bir teklif halinde sunulur."
  },
  {
    icon: Handshake,
    title: "Uygulama",
    text: "BLAAG ekipleri ve çözüm ortakları işi sahada planlı şekilde yürütür."
  },
  {
    icon: ShieldCheck,
    title: "Takip ve Sonuç",
    text: "İşi biz yönetiriz; siz önemli aşamaları, fotoğrafları ve teslim sürecini şeffaf şekilde takip edersiniz."
  }
];

export default function ProcessPage() {
  return (
    <main className="min-h-screen bg-cream px-4 py-8 text-stoneDark sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <header className="bg-stoneDark p-7 text-white md:p-12">
          <div className="flex flex-wrap gap-5 text-sm text-white/55">
            <a href="/">Ana sayfa</a>
            <a href="/hizmetler">Hizmetler</a>
          </div>
          <div className="mt-16 max-w-5xl">
            <p className="text-sm uppercase tracking-[0.3em] text-white/35">
              Hizmet Süreci
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-7xl">
              BLAAG ile çalışırken her adım net ve görünürdür.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">
              İşi biz yönetiriz, siz süreci şeffaf şekilde takip edersiniz.
              Takip ayrıcalığı, BLAAG hizmetinin güven veren parçasıdır.
            </p>
          </div>
        </header>

        <section className="mt-10 grid gap-5 md:grid-cols-5">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article key={step.title} className="border-t border-border bg-surface p-5">
                <p className="text-sm text-black/35">{String(index + 1).padStart(2, "0")}</p>
                <Icon className="mt-7 text-gold" size={26} />
                <h2 className="mt-6 text-2xl font-semibold">{step.title}</h2>
                <p className="mt-4 text-sm leading-7 text-muted">{step.text}</p>
              </article>
            );
          })}
        </section>

        <section className="mt-10 grid gap-8 bg-soft p-7 md:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Camera className="text-gold" size={30} />
            <h2 className="mt-6 text-3xl font-semibold tracking-tight md:text-5xl">
              Fotoğraflı takip, hizmetinize güven ve görünürlük katar.
            </h2>
            <p className="mt-5 max-w-2xl leading-8 text-muted">
              BLAAG ile yürütülen projelerde önemli aşamalar, fotoğraflar ve
              gelişmeler size özel takip bağlantısı üzerinden düzenli olarak
              sunulur. Sahadan gelen fotoğraflar ekibimiz tarafından kontrol
              edilir, açıklamaları düzenlenir ve müşteriye anlaşılır şekilde
              aktarılır.
            </p>
          </div>
          <div className="grid gap-4">
            {[
              "Aşama bazlı fotoğraflı güncellemeler",
              "Size özel takip bağlantısı",
              "Onaylı ve düzenlenmiş müşteri bilgilendirmeleri",
              "Belgeler, ödemeler ve teslim süreci için tek noktadan görünürlük"
            ].map((item) => (
              <div key={item} className="flex items-center justify-between gap-4 border border-border bg-surface p-5 text-muted">
                <span>{item}</span>
                <DraftingCompass className="shrink-0 text-gold/70" size={22} />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 bg-stoneDark p-7 text-white md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
                Süreci başlatmak için ön başvurunuzu oluşturun.
              </h2>
              <p className="mt-5 max-w-2xl leading-8 text-white/60">
                Ekibimiz bilgilerinizi inceleyerek sizinle iletişime geçecek.
              </p>
            </div>
            <a href="/teklif-al" className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 font-medium text-stoneDark">
              Ön Başvuru Oluştur
              <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
