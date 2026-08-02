import "server-only";

import { createSupabaseAdminClient } from "@/src/lib/supabase/admin";
import type {
  LeadStatus,
  ValidatedLeadSubmission,
} from "@/src/lib/validation/lead";

export type CreateLeadResult = {
  leadId: string;
};

export class LeadServiceError extends Error {
  readonly code:
    | "DATABASE_CONFIGURATION_ERROR"
    | "INVALID_SERVICE_SELECTION"
    | "LEAD_CREATE_FAILED"
    | "LEAD_SERVICE_CREATE_FAILED_ROLLED_BACK"
    | "LEAD_SERVICE_CREATE_FAILED_ROLLBACK_FAILED";

  constructor(code: LeadServiceError["code"], message: string) {
    super(message);
    this.name = "LeadServiceError";
    this.code = code;
  }
}

type ServiceRecord = {
  id: string;
  slug: string;
};

type LeadInsertRecord = {
  project_type_id: null;
  full_name: string;
  phone: string;
  email: string | null;
  city: string | null;
  district: string | null;
  address: string | null;
  source: string;
  status: LeadStatus;
  timeline: string | null;
  budget_min: number | null;
  budget_max: number | null;
  description: string;
  project_details: ValidatedLeadSubmission["projectDetails"];
};

export async function createLead(
  lead: ValidatedLeadSubmission,
): Promise<CreateLeadResult> {
  const supabase = createSupabaseAdminClient();
  const services = await resolveServicesBySlug(lead.serviceSlugs);

  const leadRecord: LeadInsertRecord = {
    project_type_id: null,
    full_name: lead.fullName,
    phone: lead.normalizedPhone,
    email: lead.email,
    city: lead.city,
    district: lead.district,
    address: lead.address,
    source: lead.source,
    status: lead.status,
    timeline: lead.timeline,
    budget_min: lead.budgetMin,
    budget_max: lead.budgetMax,
    description: lead.description,
    project_details: lead.projectDetails,
  };

  const { data: insertedLead, error: leadError } = await supabase
    .from("leads")
    .insert(leadRecord)
    .select("id")
    .single();

  if (leadError || !isIdRecord(insertedLead)) {
    throw new LeadServiceError(
      "LEAD_CREATE_FAILED",
      "Başvuru kaydı oluşturulamadı.",
    );
  }

  const leadId = insertedLead.id;
  const leadServiceRows = services.map((service) => ({
    lead_id: leadId,
    service_id: service.id,
  }));

  const { error: servicesError } = await supabase
    .from("lead_services")
    .insert(leadServiceRows);

  if (!servicesError) {
    return { leadId };
  }

  const { error: rollbackError } = await supabase
    .from("leads")
    .delete()
    .eq("id", leadId);

  if (rollbackError) {
    reportLeadServiceFailure({
      code: "LEAD_SERVICE_CREATE_FAILED_ROLLBACK_FAILED",
      stage: "lead_services_insert_rollback",
      leadId,
    });

    throw new LeadServiceError(
      "LEAD_SERVICE_CREATE_FAILED_ROLLBACK_FAILED",
      "Başvuru hizmet kayıtları oluşturulamadı ve geri alma işlemi tamamlanamadı.",
    );
  }

  throw new LeadServiceError(
    "LEAD_SERVICE_CREATE_FAILED_ROLLED_BACK",
    "Başvuru hizmet kayıtları oluşturulamadı.",
  );
}

async function resolveServicesBySlug(
  serviceSlugs: ValidatedLeadSubmission["serviceSlugs"],
): Promise<ServiceRecord[]> {
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("services")
    .select("id, slug")
    .in("slug", serviceSlugs);

  if (error || !Array.isArray(data)) {
    throw new LeadServiceError(
      "DATABASE_CONFIGURATION_ERROR",
      "Hizmet bilgileri kontrol edilemedi.",
    );
  }

  const services = data.filter(isServiceRecord);
  const foundSlugs = new Set(services.map((service) => service.slug));
  const hasMissingService = serviceSlugs.some((slug) => !foundSlugs.has(slug));

  if (hasMissingService) {
    throw new LeadServiceError(
      "INVALID_SERVICE_SELECTION",
      "Seçilen hizmet bilgisi geçerli değil.",
    );
  }

  return services;
}

function isIdRecord(value: unknown): value is { id: string } {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "string"
  );
}

function isServiceRecord(value: unknown): value is ServiceRecord {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "slug" in value &&
    typeof value.id === "string" &&
    typeof value.slug === "string"
  );
}

function reportLeadServiceFailure(event: {
  code: LeadServiceError["code"];
  stage: string;
  leadId: string;
}) {
  console.error({
    code: event.code,
    stage: event.stage,
    leadId: event.leadId,
  });
}
