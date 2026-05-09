import { Prisma } from "@/generated/prisma/client";
import { db } from "@/lib/prismadb";
import { ProductSummary } from "@/types";

interface Query {
  categoryId?: string;
  subcategoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
  query?: string;
}

type ProductSelectPayload = Prisma.ProductGetPayload<{
  select: {
    id: true;
    name: true;
    categoryId: true;
    subcategoryId: true;
    description: true;
    countInStock: true;
    price: true;
    priceDiscount: true;
    isFeatured: true;
    isArchived: true;
    sizeId: true;
    colorId: true;
    createdAt: true;
    updatedAt: true;
    images: {
      select: {
        id: true;
        url: true;
      };
    };
  };
}>;

const getProducts = async (query: Query): Promise<ProductSummary[]> => {
  try {
    const products = (await db.product.findMany({
      where: {
        categoryId: query.categoryId,
        subcategoryId: query.subcategoryId,
        colorId: query.colorId,
        sizeId: query.sizeId,
        isFeatured: query.isFeatured,
        isArchived: false,
        name: query.query ? { contains: query.query } : undefined,
      },
      select: {
        id: true,
        name: true,
        categoryId: true,
        subcategoryId: true,
        description: true,
        countInStock: true,
        price: true,
        priceDiscount: true,
        isFeatured: true,
        isArchived: true,
        sizeId: true,
        colorId: true,
        createdAt: true,
        updatedAt: true,
        images: {
          select: {
            id: true,
            url: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })) as unknown as ProductSelectPayload[];

    // Convert Decimal to number for price fields
    const normalized: ProductSummary[] = products.map((product) => ({
      id: product.id,
      name: product.name,
      categoryId: product.categoryId,
      subcategoryId: product.subcategoryId,
      description: product.description,
      countInStock: product.countInStock,
      price: Number(product.price),
      priceDiscount: Number(product.priceDiscount),
      isFeatured: product.isFeatured,
      isArchived: product.isArchived,
      sizeId: product.sizeId,
      colorId: product.colorId,
      images: product.images,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }));

    return normalized;
  } catch (error) {
    console.error("[GET_PRODUCTS]", error);
    return [];
  }
};

export default getProducts;
