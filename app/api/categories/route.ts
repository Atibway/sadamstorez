import { auth } from "@/auth";

import {db as prismadb} from "@/lib/prismadb";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const session = await auth();
    const body = await req.json();
    const { name, billboardId, icon } = body;

    if (!name || !billboardId) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    if (session?.user.role === "USER") {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const mainCategory = await prismadb.category.create({
      data: {
        billboardId,
        name,
        icon,
      },
    });

  
    return NextResponse.json(mainCategory);
  } catch (error) {
    console.error("[CATEGORY_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
      const category = await prismadb.category.findMany({
          include: {
              billboard: true,
              subcategories:true
          }
      });

      return NextResponse.json(category)

  } catch (error) {
      console.log('[CATEGORY_GET]', error);
      return new NextResponse("Internal error", { status: 500 });

  }
}
