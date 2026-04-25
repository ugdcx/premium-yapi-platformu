import {
  Building2,
  Hammer,
  Home,
  Camera,
  ReceiptText,
  ShieldCheck,
  BarChart3,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Anahtar Teslim Yapı Geliştirme",
    text: "Arsa aşamasından anahtar teslimine kadar tüm yapı üretim sürecini planlayan, yöneten ve uygulayan entegre hizmet modeli."
  },
  {
    icon: Hammer,
    title: "Tadilat & Değer Artırma Çalışmaları",
    text: "Mevcut konutları modernize ederek kullanım kalitesini, estetik değerini ve piyasa karşılığını yükselten yenileme çözümleri."
  },
  {
    icon: Home,
    title: "Gayrimenkul Satış Danışmanlığı",
    text: "Gayrimenkulünüzü doğru strateji, doğru sunum ve değer artırıcı hazırlıklarla pazara taşıyan danışmanlık süreci."
  }
];

const panelItems = [
  "Günlük iş takibi",
  "Saatli fotoğraf ve video akışı",
  "Malzeme, marka ve fatura kontrolü",
  "Ödeme planı ve kalan bakiye takibi",
  "Müşteri onay sistemi",
  "Teslim ve garanti kayıtları"
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-cream">
      <header className="fixed top-0 z-50 w-full border-b border-black/10 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="text-xl font-semibold tracking-tight">
            AG Yapı Platformu
          </div>

          <nav className="hidden gap-8 text-sm text-black/70 md:flex">
            <a href="#alanlar">Alanlar</a>
            <a href="#panel">Proje Paneli</a>
            <a href="#surec">Süreç</a>
            <a href="#iletisim">İletişim</a>
          </nav>

          <a
            href="#iletisim"
            className="rounded-full bg-stoneDark px-5 py-2 text-sm text-white"
          >
            Teklif Al
          </a>
        </div>
      </header>

      <section className="px-6 pt-36 pb-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-black/10 px-4 py-2 text-sm text-black/60">
              Yapı geliştirme · Değer artırma · Satış danışmanlığı
            </div>

            <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
              Yapı ve gayrimenkul süreçlerini tek merkezden yönetin.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-black/65">
              Anahtar teslim inşaat, renovasyon, değer artırma ve satış
              danışmanlığı süreçlerini şeffaf, ölçülebilir ve dijital olarak
              takip edilebilir bir modele dönüştürüyoruz.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#panel"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-stoneDark px-7 py-4 text-white"
              >
                Proje kontrol sistemini incele
                <ArrowRight size={18} />
              </a>

              <a
                href="#alanlar"
                className="inline-flex items-center justify-center rounded-full border border-black/15 px-7 py-4"
              >
                Hizmet alanları
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/10 bg-white/50 p-5 shadow-2xl shadow-black/10">
            <div className="rounded-[1.5rem] bg-stoneDark p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/50">Aktif Proje</p>
                  <h3 className="mt-1 text-2xl font-semibold">
                    Villa Renovasyon Süreci
                  </h3>
                </div>
                <div className="rounded-full bg-white/10 px-4 py-2 text-sm">
                  %68 tamamlandı
                </div>
              </div>

              <div className="mt-8 h-3 rounded-full bg-white/10">
                <div className="h-3 w-[68%] rounded-full bg-gold" />
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <Metric title="Bugün" value="7 kayıt" />
                <Metric title="Fotoğraf" value="124 adet" />
                <Metric title="Kalan" value="₺420.000" />
              </div>

              <div className="mt-8 rounded-2xl bg-white/10 p-5">
                <p className="text-sm text-white/50">Son güncelleme</p>
                <p className="mt-2">
                  Mutfak dolap sökümü tamamlandı. Elektrik altyapı hazırlığı
                  için saha kontrolü yapıldı.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="alanlar" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm uppercase tracking-[0.3em] text-black/40">
            Uzmanlık Alanları
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            İnşaat, renovasyon ve satış sürecini birbirine bağlayan yapı.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[2rem] border border-black/10 bg-white/55 p-8 shadow-xl shadow-black/5"
                >
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-stoneDark text-white">
                    <Icon size={26} />
                  </div>
                  <h3 className="text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-4 leading-7 text-black/60">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="panel" className="bg-stoneDark px-6 py-24 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/35">
              Dijital Proje Kontrol Paneli
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Müşteri, yapılan işi saatiyle ve kanıtıyla takip eder.
            </h2>
            <p className="mt-6 leading-8 text-white/60">
              Her proje için özel bir müşteri paneli oluşturulur. Yapılan işler,
              kullanılan malzemeler, faturalar, fotoğraflar, ödeme planı ve
              onay bekleyen kararlar tek ekranda toplanır.
            </p>

            <div className="mt-8 grid gap-4">
              {panelItems.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="text-gold" size={20} />
                  <span className="text-white/80">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-5 text-stoneDark">
            <div className="grid gap-4">
              <PanelCard
                icon={Camera}
                title="Fotoğraf Akışı"
                text="Bugün 18 yeni saha fotoğrafı eklendi."
              />
              <PanelCard
                icon={ReceiptText}
                title="Malzeme & Fatura"
                text="Seramik, armatür ve boya faturaları yüklendi."
              />
              <PanelCard
                icon={BarChart3}
                title="Bütçe Takibi"
                text="Toplam bütçenin %62’si kullanıldı."
              />
              <PanelCard
                icon={ShieldCheck}
                title="Onay Bekleyenler"
                text="2 malzeme seçimi müşteri onayı bekliyor."
              />
            </div>
          </div>
        </div>
      </section>

      <section id="surec" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm uppercase tracking-[0.3em] text-black/40">
            Süreç Yönetimi
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Kontrol edilebilir, raporlanabilir, şeffaf süreç.
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {[
              "Ön Görüşme",
              "Keşif & Analiz",
              "Teklif & Planlama",
              "Uygulama",
              "Dijital Takip",
              "Kalite Kontrol",
              "Teslim",
              "Garanti & Destek"
            ].map((step, index) => (
              <div
                key={step}
                className="rounded-3xl border border-black/10 bg-white/50 p-6"
              >
                <div className="mb-6 text-sm text-black/40">
                  0{index + 1}
                </div>
                <h3 className="text-xl font-semibold">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="iletisim" className="px-6 pb-24">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-stoneDark p-10 text-white md:p-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Projenizi kontrollü ve şeffaf bir sisteme taşıyın.
              </h2>
              <p className="mt-5 max-w-2xl leading-8 text-white/60">
                Anahtar teslim yapı, değer artırma çalışması veya satış
                danışmanlığı için ilk değerlendirme talebi oluşturun.
              </p>
            </div>

            <form className="grid gap-4">
              <input
                className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 outline-none placeholder:text-white/35"
                placeholder="Ad Soyad"
              />
              <input
                className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 outline-none placeholder:text-white/35"
                placeholder="Telefon"
              />
              <select className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 outline-none">
                <option>Hizmet alanı seçin</option>
                <option>Anahtar teslim yapı geliştirme</option>
                <option>Tadilat & değer artırma</option>
                <option>Gayrimenkul satış danışmanlığı</option>
              </select>
              <button className="rounded-2xl bg-gold px-5 py-4 font-medium text-stoneDark">
                Ön Talep Oluştur
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

function Metric({ title, value }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <p className="text-sm text-white/40">{title}</p>
      <p className="mt-1 text-xl font-semibold">{value}</p>
    </div>
  );
}

function PanelCard({ icon: Icon, title, text }) {
  return (
    <div className="rounded-3xl border border-black/10 bg-cream p-6">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-stoneDark text-white">
        <Icon size={22} />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-black/60">{text}</p>
    </div>
  );
}
