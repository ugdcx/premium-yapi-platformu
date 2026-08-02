import { NextResponse } from "next/server";

import {
  LeadServiceError,
  createLead,
  findIdempotentLeadSubmission,
  prepareLeadSubmission,
} from "@/src/services/leadService";
import {
  LeadRateLimitError,
  checkLeadRateLimit,
} from "@/src/services/leadRateLimitService";
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
    const preparedSubmission = prepareLeadSubmission(validation.data);
    let existingSubmission;

    try {
      existingSubmission = await findIdempotentLeadSubmission(preparedSubmission);
    } catch (error) {
      if (
        error instanceof LeadServiceError &&
        error.code === "IDEMPOTENCY_CONFLICT"
      ) {
        const rateLimitResponse = await getRateLimitResponse(request);
        if (rateLimitResponse) return rateLimitResponse;
      }

      throw error;
    }

    if (existingSubmission.found) {
      return NextResponse.json(
        {
          success: true,
          leadId: existingSubmission.leadId,
          created: false,
          message: "Başvurunuz daha önce alınmış.",
        },
        { status: 200 },
      );
    }

    const rateLimitResponse = await getRateLimitResponse(request);
    if (rateLimitResponse) return rateLimitResponse;

    const result = await createLead(preparedSubmission);
    const status = result.created ? 201 : 200;

    return NextResponse.json(
      {
        success: true,
        leadId: result.leadId,
        created: result.created,
        message: result.created
          ? "Başvurunuz başarıyla alındı."
          : "Başvurunuz daha önce alınmış.",
      },
      { status },
    );
  } catch (error) {
    if (error instanceof LeadServiceError) {
      const status =
        error.code === "IDEMPOTENCY_CONFLICT"
          ? 409
          : error.code === "INVALID_SUBMISSION_ID"
            ? 400
            : error.code === "INVALID_SERVICE_SELECTION" ||
              error.code === "INVALID_PROJECT_TYPE"
              ? 400
              : 500;
      const code =
        error.code === "IDEMPOTENCY_CONFLICT" ||
        error.code === "INVALID_SERVICE_SELECTION" ||
        error.code === "INVALID_PROJECT_TYPE"
          ? error.code
          : error.code === "INVALID_SUBMISSION_ID"
            ? "VALIDATION_ERROR"
            : "LEAD_CREATE_FAILED";

      return NextResponse.json(
        {
          success: false,
          code,
          message:
            error.code === "IDEMPOTENCY_CONFLICT"
              ? "Bu başvuru farklı bilgilerle daha önce gönderilmiş."
              : error.code === "INVALID_SERVICE_SELECTION"
                ? "Gönderilen bilgiler kontrol edilemedi."
                : error.code === "INVALID_PROJECT_TYPE"
                  ? "Seçilen proje türü geçerli değil."
                  : "Başvuru şu anda kaydedilemedi.",
          fieldErrors:
            error.code === "INVALID_SERVICE_SELECTION"
              ? { serviceSlugs: "Seçilen hizmet bilgisi geçerli değil." }
              : error.code === "INVALID_PROJECT_TYPE"
                ? { projectTypeSlug: "Seçilen proje türü geçerli değil." }
                : error.code === "INVALID_SUBMISSION_ID"
                  ? { submissionId: "Başvuru anahtarı geçerli değil." }
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

async function getRateLimitResponse(request: Request) {
  try {
    const result = await checkLeadRateLimit(request);
    if (result.allowed) return null;

    return NextResponse.json(
      {
        success: false,
        code: "RATE_LIMITED",
        message: "Çok sık başvuru denemesi yapıldı. Lütfen biraz sonra tekrar deneyin.",
        fieldErrors: {},
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(result.retryAfterSeconds),
        },
      },
    );
  } catch (error) {
    if (error instanceof LeadRateLimitError || error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          code: "LEAD_CREATE_FAILED",
          message: "Başvuru şu anda kaydedilemedi.",
          fieldErrors: {},
        },
        { status: 500 },
      );
    }

    throw error;
  }
}
