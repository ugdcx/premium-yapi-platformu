import "server-only";

import { createHmac } from "node:crypto";

import { getLeadRateLimitSecret } from "@/src/lib/env";
import { createSupabaseAdminClient } from "@/src/lib/supabase/admin";

const RATE_LIMIT_WINDOW_SECONDS = 10 * 60;
const RATE_LIMIT_MAX_ATTEMPTS = 5;

export type LeadRateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterSeconds: number };

type RateLimitRpcResult = {
  allowed: boolean;
  retry_after_seconds: number;
  attempts: number;
};

export class LeadRateLimitError extends Error {
  constructor() {
    super("LEAD_RATE_LIMIT_CHECK_FAILED");
    this.name = "LeadRateLimitError";
  }
}

export async function checkLeadRateLimit(
  request: Request,
): Promise<LeadRateLimitResult> {
  const keyHash = hashRateLimitKey(resolveRequestIp(request));
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .rpc("check_lead_rate_limit", {
      p_key_hash: keyHash,
      p_window_seconds: RATE_LIMIT_WINDOW_SECONDS,
      p_max_attempts: RATE_LIMIT_MAX_ATTEMPTS,
    })
    .single();

  if (error || !isRateLimitRpcResult(data)) {
    throw new LeadRateLimitError();
  }

  if (data.allowed) {
    return { allowed: true };
  }

  return {
    allowed: false,
    retryAfterSeconds: Math.max(1, data.retry_after_seconds),
  };
}

function resolveRequestIp(request: Request): string {
  const vercelForwardedFor = normalizeForwardedHeader(
    request.headers.get("x-vercel-forwarded-for"),
  );
  if (vercelForwardedFor) return vercelForwardedFor;

  if (process.env.VERCEL === "1") {
    return normalizeForwardedHeader(request.headers.get("x-forwarded-for")) ||
      "unknown-vercel-client";
  }

  if (process.env.NODE_ENV !== "production") {
    return (
      normalizeForwardedHeader(request.headers.get("x-forwarded-for")) ||
      normalizeSingleIpHeader(request.headers.get("x-real-ip")) ||
      "development-local"
    );
  }

  return "unknown-production-client";
}

function normalizeForwardedHeader(value: string | null): string | null {
  const first = value?.split(",")[0]?.trim();
  return first || null;
}

function normalizeSingleIpHeader(value: string | null): string | null {
  const trimmed = value?.trim();
  return trimmed || null;
}

function hashRateLimitKey(requestIp: string): string {
  return createHmac("sha256", getLeadRateLimitSecret())
    .update(requestIp)
    .digest("hex");
}

function isRateLimitRpcResult(value: unknown): value is RateLimitRpcResult {
  return (
    typeof value === "object" &&
    value !== null &&
    "allowed" in value &&
    "retry_after_seconds" in value &&
    "attempts" in value &&
    typeof value.allowed === "boolean" &&
    typeof value.retry_after_seconds === "number" &&
    typeof value.attempts === "number"
  );
}
