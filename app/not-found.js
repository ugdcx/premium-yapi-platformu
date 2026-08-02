import Link from "next/link";
import { ArrowRight, House } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F7F7F5] px-4 py-24 text-[#111111] sm:px-6">
      <section className="mx-auto flex max-w-3xl items-center">
        <div className="w-full rounded-[2rem] border border-black/10 bg-white p-8 text-center sm:p-10">
          <p className="text-xs uppercase tracking-[0.28em] text-black/42">404</p>
          <h1 className="mt-5 text-[2.7rem] leading-tight sm:text-[3.4rem]">
            Aradığınız sayfa bulunamadı.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-black/58">
            Bağlantı değişmiş olabilir veya sayfa artık kullanılmıyor olabilir.
            Ana sayfaya dönebilir ya da kısa başvuru akışından ilerleyebilirsiniz.
          </p>
          <div className="mt-8 grid gap-3 sm:flex sm:justify-center">
            <Link
              href="/"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-black/12 px-6 py-4 text-base text-black"
            >
              <House size={18} />
              Ana Sayfa
            </Link>
            <Link
              href="/teklif-al"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-black px-6 py-4 text-base text-white"
            >
              Projenizi Başlatın
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
