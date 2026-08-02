"use client";

import Link from "next/link";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function GlobalError({ reset }) {
  return (
    <html lang="tr">
      <body className="bg-[#F7F7F5] text-[#111111]">
        <main className="min-h-screen px-4 py-24 sm:px-6">
          <section className="mx-auto flex max-w-3xl items-center">
            <div className="w-full rounded-[2rem] border border-black/10 bg-white p-8 text-center sm:p-10">
              <AlertCircle className="mx-auto text-black/62" size={36} />
              <h1 className="mt-6 text-[2.5rem] leading-tight sm:text-[3.2rem]">
                Sayfa şu anda yüklenemiyor.
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-black/58">
                Geçici bir sorun oluştu. Sayfayı yeniden deneyebilir veya ana sayfaya dönebilirsiniz.
              </p>
              <div className="mt-8 grid gap-3 sm:flex sm:justify-center">
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-black px-6 py-4 text-base text-white"
                >
                  <RefreshCcw size={18} />
                  Tekrar Dene
                </button>
                <Link
                  href="/"
                  className="inline-flex min-h-14 items-center justify-center rounded-full border border-black/12 px-6 py-4 text-base text-black"
                >
                  Ana Sayfa
                </Link>
              </div>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
