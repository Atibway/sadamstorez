import { auth } from "@/auth";
import {db as prismadb} from "@/lib/prismadb";
import {  NextResponse } from "next/server";

export async function GET(req: Request, props: { params: Promise<{  colorId: string }> }) {
  const params = await props.params;
  try {

    if (!params.colorId) {
      return new NextResponse("color id is required", { status: 400 });
    }


    const color = await prismadb.color.findUnique({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLORS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}



export async function PATCH(
  req: Request,
  props: { params: Promise<{ storeId: string, colorId: string }> }
) {
  const params = await props.params;
  try {
    const session = await auth();

    if (!session?.user) {
     
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const userId = session.user.id;
    const body = await req.json();
    const { name, value } = body;

    if (!userId) {
     
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!name) {
     
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!value) {
     
      return new NextResponse("Value is required", { status: 400 });
    }
    if (!params.colorId) {
     
      return new NextResponse("Color Id is required", { status: 400 });
    }

  

    const color = await prismadb.color.updateMany({
      where: {
        id: params.colorId,
      },
      data: {
        name,
        value,
      },
    });

    if (color.count === 0) {
     
      return new NextResponse("No store found or updated", { status: 404 });
    }

   
    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLORS_PATCH]", error);
   
    return new NextResponse("Internal error", { status: 500 });
  }
}


export async function DELETE(
  req: Request,
  props: { params: Promise<{ storeId: string, colorId: string }> }
) {
  const params = await props.params;
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const userId = session.user.id;
    
    if (session.user.role === "USER") {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    
    const color = await prismadb.color.deleteMany({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

