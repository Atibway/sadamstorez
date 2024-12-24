import { auth } from "@/auth";
import {db as prismadb} from "@/lib/prismadb";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user) return NextResponse.json(null);

    const body = await req.json();
    const { name } = body;

    if (session.user.role === "USER") {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }

    const store = await prismadb.store.create({
      data: {
        name,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORES_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

