"use server";

import { db } from "@/lib/prismadb";

const getSizes = async () => {
  try {
    const sizes = await db.size.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return sizes;
  } catch (error) {
    console.error("[GET_SIZES]", error);
    return [];
  }
};

export default getSizes;