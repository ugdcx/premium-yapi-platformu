import { z } from "zod";

const MIN_SUBMISSION_TIME_MS = 2500;

const emailSchema = z.string().trim().email();

export const LEAD_STATUS_VALUES = [
  "new",
  "contacted",
  "qualified",
  "site_visit_planned",
  "quote_preparing",
  "quote_sent",
  "negotiation",
  "won",
  "converted_to_project",
  "lost",
  "unsuitable",
  "archived",
] as const;

const serviceSlugSchema = z
  .string()
  .trim()
  .min(1)
  .max(80)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

const leadBodySchema = z.object({
  fullName: z.string().trim().min(1).max(80),
  phone: z.string().trim().min(1).max(24),
  email: z.string().trim().max(120).optional(),
  location: z.string().trim().max(120).optional(),
  projectType: z.string().trim().max(120).optional(),
  description: z.string().trim().min(1).max(600),
  source: z.string().trim().max(80).optional(),
  timeline: z.string().trim().max(120).optional(),
  budgetMin: z.number().int().nonnegative().optional(),
  budgetMax: z.number().int().nonnegative().optional(),
  serviceSlugs: z.array(serviceSlugSchema).min(1).max(10),
  startedAt: z.number().int().positive(),
  companyWebsite: z.string().optional(),
});

export type LeadStatus = (typeof LEAD_STATUS_VALUES)[number];

export type ValidatedLeadSubmission = {
  fullName: string;
  phone: string;
  normalizedPhone: string;
  email: string | null;
  city: string | null;
  district: string | null;
  address: string | null;
  source: string;
  status: LeadStatus;
  timeline: string | null;
  budgetMin: number | null;
  budgetMax: number | null;
  description: string;
  serviceSlugs: string[];
  projectDetails: {
    rawLocation: string | null;
    selectedProjectType: string | null;
    submittedAt: string;
  };
};

export type LeadFieldErrors = Record<string, string>;

export type LeadValidationResult =
  | { success: true; data: ValidatedLeadSubmission }
  | {
      success: false;
      code: "VALIDATION_ERROR" | "SPAM_REJECTED";
      fieldErrors: LeadFieldErrors;
    };

export function validateLeadSubmission(input: unknown): LeadValidationResult {
  const parsed = leadBodySchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      code: "VALIDATION_ERROR",
      fieldErrors: formatZodFieldErrors(parsed.error),
    };
  }

  const body = parsed.data;
  const fieldErrors: LeadFieldErrors = {};

  if (body.companyWebsite?.trim()) {
    return {
      success: false,
      code: "SPAM_REJECTED",
      fieldErrors: {},
    };
  }

  if (Date.now() - body.startedAt < MIN_SUBMISSION_TIME_MS) {
    return {
      success: false,
      code: "SPAM_REJECTED",
      fieldErrors: {},
    };
  }

  const phoneResult = validateTurkishMobilePhone(body.phone);
  if (!phoneResult.valid) {
    fieldErrors.phone = phoneResult.message;
  }

  const email = toNullableString(body.email);
  if (email && !emailSchema.safeParse(email).success) {
    fieldErrors.email = "Lütfen geçerli bir e-posta adresi girin.";
  }

  const budgetMin = body.budgetMin ?? null;
  const budgetMax = body.budgetMax ?? null;
  if (budgetMin !== null && budgetMax !== null && budgetMin > budgetMax) {
    fieldErrors.budgetMax = "Üst bütçe alt bütçeden düşük olamaz.";
  }

  const locationParts = splitLocation(body.location);

  if (Object.keys(fieldErrors).length > 0 || !phoneResult.valid) {
    return {
      success: false,
      code: "VALIDATION_ERROR",
      fieldErrors,
    };
  }

  return {
    success: true,
    data: {
      fullName: body.fullName,
      phone: phoneResult.normalizedPhone,
      normalizedPhone: phoneResult.normalizedPhone,
      email,
      city: locationParts.city,
      district: locationParts.district,
      address: null,
      source: toNullableString(body.source) ?? "website",
      status: "new",
      timeline: toNullableString(body.timeline),
      budgetMin,
      budgetMax,
      description: body.description,
      serviceSlugs: Array.from(new Set(body.serviceSlugs)),
      projectDetails: {
        rawLocation: toNullableString(body.location),
        selectedProjectType: toNullableString(body.projectType),
        submittedAt: new Date().toISOString(),
      },
    },
  };
}

function formatZodFieldErrors(error: z.ZodError): LeadFieldErrors {
  const fieldErrors: LeadFieldErrors = {};

  for (const issue of error.issues) {
    const field = issue.path[0];
    if (typeof field !== "string" || fieldErrors[field]) continue;
    fieldErrors[field] = "Bu alan kontrol edilemedi.";
  }

  return fieldErrors;
}

function toNullableString(value: string | undefined): string | null {
  const trimmed = value?.trim() ?? "";
  return trimmed ? trimmed : null;
}

function splitLocation(value: string | undefined): {
  city: string | null;
  district: string | null;
} {
  const location = toNullableString(value);
  if (!location) return { city: null, district: null };

  const [city, ...rest] = location
    .split("/")
    .map((part) => part.trim())
    .filter(Boolean);

  return {
    city: city || location,
    district: rest.join(" / ") || null,
  };
}

function validateTurkishMobilePhone(value: string):
  | { valid: true; normalizedPhone: string }
  | { valid: false; message: string } {
  const trimmed = value.trim();
  if (!trimmed) {
    return { valid: false, message: "Telefon numarası zorunludur." };
  }

  if (/[a-zA-Z]/.test(trimmed)) {
    return {
      valid: false,
      message: "Lütfen geçerli bir cep telefonu numarası girin.",
    };
  }

  const normalizedPhone = normalizePhone(trimmed);
  if (!/^5\d{9}$/.test(normalizedPhone)) {
    return {
      valid: false,
      message: "Lütfen geçerli bir cep telefonu numarası girin.",
    };
  }

  if (isKnownTestPhone(normalizedPhone)) {
    return {
      valid: false,
      message: "Bu telefon numarası gerçek bir başvuru için uygun görünmüyor.",
    };
  }

  return { valid: true, normalizedPhone };
}

function normalizePhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";

  if (digits.startsWith("0090") && digits.length === 14) return digits.slice(4);
  if (digits.startsWith("90") && digits.length === 12) return digits.slice(2);
  if (digits.startsWith("0") && digits.length === 11) return digits.slice(1);
  if (digits.startsWith("5") && digits.length === 10) return digits;

  return digits;
}

function isKnownTestPhone(value: string): boolean {
  return value === "5555551212";
}
