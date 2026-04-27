import {
  ArrowRight,
  Building2,
  CheckCircle2,
  DraftingCompass,
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
      "Arsa sahibi veya yatırımcıysanız, villa, müstakil konut ya da ticari yapı fikrinizin dağınık kararlar arasında ilerlemesini önleriz. Fikir aşamasından teslim sürecine kadar planlama, uygulama ve saha koordinasyonunu tek profesyonel ekip altında toplarız.",
    bullets: [
      "Arsa ve fikir aşamasından teslim planına uzanan net yol haritası",
      "Tek ekip sorumluluğunda planlama, uygulama ve saha koordinasyonu",
      "Sürprizleri azaltan kapsam, takvim ve karar yönetimi",
      "Aşama bazlı fotoğraflı güncellemelerle şeffaf ilerleme",
      "Teslim öncesi kalite kontrol ve kapanış hazırlığı"
    ],
    visual: "Villa dış cephe, saha düzeni ve teslim hazırlığı"
  },
  {
    icon: Hammer,
    title: "Tadilat & Değer Artırma",
    intro:
      "Ev sahibi, satıcı, kiraya veren veya yatırımcıysanız mevcut yapınızı daha konforlu, daha estetik ve daha değerli hale getiririz. Mutfak, banyo, komple ev veya dış cephe işlerinde sürprizleri azaltan kontrollü bir yenileme planı kurarız.",
    bullets: [
      "Mevcut yapının konfor, estetik ve değer potansiyelinin okunması",
      "Satış veya kiralama öncesi hazırlık için doğru müdahale planı",
      "Mutfak, banyo, komple ev ve dış cephe yenilemelerinde kontrollü uygulama",
      "Kararları sadeleştiren malzeme, kapsam ve takvim yönetimi",
      "Öncesi, süreç ve sonrası için düzenlenmiş müşteri bilgilendirmeleri"
    ],
    visual: "İç mekan yenileme, malzeme seçimi ve uygulama süreci"
  },
  {
    icon: Home,
    title: "Gayrimenkul Danışmanlığı",
    intro:
      "Satmak, kiraya vermek, satın almak veya yatırım yapmak istediğiniz mülk için doğru konumlandırmayı kurarız. Değerleme, sunum ve hazırlık stratejisini kullanım amacınıza göre netleştiririz.",
    bullets: [
      "Doğru değerleme, doğru sunum ve doğru stratejiyle mülk konumlandırma",
      "Satış veya kiralama öncesi değer artırma önerileri",
      "Portföy hazırlığı, ilan dili ve görsel sunum yönlendirmesi",
      "Yatırım ve kullanım amacı odaklı danışmanlık",
      "Karar sürecini sadeleştiren risk ve fırsat değerlendirmesi"
    ],
    visual: "Portföy hazırlığı, sunum stratejisi ve bölge değerlendirmesi"
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
              Değerini artırmak istediğiniz mülk için net bir yol haritası.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">
              BLAAG Construction and Architecture; yapı, tadilat ve gayrimenkul
              kararlarınızı belirsizlikten çıkarır, profesyonel uygulama ve
              şeffaf süreç yönetimiyle sonuca taşır.
            </p>
            <a href="/teklif-al" className="mt-9 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-4 font-medium text-stoneDark">
              Projemi netleştirmek istiyorum
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
                Her hizmette aynı hedef: daha net karar, daha kontrollü süreç, daha güçlü sonuç.
              </h2>
              <p className="mt-5 max-w-2xl leading-8 text-muted">
                Sürecin başında belirsizlikleri azaltır, uygulama boyunca
                gelişmeleri görünür kılar, teslim aşamasında kararları ve
                belgeleri düzenli biçimde kapatırız.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Kapsamın erken netleşmesi",
                "Değer artışı için doğru öncelikler",
                "Size özel takip bağlantısı",
                "Kontrollü teslim ve kapanış"
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
          Bu hizmet için görüşelim
          <ArrowRight size={16} />
        </a>
      </div>
      <div className="min-h-80 bg-soft p-6">
        <PremiumImageFrame label={service.visual} />
      </div>
    </article>
  );
}

function PremiumImageFrame({ label }) {
  return (
    <div className="relative h-full min-h-72 overflow-hidden border border-border bg-cream shadow-sm shadow-black/5">
      <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(198,168,91,0.18),rgba(255,255,255,0)_40%),linear-gradient(90deg,rgba(17,17,17,0.055)_1px,transparent_1px),linear-gradient(0deg,rgba(17,17,17,0.045)_1px,transparent_1px)] bg-[length:auto,42px_42px,42px_42px]" />
      <div className="absolute left-6 top-6 h-24 w-24 border-l border-t border-gold/60" />
      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-5">
        <p className="max-w-sm text-xl font-medium leading-8 text-muted">{label}</p>
        <DraftingCompass className="shrink-0 text-gold/75" size={30} />
      </div>
    </div>
  );
}
