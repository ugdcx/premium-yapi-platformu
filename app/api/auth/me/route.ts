import { NextResponse } from "next/server";

import { adminAuthErrorResponse } from "@/src/lib/auth/adminAuthResponse";
import {
  AdminAuthError,
  requireAdminSession,
} from "@/src/lib/auth/requireAdminSession";

export async function GET() {
  try {
    const session = await requireAdminSession();

    return NextResponse.json({
      success: true,
      data: {
        userId: session.userId,
        role: session.role,
      },
    });
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
