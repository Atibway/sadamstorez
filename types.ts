import { Prisma } from "@/generated/prisma/client";

export type Billboard = Prisma.BillboardGetPayload<{}>;

export type BillboardWithImages = Prisma.BillboardGetPayload<{
  include: {
    BillboardImages: true;
  };
}>;

export type Category = Prisma.CategoryGetPayload<{}>;

export type CategoryWithBillboard = Prisma.CategoryGetPayload<{
  include: {
    billboard: true;
  };
}>;

export type CategoryWithTree = Prisma.CategoryGetPayload<{
  include: {
    subcategories: true;
    billboard: {
      include: {
        BillboardImages: true;
      };
    };
  };
}>;

export type ProductSummarySelect = Prisma.ProductGetPayload<{
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

export type ProductSummary = Omit<ProductSummarySelect, "price" | "priceDiscount"> & {
  price: number;
  priceDiscount: number;
};

export type ProductWithRelationsSelect = Prisma.ProductGetPayload<{
  include: {
    category: true;
    subCategory: true;
    size: true;
    color: true;
    images: true;
  };
}>;

export type ProductWithRelations = Omit<ProductWithRelationsSelect, "price" | "priceDiscount"> & {
  price: number;
  priceDiscount: number;
};

export type Image = Prisma.ImageGetPayload<{}>;

export type Size = Prisma.SizeGetPayload<{}>;

export type Color = Prisma.ColorGetPayload<{}>;

export type CartItem = ProductSummary;