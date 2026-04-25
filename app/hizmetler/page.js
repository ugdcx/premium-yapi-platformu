import {
  ArrowRight,
  Building2,
  CheckCircle2,
  GitBranch,
  Hammer,
  Home,
  ShieldCheck
} from "lucide-react";

export const metadata = {
  title: "Hizmetler | Premium Yapı Platformu",
  description:
    "Yapı geliştirme, değer artırma ve gayrimenkul danışmanlığını tek merkezden yöneten bütüncül hizmet modeli."
};

const serviceAreas = [
  {
    icon: Building2,
    title: "Anahtar Teslim Yapı Geliştirme",
    intro:
      "Arsa sahibi olan, villa veya müstakil ev yaptırmak isteyen ve süreci tek elden yürütmek isteyen müşteriler için uçtan uca yapı geliştirme modeli.",
    audience: [
      "Arsa sahibi",
      "Villa / müstakil ev yaptırmak isteyen",
      "Süreci tek elden yürütmek isteyen"
    ],
    bullets: [
      "Proje planlama",
      "Kaba ve ince yapı uygulamaları",
      "Malzeme ve ekip organizasyonu",
      "Şantiye takibi",
      "Dijital süreç raporlama",
      "Anahtar teslim teslimat"
    ],
    cta: "Ön Başvuru Oluştur"
  },
  {
    icon: Hammer,
    title: "Tadilat & Değer Artırma Çalışmaları",
    intro:
      "Mevcut evini yenilemek, satış veya kiralama öncesi değer artırmak, mutfak, banyo, komple ev ya da dış cephe gibi alanları dönüştürmek isteyenler için.",
    audience: [
      "Mevcut evini yenilemek isteyen",
      "Satış veya kiralama öncesi değer artırmak isteyen",
      "Mutfak, banyo, komple ev veya dış cephe dönüşümü planlayan"
    ],
    bullets: [
      "Mevcut durum analizi",
      "Fotoğraf üzerinden ön inceleme",
      "İş kapsamı belirleme",
      "Malzeme seçimi",
      "Uygulama takibi",
      "Öncesi / sonrası raporlama"
    ],
    cta: "Ön Başvuru Oluştur"
  },
  {
    icon: Home,
    title: "Gayrimenkul Satış Danışmanlığı",
    intro:
      "Satmak, kiraya vermek, satın almak veya yatırım yapmak isteyen kişiler için gayrimenkulü doğru fiyat, doğru sunum ve doğru strateji ile konumlandırır.",
    audience: [
      "Satmak veya kiraya vermek isteyen",
      "Satın alma veya yatırım kararı veren",
      "Gayrimenkulünü pazara daha güçlü hazırlamak isteyen"
    ],
    bullets: [
      "Piyasa ve fiyat analizi",
      "Satış/kiralama stratejisi",
      "İlan hazırlığı",
      "Değer artırma önerileri",
      "Portföy takibi",
      "Müşteri görüşme süreci"
    ],
    cta: "Ön Başvuru Oluştur"
  }
];

const crossServiceItems = [
  "Satış öncesi tadilat",
  "Tadilat sonrası kiralama",
  "Arsa arayışı sonrası yapı geliştirme",
  "Gayrimenkul değerlendirme sonrası değer artırma çalışması"
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-cream px-4 py-8 text-stoneDark sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-[2rem] bg-stoneDark p-6 text-white sm:p-8 md:p-12">
          <div className="flex flex-wrap gap-5 text-sm text-white/55">
            <a href="/">Ana sayfa</a>
            <a href="/login">Giriş Yap</a>
          </div>

          <div className="mt-16 max-w-5xl">
            <p className="text-sm uppercase tracking-[0.3em] text-white/35">
              Hizmetler
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-7xl">
              Hizmet Alanlarımız
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">
              Yapı geliştirme, değer artırma ve gayrimenkul danışmanlığını tek
              merkezden yöneten bütüncül bir hizmet modeli.
            </p>
            <a
              href="/teklif-al"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-4 font-medium text-stoneDark"
            >
              Ön Başvuru Oluştur
              <ArrowRight size={18} />
            </a>
          </div>
        </header>

        <section className="mt-8 grid gap-6 md:mt-10 md:gap-8">
          {serviceAreas.map((service, index) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className="grid gap-6 rounded-[2rem] border border-border bg-surface p-5 sm:p-6 md:p-8 lg:grid-cols-[0.8fr_1.2fr]"
              >
                <div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-stoneDark text-white">
                    <Icon size={26} />
                  </div>
                  <p className="mt-8 text-sm text-black/35">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-3 text-4xl font-semibold tracking-tight">
                    {service.title}
                  </h2>
                  <p className="mt-5 leading-8 text-muted">{service.intro}</p>
                  <a
                    href="/teklif-al"
                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-stoneDark px-6 py-3 text-sm font-medium text-white"
                  >
                    {service.cta}
                    <ArrowRight size={16} />
                  </a>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <InfoBlock title="Kimler için?">
                    {service.audience.map((item) => (
                      <CheckItem key={item}>{item}</CheckItem>
                    ))}
                  </InfoBlock>

                  <InfoBlock title="Hizmet kapsamı">
                    {service.bullets.map((item) => (
                      <CheckItem key={item}>{item}</CheckItem>
                    ))}
                  </InfoBlock>
                </div>
              </article>
            );
          })}
        </section>

        <section className="mt-8 rounded-[2rem] bg-stoneDark p-6 text-white sm:p-8 md:mt-10 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-gold">
                <GitBranch size={26} />
              </div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/35">
                Çapraz Strateji
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                Tek bir ihtiyacı değil, tüm süreci yönetiyoruz.
              </h2>
              <p className="mt-5 max-w-2xl leading-8 text-white/60">
                Bazı projelerde ilk ihtiyaç tadilat gibi görünür, fakat doğru
                karar satış, kiralama, yatırım veya yapı geliştirme stratejisiyle
                birlikte netleşir.
              </p>
            </div>

            <div className="grid gap-3">
              {crossServiceItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl bg-white/10 p-4"
                >
                  <ShieldCheck className="shrink-0 text-gold" size={19} />
                  <span className="text-white/75">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-border bg-surface p-6 sm:p-8 md:mt-10 md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                Hangi hizmete ihtiyacınız olduğunu birlikte netleştirelim.
              </h2>
              <p className="mt-5 max-w-2xl leading-8 text-muted">
                Akıllı ön başvuru akışı, ihtiyacınızı doğru hizmet alanına
                bağlayarak ekibimizin daha hızlı ve doğru değerlendirme yapmasını
                sağlar.
              </p>
            </div>
            <a
              href="/teklif-al"
              className="inline-flex justify-center rounded-full bg-gold px-8 py-4 font-medium text-stoneDark"
            >
              Ön Başvuru Oluştur
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

function InfoBlock({ title, children }) {
  return (
    <div className="rounded-[1.5rem] bg-cream p-5">
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="mt-5 grid gap-3">{children}</div>
    </div>
  );
}

function CheckItem({ children }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle2 className="mt-0.5 shrink-0 text-gold" size={18} />
      <span className="text-sm leading-6 text-muted">{children}</span>
    </div>
  );
}
