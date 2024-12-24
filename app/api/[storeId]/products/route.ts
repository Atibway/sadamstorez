import { auth } from "@/auth";
import {db as prismadb} from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
  ) {
    try {
      const session = await auth();
  
      if (!session?.user) {
        return new NextResponse("Unauthenticated", { status: 401 });
      }
  
      const userId = session.user.id;
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
  console.log(subcategoryId);
  
      if (session.user.role === "USER") {
        return new NextResponse("Unauthenticated", { status: 401 });
      }
      if (!name) {
        return new NextResponse("Name is required", { status: 400 });
      }
      if (!price) {
        return new NextResponse("Price is required", { status: 400 });
      }
      if (!categoryId) {
        return new NextResponse("Category Id is required", { status: 400 });
      }
      if (!colorId) {
        return new NextResponse("Color Id is required", { status: 400 });
      }
      if (!description) {
        return new NextResponse("Description Id is required", { status: 400 });
      }
      if (countInStock < 0) {
        return new NextResponse("Count In Stock is required", { status: 400 });
      }
      if (!sizeId) {
        return new NextResponse("Size Id is required", { status: 400 });
      }
      
      if (!params.storeId) {
        return new NextResponse("Store Id is required", { status: 400 });
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
      console.log("[PRODUCT_POST]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  }
  
  export async function GET(req: Request, { params }: { params: { storeId: string } }) {
    try {
      const { searchParams } = new URL(req.url);
      const categoryId = searchParams.get("categoryId") || undefined;
      const subcategoryId = searchParams.get("subcategoryId") || undefined;
      const colorId = searchParams.get("colorId") || undefined;
      const sizeId = searchParams.get("sizeId") || undefined;
      const isFeatured = searchParams.get("isFeatured") === "true" ? true : undefined;
      const query = searchParams.get("query") || undefined;
  
      if (!params.storeId) {
        return new NextResponse("Store Id is required", { status: 400 });
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
          images: true,
          category: true,
          subCategory: true,
          color: true,
          size: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
  
      return NextResponse.json(products);
    } catch (error) {
      console.log('[PRODUCTS_GET]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  }
  
  
  
