import Link from "next/link";
import { ArrowRight, Link2, ShieldCheck } from "lucide-react";
import { createSeoMetadata } from "../../lib/seo";

export const metadata = createSeoMetadata({
  title: "BLAGG Remote | Proje Takip",
  description:
    "BLAGG Remote müşteriye özel fotoğraflı proje takip bağlantısı, ödeme planı ve belge takibi hakkında bilgi.",
  path: "/proje-takip"
});

export default function ProjectTrackingIntroPage() {
  return (
    <main className="bg-[#F7F7F5] pt-24 text-[#111111]">
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <header className="rounded-[2rem] border border-black/10 bg-black p-6 text-white md:p-10">
          <p className="text-xs uppercase tracking-[0.3em] text-white/42">BLAGG Remote</p>
          <h1 className="mt-4 text-[2.8rem] leading-[0.98] md:text-[4rem]">
            Projenizi size özel bağlantıdan takip edin.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/62">
            Üyelik yok. Uygulama yok. Size gönderilen özel bağlantı ile onaylı fotoğrafları, iş durumunu, belgeleri ve ödeme özetini görebilirsiniz.
          </p>
        </header>

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          <InfoCard
            title="Özel bağlantı size gönderilir"
            text="Aktif projeniz başladığında takip bağlantınız yalnızca sizinle paylaşılır."
            icon={Link2}
          />
          <InfoCard
            title="Projenizi başlatın"
            text="Kapsamı paylaşın. Uygun çalışma modeli netleşirse BLAGG Remote alanınız oluşturulur."
            href="/teklif-al"
            icon={ShieldCheck}
          />
        </section>
      </section>
    </main>
  );
}

function InfoCard({ title, text, href, icon: Icon }) {
  return (
    <article className="rounded-[2rem] border border-black/10 bg-white p-6">
      <Icon className="text-black/62" size={26} />
      <h2 className="mt-5 text-[2rem]">{title}</h2>
      <p className="mt-3 text-base leading-7 text-black/58">{text}</p>
      {href ? (
        <Link
          href={href}
          className="mt-6 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-white"
        >
          Projenizi Başlatın
          <ArrowRight size={18} />
        </Link>
      ) : null}
    </article>
  );
}
