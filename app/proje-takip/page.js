import { ArrowRight, ShieldCheck, Smartphone } from "lucide-react";
import { createSeoMetadata } from "../../lib/seo";

export const metadata = createSeoMetadata({
  title: "Proje Takip | BLAAG Construction and Architecture",
  description:
    "BLAAG müşteriye özel fotoğraflı proje takip bağlantısı, ödeme planı ve belge takibi hakkında bilgi.",
  path: "/proje-takip"
});

export default function ProjectTrackingIntroPage() {
  return (
    <main className="min-h-screen bg-cream px-4 py-8 text-stoneDark sm:px-6">
      <div className="mx-auto max-w-5xl">
        <header className="rounded-[2rem] bg-stoneDark p-6 text-white md:p-10">
          <p className="text-sm uppercase tracking-[0.25em] text-white/35">Proje Takip Sistemi</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            Projenizi size özel bağlantıdan takip edin.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">
            BLAAG projelerinde kayıt olmadan, size gönderilen özel link ile fotoğrafları, iş durumunu, ödemeleri ve belgeleri görebilirsiniz.
          </p>
        </header>

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          <InfoCard title="Demo müşteri ekranı" href="/client/akyazi-villa-renovasyonu/proje-takip/1234567" icon={Smartphone} />
          <InfoCard title="Teklif başvurusu" href="/teklif-al" icon={ShieldCheck} />
        </section>
      </div>
    </main>
  );
}

function InfoCard({ title, href, icon: Icon }) {
  return (
    <article className="rounded-[2rem] border border-border bg-surface p-6 shadow-card">
      <Icon className="text-gold" size={30} />
      <h2 className="mt-5 text-3xl font-semibold">{title}</h2>
      <a href={href} className="mt-6 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-stoneDark px-7 py-4 font-semibold text-white">
        Aç
        <ArrowRight size={18} />
      </a>
    </article>
  );
}
