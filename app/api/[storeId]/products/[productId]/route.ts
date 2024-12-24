import { auth } from "@/auth";
import {db as prismadb} from "@/lib/prismadb";
import {  NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: {  productId: string } }
) {
  try {

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string, productId: string } }
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
      description,
      priceDiscount,
      countInStock,
      isFeatured,
      isArchived,
      subcategoryId
    } = body;

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
    if (!sizeId) {
      return new NextResponse("Size Id is required", { status: 400 });
    }
    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }
    if (countInStock < 0) {
      return new NextResponse("Count In Stock is required", { status: 400 });
    }
   
    if (!params.productId) {
      return new NextResponse("Product Id is required", { status: 400 });
    }

  

   const product=  await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        isFeatured,
        isArchived,
        countInStock,
        priceDiscount,
        description,
        subcategoryId
      },
    });


    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}



export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string, productId: string } }
) {
  try {
    const session = await auth();

    if (!session?.user) return NextResponse.json(null);

    const userId = session.user.id;
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }


    const product = await prismadb.product.deleteMany({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}




