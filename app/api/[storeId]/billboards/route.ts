import { auth } from "@/auth";

import prismadb from "@/lib/prismadb";

import { NextResponse } from "next/server";

export async function POST(
    req: Request,
{params}: {params: {storeId: string}}
) {
    try {
        const session = await auth()
 
    if (!session?.user) return null

    const userId = session.user.id
        const body = await req.json()

        const { label, imageUrl } = body

        if (!userId) {
return new NextResponse("Unauthorized", {status: 400})
        }

        if (!label) {
            return new NextResponse("Label is required", {status: 400})
        }
        if (!imageUrl) {
            return new NextResponse("Image URL is required", {status: 400})
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

        const billboard = await prismadb.billboard.create({
            data: {
                label,
                storeId: params.storeId,
                imageUrl
            }
        });

        return NextResponse.json(billboard)

    } catch (error) {
        console.log('[BILLBOARDS_POST]', error);
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

        const billboard = await prismadb.billboard.findMany({
            where: {
                storeId: params.storeId,
            }
        });

        return NextResponse.json(billboard)

    } catch (error) {
        console.log('[BILLBOARDS_GET]', error);
        return new NextResponse("Internal error", { status: 500 });

    }
}
