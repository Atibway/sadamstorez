import { auth } from "@/auth";

import {db as prismadb} from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      // Changed to return NextResponse
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const userId = session.user.id;
    const body = await req.json();
    const { name, value } = body;

    if (session.user.role === "USER") {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!name) {
      // Changed to return NextResponse
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!value) {
      // Changed to return NextResponse
      return new NextResponse("Value is required", { status: 400 });
    }

    const color = await prismadb.color.create({
      data: {
        name,
        value,
      },
    });

    // Changed to return NextResponse
    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_POST]", error);
    // Changed to return NextResponse
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
      const color = await prismadb.color.findMany();

      return NextResponse.json(color)

  } catch (error) {
      console.log('[COLORS_GET]', error);
      return new NextResponse("Internal error", { status: 500 });

  }
}
