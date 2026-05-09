import { db } from "@/lib/prismadb";
import { Product2 } from "@/types";

interface Query {
  categoryId?: string;
  subcategoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
  query?: string;
}

const getProducts = async (query: Query): Promise<Product2[]> => {
  try {
    const products = await db.product.findMany({
      where: {
        categoryId: query.categoryId,
        subcategoryId: query.subcategoryId,
        colorId: query.colorId,
        sizeId: query.sizeId,
        isFeatured: query.isFeatured,
        isArchived: false,
        name: query.query ? { contains: query.query } : undefined,
      },
      include: {
        images: {
          select: {
            id: true,
            url: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        subCategory: {
          select: {
            id: true,
            name: true,
          },
        },
        color: {
          select: {
            id: true,
            name: true,
            value: true,
          },
        },
        size: {
          select: {
            id: true,
            name: true,
            value: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Convert Decimal to number for price fields
    return products.map(product => ({
      ...product,
      price: Number(product.price),
      priceDiscount: Number(product.priceDiscount),
    })) as Product2[];
  } catch (error) {
    console.error("[GET_PRODUCTS]", error);
    return [];
  }
};

export default getProducts;
