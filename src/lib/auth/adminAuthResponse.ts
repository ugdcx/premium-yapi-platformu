import { NextResponse } from "next/server";

import { AdminAuthError } from "./requireAdminSession";

export function adminAuthErrorResponse(error: AdminAuthError) {
  if (error.code === "AUTH_REQUIRED") {
    return NextResponse.json(
      {
        success: false,
        code: "AUTH_REQUIRED",
        message: "Oturum gerekli.",
        fieldErrors: {},
      },
      { status: 401 },
    );
  }

  if (error.code === "FORBIDDEN") {
    return NextResponse.json(
      {
        success: false,
        code: "FORBIDDEN",
        message: "Bu alana erişim yetkiniz yok.",
        fieldErrors: {},
      },
      { status: 403 },
    );
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
