import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
{params}: {params: {storeId: string}}
) {
    try {
        const { userId } = auth()
        const body = await req.json()

        const { name, billboardId } = body

        if (!userId) {
return new NextResponse("Unauthorized", {status: 400})
        }

        if (!name) {
            return new NextResponse("Name is required", {status: 400})
        }
        if (!billboardId) {
            return new NextResponse("Billboard Id is required", {status: 400})
        }
        if (!params.storeId) {
            return new NextResponse("Store Id is required", {status: 400})
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) {
return new NextResponse("Unauthorized", { status: 400 });
        }

        const category = await prismadb.category.create({
            data: {
                name,
                storeId: params.storeId,
                billboardId
            }
        });

        return NextResponse.json(category)

    } catch (error) {
        console.log('[CATEGORY_POST]', error);
        return new NextResponse("Internal error", { status: 500 });

    }
}
export async function GET(
    req: Request,
{params}: {params: {storeId: string}}
) {
    try {

        if (!params.storeId) {
            return new NextResponse("Store Id is required", {status: 400})
        }

        const category = await prismadb.category.findMany({
            where: {
                storeId: params.storeId,
            }
        });

        return NextResponse.json(category)

    } catch (error) {
        console.log('[CATEGORY_GET]', error);
        return new NextResponse("Internal error", { status: 500 });

    }
}
