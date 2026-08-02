"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Building2 } from "lucide-react";
import { clearDemoSession } from "../../lib/demoAuth";
import { createSupabaseBrowserClient } from "../../src/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;

    const normalizedEmail = email.trim();
    if (!normalizedEmail || !password) {
      setError("E-posta ve şifre alanlarını doldurun.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    const supabase = createSupabaseBrowserClient();

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      if (signInError) {
        setError("Giriş bilgileri kontrol edilemedi.");
        return;
      }

      const response = await fetch("/api/auth/me", {
        headers: {
          Accept: "application/json",
        },
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        await supabase.auth.signOut();
        clearDemoSession();
        setError(
          response.status === 403
            ? "Bu alana erişim yetkiniz yok."
            : "Yetki kontrolü tamamlanamadı.",
        );
        return;
      }

      clearDemoSession();
      const next = new URLSearchParams(window.location.search).get("next");
      router.push(getSafeInternalNextPath(next));
    } catch {
      setError("Giriş şu anda tamamlanamadı.");
    } finally {
      setIsSubmitting(false);
    }
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

              <label htmlFor="admin-email" className="grid gap-2">
                <span className="text-sm text-black/54">Yetkili e-posta adresi</span>
                <input
                  id="admin-email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError("");
                  }}
                  className="rounded-[1rem] border border-black/10 bg-[#F7F7F5] px-5 py-4 outline-none"
                  placeholder="yetkili@blaggstudio.com"
                  autoComplete="email"
                  inputMode="email"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "login-error" : undefined}
                  autoFocus
                />
              </label>

              <label htmlFor="admin-password" className="grid gap-2">
                <span className="text-sm text-black/54">Şifre</span>
                <input
                  id="admin-password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError("");
                  }}
                  className="rounded-[1rem] border border-black/10 bg-[#F7F7F5] px-5 py-4 outline-none"
                  placeholder="Şifreniz"
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

              <button
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-5 py-4 text-white disabled:cursor-not-allowed disabled:bg-black/60"
              >
                {isSubmitting ? "Giriş kontrol ediliyor..." : "Yönetim Alanına Geç"}
                <ArrowRight size={18} />
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}

function getSafeInternalNextPath(value) {
  if (typeof value !== "string") return "/admin";

  const trimmed = value.trim();
  if (!trimmed) return "/admin";
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) return "/admin";
  if (trimmed.includes("\\") || trimmed.startsWith("/\\")) return "/admin";
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return "/admin";

  try {
    const parsed = new URL(trimmed, window.location.origin);
    if (parsed.origin !== window.location.origin) return "/admin";
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return "/admin";
  }
}
