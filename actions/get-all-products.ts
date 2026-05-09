"use server"
import { db } from '@/lib/prismadb';
import { ProductSummary, ProductSummarySelect } from '@/types';

export async function AllProducts(): Promise<ProductSummary[]> {
 
  const products = (await db.product.findMany({
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
  })) as unknown as ProductSummarySelect[];

  const productsWithPriceAsNumber: ProductSummary[] = products.map((product) => ({
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

  return productsWithPriceAsNumber;
}
