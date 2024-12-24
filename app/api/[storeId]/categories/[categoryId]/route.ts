import { auth } from "@/auth";
import {db as prismadb} from "@/lib/prismadb";

import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: {  categoryId: string } }
) {
  try {

    if (!params.categoryId) {
      return new NextResponse("Billboard id is required", { status: 400 });
    }


    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      },
      include: {
        billboard: true
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORIES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}


export async function PATCH(req: Request, { params }: { params: { storeId: string; categoryId: string } }) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    const body = await req.json();
    const { name, billboardId, icon } = body;

    if (!name || !billboardId || !params.storeId) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    if (session.user.role === 'USER') {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    // Update the main category details
    const updatedCategory = await prismadb.category.update({
      where: { id: params.categoryId },
      data: {
        name,
        billboardId,
        icon,
      },
    });

  

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error('[CATEGORY_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}





export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string, categoryId: string } }
) {
  try {
    const session = await auth();

    if (!session?.user) {
     
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const userId = session.user.id;

    if (session.user.role === "USER") {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.categoryId) {
     
      return new NextResponse("Category id is required", { status: 400 });
    }

  

    const category = await prismadb.category.deleteMany({
      where: {
        id: params.categoryId,
      },
    });

   
    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
   
    return new NextResponse("Internal error", { status: 500 });
  }
}

