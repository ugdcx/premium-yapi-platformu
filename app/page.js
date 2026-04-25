import {
  ArrowRight,
  BarChart3,
  Building2,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Hammer,
  Home,
  ReceiptText,
  ShieldCheck,
  WalletCards
} from "lucide-react";
import { statusChipClass } from "../lib/designSystem";

const services = [
  {
    icon: Building2,
    title: "Anahtar Teslim Yapı Geliştirme",
    text: "Arsa, konsept, bütçe, uygulama ve teslim sürecini tek yönetim planında toplar."
  },
  {
    icon: Hammer,
    title: "Tadilat & Değer Artırma",
    text: "Mevcut yapıları daha kullanışlı, modern ve satışa hazır hale getirir."
  },
  {
    icon: Home,
    title: "Gayrimenkul Danışmanlığı",
    text: "Satış, kiralama ve yatırım kararlarını doğru fiyat ve doğru sunumla yönetir."
  }
];

const controlItems = [
  "Günlük iş takibi",
  "Fotoğraf/video akışı",
  "Malzeme ve fatura kontrolü",
  "Teklif ve ödeme takibi",
  "Onay süreçleri"
];

const steps = [
  "Başvuru oluştur",
  "Bilgileri ve görselleri ekle",
  "Ekibimiz incelesin",
  "Teklif ve yol haritası hazırlansın",
  "Süreç panelden takip edilsin"
];

const trustItems = [
  ["Şeffaf süreç", "Kapsam, bütçe ve ilerleme görünür kalır."],
  ["Kanıtlı ilerleme", "Saha kayıtları fotoğraf ve zaman bilgisiyle desteklenir."],
  ["Tek merkezden yönetim", "Müşteri, yönetim ekibi ve saha ekibi aynı akışa bağlanır."],
  ["Profesyonel raporlama", "Teklif, ödeme, belge ve teslim kayıtları düzenli tutulur."]
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-cream text-stoneDark">
      <section className="px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-border bg-surface/80 px-4 py-2 text-sm text-muted">
              Yapı · Dönüşüm · Gayrimenkul operasyonları
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-7xl">
              Yapı, dönüşüm ve gayrimenkul süreçlerinizi tek merkezden yönetin.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-muted">
              Anahtar teslim inşaat, değer artırma çalışmaları ve gayrimenkul
              danışmanlığı süreçlerini şeffaf, kontrollü ve dijital olarak takip
              edilebilir hale getiriyoruz.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="/teklif-al"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-stoneDark px-7 py-4 font-medium text-white"
              >
                Ön Başvuru Oluştur
                <ArrowRight size={18} />
              </a>
              <a
                href="/client"
                className="inline-flex items-center justify-center rounded-full border border-border px-7 py-4 font-medium"
              >
                Paneli Gör
              </a>
            </div>
          </div>

          <DashboardMockup />
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Hizmet Yapısı"
            title="Üç ana hizmet, tek operasyon standardı."
            text="Her proje tipi kendi başvuru akışı, teklif modeli ve dijital takip paneliyle yönetilir."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  className="rounded-[2rem] border border-border bg-surface p-5 shadow-xl shadow-black/5 sm:p-8"
                >
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-stoneDark text-white">
                    <Icon size={26} />
                  </div>
                  <h3 className="text-2xl font-semibold">{service.title}</h3>
                  <p className="mt-4 leading-7 text-muted">{service.text}</p>
                  <a
                    href="/teklif-al"
                    className="mt-7 inline-flex items-center gap-2 text-sm font-medium"
                  >
                    Ön Başvuru Oluştur
                    <ArrowRight size={16} />
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-stoneDark px-4 py-16 text-white sm:px-6 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <SectionHeading
            eyebrow="Dijital Proje Kontrol"
            title="Saha, müşteri ve yönetim aynı ekranda buluşur."
            text="Projenin her aşaması kayıtlı, ölçülebilir ve kontrol edilebilir hale gelir."
            dark
          />

          <div className="grid gap-4">
            {controlItems.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-[1.5rem] border border-white/10 bg-white/10 p-5"
              >
                <CheckCircle2 className="text-gold" size={20} />
                <span className="text-white/80">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Nasıl Çalışır"
            title="Başvurudan teslim takibine kadar net bir yol."
            text="Karmaşık yapı ve gayrimenkul kararları sade bir akışa dönüştürülür."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-5">
            {steps.map((step, index) => (
              <div
                key={step}
                className="rounded-[1.5rem] border border-border bg-surface p-6"
              >
                <p className="text-sm text-black/35">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-8 text-xl font-semibold">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Güven ve Değer"
            title="Özel proje kontrol odası gibi çalışan platform."
            text="Müşteri kendini güvende hisseder; ekip kararları ve ilerlemeyi belgeli şekilde yönetir."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {trustItems.map(([title, text]) => (
              <article
                key={title}
                className="rounded-[1.5rem] border border-border bg-surface p-6"
              >
                <ShieldCheck className="text-gold" size={24} />
                <h3 className="mt-6 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-stoneDark p-6 text-white sm:p-10 md:p-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-6xl">
                Projenizi kontrollü bir sisteme taşıyın.
              </h2>
              <p className="mt-5 max-w-2xl leading-8 text-white/60">
                Yapı, tadilat veya gayrimenkul hedefinizi paylaşın; ekibimiz
                kapsamı, teklif yolunu ve takip modelini netleştirsin.
              </p>
            </div>
            <a
              href="/teklif-al"
              className="inline-flex justify-center rounded-full bg-gold px-8 py-4 font-medium text-stoneDark"
            >
              Ön Başvuru Oluştur
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function DashboardMockup() {
  return (
    <div className="rounded-[2rem] border border-border bg-surface p-4 shadow-2xl shadow-black/10">
      <div className="rounded-[1.5rem] bg-stoneDark p-6 text-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-white/45">Aktif proje</p>
            <h2 className="mt-1 text-2xl font-semibold">
              Villa Renovasyon Süreci
            </h2>
          </div>
          <span className={statusChipClass("Teklif Hazır")}>
            Teklif Hazır
          </span>
        </div>

        <div className="mt-8">
          <div className="mb-3 flex justify-between text-sm text-white/50">
            <span>İlerleme</span>
            <span>%42</span>
          </div>
          <div className="h-3 rounded-full bg-white/10">
            <div className="h-3 w-[42%] rounded-full bg-gold" />
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <MockMetric icon={Camera} label="Fotoğraf" value="124" />
          <MockMetric icon={ReceiptText} label="Teklif" value="₺1.25M" />
          <MockMetric icon={WalletCards} label="Kalan" value="₺1M" />
        </div>

        <div className="mt-8 grid gap-3">
          <MockLine
            icon={ClipboardCheck}
            text="Bugün 14:30 — Mutfak sökümü tamamlandı — 8 fotoğraf"
          />
          <MockLine
            icon={BarChart3}
            text="Teklif kapsamı ve ödeme planı müşteri onayında"
          />
          <MockLine icon={FileText} text="Teklif PDF ve sözleşme taslağı hazırlandı" />
        </div>
      </div>
    </div>
  );
}

function MockMetric({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <Icon className="text-gold" size={19} />
      <p className="mt-3 text-sm text-white/45">{label}</p>
      <p className="mt-1 text-xl font-semibold">{value}</p>
    </div>
  );
}

function MockLine({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 text-sm text-white/70">
      <Icon className="shrink-0 text-gold" size={18} />
      <span>{text}</span>
    </div>
  );
}

function SectionHeading({ eyebrow, title, text, dark = false }) {
  return (
    <div>
      <p
        className={`text-sm uppercase tracking-[0.3em] ${
          dark ? "text-white/35" : "text-black/40"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-4 max-w-4xl text-4xl font-semibold tracking-tight md:text-5xl ${
          dark ? "text-white" : "text-stoneDark"
        }`}
      >
        {title}
      </h2>
      <p
        className={`mt-5 max-w-2xl leading-8 ${
          dark ? "text-white/60" : "text-muted"
        }`}
      >
        {text}
      </p>
    </div>
  );
}
