import { auth } from "@/auth";

import {db as prismadb} from "@/lib/prismadb";

import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const userId = session.user.id;
    const body = await req.json();
    const { label } = body;

    if (session.user.role === "USER") {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }
  
    const billboard = await prismadb.billboard.create({
      data: {
        label,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARDS_POST]", error)
    return new NextResponse("Internal error", { status: 500 });
  }
}
export async function GET(req: Request) {
  try {
      const billboard = await prismadb.billboard.findMany();

      return NextResponse.json(billboard)

  } catch (error) {
      console.log('[BILLBOARDS_GET]', error);
      return new NextResponse("Internal error", { status: 500 });

  }
}
