"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Building2,
  HardHat,
  ShieldCheck,
  UserRound
} from "lucide-react";

const quickAccess = [
  {
    label: "Müşteri olarak devam et",
    description: "Proje ilerleme, ödeme ve onay kayıtlarını görüntüleyin.",
    href: "/client",
    icon: UserRound
  },
  {
    label: "Admin olarak devam et",
    description: "Projeleri, müşterileri ve operasyon uyarılarını yönetin.",
    href: "/admin",
    icon: ShieldCheck
  },
  {
    label: "Saha ekibi olarak devam et",
    description: "Günlük iş kayıtları ve saha bildirimleri için devam edin.",
    href: "/field",
    icon: HardHat
  }
];

export default function LoginForm() {
  const router = useRouter();
  const [contact, setContact] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    router.push("/client");
  }

  return (
    <main className="min-h-screen bg-cream px-6 py-8 text-stoneDark">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center">
        <div className="grid w-full gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
          <section className="flex flex-col justify-between rounded-[2rem] bg-stoneDark p-8 text-white md:p-10">
            <div>
              <a href="/" className="text-sm text-white/55">
                AG Yapı Platformu
              </a>
              <div className="mt-16 inline-flex rounded-full border border-white/10 px-4 py-2 text-sm text-white/55">
                Premium dijital proje erişimi
              </div>
              <h1 className="mt-6 max-w-2xl text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
                Hesabınıza Giriş Yapın
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/60">
                Proje durumunu, saha kayıtlarını, onayları ve yönetim
                ekranlarını güvenli ve sade bir akışla tek noktadan açın.
              </p>
            </div>

            <div className="mt-12 grid gap-3 text-sm text-white/55 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/10 p-4">Müşteri paneli</div>
              <div className="rounded-2xl bg-white/10 p-4">Yönetim ekranı</div>
              <div className="rounded-2xl bg-white/10 p-4">Saha akışı</div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-black/10 bg-white/70 p-6 shadow-2xl shadow-black/5 md:p-8">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-stoneDark text-white">
                <Building2 size={22} />
              </div>
              <div>
                <p className="text-sm text-black/45">Giriş merkezi</p>
                <h2 className="text-2xl font-semibold">Platform erişimi</h2>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-black/60">
                  Telefon veya e-posta
                </span>
                <input
                  value={contact}
                  onChange={(event) => setContact(event.target.value)}
                  className="rounded-2xl border border-black/10 bg-cream px-5 py-4 outline-none placeholder:text-black/35"
                  placeholder="ornek@firma.com veya +90 5xx xxx xx xx"
                />
              </label>

              <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-stoneDark px-5 py-4 font-medium text-white">
                Giriş Bağlantısı Gönder
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-black/10" />
              <span className="text-sm text-black/40">veya</span>
              <div className="h-px flex-1 bg-black/10" />
            </div>

            <div className="grid gap-3">
              {quickAccess.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.href}
                    onClick={() => router.push(item.href)}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-black/10 bg-cream p-4 text-left hover:border-gold hover:bg-white"
                  >
                    <span className="flex items-center gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-stoneDark text-white">
                        <Icon size={20} />
                      </span>
                      <span>
                        <span className="block font-medium">{item.label}</span>
                        <span className="mt-1 block text-sm text-black/50">
                          {item.description}
                        </span>
                      </span>
                    </span>
                    <ArrowRight
                      className="shrink-0 text-black/35 group-hover:text-gold"
                      size={18}
                    />
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
