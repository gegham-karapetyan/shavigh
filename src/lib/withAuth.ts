import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "./auth";

type Handler = (
  request: NextRequest,
  context: unknown
) => Promise<NextResponse>;

export const withAuth = (handler: Handler): Handler => {
  return async (request, context) => {
    const user = await verifySession();
    if (!user) {
      return NextResponse.json({}, { status: 401 });
    }
    return handler(request, context);
  };
};
