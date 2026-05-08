import { currentUser } from "@/lib/auth";
import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";


export async function POST(req: Request, props: {params: Promise<{productId: string}>}) {
    const params = await props.params;
    try {
        const user = await currentUser()
        const {url} = await req.json();

        if(!user?.id){
    return new NextResponse("Unauthorized", {status: 401})
        }

      

        const productImages = await db.image.create({
            data: {
                url,
                productId: params.productId
            }
        })

        return NextResponse.json(productImages)
    } catch (error) {
        console.log("Product_ID_Images", error);
        return new NextResponse("Internal  Error", {status: 500})
        
    }
}