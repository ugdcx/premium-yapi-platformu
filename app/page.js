"use client";

import { useMemo } from "react";
import {
  ArrowRight,
  Building2,
  Camera,
  CheckCircle2,
  DraftingCompass,
  Hammer,
  Home,
  Layers3,
  Route,
  ShieldCheck
} from "lucide-react";

const projectScenarios = [
  {
    name: "A. Y******",
    type: "Villa Anahtar Teslim",
    today: ["Mutfak söküm tamamlandı", "6 fotoğraf eklendi"],
    status: "Uygulama aşaması",
    next: "Elektrik altyapı"
  },
  {
    name: "M. K******",
    type: "Komple Daire Tadilatı",
    today: ["Banyo seramikleri söküldü", "Tesisat noktaları kontrol edildi"],
    status: "Hazırlık aşaması",
    next: "Su yalıtımı"
  },
  {
    name: "E. Y******",
    type: "Satışa Hazırlık",
    today: ["Salon boya hazırlığı başladı", "Öncesi fotoğraflar eklendi"],
    status: "Değer artırma",
    next: "Son kat boya"
  },
  {
    name: "D. A******",
    type: "Müstakil Konut",
    today: ["Şantiye alanı düzenlendi", "Cephe kontrolü yapıldı"],
    status: "Şantiye koordinasyonu",
    next: "İnce iş programı"
  },
  {
    name: "S. B******",
    type: "Banyo Yenileme",
    today: ["Tesisat noktaları işaretlendi", "3 uygulama fotoğrafı eklendi"],
    status: "Hazırlık aşaması",
    next: "Su yalıtımı"
  },
  {
    name: "R. G******",
    type: "Gayrimenkul Danışmanlığı",
    today: ["Portföy sunumu hazırlandı", "İlan görselleri seçildi"],
    status: "Strateji aşaması",
    next: "Alıcı görüşmeleri"
  },
  {
    name: "N. Ö******",
    type: "Dış Cephe Yenileme",
    today: ["İskele kurulumu kontrol edildi", "Cephe renk alternatifi paylaşıldı"],
    status: "Saha hazırlığı",
    next: "Astar uygulaması"
  }
];

const services = [
  {
    icon: Building2,
    title: "Anahtar Teslim Yapı Geliştirme",
    text: "Arsa ya da yatırım fikrinizin dağınık kararlar içinde kaybolmasını önler; planlama, saha koordinasyonu ve teslimi tek profesyonel akışta yönetiriz.",
    image: "Taş cepheli villa kütlesi, doğal ışık, temiz şantiye düzeni"
  },
  {
    icon: Hammer,
    title: "Tadilat & Değer Artırma",
    text: "Mevcut yapınızı daha yaşanabilir, daha estetik ve daha değerli hale getirirken sürprizleri azaltan kontrollü bir yenileme planı kurarız.",
    image: "Mutfak, banyo ve yaşam alanı yenileme numune panosu"
  },
  {
    icon: Home,
    title: "Gayrimenkul Danışmanlığı",
    text: "Satış, kiralama, satın alma veya yatırım kararınızı doğru değerleme, doğru sunum ve kullanım amacına uygun stratejiyle güçlendiririz.",
    image: "Portföy dosyası, anahtar, mimari plan ve saha notları"
  }
];

const trustItems = [
  [ShieldCheck, "Şeffaf Süreç"],
  [Camera, "Fotoğraflı Takip"],
  [Layers3, "Tek Merkezden Yönetim"],
  [DraftingCompass, "Profesyonel Uygulama"]
];

const steps = ["Ön Başvuru", "Değerlendirme", "Teklif ve Plan", "Uygulama", "Takip ve Sonuç"];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-cream text-stoneDark">
      <section className="bg-stoneDark px-4 py-14 text-white sm:px-6 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/35">
              BLAAG Construction and Architecture
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-7xl">
              Kusursuz yapı, şeffaf süreç.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/65">
              Tüm süreci profesyonel ekibimiz yönetir. Siz sadece sonucu takip
              edersiniz.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="/teklif-al" className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 font-medium text-stoneDark">
                Ön Başvuru Oluştur
                <ArrowRight size={18} />
              </a>
              <a href="/surec" className="inline-flex items-center justify-center rounded-full border border-white/18 px-7 py-4 font-medium text-white">
                Süreci İncele
              </a>
            </div>
          </div>

          <MiniProjectCard />
        </div>
      </section>

      <section className="border-b border-border bg-cream px-4 py-6 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-3 md:grid-cols-4">
          {trustItems.map(([Icon, label]) => (
            <div key={label} className="flex items-center gap-3 border-border py-3 md:border-r md:last:border-r-0">
              <Icon className="text-gold" size={21} />
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Hizmetler"
            title="Belirsizliği azaltan, değeri artıran profesyonel yapı hizmetleri."
            text="BLAAG; yapı, tadilat ve gayrimenkul kararlarınızı netleştirir, sahadaki uygulamayı yönetir ve süreci fotoğraflı takip ayrıcalığıyla görünür kılar."
          />
          <div className="mt-12 grid gap-10">
            {services.map((service, index) => (
              <ServiceSplit key={service.title} service={service} reversed={index % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-soft px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Takip Ayrıcalığı"
              title="Süreci sadece yaptırmazsınız, şeffaf şekilde takip edersiniz."
              text="BLAAG ile yürütülen projelerde önemli aşamalar, fotoğraflar ve gelişmeler size özel takip bağlantısı üzerinden düzenli olarak sunulur."
            />
            <div className="mt-8 grid gap-4">
              {[
                "Aşama bazlı fotoğraflı güncellemeler",
                "Size özel takip bağlantısı",
                "Onaylı ve düzenlenmiş müşteri bilgilendirmeleri",
                "Belgeler, ödemeler ve teslim süreci için tek noktadan görünürlük"
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="text-gold" size={20} />
                  <span className="text-muted">{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-2xl border-l border-gold pl-5 leading-8 text-muted">
              Sahadan gelen fotoğraflar ekibimiz tarafından kontrol edilir,
              açıklamaları düzenlenir ve müşteriye anlaşılır şekilde sunulur.
            </p>
          </div>
          <div className="rounded-[2rem] border border-border bg-surface p-5 shadow-premium">
            <MiniProjectCard compact />
            <div className="mt-5 grid grid-cols-4 gap-3">
              {["Cephe", "Mutfak", "Detay", "Teslim"].map((item) => (
                <div key={item} className="aspect-[4/3] rounded-2xl bg-soft p-3 text-xs font-medium text-muted">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Süreç"
            title="Beş sade adımda kapsam netleşir, uygulama kontrollü ilerler."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-5">
            {steps.map((step, index) => (
              <div key={step} className="border-t border-border pt-5">
                <p className="text-sm text-black/35">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-5 text-xl font-semibold">{step}</h3>
              </div>
            ))}
          </div>
          <a href="/surec" className="mt-10 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium">
            Süreci detaylı incele
            <ArrowRight size={17} />
          </a>
        </div>
      </section>

      <section className="bg-soft px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Proje Kanıtı"
            title="Her proje görünür aşamalarla ilerler."
            text="Öncesi, süreç ve sonrası kayıtları; işin yalnızca bittiğini değil, nasıl yönetildiğini de gösterir."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              ["Öncesi", "Mevcut durum analiz edilir ve sürecin başlangıcı kayıt altına alınır.", "Mevcut doku"],
              ["Süreç", "Uygulama aşamaları düzenli şekilde takip edilir.", "Uygulama süreci"],
              ["Sonrası", "Teslim süreci, belgeler ve garanti bilgileri netleşir.", "Teslim sonrası"]
            ].map(([title, text, label]) => (
              <article key={title} className="bg-surface p-5">
                <ImageFrame label={label} />
                <h3 className="mt-6 text-2xl font-semibold">{title}</h3>
                <p className="mt-3 leading-7 text-muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-7xl bg-stoneDark p-8 text-white md:p-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <h2 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
              Projenizi birlikte netleştirelim.
            </h2>
            <a href="/teklif-al" className="inline-flex justify-center rounded-full bg-gold px-8 py-4 font-medium text-stoneDark">
              Ön Başvuru Oluştur
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function MiniProjectCard({ compact = false }) {
  const scenario = useMemo(
    () => projectScenarios[Math.floor(Math.random() * projectScenarios.length)],
    []
  );

  return (
    <div className={compact ? "rounded-[1.5rem] bg-stoneDark p-7 text-white" : "rounded-[2rem] border border-white/10 bg-white p-6 text-stoneDark shadow-[0_28px_80px_rgba(0,0,0,0.28)] lg:p-7"}>
      <div className={compact ? "" : "rounded-[1.5rem] bg-cream p-7 lg:p-8"}>
        <p className={compact ? "text-sm text-white/45" : "text-sm text-black/40"}>{scenario.name}</p>
        <h2 className="mt-3 text-3xl font-semibold">{scenario.type}</h2>
        <div className="mt-10">
          <p className={compact ? "text-sm font-medium text-white/55" : "text-sm font-medium text-muted"}>Bugün:</p>
          <div className="mt-4 grid gap-3">
            {scenario.today.map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gold" />
                <span className={compact ? "text-white/75" : "text-muted"}>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <SmallInfo label="Durum" value={scenario.status} compact={compact} />
          <SmallInfo label="Sonraki adım" value={scenario.next} compact={compact} />
        </div>
      </div>
    </div>
  );
}

function SmallInfo({ label, value, compact }) {
  return (
    <div className={compact ? "rounded-2xl bg-white/10 p-4" : "rounded-2xl bg-white p-4"}>
      <p className={compact ? "text-xs uppercase tracking-[0.16em] text-white/35" : "text-xs uppercase tracking-[0.16em] text-black/35"}>{label}</p>
      <p className={compact ? "mt-2 text-sm font-medium text-white/80" : "mt-2 text-sm font-medium text-stoneDark"}>{value}</p>
    </div>
  );
}

function ServiceSplit({ service, reversed }) {
  const Icon = service.icon;
  return (
    <article className={`grid gap-7 lg:grid-cols-2 lg:items-center ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}>
      <div className="py-4">
        <Icon className="text-gold" size={30} />
        <h3 className="mt-6 text-3xl font-semibold tracking-tight md:text-5xl">{service.title}</h3>
        <p className="mt-5 max-w-xl leading-8 text-muted">{service.text}</p>
        <a href="/hizmetler" className="mt-7 inline-flex items-center gap-2 text-sm font-medium">
          Detayları incele
          <ArrowRight size={16} />
        </a>
      </div>
      <div className="min-h-72 bg-soft p-6">
        <ImageFrame label={service.image} tall />
      </div>
    </article>
  );
}

function ImageFrame({ label, tall = false }) {
  return (
    <div className={`relative overflow-hidden border border-border bg-cream shadow-sm shadow-black/5 ${tall ? "min-h-60" : "aspect-[4/3]"}`}>
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(198,168,91,0.16),rgba(255,255,255,0)_42%),linear-gradient(90deg,rgba(17,17,17,0.06)_1px,transparent_1px),linear-gradient(0deg,rgba(17,17,17,0.05)_1px,transparent_1px)] bg-[length:auto,44px_44px,44px_44px]" />
      <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
        <div>
          <span className="block h-px w-16 bg-gold" />
          <p className="mt-3 max-w-xs text-sm font-medium text-muted">{label}</p>
        </div>
        <Route className="shrink-0 text-gold/70" size={26} />
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, text }) {
  return (
    <div>
      <p className="text-sm uppercase tracking-[0.3em] text-black/40">{eyebrow}</p>
      <h2 className="mt-4 max-w-5xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {text && <p className="mt-5 max-w-3xl leading-8 text-muted">{text}</p>}
    </div>
  );
}
