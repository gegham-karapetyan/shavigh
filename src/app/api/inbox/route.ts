import { inboxApi } from "@/http-api/admin-api/inbox-api";
import { CreateInboxMessageModel } from "@/http-api/interfaces/inbox.models";
import { publicApi } from "@/http-api/public-api";
import { validateInboxMessage } from "@/http-api/validators/validate-inbox-message";
import { verifySession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const user = await verifySession();
  if (!user) {
    return NextResponse.json({}, { status: 401 });
  }
  const data = await inboxApi.getInboxMessages();

  return NextResponse.json(data.data, {
    status: data.error?.code || 200,
  });
};

export const POST = async (request: NextRequest) => {
  try {
    const body = (await request.json()) as CreateInboxMessageModel;
    const isValid = await validateInboxMessage(body);
    if (!isValid) {
      throw new Error("Invalid inbox message data");
    }
    const data = await publicApi.createInboxMessage(body);
    if (data.error) {
      throw new Error(data.error.message);
    }

    return NextResponse.json(
      { status: "success" },
      {
        status: 200,
      }
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { status: "error" },
      {
        status: 400,
      }
    );
  }
};

export const DELETE = async (request: NextRequest) => {
  const user = await verifySession();
  if (!user) {
    return NextResponse.json({}, { status: 401 });
  }
  const searchParams = new URL(request.nextUrl).searchParams;
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }
  console.log("Deleting inbox message with ID:", id);
  const data = await inboxApi.deleteInboxMessage(Number(id));

  return NextResponse.json(
    {},
    {
      status: data.error?.code || 200,
    }
  );
};
