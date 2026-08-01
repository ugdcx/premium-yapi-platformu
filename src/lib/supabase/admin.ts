import "server-only";

import { createClient } from "@supabase/supabase-js";

import { getServerEnv } from "../env";

export function createSupabaseAdminClient() {
  const env = getServerEnv();

  if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.SUPABASE_SECRET_KEY) {
    throw new Error(
      "Supabase admin configuration is missing. Check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY.",
    );
  }

  return createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SECRET_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    },
  );
}
