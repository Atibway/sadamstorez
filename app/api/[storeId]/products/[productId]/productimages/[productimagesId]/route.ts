import { currentUser } from "@/lib/auth";
import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";


export async function DELETE(
    req: Request,
    {params}: {params: {productId: string, productimagesId: string}}
) {

    try {
        const user = await currentUser()
        if(!user?.id){
    return new NextResponse("Unauthorized", {status: 401})
        } 
        
                const productImages = await db.image.delete({
                    where: {
                        productId: params.productId,
                        id: params.productimagesId
                    }
                })

                return NextResponse.json (productImages);
    } catch (error) {
       console.log( "productImages_ID", error);
        
       return new NextResponse("Internal Error", {status: 500})
    }
}