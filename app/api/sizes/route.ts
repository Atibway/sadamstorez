import { auth } from "@/auth";

import {db as prismadb} from "@/lib/prismadb";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user) return NextResponse.json(null);

    const userId = session.user.id;
    const body = await req.json();

    const { name, value } = body;

    if (session.user.role === "USER") {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }
  
    const size = await prismadb.size.create({
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZES_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const size = await prismadb.size.findMany();

    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZES_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

