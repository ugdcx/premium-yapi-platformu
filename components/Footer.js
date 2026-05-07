const serviceLinks = [
  ["Hizmetler", "/hizmetler"],
  ["Projeler", "/projeler"],
  ["Süreç", "/surec"],
  ["Proje Takip", "/proje-takip"],
  ["İletişim", "/iletisim"],
  ["Teklif Al", "/teklif-al"]
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-stoneDark px-4 py-10 text-white sm:px-6 sm:py-12">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.9fr]">
        <div className="min-w-0">
          <h2 className="text-2xl font-semibold">BLAAG Construction and Architecture</h2>
          <p className="mt-4 max-w-md text-base leading-7 text-white/60">
            Anahtar teslim yapı, tadilat ve gayrimenkul danışmanlığında şeffaf takip sistemiyle çalışan premium hizmet şirketi.
          </p>
        </div>

        <FooterGroup title="Bağlantılar" links={serviceLinks} />

        <div className="min-w-0">
          <h3 className="text-sm uppercase tracking-[0.25em] text-white/35">
            İletişim
          </h3>
          <p className="mt-5 max-w-sm text-base leading-7 text-white/65">
            Projenizle ilgili ekibimizle iletişime geçmek için formu kullanabilirsiniz.
          </p>
          <a href="/teklif-al" className="mt-6 inline-flex min-h-14 items-center justify-center rounded-full bg-gold px-6 py-3 font-semibold text-stoneDark">
            Teklif Al
          </a>
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
      <div className="mt-5 grid gap-2 text-base text-white/65">
        {links.map(([label, href]) => (
          <a key={label} href={href} className="inline-flex min-h-11 items-center rounded-full px-1 hover:text-white">
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
