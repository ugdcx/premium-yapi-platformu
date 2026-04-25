const navItems = [
  ["Hizmetler", "/hizmetler"],
  ["Süreç", "/surec"],
  ["Teklif Al", "/teklif-al"],
  ["Giriş Yap", "/login"]
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between gap-4">
          <a href="/" className="text-xl font-semibold tracking-tight">
            AG Yapı Platformu
          </a>
          <a
            href="/teklif-al"
            className="rounded-full bg-stoneDark px-4 py-2 text-sm font-medium text-white md:hidden"
          >
            Ön Başvuru
          </a>
        </div>

        <nav className="flex flex-wrap items-center gap-3 text-sm text-black/65 md:gap-7">
          {navItems.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <a
          href="/teklif-al"
          className="hidden rounded-full bg-stoneDark px-5 py-2.5 text-sm font-medium text-white md:inline-flex"
        >
          Ön Başvuru Oluştur
        </a>
      </div>
    </header>
  );
}
