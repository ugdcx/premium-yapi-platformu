import { ArrowRight, Camera, FileText, Globe2, ShieldCheck, WalletCards } from "lucide-react";
import { createSeoMetadata } from "../../lib/seo";

export const metadata = createSeoMetadata({
  title: "BLAGG Remote | Uzaktan Proje Yönetimi",
  description: "BLAGG Remote ile projenizi özel bağlantıdan fotoğraflar, ödeme planı ve belgelerle takip edin.",
  path: "/blagg-remote"
});

const features = [
  ["Private Project Access", "Kayıt olmadan özel proje görünümü.", ShieldCheck],
  ["Onaylı fotoğraflar", "Sadece incelenmiş saha kayıtları.", Camera],
  ["Ödeme ve belgeler", "Plan, tahsilat ve dokümanlar tek yerde.", WalletCards],
  ["Uzaktan takip", "Şehir dışında veya yurtdışında görünür süreç.", Globe2]
];

export default function BlaggRemotePage() {
  return (
    <main className="min-h-screen bg-cream px-4 py-8 text-stoneDark sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <header className="grid gap-8 rounded-[1.75rem] bg-stoneDark p-7 text-white md:p-12 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-white/40">BLAGG Remote</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              Özel proje bağlantısı.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">
              Fotoğraflar, ödeme planı ve belgeler tek müşteri görünümünde toplanır.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <a href="/client/akyazi-villa-renovasyonu/proje-takip/1234567" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-stoneDark">
              Proje Deneyimini Gör
              <ArrowRight size={18} />
            </a>
            <a href="/teklif-al" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/20 px-7 py-4 font-semibold text-white">
              Projenizi Başlatın
            </a>
          </div>
        </header>

        <section className="mt-6 grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-4">
          {features.map(([title, text, Icon]) => (
            <article key={title} className="flex h-full flex-col justify-between rounded-[1.5rem] border border-border bg-surface p-5 shadow-card">
              <div>
                <Icon className="text-graphite" size={25} />
                <h2 className="mt-5 text-2xl font-semibold">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{text}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-6 grid gap-6 rounded-[1.75rem] border border-border bg-surface p-7 shadow-card md:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <FileText className="text-graphite" size={28} />
            <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-5xl">
              Müşteriye yalnızca onaylı kayıtlar gider.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {["Saha yükler", "Control inceler", "Remote yayınlar"].map((item, index) => (
              <div key={item} className="rounded-2xl bg-soft p-5">
                <p className="text-sm font-semibold text-muted">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-2 text-lg font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
