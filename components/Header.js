const navItems = [
  ["Hizmetler", "/hizmetler"],
  ["Süreci İncele", "/surec"]
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-cream/95 backdrop-blur">
      <div className="mx-auto grid max-w-7xl gap-3 px-4 py-3 sm:px-6 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div className="flex min-w-0 items-center justify-between gap-3 md:justify-start">
          <a href="/" className="min-w-0 truncate text-lg font-semibold tracking-tight sm:text-xl">
            AG Yapı Platformu
          </a>
          <a
            href="/teklif-al"
            className="inline-flex shrink-0 items-center rounded-full bg-stoneDark px-4 py-2 text-sm font-medium text-white md:hidden"
          >
            Ön Başvuru
          </a>
        </div>

        <nav className="mobile-scroll text-sm font-medium text-muted md:justify-center md:gap-7" aria-label="Ana menü">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} className="inline-flex items-center rounded-full px-3 hover:bg-surface hover:text-stoneDark">
              {label}
            </a>
          ))}
          <a href="/login" className="inline-flex items-center rounded-full px-3 hover:bg-surface hover:text-stoneDark md:hidden">
            Giriş Yap
          </a>
        </nav>

        <div className="hidden items-center justify-end gap-3 md:flex">
          <a
            href="/teklif-al"
            className="inline-flex min-h-11 items-center rounded-full bg-stoneDark px-5 py-2.5 text-sm font-medium text-white"
          >
            Ön Başvuru Oluştur
          </a>
          <a
            href="/login"
            className="inline-flex min-h-11 items-center rounded-full border border-border px-5 py-2.5 text-sm font-medium text-stoneDark"
          >
            Giriş Yap
          </a>
        </div>
      </div>
    </header>
  );
}
