import { NextResponse } from "next/server";

import { adminAuthErrorResponse } from "@/src/lib/auth/adminAuthResponse";
import { getServerEnv } from "@/src/lib/env";
import {
  AdminAuthError,
  requireAdminSession,
} from "@/src/lib/auth/requireAdminSession";
import {
  AdminLeadServiceError,
  getLeadById,
  isLeadStatus,
  isUuid,
  updateLeadStatus,
} from "@/src/services/adminLeadService";

type RouteContext = {
  params: Promise<{ id: string }>;
};

const jsonContentTypes = new Set(["application/json"]);

export async function GET(_request: Request, context: RouteContext) {
  const authResponse = await guardAdminRequest();
  if (authResponse) return authResponse;

  const { id } = await context.params;

  if (!isUuid(id)) {
    return validationResponse({ id: "Lead ID geçerli değil." });
  }

  try {
    const lead = await getLeadById(id);

    return NextResponse.json({
      success: true,
      data: lead,
    });
  } catch (error) {
    return handleLeadError(error, "Lead detayı şu anda alınamadı.");
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  const authResponse = await guardAdminRequest();
  if (authResponse) return authResponse;

  const { id } = await context.params;

  if (!isUuid(id)) {
    return validationResponse({ id: "Lead ID geçerli değil." });
  }

  if (!isSameOriginRequest(request)) {
    return NextResponse.json(
      {
        success: false,
        code: "FORBIDDEN",
        message: "Bu işlem için istek kaynağı doğrulanamadı.",
        fieldErrors: {},
      },
      { status: 403 },
    );
  }

  if (!isJsonRequest(request)) {
    return NextResponse.json(
      {
        success: false,
        code: "UNSUPPORTED_MEDIA_TYPE",
        message: "İstek JSON formatında gönderilmelidir.",
        fieldErrors: {},
      },
      { status: 415 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return validationResponse({ body: "Gönderilen bilgiler okunamadı." });
  }

  const parsed = parsePatchBody(body);
  if (!parsed.success) {
    return validationResponse(parsed.fieldErrors);
  }

  try {
    const lead = await updateLeadStatus(id, parsed.status);

    return NextResponse.json({
      success: true,
      data: lead,
      message: "Lead durumu güncellendi.",
    });
  } catch (error) {
    return handleLeadError(error, "Lead durumu şu anda güncellenemedi.");
  }
}

function parsePatchBody(body: unknown):
  | { success: true; status: Parameters<typeof updateLeadStatus>[1] }
  | { success: false; fieldErrors: Record<string, string> } {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return {
      success: false,
      fieldErrors: { body: "Gönderilen bilgiler kontrol edilemedi." },
    };
  }

  const record = body as Record<string, unknown>;
  const keys = Object.keys(record);
  const unknownKeys = keys.filter((key) => key !== "status");

  if (unknownKeys.length > 0) {
    return {
      success: false,
      fieldErrors: { body: "Bu işlem yalnızca status alanını kabul eder." },
    };
  }

  if (!isLeadStatus(record.status)) {
    return {
      success: false,
      fieldErrors: { status: "Durum değeri geçerli değil." },
    };
  }

  return { success: true, status: record.status };
}

function handleLeadError(error: unknown, fallbackMessage: string) {
  if (error instanceof AdminLeadServiceError) {
    if (error.code === "LEAD_NOT_FOUND") {
      return NextResponse.json(
        {
          success: false,
          code: "LEAD_NOT_FOUND",
          message: "Lead bulunamadı.",
          fieldErrors: {},
        },
        { status: 404 },
      );
    }

    if (error.code === "VALIDATION_ERROR") {
      return validationResponse({ id: "Lead ID veya durum değeri geçerli değil." });
    }
  }

  return NextResponse.json(
    {
      success: false,
      code: "INTERNAL_SERVER_ERROR",
      message: fallbackMessage,
      fieldErrors: {},
    },
    { status: 500 },
  );
}

function validationResponse(fieldErrors: Record<string, string>) {
  return NextResponse.json(
    {
      success: false,
      code: "VALIDATION_ERROR",
      message: "Gönderilen bilgiler kontrol edilemedi.",
      fieldErrors,
    },
    { status: 400 },
  );
}

function isJsonRequest(request: Request): boolean {
  const contentType = request.headers.get("content-type");
  if (!contentType) return false;

  const [mediaType] = contentType.split(";").map((part) => part.trim());
  return jsonContentTypes.has(mediaType.toLowerCase());
}

async function guardAdminRequest() {
  try {
    await requireAdminSession();
    return null;
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return adminAuthErrorResponse(error);
    }

    return NextResponse.json(
      {
        success: false,
        code: "AUTH_CHECK_FAILED",
        message: "Yetki kontrolü şu anda tamamlanamadı.",
        fieldErrors: {},
      },
      { status: 500 },
    );
  }
}

function isSameOriginRequest(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    const requestOrigin = new URL(origin).origin;
    const canonicalOrigin = getCanonicalApplicationOrigin();
    if (!canonicalOrigin) return false;
    return requestOrigin === canonicalOrigin;
  } catch {
    return false;
  }
}

function getCanonicalApplicationOrigin(): string | null {
  const configuredAppUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (!configuredAppUrl && process.env.NODE_ENV === "production") {
    return null;
  }

  const appUrl = configuredAppUrl || getServerEnv().NEXT_PUBLIC_APP_URL;
  return new URL(appUrl).origin;
}
