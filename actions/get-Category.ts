"use server";

import { db } from "@/lib/prismadb";

const getCategory = async (id: string) => {
  try {
    const category = await db.category.findUnique({
      where: {
        id,
      },
      include: {
        billboard: {
          include: {
            BillboardImages: true,
          },
        },
        subcategories: true,
      },
    });
    return category;
  } catch (error) {
    console.error("[GET_CATEGORY]", error);
    return null;
  }
};

export default getCategory;