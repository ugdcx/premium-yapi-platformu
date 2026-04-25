"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Building2
} from "lucide-react";
import { authenticateDemoUser, demoUsers, saveDemoSession } from "../../lib/demoAuth";

export default function LoginForm() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const user = authenticateDemoUser(phone, password);

    if (!user) {
      setError("Telefon numarası veya erişim kodu hatalı.");
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
                AG Yapı Platformu
              </a>
              <div className="mt-10 inline-flex rounded-full border border-white/10 px-4 py-2 text-sm text-white/55 md:mt-16">
                Güvenli dijital proje erişimi
              </div>
              <h1 className="mt-6 max-w-2xl text-4xl font-semibold leading-tight tracking-tight md:text-7xl">
                Giriş Yap
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
                Telefon numaranız ve erişim kodunuz ile proje alanınıza güvenli
                şekilde erişin.
              </p>
            </div>

            <div className="mt-12 grid gap-3 text-sm text-white/55 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/10 p-4">Müşteri paneli</div>
              <div className="rounded-2xl bg-white/10 p-4">Yönetim ekranı</div>
              <div className="rounded-2xl bg-white/10 p-4">Saha akışı</div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-border bg-surface p-6 shadow-2xl shadow-black/5 md:p-8">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-stoneDark text-white">
                <Building2 size={22} />
              </div>
              <div>
                <p className="text-sm text-muted">Giriş merkezi</p>
                <h2 className="text-2xl font-semibold">Platform erişimi</h2>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-muted">
                  Telefon numarası
                </span>
                <input
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                    setError("");
                  }}
                  className="rounded-2xl border border-border bg-cream px-5 py-4 outline-none placeholder:text-black/35"
                  placeholder="0500 000 00 02"
                  autoComplete="tel"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-muted">
                  Şifre / erişim kodu
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
                Giriş Yap
                <ArrowRight size={18} />
              </button>
            </form>

            <details className="mt-8 rounded-2xl border border-border bg-cream px-4 py-3 text-sm text-muted">
              <summary className="cursor-pointer font-medium text-stoneDark">
                Yetkili erişim bilgileri
              </summary>
              <div className="mt-4 grid gap-3">
                {demoUsers.map((user) => (
                  <div key={user.role} className="rounded-xl bg-white px-4 py-3">
                    <p className="font-medium text-stoneDark">{user.label}</p>
                    <p className="mt-1">Telefon: {user.phone}</p>
                    <p>Şifre / erişim kodu: {user.password}</p>
                  </div>
                ))}
              </div>
            </details>
          </section>
        </div>
      </div>
    </main>
  );
}
