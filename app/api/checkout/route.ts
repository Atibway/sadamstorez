import { db as prismadb } from "@/lib/prismadb";
import { NextResponse } from "next/server";

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// Handle POST request
export async function POST(req: Request) {
  try {
    const { productIds, userId } = await req.json();

    if (!productIds || !userId || productIds.length === 0) {
      return new NextResponse("Product ids are required", {
        status: 400,
        headers: corsHeaders,
      });
    }

    const products = await prismadb.product.findMany({
      where: { id: { in: productIds } },
    });

    // Create order directly without Stripe
    const order = await prismadb.order.create({
      data: {
        isPaid: false,
        userId,
        isPending: true,
        delivered: false,
        orderItems: {
          create: productIds.map((id: string) => ({
            product: { connect: { id } },
          })),
        },
      },
    });

    return NextResponse.json({ orderId: order.id }, { headers: corsHeaders });
  } catch (error) {
    console.error("Error in Checkout:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

