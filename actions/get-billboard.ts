"use server";

import { db } from "@/lib/prismadb";

const getBillboard = async (id: string) => {
  try {
    const billboard = await db.billboard.findUnique({
      where: {
        id,
      },
      include: {
        BillboardImages: true,
      },
    });
    return billboard;
  } catch (error) {
    console.error("[GET_BILLBOARD]", error);
    return null;
  }
};

export default getBillboard;
