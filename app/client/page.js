import {
  Camera,
  CheckCircle2,
  Clock3,
  CreditCard,
  FileText,
  Home,
  ReceiptText,
  ShieldCheck,
  UserRound,
  WalletCards
} from "lucide-react";

const updates = [
  {
    time: "09:20",
    title: "Mutfak alanı söküm işlemi başladı",
    text: "Alt dolaplar ve eski tezgah demontajı tamamlandı.",
    photos: 8
  },
  {
    time: "12:45",
    title: "Elektrik altyapısı kontrol edildi",
    text: "Ada mutfak için priz ve aydınlatma hatları işaretlendi.",
    photos: 5
  },
  {
    time: "16:10",
    title: "Banyo seramik teslimatı yapıldı",
    text: "60x120 mat yüzey seramikler sahaya alındı.",
    photos: 12
  }
];

const materials = [
  ["Seramik", "Bien 60x120", "₺42.500", "Fatura yüklendi"],
  ["Boya", "Jotun İç Cephe", "₺18.750", "Onaylandı"],
  ["Armatür", "VitrA", "₺31.200", "Onay bekliyor"]
];

export default function ClientPanel() {
  return (
    <main className="min-h-screen bg-cream px-6 py-8 text-stoneDark">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col justify-between gap-4 rounded-[2rem] bg-stoneDark p-6 text-white md:flex-row md:items-center">
          <div>
            <p className="text-sm text-white/45">Müşteri Proje Paneli</p>
            <h1 className="mt-1 text-3xl font-semibold">
              Villa Renovasyon Süreci
            </h1>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3">
            <UserRound size={20} />
            <div>
              <p className="text-sm text-white/45">Müşteri</p>
              <p className="font-medium">Ali Atmaca</p>
            </div>
          </div>
        </header>

        <section className="grid gap-5 md:grid-cols-4">
          <Metric icon={Home} title="Proje Durumu" value="%68" />
          <Metric icon={Camera} title="Fotoğraf" value="124" />
          <Metric icon={WalletCards} title="Kalan Ödeme" value="₺420.000" />
          <Metric icon={Clock3} title="Tahmini Teslim" value="18 Gün" />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-black/10 bg-white/60 p-6 lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-black/35">
                  Günlük İş Takibi
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  Bugünkü saha kayıtları
                </h2>
              </div>
              <span className="rounded-full bg-stoneDark px-4 py-2 text-sm text-white">
                3 kayıt
              </span>
            </div>

            <div className="grid gap-4">
              {updates.map((item) => (
                <div
                  key={item.time}
                  className="rounded-3xl border border-black/10 bg-cream p-5"
                >
                  <div className="flex flex-col justify-between gap-3 md:flex-row">
                    <div>
                      <p className="text-sm text-black/40">{item.time}</p>
                      <h3 className="mt-1 text-xl font-semibold">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-black/60">{item.text}</p>
                    </div>
                    <div className="flex h-fit items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm">
                      <Camera size={16} />
                      {item.photos} fotoğraf
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="grid gap-6">
            <div className="rounded-[2rem] bg-stoneDark p-6 text-white">
              <p className="text-sm text-white/45">Tamamlanma</p>
              <h3 className="mt-2 text-4xl font-semibold">%68</h3>
              <div className="mt-5 h-3 rounded-full bg-white/10">
                <div className="h-3 w-[68%] rounded-full bg-gold" />
              </div>
              <p className="mt-4 text-sm text-white/55">
                Sıradaki aşama: elektrik altyapısı ve seramik uygulama hazırlığı.
              </p>
            </div>

            <div className="rounded-[2rem] border border-black/10 bg-white/60 p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-black/35">
                Onay Bekleyenler
              </p>
              <div className="mt-5 grid gap-3">
                <Approval text="Banyo armatür seçimi" />
                <Approval text="Mutfak dolabı kulp modeli" />
                <Approval text="Salon boya tonu" />
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-black/10 bg-white/60 p-6">
            <div className="mb-6 flex items-center gap-3">
              <ReceiptText />
              <h2 className="text-2xl font-semibold">Malzeme & Faturalar</h2>
            </div>

            <div className="overflow-hidden rounded-3xl border border-black/10">
              {materials.map((row) => (
                <div
                  key={row[0]}
                  className="grid grid-cols-4 gap-3 border-b border-black/10 bg-cream p-4 text-sm last:border-b-0"
                >
                  <span className="font-medium">{row[0]}</span>
                  <span className="text-black/60">{row[1]}</span>
                  <span className="text-black/60">{row[2]}</span>
                  <span className="text-black/60">{row[3]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/10 bg-white/60 p-6">
            <div className="mb-6 flex items-center gap-3">
              <CreditCard />
              <h2 className="text-2xl font-semibold">Ödeme Özeti</h2>
            </div>

            <div className="grid gap-4">
              <Payment label="Toplam Proje Bedeli" value="₺1.250.000" />
              <Payment label="Ödenen" value="₺830.000" />
              <Payment label="Kalan" value="₺420.000" />
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-3">
          <Module icon={FileText} title="Belgeler" text="Sözleşme, teklif, fatura ve garanti belgeleri." />
          <Module icon={ShieldCheck} title="Teslim & Garanti" text="Teslim checklist, eksik listesi ve servis talepleri." />
          <Module icon={CheckCircle2} title="Müşteri Onayları" text="Malzeme, renk, model ve ek iş karar geçmişi." />
        </section>
      </div>
    </main>
  );
}

function Metric({ icon: Icon, title, value }) {
  return (
    <div className="rounded-[2rem] border border-black/10 bg-white/60 p-6">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-stoneDark text-white">
        <Icon size={22} />
      </div>
      <p className="text-sm text-black/45">{title}</p>
      <p className="mt-1 text-3xl font-semibold">{value}</p>
    </div>
  );
}

function Approval({ text }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-cream p-4">
      <span className="text-sm">{text}</span>
      <span className="rounded-full bg-gold px-3 py-1 text-xs text-stoneDark">
        Bekliyor
      </span>
    </div>
  );
}

function Payment({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-cream p-5">
      <span className="text-black/55">{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Module({ icon: Icon, title, text }) {
  return (
    <div className="rounded-[2rem] border border-black/10 bg-white/60 p-6">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-stoneDark text-white">
        <Icon size={22} />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-black/60">{text}</p>
    </div>
  );
}
