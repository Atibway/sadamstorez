"use server";

import { db } from "@/lib/prismadb";

const getProduct = async (id: string) => {
  try {
    const product = await db.product.findUnique({
      where: {
        id,
      },
      include: {
        images: true,
        category: {
          include: {
            billboard: {
              include: {
                BillboardImages: true,
              },
            },
            subcategories: true,
          },
        },
        subCategory: true,
        color: true,
        size: true,
      },
    });
    return product;
  } catch (error) {
    console.error("[GET_PRODUCT]", error);
    return null;
  }
};

export default getProduct;