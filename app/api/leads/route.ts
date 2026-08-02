import { NextResponse } from "next/server";

import {
  LeadServiceError,
  createLead,
} from "@/src/services/leadService";
import { validateLeadSubmission } from "@/src/lib/validation/lead";

const jsonContentTypes = new Set(["application/json"]);

export async function POST(request: Request) {
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
    return validationResponse({
      body: "Gönderilen bilgiler okunamadı.",
    });
  }

  const validation = validateLeadSubmission(body);

  if (!validation.success) {
    return NextResponse.json(
      {
        success: false,
        code: validation.code,
        message:
          validation.code === "SPAM_REJECTED"
            ? "Başvurunuz kontrol edilemedi."
            : "Gönderilen bilgiler kontrol edilemedi.",
        fieldErrors: validation.fieldErrors,
      },
      { status: 400 },
    );
  }

  try {
    const result = await createLead(validation.data);

    return NextResponse.json(
      {
        success: true,
        leadId: result.leadId,
        message: "Başvurunuz başarıyla alındı.",
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof LeadServiceError) {
      const status = error.code === "INVALID_SERVICE_SELECTION" ? 400 : 500;

      return NextResponse.json(
        {
          success: false,
          code:
            error.code === "INVALID_SERVICE_SELECTION"
              ? "VALIDATION_ERROR"
              : "LEAD_CREATE_FAILED",
          message:
            error.code === "INVALID_SERVICE_SELECTION"
              ? "Gönderilen bilgiler kontrol edilemedi."
              : "Başvuru şu anda kaydedilemedi.",
          fieldErrors:
            error.code === "INVALID_SERVICE_SELECTION"
              ? { serviceSlugs: "Seçilen hizmet bilgisi geçerli değil." }
              : {},
        },
        { status },
      );
    }

    return NextResponse.json(
      {
        success: false,
        code: "INTERNAL_SERVER_ERROR",
        message: "Başvuru şu anda kaydedilemedi.",
        fieldErrors: {},
      },
      { status: 500 },
    );
  }
}

function isJsonRequest(request: Request): boolean {
  const contentType = request.headers.get("content-type");
  if (!contentType) return false;

  const [mediaType] = contentType.split(";").map((part) => part.trim());
  return jsonContentTypes.has(mediaType.toLowerCase());
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
