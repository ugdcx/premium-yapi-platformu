import "server-only";

import { createSupabaseAdminClient } from "@/src/lib/supabase/admin";
import {
  LEAD_STATUS_VALUES,
  type LeadStatus,
} from "@/src/lib/validation/lead";

export type LeadServiceSummary = {
  id: string;
  name: string;
  slug: string;
};

export type LeadProjectDetails = {
  rawLocation?: string | null;
  selectedProjectType?: string | null;
  submittedAt?: string | null;
  [key: string]: string | number | boolean | null | undefined;
};

export type AdminLeadListItem = {
  id: string;
  fullName: string;
  phone: string;
  email: string | null;
  city: string | null;
  district: string | null;
  source: string;
  status: LeadStatus;
  description: string | null;
  selectedServices: LeadServiceSummary[];
  projectDetails: LeadProjectDetails;
  createdAt: string;
  updatedAt: string;
};

export type AdminLeadDetail = AdminLeadListItem & {
  address: string | null;
  timeline: string | null;
  budgetMin: number | null;
  budgetMax: number | null;
};

export type AdminLeadListFilters = {
  page?: number;
  pageSize?: number;
  status?: LeadStatus;
  source?: string;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
};

export type AdminLeadPagination = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type AdminLeadListResult = {
  data: AdminLeadListItem[];
  pagination: AdminLeadPagination;
};

export class AdminLeadServiceError extends Error {
  readonly code:
    | "VALIDATION_ERROR"
    | "LEAD_NOT_FOUND"
    | "LEAD_LIST_FAILED"
    | "LEAD_DETAIL_FAILED"
    | "LEAD_STATUS_UPDATE_FAILED";

  constructor(code: AdminLeadServiceError["code"], message: string) {
    super(message);
    this.name = "AdminLeadServiceError";
    this.code = code;
  }
}

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 50;
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const LEAD_SELECT = `
  id,
  full_name,
  phone,
  email,
  city,
  district,
  address,
  source,
  status,
  timeline,
  budget_min,
  budget_max,
  description,
  project_details,
  created_at,
  updated_at,
  lead_services (
    service_id,
    services (
      id,
      name,
      slug
    )
  )
`;

export async function listLeads(
  filters: AdminLeadListFilters = {},
): Promise<AdminLeadListResult> {
  const normalizedFilters = normalizeListFilters(filters);
  const supabase = createSupabaseAdminClient();
  const from = (normalizedFilters.page - 1) * normalizedFilters.pageSize;
  const to = from + normalizedFilters.pageSize - 1;

  let query = supabase
    .from("leads")
    .select(LEAD_SELECT, { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (normalizedFilters.status) {
    query = query.eq("status", normalizedFilters.status);
  }

  if (normalizedFilters.source) {
    query = query.eq("source", normalizedFilters.source);
  }

  if (normalizedFilters.dateFrom) {
    query = query.gte("created_at", normalizedFilters.dateFrom);
  }

  if (normalizedFilters.dateTo) {
    query = query.lte("created_at", normalizedFilters.dateTo);
  }

  if (normalizedFilters.search) {
    const pattern = `*${normalizeSearchForPostgrest(normalizedFilters.search)}*`;
    query = query.or(
      `full_name.ilike.${pattern},phone.ilike.${pattern},email.ilike.${pattern}`,
    );
  }

  const { data, error, count } = await query;

  if (error || !Array.isArray(data)) {
    throw new AdminLeadServiceError(
      "LEAD_LIST_FAILED",
      "Lead listesi alınamadı.",
    );
  }

  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / normalizedFilters.pageSize));

  return {
    data: data.map(mapLeadListItem),
    pagination: {
      page: normalizedFilters.page,
      pageSize: normalizedFilters.pageSize,
      total,
      totalPages,
    },
  };
}

export async function getLeadById(id: string): Promise<AdminLeadDetail> {
  if (!isUuid(id)) {
    throw new AdminLeadServiceError("VALIDATION_ERROR", "Lead ID geçerli değil.");
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("leads")
    .select(LEAD_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new AdminLeadServiceError(
      "LEAD_DETAIL_FAILED",
      "Lead detayı alınamadı.",
    );
  }

  if (!data) {
    throw new AdminLeadServiceError("LEAD_NOT_FOUND", "Lead bulunamadı.");
  }

  return mapLeadDetail(data);
}

export async function updateLeadStatus(
  id: string,
  status: LeadStatus,
): Promise<AdminLeadDetail> {
  if (!isUuid(id) || !isLeadStatus(status)) {
    throw new AdminLeadServiceError(
      "VALIDATION_ERROR",
      "Lead durum güncellemesi geçerli değil.",
    );
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("leads")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select(LEAD_SELECT)
    .maybeSingle();

  if (error) {
    throw new AdminLeadServiceError(
      "LEAD_STATUS_UPDATE_FAILED",
      "Lead durumu güncellenemedi.",
    );
  }

  if (!data) {
    throw new AdminLeadServiceError("LEAD_NOT_FOUND", "Lead bulunamadı.");
  }

  return mapLeadDetail(data);
}

export function isLeadStatus(value: unknown): value is LeadStatus {
  return (
    typeof value === "string" &&
    LEAD_STATUS_VALUES.includes(value as LeadStatus)
  );
}

export function isUuid(value: unknown): value is string {
  return typeof value === "string" && UUID_PATTERN.test(value);
}

function normalizeListFilters(filters: AdminLeadListFilters): Required<
  Pick<AdminLeadListFilters, "page" | "pageSize">
> &
  Omit<AdminLeadListFilters, "page" | "pageSize"> {
  const page = clampInteger(filters.page, DEFAULT_PAGE, 1, 100000);
  const pageSize = clampInteger(
    filters.pageSize,
    DEFAULT_PAGE_SIZE,
    1,
    MAX_PAGE_SIZE,
  );

  return {
    page,
    pageSize,
    status: filters.status && isLeadStatus(filters.status) ? filters.status : undefined,
    source: normalizeOptionalFilterText(filters.source),
    search: normalizeOptionalSearch(filters.search),
    dateFrom: normalizeOptionalIsoDate(filters.dateFrom),
    dateTo: normalizeOptionalIsoDate(filters.dateTo),
  };
}

function clampInteger(
  value: number | undefined,
  fallback: number,
  min: number,
  max: number,
): number {
  if (typeof value !== "number" || !Number.isInteger(value)) return fallback;
  const integerValue = value;
  return Math.max(min, Math.min(max, integerValue));
}

function normalizeOptionalFilterText(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;
  return trimmed.slice(0, 80);
}

function normalizeOptionalSearch(value: string | undefined): string | undefined {
  const trimmed = value?.trim().replace(/[%,()*]/g, " ");
  if (!trimmed) return undefined;
  return trimmed.replace(/\s+/g, " ").slice(0, 80);
}

function normalizeOptionalIsoDate(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed.toISOString();
}

function normalizeSearchForPostgrest(value: string): string {
  return value.replace(/[\\"]/g, " ").replace(/\s+/g, " ").trim();
}

function mapLeadListItem(row: unknown): AdminLeadListItem {
  const record = asRecord(row);

  return {
    id: getString(record.id),
    fullName: getString(record.full_name),
    phone: getString(record.phone),
    email: getNullableString(record.email),
    city: getNullableString(record.city),
    district: getNullableString(record.district),
    source: getString(record.source) || "website",
    status: isLeadStatus(record.status) ? record.status : "new",
    description: getNullableString(record.description),
    selectedServices: getSelectedServices(record.lead_services),
    projectDetails: getProjectDetails(record.project_details),
    createdAt: getString(record.created_at),
    updatedAt: getString(record.updated_at),
  };
}

function mapLeadDetail(row: unknown): AdminLeadDetail {
  const record = asRecord(row);
  return {
    ...mapLeadListItem(row),
    address: getNullableString(record.address),
    timeline: getNullableString(record.timeline),
    budgetMin: getNullableNumber(record.budget_min),
    budgetMax: getNullableNumber(record.budget_max),
  };
}

function getSelectedServices(value: unknown): LeadServiceSummary[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((entry) => {
      const record = asRecord(entry);
      const service = getNestedService(record.services);
      return service;
    })
    .filter((service): service is LeadServiceSummary => Boolean(service));
}

function getNestedService(value: unknown): LeadServiceSummary | null {
  const serviceValue = Array.isArray(value) ? value[0] : value;
  const record = asRecord(serviceValue);
  const id = getString(record.id);
  const name = getString(record.name);
  const slug = getString(record.slug);

  if (!id || !name || !slug) return null;
  return { id, name, slug };
}

function getProjectDetails(value: unknown): LeadProjectDetails {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return {};
  }

  const details: LeadProjectDetails = {};
  for (const [key, entry] of Object.entries(value)) {
    if (
      typeof entry === "string" ||
      typeof entry === "number" ||
      typeof entry === "boolean" ||
      entry === null
    ) {
      details[key] = entry;
    }
  }
  return details;
}

function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
}

function getString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function getNullableString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value : null;
}

function getNullableNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}
