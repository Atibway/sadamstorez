import { auth } from "@/auth";
import { useCurrentUser } from "@/hooks/use-current-user";
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

        const { name, value } = body

        if (!userId) {
return new NextResponse("Unauthorized", {status: 400})
        }

        if (!name) {
            return new NextResponse("name is required", {status: 400})
        }
        if (!value) {
            return new NextResponse("Value is required", {status: 400})
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

        const color = await prismadb.color.create({
            data: {
                name,
                storeId: params.storeId,
                value
            }
        });

        return NextResponse.json(color)

    } catch (error) {
        console.log('[COLOR_POST]', error);
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

        const color = await prismadb.color.findMany({
            where: {
                storeId: params.storeId,
            }
        });

        return NextResponse.json(color)

    } catch (error) {
        console.log('[COLORS_GET]', error);
        return new NextResponse("Internal error", { status: 500 });

    }
}
