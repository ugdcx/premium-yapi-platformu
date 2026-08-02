import "server-only";

import { createSupabaseAdminClient } from "@/src/lib/supabase/admin";
import { createSupabaseServerClient } from "@/src/lib/supabase/server";

const ADMIN_ROLES = ["super_admin", "project_manager"] as const;

export type AdminRole = (typeof ADMIN_ROLES)[number];

export type AdminSession = {
  userId: string;
  role: AdminRole;
};

export type AdminAuthErrorCode =
  | "AUTH_REQUIRED"
  | "FORBIDDEN"
  | "AUTH_CHECK_FAILED";

export class AdminAuthError extends Error {
  readonly code: AdminAuthErrorCode;
  readonly status: 401 | 403 | 500;

  constructor(code: AdminAuthErrorCode) {
    super(code);
    this.name = "AdminAuthError";
    this.code = code;
    this.status =
      code === "AUTH_REQUIRED" ? 401 : code === "FORBIDDEN" ? 403 : 500;
  }
}

type ProfileRecord = {
  role: string;
  is_active: boolean;
};

export async function requireAdminSession(): Promise<AdminSession> {
  const supabase = await createSupabaseServerClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    throw new AdminAuthError("AUTH_REQUIRED");
  }

  const userId = userData.user.id;
  const admin = createSupabaseAdminClient();
  const { data: profile, error: profileError } = await admin
    .from("profiles")
    .select("role, is_active")
    .eq("id", userId)
    .maybeSingle();

  if (profileError) {
    throw new AdminAuthError("AUTH_CHECK_FAILED");
  }

  if (!isProfileRecord(profile) || !profile.is_active || !isAdminRole(profile.role)) {
    throw new AdminAuthError("FORBIDDEN");
  }

  return {
    userId,
    role: profile.role,
  };
}

export function isAdminRole(value: unknown): value is AdminRole {
  return typeof value === "string" && ADMIN_ROLES.includes(value as AdminRole);
}

function isProfileRecord(value: unknown): value is ProfileRecord {
  return (
    typeof value === "object" &&
    value !== null &&
    "role" in value &&
    "is_active" in value &&
    typeof value.role === "string" &&
    typeof value.is_active === "boolean"
  );
}
