"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Building2 } from "lucide-react";
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
    <main className="min-h-screen bg-[#F7F7F5] px-4 py-6 text-[#111111] sm:px-6 sm:py-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center">
        <div className="grid w-full gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
          <section className="flex flex-col justify-between rounded-[2rem] border border-black/10 bg-black p-6 text-white sm:p-8 md:p-10">
            <div>
              <Link href="/" className="text-sm text-white/55">
                BLAGG Studio
              </Link>
              <div className="mt-10 inline-flex rounded-full border border-white/10 px-4 py-2 text-sm text-white/55 md:mt-16">
                İç operasyon erişimi
              </div>
              <h1 className="mt-6 max-w-2xl text-[2.8rem] leading-[0.98] md:text-[5rem]">
                Yetkili Erişim
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/62">
                Başvuru, teklif, proje, saha ve onay akışlarını aynı kontrol alanında yöneten yönetim yüzeyi.
              </p>
            </div>

            <div className="mt-12 grid gap-3 text-sm text-white/55 sm:grid-cols-3">
              <div className="rounded-[1.25rem] border border-white/10 bg-white/8 p-4">
                Başvurular
              </div>
              <div className="rounded-[1.25rem] border border-white/10 bg-white/8 p-4">
                Projeler
              </div>
              <div className="rounded-[1.25rem] border border-white/10 bg-white/8 p-4">
                Fotoğraf onayları
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-black/10 bg-white p-6 md:p-8">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-black text-white">
                <Building2 size={20} />
              </div>
              <div>
                <p className="text-sm text-black/48">Özel erişim</p>
                <h2 className="text-2xl">BLAGG yetkili erişimi</h2>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4" noValidate>
              <p className="rounded-[1rem] border border-black/10 bg-[#F7F7F5] px-4 py-3 text-sm leading-6 text-black/58">
                Bu alan yalnızca BLAGG Control yönetim erişimi içindir.
              </p>

              <label htmlFor="admin-phone" className="grid gap-2">
                <span className="text-sm text-black/54">Yetkili telefon numarası</span>
                <input
                  id="admin-phone"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                    setError("");
                  }}
                  className="rounded-[1rem] border border-black/10 bg-[#F7F7F5] px-5 py-4 outline-none"
                  placeholder="Yetkili telefon numarası"
                  autoComplete="tel"
                  inputMode="tel"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "login-error" : undefined}
                  autoFocus
                />
              </label>

              <label htmlFor="admin-password" className="grid gap-2">
                <span className="text-sm text-black/54">Erişim kodu</span>
                <input
                  id="admin-password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError("");
                  }}
                  className="rounded-[1rem] border border-black/10 bg-[#F7F7F5] px-5 py-4 outline-none"
                  placeholder="Erişim kodunuz"
                  type="password"
                  autoComplete="current-password"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "login-error" : undefined}
                />
              </label>

              {error ? (
                <p
                  id="login-error"
                  className="rounded-[1rem] border border-black/10 bg-[#F7F7F5] px-4 py-3 text-sm text-black/58"
                  aria-live="polite"
                >
                  {error}
                </p>
              ) : null}

              <button className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-5 py-4 text-white">
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
