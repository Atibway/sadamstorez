import { currentUser } from "@/lib/auth";
import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";


export async function DELETE(
    req: Request,
    {params}: {params: {billboardId: string, billboardimagesId: string}}
) {

    try {
        const user = await currentUser()
        if(!user?.id){
    return new NextResponse("Unauthorized", {status: 401})
        } 
        

                const billboardImages = await db.billboardImages.delete({
                    where: {
                        billboardId: params.billboardId,
                        id: params.billboardimagesId
                    }
                })

                return NextResponse.json (billboardImages);
    } catch (error) {
       console.log( "billboardImages_ID", error);
        
       return new NextResponse("Internal Error", {status: 500})
    }
}