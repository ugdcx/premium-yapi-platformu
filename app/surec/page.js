import { ArrowRight, CheckCircle2, ClipboardCheck, Hammer, ShieldCheck } from "lucide-react";
import { createSeoMetadata } from "../../lib/seo";

export const metadata = createSeoMetadata({
  title: "Süreç | BLAGG Studio",
  description: "BLAGG Studio renovasyon sürecini planla, uygula ve takip et adımlarıyla yönetir.",
  path: "/surec"
});

const flow = [
  {
    title: "Planla",
    text: "Kapsam, malzeme ve takvim netleşir.",
    points: ["Mevcut durum", "Kapsam sınırı", "Net teklif"],
    href: "/teklif-al"
  },
  {
    title: "Uygula",
    text: "Saha işleri kontrollü şekilde ilerler.",
    points: ["İş kalemleri", "Saha notları", "Kalite kontrol"],
    href: "/hizmetler"
  },
  {
    title: "Takip Et",
    text: "İlerleme özel bağlantıdan görünür olur.",
    points: ["Onaylı fotoğraflar", "Ödeme planı", "Belgeler"],
    href: "/blagg-remote"
  }
];

const icons = [ClipboardCheck, Hammer, ShieldCheck];

export default function ProcessPage() {
  return (
    <main className="min-h-screen bg-cream px-4 py-8 text-stoneDark sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-[1.75rem] bg-stoneDark p-7 text-white md:p-12">
          <p className="text-sm uppercase tracking-[0.24em] text-white/40">Project Flow</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Üç adımda kontrollü renovasyon.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">
            Planla. Uygula. Takip Et.
          </p>
        </header>

        <section className="mt-6 grid auto-rows-fr gap-4 md:grid-cols-3">
          {flow.map((step, index) => {
            const Icon = icons[index] || ShieldCheck;
            return (
              <article key={step.title} className="flex h-full flex-col justify-between rounded-[1.5rem] border border-border bg-surface p-6 shadow-card">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <Icon className="text-graphite" size={28} />
                    <span className="text-sm font-semibold text-muted">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h2 className="mt-7 text-3xl font-semibold tracking-tight">{step.title}</h2>
                  <p className="mt-3 min-h-14 leading-7 text-muted">{step.text}</p>
                  <div className="mt-6 grid gap-2">
                    {step.points.map((point) => (
                      <div key={point} className="flex items-center gap-2 text-sm font-medium text-graphite">
                        <CheckCircle2 className="shrink-0 text-graphite" size={16} />
                        {point}
                      </div>
                    ))}
                  </div>
                </div>
                <a href={step.href} className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-stoneDark px-5 py-3 text-sm font-semibold text-white">
                  {index === 0 ? "Ön Başvuru Oluştur" : index === 2 ? "BLAGG Remote'u İnceleyin" : "Hizmetleri İnceleyin"}
                  <ArrowRight size={16} />
                </a>
              </article>
            );
          })}
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-border bg-surface p-7 shadow-card md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
                Süreç kısa, kayıt net.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-muted">
                Her proje kapsam, saha ilerlemesi ve teslim kayıtlarıyla yönetilir.
              </p>
            </div>
            <a href="/teklif-al" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-stoneDark px-8 py-4 font-semibold text-white">
              Projenizi Başlatın
              <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
