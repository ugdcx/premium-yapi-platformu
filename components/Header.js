"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const navItems = [
  ["Studio", "/"],
  ["Hizmetler", "/hizmetler"],
  ["Projeler", "/projeler"],
  ["BLAGG Remote", "/blagg-remote"],
  ["Süreç", "/surec"],
  ["İletişim", "/iletisim"]
];

const hiddenPrefixes = [
  "/admin",
  "/control",
  "/login",
  "/client",
  "/field",
  "/blaag-admin",
  "/ahmet-sezer"
];

const homeSectionLabels = {
  hero: "Hero",
  "studio-definition": "Studio",
  services: "Hizmetler",
  remote: "BLAGG Remote",
  projects: "Projeler",
  "final-cta": "Başlat"
};

const homeSectionNavMap = {
  hero: "/",
  "studio-definition": "/",
  services: "/hizmetler",
  remote: "/blagg-remote",
  projects: "/projeler",
  "final-cta": "/teklif-al"
};

const homeSectionOrder = Object.keys(homeSectionLabels);

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHomeSection, setActiveHomeSection] = useState("hero");

  const shouldHide = useMemo(
    () => hiddenPrefixes.some((prefix) => pathname?.startsWith(prefix)),
    [pathname]
  );

  useEffect(() => {
    if (shouldHide) return undefined;

    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [shouldHide]);

  useEffect(() => {
    if (pathname !== "/" || shouldHide) {
      setActiveHomeSection("hero");
      return undefined;
    }

    const sectionIds = Object.keys(homeSectionLabels);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries[0]?.target?.id) {
          setActiveHomeSection(visibleEntries[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-38% 0px -44% 0px",
        threshold: [0.2, 0.35, 0.5, 0.7]
      }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname, shouldHide]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  if (shouldHide) {
    return null;
  }

  const isHome = pathname === "/";
  const isRemotePage = pathname === "/blagg-remote";
  const isProcessPage = pathname === "/surec";
  const isHeroAtTop = isHome && activeHomeSection === "hero" && !scrolled;
  const useLightHeader = isHeroAtTop || isRemotePage || (isProcessPage && !scrolled);

  const shellClass = isRemotePage
    ? "border-b border-white/10 bg-[rgba(5,5,5,0.72)] backdrop-blur-xl"
    : scrolled
    ? "border-b border-[#E5E5E5] bg-[rgba(247,247,245,0.82)] backdrop-blur-xl"
    : "border-b border-transparent bg-transparent";
  const logoClass = useLightHeader ? "text-white" : "text-black";
  const progressTrackClass = useLightHeader ? "bg-white/10" : "bg-black/6";
  const progressFillClass = useLightHeader ? "bg-white" : "bg-black";
  const desktopCtaClass = useLightHeader
    ? "premium-button inline-flex min-h-12 items-center rounded-full border border-white bg-white px-6 py-3 text-sm uppercase tracking-[0.14em] text-black"
    : "premium-button inline-flex min-h-12 items-center rounded-full border border-black bg-black px-6 py-3 text-sm uppercase tracking-[0.14em] text-white";
  const menuButtonClass = useLightHeader
    ? "inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/14 bg-white text-black lg:hidden"
    : "inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-[rgba(255,255,255,0.88)] text-black lg:hidden";

  const currentSectionIndex = homeSectionOrder.indexOf(activeHomeSection);
  const currentSectionProgress =
    pathname === "/" && currentSectionIndex >= 0
      ? ((currentSectionIndex + 1) / homeSectionOrder.length) * 100
      : 0;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-black focus:px-4 focus:py-3 focus:text-white"
      >
        Ana içeriğe geç
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out ${shellClass}`}
      >
        {isHome ? (
          <div className={`absolute inset-x-0 bottom-0 h-px ${progressTrackClass}`}>
            <div
              className={`h-px transition-[width] duration-500 ease-out ${progressFillClass}`}
              style={{ width: `${currentSectionProgress}%` }}
            />
          </div>
        ) : null}

        <div className="mx-auto flex max-w-[90rem] items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
          <div className="flex min-w-0 items-center">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className={`min-w-0 ${logoClass}`}
              aria-label="BLAGG Studio ana sayfa"
            >
              <span className="block font-serif text-[1.45rem] tracking-[0.18em] sm:text-[1.7rem]">
                BLAGG Studio
              </span>
            </Link>
          </div>

          <div className="hidden items-center gap-8 lg:flex">
            <nav className="flex items-center gap-7" aria-label="Ana menü">
              {navItems.map(([label, href]) => {
                const active =
                  pathname === "/"
                    ? homeSectionNavMap[activeHomeSection] === href
                    : href === "/"
                      ? pathname === href
                      : pathname === href || pathname?.startsWith(`${href}/`);

                return (
                  <Link
                    key={href}
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative inline-flex min-h-12 items-center text-sm uppercase tracking-[0.16em] transition-colors duration-200 ${
                      isHeroAtTop
                        ? active
                          ? "text-white"
                          : "text-white/68 hover:text-white"
                        : active
                          ? "text-black"
                          : "text-black/68 hover:text-black"
                    }`}
                  >
                    {label}
                    <span
                      className={`absolute bottom-[0.45rem] left-0 h-px transition-all duration-200 ${
                        active ? "w-full" : "w-0 group-hover:w-full"
                      } ${isHeroAtTop ? "bg-white" : "bg-black"}`}
                    />
                  </Link>
                );
              })}
            </nav>

            <Link
              href="/teklif-al"
              className={desktopCtaClass}
            >
              Projenizi Başlatın
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className={menuButtonClass}
            aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-[rgba(247,247,245,0.98)] px-4 pt-24 transition-all duration-300 ease-out lg:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex h-full flex-col justify-between pb-8" aria-label="Mobil ana menü">
          <div className="grid gap-2">
            {navItems.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-black/8 py-5 text-[1.75rem] font-medium tracking-tight text-black"
              >
                {label}
              </Link>
            ))}
          </div>

          <Link
            href="/teklif-al"
            onClick={() => setMenuOpen(false)}
            className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-black px-6 py-4 text-base font-medium text-white"
          >
            Projenizi Başlatın
          </Link>
        </nav>
      </div>
    </>
  );
}
