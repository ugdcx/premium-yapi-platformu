const serviceLinks = [
  ["Anahtar Teslim Yapı", "/hizmetler"],
  ["Tadilat & Değer Artırma", "/hizmetler"],
  ["Gayrimenkul Danışmanlığı", "/hizmetler"]
];

const platformLinks = [
  ["Süreci İncele", "/surec"],
  ["Paneli Gör", "/client"],
  ["Teklif Al", "/teklif-al"],
  ["Giriş Yap", "/login"]
];

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-stoneDark px-6 py-12 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.9fr]">
        <div>
          <h2 className="text-2xl font-semibold">AG Yapı Platformu</h2>
          <p className="mt-4 max-w-md leading-7 text-white/55">
            Yapı geliştirme, değer artırma ve gayrimenkul danışmanlığını
            şeffaf, kayıtlı ve dijital olarak takip edilebilir hale getiren
            premium operasyon platformu.
          </p>
        </div>

        <FooterGroup title="Hizmetler" links={serviceLinks} />
        <FooterGroup title="Platform" links={platformLinks} />

        <div>
          <h3 className="text-sm uppercase tracking-[0.25em] text-white/35">
            İletişim
          </h3>
          <div className="mt-5 grid gap-3 text-sm text-white/60">
            <span>Telefon: +90 5xx xxx xx xx</span>
            <span>WhatsApp: +90 5xx xxx xx xx</span>
            <span>E-posta: info@agyapi.com.tr</span>
          </div>
          <p className="mt-7 rounded-2xl bg-white/10 p-4 text-sm text-white/50">
            Bu platform ilk sürüm demo yapısındadır.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterGroup({ title, links }) {
  return (
    <div>
      <h3 className="text-sm uppercase tracking-[0.25em] text-white/35">
        {title}
      </h3>
      <div className="mt-5 grid gap-3 text-sm text-white/60">
        {links.map(([label, href]) => (
          <a key={label} href={href}>
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
