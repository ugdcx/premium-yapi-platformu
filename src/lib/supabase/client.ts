"use client";

import { createBrowserClient } from "@supabase/ssr";

import { getClientEnv } from "../env";

export function createSupabaseBrowserClient() {
  const clientEnv = getClientEnv();
  const supabaseUrl = clientEnv.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey =
    clientEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !publishableKey) {
    throw new Error(
      "Supabase browser configuration is missing. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.",
    );
  }

  return createBrowserClient(supabaseUrl, publishableKey);
}
