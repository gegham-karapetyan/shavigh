import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "./auth";

export const withAuth = (
  handler: (request: NextRequest, response: NextResponse) => unknown
) => {
  return async (request: NextRequest, response: NextResponse) => {
    const user = await verifySession();
    if (!user) {
      return NextResponse.json({}, { status: 401 });
    }
    return handler(request, response);
  };
};
