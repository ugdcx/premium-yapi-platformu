import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Hammer,
  Home,
  ShieldCheck
} from "lucide-react";

export const metadata = {
  title: "Hizmetler | BLAAG Construction and Architecture",
  description:
    "BLAAG anahtar teslim yapı, tadilat, değer artırma ve gayrimenkul danışmanlığı hizmetleri."
};

const serviceAreas = [
  {
    icon: Building2,
    title: "Anahtar Teslim Yapı Geliştirme",
    intro:
      "Arsa veya mülkünüz için fikirden teslime uzanan yapı sürecini tek profesyonel ekip ve net sorumluluk modeliyle yönetiriz.",
    bullets: [
      "Kapsam ve hedef kalite analizi",
      "Mimari planlama ve uygulama koordinasyonu",
      "Kaba ve ince yapı ekip organizasyonu",
      "Malzeme, takvim ve saha düzeni takibi",
      "Teslim öncesi kalite kontrol ve kapanış"
    ],
    visual: "Mimari plan, cephe dokusu, saha programı ve teslim kontrol listesi"
  },
  {
    icon: Hammer,
    title: "Tadilat & Değer Artırma",
    intro:
      "Konut, villa veya ticari alanlarınızı daha yaşanabilir, pazarlanabilir ve değerli hale getiren dönüşüm çalışmalarını planlarız.",
    bullets: [
      "Mevcut durum ve ihtiyaç tespiti",
      "Mutfak, banyo, cephe ve komple yenileme planı",
      "Satış veya kiralama öncesi değer artırma önerileri",
      "Saha uygulaması ve günlük görsel takip",
      "Öncesi ve sonrası teslim raporu"
    ],
    visual: "Numune malzemeler, ölçü notları ve yenilenen iç mekan görünümü"
  },
  {
    icon: Home,
    title: "Gayrimenkul Danışmanlığı",
    intro:
      "Satış, kiralama, satın alma veya yatırım kararlarında mülkünüzü doğru fiyat, doğru sunum ve doğru stratejiyle konumlandırırız.",
    bullets: [
      "Pazar ve konum değerlendirmesi",
      "Portföy hazırlığı ve sunum stratejisi",
      "Satış ya da kiralama öncesi iyileştirme planı",
      "Görüşme ve teklif süreci koordinasyonu",
      "Yatırım kararları için risk ve fırsat analizi"
    ],
    visual: "Portföy dosyası, anahtar, bölge notları ve sunum panosu"
  }
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-cream px-4 py-8 text-stoneDark sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <header className="bg-stoneDark p-7 text-white md:p-12">
          <div className="flex flex-wrap gap-5 text-sm text-white/55">
            <a href="/">Ana sayfa</a>
            <a href="/surec">Süreç</a>
          </div>
          <div className="mt-16 max-w-5xl">
            <p className="text-sm uppercase tracking-[0.3em] text-white/35">
              BLAAG Hizmetleri
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-7xl">
              Projenizin ihtiyacına göre çalışan premium hizmet modeli.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">
              BLAAG Construction and Architecture; inşaat, yenileme ve
              gayrimenkul kararlarınızı sahaya, takvime ve teslim kalitesine
              bağlayan profesyonel bir hizmet şirketidir.
            </p>
            <a href="/teklif-al" className="mt-9 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-4 font-medium text-stoneDark">
              Ön Başvuru Oluştur
              <ArrowRight size={18} />
            </a>
          </div>
        </header>

        <section className="mt-10 grid gap-12">
          {serviceAreas.map((service, index) => (
            <ServiceBlock key={service.title} service={service} reversed={index % 2 === 1} index={index} />
          ))}
        </section>

        <section className="mt-10 bg-soft p-7 md:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <ShieldCheck className="text-gold" size={30} />
              <h2 className="mt-6 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
                Her hizmette aynı standart: net kapsam, görünür süreç, kontrollü teslim.
              </h2>
              <p className="mt-5 max-w-2xl leading-8 text-muted">
                Müşteri hesap açmaz. Çalışan hesap açmaz. İleride her proje,
                müşteriye özel bağlantı ve sahaya özel fotoğraf yükleme
                bağlantısı ile ilerler.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Kapsamın erken netleşmesi",
                "Sahadan fotoğraflı ilerleme",
                "Tek sorumlu ekip düzeni",
                "Teslim ve garanti kaydının kapanması"
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 bg-surface p-5">
                  <CheckCircle2 className="mt-1 shrink-0 text-gold" size={19} />
                  <span className="leading-7 text-muted">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function ServiceBlock({ service, reversed, index }) {
  const Icon = service.icon;
  return (
    <article className={`grid gap-7 lg:grid-cols-2 lg:items-stretch ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}>
      <div className="bg-surface p-6 md:p-9">
        <p className="text-sm text-black/35">{String(index + 1).padStart(2, "0")}</p>
        <Icon className="mt-8 text-gold" size={30} />
        <h2 className="mt-6 text-3xl font-semibold tracking-tight md:text-5xl">{service.title}</h2>
        <p className="mt-5 leading-8 text-muted">{service.intro}</p>
        <div className="mt-7 grid gap-3">
          {service.bullets.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <CheckCircle2 className="mt-1 shrink-0 text-gold" size={18} />
              <span className="text-sm leading-6 text-muted">{item}</span>
            </div>
          ))}
        </div>
        <a href="/teklif-al" className="mt-8 inline-flex items-center gap-2 text-sm font-medium">
          Detayları İncele
          <ArrowRight size={16} />
        </a>
      </div>
      <div className="min-h-80 bg-soft p-6">
        <div className="flex h-full min-h-72 flex-col justify-between border border-border bg-cream p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-black/35">Görsel alan</p>
          <p className="max-w-sm text-xl font-medium leading-8 text-muted">{service.visual}</p>
        </div>
      </div>
    </article>
  );
}
