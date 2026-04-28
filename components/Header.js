"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  ["Hizmetler", "/hizmetler", true],
  ["Süreç", "/surec", false],
  ["Hakkımızda", "/hakkimizda", false]
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
          ? "border-border bg-white/92 shadow-sm shadow-black/5 backdrop-blur-xl"
          : "border-black/5 bg-cream/90 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-3 sm:px-6 lg:py-4">
        <a href="/" className="group flex min-w-0 flex-col justify-center leading-none" onClick={closeMenu}>
          <span className="text-xl font-semibold tracking-[0.16em] text-stoneDark sm:text-2xl">
            BLAAG
          </span>
          <span className="mt-1 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted sm:text-xs">
            Construction and Architecture
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-muted md:flex" aria-label="Ana menü">
          {navItems.map(([label, href, prominent]) => (
            <a
              key={href}
              href={href}
              className={`relative inline-flex min-h-11 items-center px-1 hover:text-stoneDark ${
                prominent ? "font-semibold text-stoneDark" : ""
              } after:absolute after:bottom-2 after:left-1 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-200 hover:after:w-[calc(100%-0.5rem)]`}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center justify-end md:flex">
          <a
            href="/teklif-al"
            className="inline-flex min-h-11 items-center rounded-full bg-[#111111] px-5 py-2.5 text-sm font-medium text-white shadow-sm shadow-black/10 hover:-translate-y-0.5 hover:bg-[#262626]"
          >
            Projemi Başlat
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-stoneDark md:hidden"
          aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`md:hidden ${menuOpen ? "block" : "hidden"}`}
      >
        <nav className="border-t border-border bg-white px-4 py-4 shadow-sm shadow-black/5" aria-label="Mobil ana menü">
          <div className="grid gap-1">
            {navItems.map(([label, href, prominent]) => (
              <a
                key={href}
                href={href}
                onClick={closeMenu}
                className={`flex min-h-12 items-center justify-between border-b border-border/70 px-1 text-sm ${
                  prominent ? "font-semibold text-stoneDark" : "font-medium text-muted"
                }`}
              >
                {label}
              </a>
            ))}
          </div>
          <a
            href="/teklif-al"
            onClick={closeMenu}
            className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#111111] px-5 py-3 text-sm font-medium text-white hover:bg-[#262626]"
          >
            Projemi Başlat
          </a>
        </nav>
      </div>
    </header>
  );
}
