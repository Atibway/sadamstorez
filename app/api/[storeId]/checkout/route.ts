import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import Stripe from "stripe";

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Change "*" to specific origin if needed for security, like "http://localhost:3001"
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// Handle POST request
export async function POST(req: Request, { params }: { params: { storeId: string } }) {
  // Parse the request body
  const { productIds } = await req.json();

  // Check for missing product IDs
  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product ids are required", {
      status: 400,
      headers: corsHeaders, // Include CORS headers
    });
  }

  // Fetch products from the database
  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  // Prepare line items for Stripe Checkout session
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  products.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: "USD",
        product_data: {
          name: product.name,
        },
        unit_amount: product.price.toNumber() * 100,
      },
    });
  });

  // Create the order in the database
  const order = await prismadb.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false,
      orderItems: {
        create: productIds.map((productId: string) => ({
          product: {
            connect: {
              id: productId,
            },
          },
        })),
      },
    },
  });

  // Create a Stripe Checkout session
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    metadata: {
      orderId: order.id,
    },
  });

  // Return the session URL, with CORS headers
  return NextResponse.json(
    { url: session.url },
    {
      headers: corsHeaders, // Include CORS headers in the response
    }
  );
}
