import { currentUser } from "@/lib/auth";
import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string; subcategoryId: string } }
) {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const subcategory = await db.subcategory.delete({
      where: {
        id: params.subcategoryId,
      },
    });

    return NextResponse.json(subcategory);
  } catch (error) {
    console.log("DELETE_SUBCATEGORY_ERROR", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string; subcategoryId: string } }
) {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name } = body;

    if (!name) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const updatedSubcategory = await db.subcategory.update({
      where: {
        id: params.subcategoryId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(updatedSubcategory);
  } catch (error) {
    console.log("PATCH_SUBCATEGORY_ERROR", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
