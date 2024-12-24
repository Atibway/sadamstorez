"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/prismadb";
import { ProfileUpdateSchema } from "@/schemas";
import { Product } from "@/types";
import * as z from "zod";

export const checkout = async (values: z.infer<typeof ProfileUpdateSchema>, items: Product[]) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }
  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  const store = await db.store.findFirst()

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  // Create order after updating profile
  const order = await db.order.create({
    data: {
      userId: dbUser.id,
      storeId: store?.id as string, // Assuming storeId is part of the category
      isPending: true,
      isPaid: false,
      delivered: false,
      orderItems: {
        create: items.map((item) => ({
          productId: item.id,
          name: item.name,
          description: item.description || "",
          quantity: item.countInStock || 1,
          price: item.price,
          priceDiscount: item.priceDiscount || 0,
        })),
      },
    },
  });

  return { success: "Order placed successfully", order };
};
