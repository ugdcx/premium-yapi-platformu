import {
  BarChart3,
  Users,
  FolderKanban,
  ReceiptText,
  Wallet,
  AlertTriangle
} from "lucide-react";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-cream px-6 py-8 text-stoneDark">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 rounded-[2rem] bg-stoneDark p-6 text-white">
          <p className="text-sm text-white/50">Admin Panel</p>
          <h1 className="mt-1 text-3xl font-semibold">
            Proje Yönetim Merkezi
          </h1>
        </header>

        <section className="grid gap-5 md:grid-cols-4">
          <Card title="Toplam Proje" value="12" icon={FolderKanban} />
          <Card title="Aktif Proje" value="7" icon={BarChart3} />
          <Card title="Toplam Tahsilat" value="₺2.450.000" icon={Wallet} />
          <Card title="Müşteriler" value="9" icon={Users} />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-black/10 bg-white/60 p-6 lg:col-span-2">
            <h2 className="text-2xl font-semibold">Projeler</h2>

            <div className="mt-5 grid gap-4">
              <Project name="Villa Renovasyon" status="Devam ediyor" />
              <Project name="Müstakil Ev İnşaatı" status="Kaba inşaat" />
              <Project name="Satışa Hazırlık Tadilat" status="Tamamlandı" />
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/10 bg-white/60 p-6">
            <h2 className="text-xl font-semibold">Uyarılar</h2>

            <div className="mt-4 grid gap-3">
              <Alert text="2 projede maliyet %80’i geçti" />
              <Alert text="1 müşteri ödeme gecikmesi" />
              <Alert text="3 onay bekleyen işlem var" />
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-3">
          <Quick title="Yeni Proje Oluştur" />
          <Quick title="İş Kaydı Gir" />
          <Quick title="Malzeme Ekle" />
        </section>
      </div>
    </main>
  );
}

function Card({ title, value, icon: Icon }) {
  return (
    <div className="rounded-[2rem] border border-black/10 bg-white/60 p-6">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-stoneDark text-white">
        <Icon size={22} />
      </div>
      <p className="text-sm text-black/45">{title}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
}

function Project({ name, status }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-cream p-4">
      <span>{name}</span>
      <span className="text-sm text-black/50">{status}</span>
    </div>
  );
}

function Alert({ text }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-cream p-4">
      <AlertTriangle size={18} />
      <span className="text-sm">{text}</span>
    </div>
  );
}

function Quick({ title }) {
  return (
    <button className="rounded-[2rem] border border-black/10 bg-white/60 p-6 text-left transition hover:bg-stoneDark hover:text-white">
      {title}
    </button>
  );
}
