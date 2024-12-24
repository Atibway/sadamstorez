import { auth } from "@/auth";

import {db as prismadb} from "@/lib/prismadb";
import { NextResponse } from "next/server";



export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const session = await auth();
    const body = await req.json();
    const { name, billboardId, icon } = body;

    if (!name || !billboardId || !params.storeId) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    if (session?.user.role === "USER") {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const mainCategory = await prismadb.category.create({
      data: {
        storeId: params.storeId,
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

export async function GET(
    req: Request,
{params}: {params: {storeId: string}}
) {
    try {

        if (!params.storeId) {
            return new NextResponse("Store Id is required", {status: 400})
        }

        const category = await prismadb.category.findMany({
            where: {
                storeId: params.storeId,
            },
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
