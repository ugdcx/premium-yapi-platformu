import {
  ArrowRight,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck
} from "lucide-react";
import { contactInfo } from "../../lib/data/contact";
import { createWhatsAppLink } from "../../lib/helpers/whatsapp";
import { createSeoMetadata } from "../../lib/seo";

export const metadata = createSeoMetadata({
  title: "İletişim | BLAGG Studio",
  description:
    "İnşaat, tadilat ve proje takip hizmetleri için BLAGG ile iletişime geçin.",
  path: "/iletisim"
});

export default function ContactPage() {
  const whatsappHref = createWhatsAppLink();

  return (
    <main className="min-h-screen bg-cream px-4 py-8 text-stoneDark sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="rounded-[2rem] bg-stoneDark p-6 text-white md:p-10">
          <p className="text-sm uppercase tracking-[0.25em] text-white/35">İletişim</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
            Projenizi Beraber Planlayalım
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/65">
            Yapılacak işi, konumu ve varsa fotoğrafları bizimle paylaşın. Ekibimiz kapsamı inceleyip sizinle iletişime geçsin.
          </p>
          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-4 font-semibold text-white"
            >
              <MessageCircle size={19} />
              WhatsApp
            </a>
            <a
              href="/teklif-al"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 font-semibold text-stoneDark"
            >
              Teklif Formu
              <ArrowRight size={18} />
            </a>
          </div>
        </header>

        <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <ContactCard
            icon={Phone}
            title="Telefon"
            text={contactInfo.phoneLabel}
            href={`tel:${contactInfo.phoneHref}`}
            cta="Ara"
          />
          <ContactCard
            icon={MessageCircle}
            title="WhatsApp"
            text="Projenizi hızlıca yazın, ekibimiz kapsamı değerlendirsin."
            href={whatsappHref}
            cta="Mesaj Gönder"
            external
          />
          <ContactCard
            icon={Mail}
            title="E-posta"
            text={contactInfo.email}
            href={`mailto:${contactInfo.email}`}
            cta="E-posta Gönder"
          />
          <InfoCard icon={MapPin} title="İl / Bölge" text={contactInfo.region} />
          <InfoCard icon={Clock} title="Çalışma Saatleri" text={contactInfo.workingHours} />
          <ContactCard
            icon={ShieldCheck}
            title="Teklif Formu"
            text="İş kapsamı, lokasyon ve fotoğrafları tek akışta paylaşın."
            href="/teklif-al"
            cta="Projenizi Başlatın"
          />
        </section>
      </div>
    </main>
  );
}

function ContactCard({ icon: Icon, title, text, href, cta, external = false }) {
  return (
    <article className="rounded-[2rem] border border-border bg-surface p-6 shadow-card">
      <Icon className="text-gold" size={30} />
      <h2 className="mt-5 text-3xl font-semibold">{title}</h2>
      <p className="mt-3 text-lg leading-8 text-muted">{text}</p>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="mt-6 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-stoneDark px-7 py-4 font-semibold text-white"
      >
        {cta}
        <ArrowRight size={18} />
      </a>
    </article>
  );
}

function InfoCard({ icon: Icon, title, text }) {
  return (
    <article className="rounded-[2rem] border border-border bg-soft p-6 shadow-card">
      <Icon className="text-gold" size={30} />
      <h2 className="mt-5 text-3xl font-semibold">{title}</h2>
      <p className="mt-3 text-lg leading-8 text-muted">{text}</p>
    </article>
  );
}

