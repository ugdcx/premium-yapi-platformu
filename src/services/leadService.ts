import "server-only";

import { createHash } from "node:crypto";

import { createSupabaseAdminClient } from "@/src/lib/supabase/admin";
import type { ValidatedLeadSubmission } from "@/src/lib/validation/lead";

export type CreateLeadResult = {
  leadId: string;
  created: boolean;
};

export type PreparedLeadSubmission = {
  lead: ValidatedLeadSubmission;
  submissionFingerprint: string;
};

export type IdempotentLeadLookupResult =
  | { found: true; leadId: string }
  | { found: false };

export class LeadServiceError extends Error {
  readonly code:
    | "DATABASE_CONFIGURATION_ERROR"
    | "IDEMPOTENCY_CONFLICT"
    | "INVALID_SUBMISSION_ID"
    | "INVALID_PROJECT_TYPE"
    | "INVALID_SERVICE_SELECTION"
    | "LEAD_CREATE_FAILED";

  constructor(code: LeadServiceError["code"], message: string) {
    super(message);
    this.name = "LeadServiceError";
    this.code = code;
  }
}

type LeadSubmissionRpcResult = {
  lead_id: string;
  created: boolean;
};

type IdempotentLeadRpcResult = {
  found: boolean;
  lead_id: string | null;
};

export function prepareLeadSubmission(
  lead: ValidatedLeadSubmission,
): PreparedLeadSubmission {
  return {
    lead,
    submissionFingerprint: createSubmissionFingerprint(lead),
  };
}

export async function findIdempotentLeadSubmission(
  prepared: PreparedLeadSubmission,
): Promise<IdempotentLeadLookupResult> {
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .rpc("find_idempotent_lead_submission", {
      p_submission_id: prepared.lead.submissionId,
      p_submission_fingerprint: prepared.submissionFingerprint,
    })
    .single();

  if (error) {
    throw mapLeadRpcError(error);
  }

  if (!isIdempotentLeadRpcResult(data)) {
    throw new LeadServiceError(
      "DATABASE_CONFIGURATION_ERROR",
      "Başvuru tekrar kontrolü doğrulanamadı.",
    );
  }

  if (!data.found) {
    return { found: false };
  }

  if (!data.lead_id) {
    throw new LeadServiceError(
      "DATABASE_CONFIGURATION_ERROR",
      "Başvuru tekrar kontrolü lead ID döndürmedi.",
    );
  }

  return {
    found: true,
    leadId: data.lead_id,
  };
}

export async function createLead(
  prepared: PreparedLeadSubmission,
): Promise<CreateLeadResult> {
  const lead = prepared.lead;
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .rpc("create_lead_submission", {
      p_submission_id: lead.submissionId,
      p_submission_fingerprint: prepared.submissionFingerprint,
      p_full_name: lead.fullName,
      p_phone: lead.normalizedPhone,
      p_email: lead.email,
      p_city: lead.city,
      p_district: lead.district,
      p_address: lead.address,
      p_source: lead.source,
      p_project_type_slug: lead.projectTypeSlug,
      p_service_slugs: lead.serviceSlugs,
      p_budget_min: lead.budgetMin,
      p_budget_max: lead.budgetMax,
      p_timeline: lead.timeline,
      p_description: lead.description,
      p_project_details: lead.projectDetails,
    })
    .single();

  if (error) {
    throw mapLeadRpcError(error);
  }

  if (!isLeadSubmissionRpcResult(data)) {
    throw new LeadServiceError(
      "DATABASE_CONFIGURATION_ERROR",
      "Başvuru kaydı doğrulanamadı.",
    );
  }

  return {
    leadId: data.lead_id,
    created: data.created,
  };
}

function mapLeadRpcError(error: { message?: string }): LeadServiceError {
  const message = error.message ?? "";

  if (message.includes("IDEMPOTENCY_CONFLICT")) {
    return new LeadServiceError(
      "IDEMPOTENCY_CONFLICT",
      "Başvuru anahtarı farklı bilgilerle tekrar kullanıldı.",
    );
  }

  if (message.includes("INVALID_SUBMISSION_ID")) {
    return new LeadServiceError(
      "INVALID_SUBMISSION_ID",
      "Başvuru anahtarı geçerli değil.",
    );
  }

  if (message.includes("INVALID_PROJECT_TYPE")) {
    return new LeadServiceError(
      "INVALID_PROJECT_TYPE",
      "Seçilen proje türü geçerli değil.",
    );
  }

  if (message.includes("INVALID_SERVICE_SELECTION")) {
    return new LeadServiceError(
      "INVALID_SERVICE_SELECTION",
      "Seçilen hizmet bilgisi geçerli değil.",
    );
  }

  return new LeadServiceError(
    "LEAD_CREATE_FAILED",
    "Başvuru kaydı oluşturulamadı.",
  );
}

function createSubmissionFingerprint(lead: ValidatedLeadSubmission): string {
  return createHash("sha256")
    .update(stableStringify(normalizeFingerprintPayload(lead)))
    .digest("hex");
}

function normalizeFingerprintPayload(lead: ValidatedLeadSubmission) {
  return {
    full_name: normalizeNullableText(lead.fullName),
    phone: normalizeNullableText(lead.normalizedPhone),
    email: normalizeNullableText(lead.email),
    city: normalizeNullableText(lead.city),
    district: normalizeNullableText(lead.district),
    address: normalizeNullableText(lead.address),
    source: normalizeNullableText(lead.source),
    project_type_slug: normalizeNullableText(lead.projectTypeSlug),
    service_slugs: Array.from(
      new Set(lead.serviceSlugs.map((slug) => slug.trim()).filter(Boolean)),
    ).sort(),
    budget_min: lead.budgetMin,
    budget_max: lead.budgetMax,
    timeline: normalizeNullableText(lead.timeline),
    description: normalizeNullableText(lead.description),
    project_details: normalizeJsonValue(lead.projectDetails),
  };
}

function normalizeNullableText(value: string | null): string | null {
  const trimmed = value?.trim() ?? "";
  return trimmed ? trimmed : null;
}

function normalizeJsonValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(normalizeJsonValue);
  }

  if (typeof value === "object" && value !== null) {
    const normalized: Record<string, unknown> = {};
    for (const key of Object.keys(value).sort()) {
      normalized[key] = normalizeJsonValue((value as Record<string, unknown>)[key]);
    }
    return normalized;
  }

  if (typeof value === "string") {
    return value.trim();
  }

  return value;
}

function stableStringify(value: unknown): string {
  return JSON.stringify(value);
}

function isLeadSubmissionRpcResult(
  value: unknown,
): value is LeadSubmissionRpcResult {
  return (
    typeof value === "object" &&
    value !== null &&
    "lead_id" in value &&
    "created" in value &&
    typeof value.lead_id === "string" &&
    typeof value.created === "boolean"
  );
}

function isIdempotentLeadRpcResult(
  value: unknown,
): value is IdempotentLeadRpcResult {
  return (
    typeof value === "object" &&
    value !== null &&
    "found" in value &&
    "lead_id" in value &&
    typeof value.found === "boolean" &&
    (typeof value.lead_id === "string" || value.lead_id === null)
  );
}
