const platformLinks = [
  ["Hizmetler", "/hizmetler"],
  ["Süreç", "/surec"],
  ["Ön Başvuru Oluştur", "/teklif-al"]
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-stoneDark px-4 py-10 text-white sm:px-6 sm:py-12">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.9fr]">
        <div className="min-w-0">
          <h2 className="text-2xl font-semibold">BLAAG Construction and Architecture</h2>
          <p className="mt-4 max-w-md leading-7 text-white/60">
            Anahtar teslim yapı, tadilat ve gayrimenkul danışmanlığında
            profesyonel uygulama, şeffaf iletişim ve müşteriye özel süreç
            takibi sunan premium hizmet şirketi.
          </p>
        </div>

        <FooterGroup title="Bağlantılar" links={platformLinks} />

        <div className="min-w-0">
          <h3 className="text-sm uppercase tracking-[0.25em] text-white/35">
            İletişim
          </h3>
          <div className="mt-5 grid gap-3 break-words text-sm text-white/65">
            <span>Telefon: +90 532 000 00 00</span>
            <span>WhatsApp: +90 532 000 00 00</span>
            <span>E-posta: info@blaag.com.tr</span>
          </div>
          <p className="mt-6 rounded-2xl bg-white/10 p-4 text-sm text-white/55">
            Başvurunuz sonrası ekibimiz kapsamı inceler, sizinle iletişime geçer
            ve hizmet planını netleştirir.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterGroup({ title, links }) {
  return (
    <div className="min-w-0">
      <h3 className="text-sm uppercase tracking-[0.25em] text-white/35">
        {title}
      </h3>
      <div className="mt-5 grid gap-2 text-sm text-white/65">
        {links.map(([label, href]) => (
          <a key={label} href={href} className="inline-flex items-center rounded-full px-1 hover:text-white">
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
