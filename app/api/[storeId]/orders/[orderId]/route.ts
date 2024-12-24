import { auth } from "@/auth";
import {db as prismadb} from "@/lib/prismadb";
import {  NextResponse } from "next/server";



export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string, orderId: string } }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (session.user.role === "USER") {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    
    const order = await prismadb.order.delete({
      where: {
        id: params.orderId,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log("[order_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

