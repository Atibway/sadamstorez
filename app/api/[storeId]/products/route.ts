import { auth } from "@/auth";
import {db as prismadb} from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { handleApiError, validateRequired, ApiError } from "@/lib/api-error-handler";

export async function POST(req: Request, props: { params: Promise<{ storeId: string }> }) {
  const params = await props.params;
  try {
    const session = await auth();

    if (!session?.user) {
      throw new ApiError("Unauthenticated", 401, "UNAUTHORIZED");
    }

    const body = await req.json();
    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      isFeatured,
      isArchived,
      description,
      countInStock,
      priceDiscount,
      subcategoryId
    } = body;

    if (session.user.role === "USER") {
      throw new ApiError("Unauthorized", 401, "FORBIDDEN");
    }

    validateRequired({
      name,
      price,
      categoryId,
      colorId,
      description,
      sizeId,
      storeId: params.storeId,
    });

    if (countInStock < 0) {
      throw new ApiError("Count In Stock must be non-negative", 400, "INVALID_STOCK");
    }
    
    const product = await prismadb.product.create({
      data: {
        name,
        price,
        categoryId,
        subcategoryId,
        colorId,
        sizeId,
        description,
        countInStock,
        priceDiscount,
        isFeatured,
        isArchived,
        storeId: params.storeId,
      },
    });
    
    return NextResponse.json(product);
  } catch (error) {
    return handleApiError(error);
  }
}
  
  export async function GET(req: Request, props: { params: Promise<{ storeId: string }> }) {
    const params = await props.params;
    try {
      const { searchParams } = new URL(req.url);
      const categoryId = searchParams.get("categoryId") || undefined;
      const subcategoryId = searchParams.get("subcategoryId") || undefined;
      const colorId = searchParams.get("colorId") || undefined;
      const sizeId = searchParams.get("sizeId") || undefined;
      const isFeatured = searchParams.get("isFeatured") === "true" ? true : undefined;
      const query = searchParams.get("query") || undefined;
  
      if (!params.storeId) {
        throw new ApiError("Store Id is required", 400, "MISSING_STORE_ID");
      }
  
      const products = await prismadb.product.findMany({
        where: {
          storeId: params.storeId,
          categoryId,
          subcategoryId,
          colorId,
          sizeId,
          isFeatured: isFeatured ? true : undefined,
          isArchived: false,
          name: query ? { contains: query } : undefined,
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
          createdAt: "asc",
        },
      });
  
      // Cache for 2 minutes
      return NextResponse.json(products, {
        headers: {
          'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=300',
        },
      });
    } catch (error) {
      return handleApiError(error);
    }
  }
  
