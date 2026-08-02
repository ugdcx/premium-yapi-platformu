"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const hiddenPrefixes = [
  "/admin",
  "/control",
  "/login",
  "/client",
  "/field",
  "/blaag-admin",
  "/ahmet-sezer"
];

export default function MobileCTA() {
  const pathname = usePathname();
  const [showOnHome, setShowOnHome] = useState(false);
  const shouldHide = useMemo(
    () => hiddenPrefixes.some((prefix) => pathname?.startsWith(prefix)),
    [pathname]
  );

  useEffect(() => {
    if (pathname !== "/" || shouldHide) {
      setShowOnHome(false);
      return undefined;
    }

    const hero = document.getElementById("hero");
    if (!hero) {
      setShowOnHome(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowOnHome(!entry.isIntersecting || entry.intersectionRatio < 0.35);
      },
      {
        root: null,
        threshold: [0, 0.35, 0.6]
      }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname, shouldHide]);

  if (shouldHide || (pathname === "/" && !showOnHome)) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-[rgba(247,247,245,0.96)] px-4 py-3 backdrop-blur-xl md:hidden">
      <Link
        href="/teklif-al"
        className="premium-button flex min-h-14 w-full items-center justify-center rounded-full bg-black px-6 py-4 text-base font-medium text-white"
      >
        Projenizi Başlatın
      </Link>
    </div>
  );
}
