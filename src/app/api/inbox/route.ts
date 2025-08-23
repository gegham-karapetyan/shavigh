import { inboxApi } from "@/http-api/admin-api/inbox-api";
import { CreateInboxMessageModel } from "@/http-api/interfaces/inbox.models";
import { publicApi } from "@/http-api/public-api";
import { validateInboxMessage } from "@/http-api/validators/validate-inbox-message";
import { withAuth } from "@/lib/withAuth";
import { NextRequest, NextResponse } from "next/server";

export const GET = withAuth(async () => {
  const data = await inboxApi.getInboxMessages();

  return NextResponse.json(data.data, {
    status: data.error?.code || 200,
  });
});

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

export const DELETE = withAuth(async (request: NextRequest) => {
  const searchParams = new URL(request.nextUrl).searchParams;
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }
  const data = await inboxApi.deleteInboxMessage(Number(id));

  return NextResponse.json(
    {},
    {
      status: data.error?.code || 200,
    }
  );
});
