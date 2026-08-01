"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const footerLinks = [
  ["Hizmetler", "/hizmetler"],
  ["Projeler", "/projeler"],
  ["BLAGG Remote", "/blagg-remote"],
  ["Süreç", "/surec"],
  ["İletişim", "/iletisim"],
  ["Projenizi Başlatın", "/teklif-al"]
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

export default function Footer() {
  const pathname = usePathname();
  const shouldHide = useMemo(
    () => hiddenPrefixes.some((prefix) => pathname?.startsWith(prefix)),
    [pathname]
  );

  if (shouldHide) {
    return null;
  }

  return (
    <footer className="border-t border-white/10 bg-[#050505] text-white">
      <div className="mx-auto grid max-w-[90rem] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.8fr] lg:px-10 lg:py-16">
        <div>
          <h2 className="font-serif text-[2rem] tracking-[0.12em]">BLAGG Studio</h2>
          <p className="mt-4 text-xs uppercase tracking-[0.28em] text-white/42">
            Özel Mimarlık & Renovasyon Stüdyosu
          </p>
          <p className="mt-6 text-lg text-white/78">Design. Build. Track.</p>
          <p className="mt-3 max-w-xl text-base leading-7 text-white/52">
            Tasarım, uygulama ve takip tek sistemde.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              "Az sayıda proje",
              "Görünür süreç",
              "Kontrollü teslim"
            ].map((item) => (
              <div
                key={item}
                className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-white/60"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="text-xs uppercase tracking-[0.28em] text-white/36">Bağlantılar</h3>
            <div className="mt-5 grid gap-2">
              {footerLinks.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="inline-flex min-h-11 items-center text-base text-white/64 transition-colors duration-200 hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.28em] text-white/36">Not</h3>
            <p className="mt-5 max-w-sm text-base leading-7 text-white/52">
              Başvuru formu yalnızca projenizin kapsamını anlamak için kullanılır. Uygun çalışma modeli netleştikten sonra süreç planlanır.
            </p>
            <Link
              href="/teklif-al"
              className="mt-6 inline-flex min-h-12 items-center rounded-full border border-white/14 px-5 py-3 text-sm uppercase tracking-[0.14em] text-white/72"
            >
              Projenizi Başlatın
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
