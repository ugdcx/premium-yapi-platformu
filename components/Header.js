"use client";

import { Info, Languages, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const remoteTooltip =
  "Şehir dışında olsanız bile projenizi fotoğraflar, ödeme planı ve belgelerle tek bağlantı üzerinden takip edin.";

const navItems = [
  ["Studio Services", "/hizmetler", true],
  ["Projects", "/projeler", false],
  ["Süreç", "/surec", false],
  ["BLAGG Remote", "/blagg-remote", false, remoteTooltip],
  ["İletişim", "/iletisim", false]
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [remoteInfoOpen, setRemoteInfoOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-200 ${
        scrolled
          ? "border-border bg-white/95 shadow-sm shadow-black/5 backdrop-blur-xl"
          : "border-black/5 bg-cream/95 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:py-3">
        <a href="/" className="group flex min-w-0 flex-col justify-center leading-none" onClick={closeMenu}>
          <span className="text-lg font-semibold tracking-[0.14em] text-stoneDark sm:text-2xl">
            BLAGG
          </span>
          <span className="mt-1 max-w-[11rem] text-[0.62rem] font-medium uppercase tracking-[0.14em] text-muted sm:max-w-none sm:text-xs">
            Studio
          </span>
        </a>

        <nav className="hidden items-center gap-5 text-sm font-medium text-muted lg:flex" aria-label="Ana menü">
          {navItems.map(([label, href, prominent, tooltip]) => (
            <a
              key={href}
              href={href}
              className={`group relative inline-flex min-h-11 items-center px-1 hover:text-stoneDark ${
                prominent ? "font-semibold text-stoneDark" : ""
              } after:absolute after:bottom-2 after:left-1 after:h-px after:w-0 after:bg-stoneDark after:transition-all after:duration-200 hover:after:w-[calc(100%-0.5rem)]`}
            >
              {label}
              {tooltip && (
                <span className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 hidden w-72 -translate-x-1/2 rounded-2xl border border-white/10 bg-stoneDark p-4 text-xs leading-5 text-white/75 shadow-xl group-hover:block">
                  {tooltip}
                </span>
              )}
            </a>
          ))}
        </nav>

        <div className="hidden items-center justify-end gap-4 lg:flex">
          <LanguageSwitcher />
          <a
            href="/teklif-al"
            className="inline-flex min-h-11 items-center rounded-full bg-stoneDark px-5 py-2.5 text-sm font-medium text-white shadow-sm shadow-black/10 hover:bg-graphite"
          >
            Projenizi Başlatın
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-stoneDark lg:hidden"
          aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div id="mobile-menu" className={`lg:hidden ${menuOpen ? "block" : "hidden"}`}>
        <nav className="max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-border bg-white px-4 py-4 shadow-sm shadow-black/5" aria-label="Mobil ana menü">
          <div className="grid gap-1">
            {navItems.map(([label, href, prominent, tooltip]) => (
              <div key={href} className="border-b border-border/70">
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={href}
                    onClick={closeMenu}
                    className={`flex min-h-12 flex-1 items-center px-1 text-base ${
                      prominent ? "font-semibold text-stoneDark" : "font-medium text-muted"
                    }`}
                  >
                    {label}
                  </a>
                  {tooltip && (
                    <button
                      type="button"
                      aria-label="BLAGG Remote bilgisi"
                      className="flex h-11 w-11 items-center justify-center rounded-full text-muted"
                      onClick={() => setRemoteInfoOpen((value) => !value)}
                    >
                      <Info size={18} />
                    </button>
                  )}
                </div>
                {tooltip && remoteInfoOpen && (
                  <p className="pb-4 pl-1 pr-3 text-sm leading-6 text-muted">{tooltip}</p>
                )}
              </div>
            ))}
          </div>
          <a
            href="/teklif-al"
            onClick={closeMenu}
            className="mt-4 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-stoneDark px-5 py-3 text-base font-semibold text-white hover:bg-graphite"
          >
            Projenizi Başlatın
          </a>
          <div className="mt-4">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
}

function LanguageSwitcher() {
  return (
    <div className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-white px-3 text-xs font-semibold text-muted">
      <Languages size={15} />
      {["TR", "EN", "DE"].map((lang) => (
        <span key={lang} className={`px-1 py-1 ${lang === "TR" ? "text-stoneDark" : "text-muted"}`}>
          {lang}
        </span>
      ))}
    </div>
  );
}
