"use server";

import { db } from "@/lib/prismadb";

const getColors = async () => {
  try {
    const colors = await db.color.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return colors;
  } catch (error) {
    console.error("[GET_COLORS]", error);
    return [];
  }
};

export default getColors;