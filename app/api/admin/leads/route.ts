import { NextResponse } from "next/server";

import { adminAuthErrorResponse } from "@/src/lib/auth/adminAuthResponse";
import {
  AdminAuthError,
  requireAdminSession,
} from "@/src/lib/auth/requireAdminSession";
import {
  AdminLeadServiceError,
  isLeadStatus,
  listLeads,
  type AdminLeadListFilters,
} from "@/src/services/adminLeadService";

type FieldErrors = Record<string, string>;

export async function GET(request: Request) {
  try {
    await requireAdminSession();
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

  const parsed = parseListQuery(new URL(request.url).searchParams);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        code: "VALIDATION_ERROR",
        message: "Filtreler kontrol edilemedi.",
        fieldErrors: parsed.fieldErrors,
      },
      { status: 400 },
    );
  }

  try {
    const result = await listLeads(parsed.filters);

    return NextResponse.json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    if (error instanceof AdminLeadServiceError) {
      return NextResponse.json(
        {
          success: false,
          code: "LEAD_LIST_FAILED",
          message: "Lead listesi şu anda alınamadı.",
          fieldErrors: {},
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        code: "INTERNAL_SERVER_ERROR",
        message: "Lead listesi şu anda alınamadı.",
        fieldErrors: {},
      },
      { status: 500 },
    );
  }
}

function parseListQuery(searchParams: URLSearchParams):
  | { success: true; filters: AdminLeadListFilters }
  | { success: false; fieldErrors: FieldErrors } {
  const fieldErrors: FieldErrors = {};
  const filters: AdminLeadListFilters = {};

  const page = parseIntegerParam(searchParams.get("page"));
  if (page.invalid || (page.value !== undefined && page.value < 1)) {
    fieldErrors.page = "Sayfa değeri geçerli değil.";
  } else {
    filters.page = page.value;
  }

  const pageSize = parseIntegerParam(searchParams.get("pageSize"));
  if (
    pageSize.invalid ||
    (pageSize.value !== undefined && (pageSize.value < 1 || pageSize.value > 50))
  ) {
    fieldErrors.pageSize = "Sayfa boyutu geçerli değil.";
  } else {
    filters.pageSize = pageSize.value;
  }

  const status = normalizeOptional(searchParams.get("status"));
  if (status) {
    if (!isLeadStatus(status)) {
      fieldErrors.status = "Durum filtresi geçerli değil.";
    } else {
      filters.status = status;
    }
  }

  const source = normalizeOptional(searchParams.get("source"));
  if (source) {
    if (source.length > 80) {
      fieldErrors.source = "Kaynak filtresi çok uzun.";
    } else {
      filters.source = source;
    }
  }

  const search = normalizeOptional(searchParams.get("search"));
  if (search) {
    if (search.length > 80) {
      fieldErrors.search = "Arama değeri çok uzun.";
    } else {
      filters.search = search;
    }
  }

  const dateFrom = normalizeOptional(searchParams.get("dateFrom"));
  if (dateFrom) {
    if (!isValidDate(dateFrom)) {
      fieldErrors.dateFrom = "Başlangıç tarihi geçerli değil.";
    } else {
      filters.dateFrom = dateFrom;
    }
  }

  const dateTo = normalizeOptional(searchParams.get("dateTo"));
  if (dateTo) {
    if (!isValidDate(dateTo)) {
      fieldErrors.dateTo = "Bitiş tarihi geçerli değil.";
    } else {
      filters.dateTo = dateTo;
    }
  }

  if (
    filters.dateFrom &&
    filters.dateTo &&
    new Date(filters.dateFrom).getTime() > new Date(filters.dateTo).getTime()
  ) {
    fieldErrors.dateTo = "Bitiş tarihi başlangıçtan önce olamaz.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { success: false, fieldErrors };
  }

  return { success: true, filters };
}

function parseIntegerParam(value: string | null): {
  value?: number;
  invalid: boolean;
} {
  const normalized = normalizeOptional(value);
  if (!normalized) return { invalid: false };
  if (!/^\d+$/.test(normalized)) return { invalid: true };

  return {
    value: Number(normalized),
    invalid: false,
  };
}

function normalizeOptional(value: string | null): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function isValidDate(value: string): boolean {
  return !Number.isNaN(new Date(value).getTime());
}
