"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { clearDemoSession } from "../lib/demoAuth";

export default function DemoLogoutButton({ dark = false }) {
  const router = useRouter();

  function handleLogout() {
    clearDemoSession();
    router.push("/login");
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
        dark
          ? "bg-white/10 text-white hover:bg-white/15"
          : "border border-border text-stoneDark hover:border-gold"
      }`}
    >
      <LogOut size={15} />
      Çıkış Yap
    </button>
  );
}
