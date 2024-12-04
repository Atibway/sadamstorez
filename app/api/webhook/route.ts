import { NextResponse } from "next/server";
import Stripe from "stripe";
import stripe from "@/lib/stripe";
import { db as prismadb } from "@/lib/prismadb";

export const config = {
  api: {
    bodyParser: false, // Disable automatic body parsing for raw payload
  },
};

const rawBody = async (req: Request): Promise<string> => {
  if (!req.body) {
    throw new Error("Request body is empty");
  }

  const chunks: Uint8Array[] = [];
  const reader = req.body.getReader();

  let done = false;
  while (!done) {
    const { value, done: readerDone } = await reader.read();
    if (value) {
      chunks.push(value);
    }
    done = readerDone;
  }

  return Buffer.concat(chunks).toString("utf8");
};

export async function POST(req: Request) {
  let event: Stripe.Event;

  try {
    const body = await rawBody(req); // Get raw request body
    const signature = req.headers.get("stripe-signature"); // Get Stripe signature header

    if (!signature) {
      return new NextResponse("Missing Stripe signature header", { status: 400 });
    }

    // Verify Stripe signature
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.error("Webhook Error:", error.message);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  // Handle the Stripe event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const address = session?.customer_details?.address;
    const addressComponents = [
      address?.line1,
      address?.line2,
      address?.city,
      address?.state,
      address?.postal_code,
      address?.country,
    ];
    const addressString = addressComponents.filter((c) => c !== null).join(", ");

    try {
      const order = await prismadb.order.update({
        where: {
          id: session.metadata?.orderId,
        },
        data: {
          isPaid: true,
          address: addressString,
          phone: session?.customer_details?.phone || " ",
        },
        include: {
          orderItems: true,
        },
      });

      const productIds = order.orderItems.map((item) => item.productId);

      // Archive products
      await prismadb.product.updateMany({
        where: { id: { in: productIds } },
        data: { isArchived: true },
      });

      console.log("Order updated and products archived.");
    } catch (error: any) {
      console.error("Error updating order:", error.message);
      return new NextResponse("Failed to update order", { status: 500 });
    }
  }

  return new NextResponse(null, { status: 200 });
}
