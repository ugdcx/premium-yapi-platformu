import {
  ArrowRight,
  BriefcaseBusiness,
  Camera,
  CheckCircle2,
  ClipboardList,
  FileText,
  LayoutDashboard,
  MessageCircle,
  ShieldCheck,
  UserRound,
  UsersRound,
  WalletCards
} from "lucide-react";

export const metadata = {
  title: "Dijital Proje Kontrol Süreci | Premium Yapı Platformu",
  description:
    "Başvurudan teslimata kadar yapı, tadilat ve gayrimenkul süreçlerini kontrollü, kayıtlı ve şeffaf yönetme modeli."
};

const timeline = [
  "Ön Başvuru",
  "Bilgi ve Görsel Toplama",
  "İnceleme",
  "Teklif ve Yol Haritası",
  "Onay",
  "Uygulama / Danışmanlık Süreci",
  "Günlük Takip",
  "Teslim / Sonuçlandırma"
];

const roles = [
  {
    icon: UserRound,
    title: "Müşteri",
    text: "Süreci panelden takip eder; teklif, ödeme, fotoğraf, belge ve onay kararlarını net şekilde görür."
  },
  {
    icon: Camera,
    title: "Saha Ekibi",
    text: "Fotoğraf, kısa iş notu, alan bilgisi ve sorun bildirimlerini hızlıca sisteme ekler."
  },
  {
    icon: LayoutDashboard,
    title: "Yönetim Ekibi",
    text: "Başvuruları, teklifleri, fiyat girişlerini, müşteri iletişimini ve operasyon durumlarını tek merkezden yönetir."
  }
];

const customerCards = [
  ["Günlük güncellemeler", "Sahada ne yapıldığını tarih ve saat bilgisiyle görür."],
  ["Fotoğraf/video akışı", "İş ilerlemesini görsel kanıtlarla takip eder."],
  ["Teklif ve ödeme özeti", "Tek fiyat, ödenen ve kalan tutarı sade biçimde izler."],
  ["Onay bekleyen kararlar", "Revize, malzeme ve seçim kararlarını kaçırmaz."],
  ["Belgeler ve teslim kayıtları", "Sözleşme, teklif, fatura ve garanti belgelerine erişir."]
];

const fieldCards = [
  ["Fotoğraf yükler", "İş ilerlemesini hızlı görsellerle belgeye dönüştürür."],
  ["Kısa iş notu girer", "Günün önemli saha bilgisini anlaşılır şekilde aktarır."],
  ["Alan seçer", "Mutfak, banyo, salon, elektrik veya tesisat gibi alanları işaretler."],
  ["Sorun / malzeme eksikliği bildirir", "Bekleyen kararları ve riskleri erkenden görünür yapar."]
];

const adminCards = [
  ["Başvurular", "Yeni talepleri hizmet tipine ve önceliğe göre inceler."],
  ["Kontrollü süreç yönetimi", "Yeni başvuru, inceleme, teklif ve onay aşamalarını düzenli şekilde takip eder."],
  ["Teklif oluşturma", "Kapsamı ve yol haritasını müşteri için netleştirir."],
  ["Fiyat girişi", "Tek fiyat ve ödeme bilgisini panele işler."],
  ["Müşteri iletişimi", "Telefon ve WhatsApp üzerinden hızlı geri dönüş sağlar."],
  ["Durum değişiklikleri", "Başvurunun hangi aşamada olduğunu güncel tutar."]
];

export default function ProcessPage() {
  return (
    <main className="min-h-screen bg-cream px-4 py-8 text-stoneDark sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-[2rem] bg-stoneDark p-6 text-white sm:p-8 md:p-12">
          <div className="flex flex-wrap gap-5 text-sm text-white/55">
            <a href="/">Ana sayfa</a>
            <a href="/hizmetler">Hizmetler</a>
            <a href="/login">Giriş Yap</a>
          </div>

          <div className="mt-16 max-w-5xl">
            <p className="text-sm uppercase tracking-[0.3em] text-white/35">
              Süreç Yönetimi
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-7xl">
              Dijital Proje Kontrol Süreci
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">
              Başvurudan teslimata kadar tüm yapı, tadilat ve gayrimenkul
              süreçlerini kontrollü, kayıtlı ve şeffaf şekilde yönetiyoruz.
            </p>
          </div>
        </header>

        <section className="mt-8 rounded-[2rem] border border-border bg-surface p-5 sm:p-6 md:mt-10 md:p-8">
          <SectionHeading
            eyebrow="Süreç Zaman Çizgisi"
            title="Her aşama görünür, kayıtlı ve takip edilebilir."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {timeline.map((step, index) => (
              <div key={step} className="rounded-[1.5rem] bg-cream p-5">
                <p className="text-sm text-black/35">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-8 text-xl font-semibold">{step}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <SectionHeading
            eyebrow="Rol Bazlı Akış"
            title="Müşteri, saha ekibi ve yönetim ekibi aynı operasyon modelinde çalışır."
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <article
                  key={role.title}
                  className="rounded-[2rem] border border-border bg-surface p-7"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-stoneDark text-white">
                    <Icon size={25} />
                  </div>
                  <h3 className="mt-8 text-2xl font-semibold">{role.title}</h3>
                  <p className="mt-4 leading-7 text-muted">{role.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <CardGrid
          eyebrow="Müşteri Ne Görür?"
          title="Müşteri kendini güvende ve bilgilendirilmiş hisseder."
          items={customerCards}
          icon={ShieldCheck}
        />

        <CardGrid
          eyebrow="Saha Ekibi Ne Yapar?"
          title="Usta ve saha ekipleri hızlı, sade ve mobil bir akış kullanır."
          items={fieldCards}
          icon={Camera}
        />

        <CardGrid
          eyebrow="Yönetim Ekibi Ne Kontrol Eder?"
          title="Operasyon kararları tek merkezden yönetilir."
          items={adminCards}
          icon={BriefcaseBusiness}
        />

        <section className="mt-8 rounded-[2rem] bg-stoneDark p-6 text-white sm:p-8 md:mt-10 md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                Süreci kontrol altına almak için ilk başvuruyu oluşturun.
              </h2>
              <p className="mt-5 max-w-2xl leading-8 text-white/60">
                Proje bilgilerinizi ve görsellerinizi paylaşın; başvurunuz
                incelensin, teklif ve yol haritanız netleşsin.
              </p>
            </div>
            <a
              href="/teklif-al"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 font-medium text-stoneDark"
            >
              Ön Başvuru Oluştur
              <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

function CardGrid({ eyebrow, title, items, icon: Icon }) {
  return (
    <section className="mt-10">
      <SectionHeading eyebrow={eyebrow} title={title} />
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map(([itemTitle, text]) => (
          <article
            key={itemTitle}
            className="rounded-[1.5rem] border border-border bg-surface p-6"
          >
            <Icon className="text-gold" size={24} />
            <h3 className="mt-6 text-xl font-semibold">{itemTitle}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title }) {
  return (
    <div>
      <p className="text-sm uppercase tracking-[0.3em] text-black/40">
        {eyebrow}
      </p>
      <h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
    </div>
  );
}
