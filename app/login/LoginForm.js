"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Building2
} from "lucide-react";
import { authenticateDemoUser, saveDemoSession } from "../../lib/demoAuth";

export default function LoginForm() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const user = authenticateDemoUser(phone, password);

    if (!user || user.role !== "admin") {
      setError("Yetkili telefon numarası veya erişim kodu hatalı.");
      return;
    }

    saveDemoSession(user);
    router.push(user.redirect);
  }

  return (
    <main className="min-h-screen bg-cream px-4 py-6 text-stoneDark sm:px-6 sm:py-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center">
        <div className="grid w-full gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
          <section className="flex flex-col justify-between rounded-[2rem] bg-stoneDark p-6 text-white sm:p-8 md:p-10">
            <div>
              <a href="/" className="text-sm text-white/55">
                BLAAG Construction and Architecture
              </a>
              <div className="mt-10 inline-flex rounded-full border border-white/10 px-4 py-2 text-sm text-white/55 md:mt-16">
                İç operasyon erişimi
              </div>
              <h1 className="mt-6 max-w-2xl text-4xl font-semibold leading-tight tracking-tight md:text-7xl">
                Yetkili Erişim
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
                BLAAG yönetim ekibi için başvuru, teklif, proje ve saha
                operasyonlarını yöneten özel erişim alanı.
              </p>
            </div>

            <div className="mt-12 grid gap-3 text-sm text-white/55 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/10 p-4">Başvurular</div>
              <div className="rounded-2xl bg-white/10 p-4">Projeler</div>
              <div className="rounded-2xl bg-white/10 p-4">Fotoğraf onayları</div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-border bg-surface p-6 shadow-2xl shadow-black/5 md:p-8">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-stoneDark text-white">
                <Building2 size={22} />
              </div>
              <div>
                <p className="text-sm text-muted">Özel erişim</p>
                <h2 className="text-2xl font-semibold">BLAAG yetkili erişimi</h2>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-muted">
                  Yetkili telefon numarası
                </span>
                <input
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                    setError("");
                  }}
                  className="rounded-2xl border border-border bg-cream px-5 py-4 outline-none placeholder:text-black/35"
                  placeholder="Yetkili telefon numarası"
                  autoComplete="tel"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-muted">
                  Erişim kodu
                </span>
                <input
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError("");
                  }}
                  className="rounded-2xl border border-border bg-cream px-5 py-4 outline-none placeholder:text-black/35"
                  placeholder="Erişim kodunuz"
                  type="password"
                  autoComplete="current-password"
                />
              </label>

              {error && (
                <p className="rounded-2xl bg-[#F4E4DF] px-4 py-3 text-sm font-medium text-[#7A3527]">
                  {error}
                </p>
              )}

              <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-stoneDark px-5 py-4 font-medium text-white">
                Yönetim Alanına Geç
                <ArrowRight size={18} />
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
