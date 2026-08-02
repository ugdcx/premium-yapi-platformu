"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { clearDemoSession } from "../lib/demoAuth";
import { createSupabaseBrowserClient } from "../src/lib/supabase/client";

export default function DemoLogoutButton({ dark = false }) {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleLogout() {
    if (isSigningOut) return;

    setIsSigningOut(true);
    try {
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.signOut();
    } catch {
      // Continue with local cleanup without exposing auth internals.
    } finally {
      clearDemoSession();
      router.push("/control");
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isSigningOut}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
        dark
          ? "bg-white/10 text-white hover:bg-white/15 disabled:opacity-60"
          : "border border-border text-stoneDark hover:border-stoneDark disabled:opacity-60"
      }`}
    >
      <LogOut size={15} />
      {isSigningOut ? "Çıkış yapılıyor..." : "Çıkış Yap"}
    </button>
  );
}

