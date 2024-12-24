import { currentUser } from "@/lib/auth";
import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";


export async function POST(
    req: Request,
    {params}: {params: {billboardId: string}}
){
try {
    const user = await currentUser()
    const {url} = await req.json();

    if(!user?.id){
return new NextResponse("Unauthorized", {status: 401})
    }

  

    const billboarImages = await db.billboardImages.create({
        data: {
            url,
            name: url.split("/").pop(),
            billboardId: params.billboardId
        }
    })

    return NextResponse.json(billboarImages)
} catch (error) {
    console.log("COURSE_ID_ATTACHMENTS", error);
    return new NextResponse("Internal  Error", {status: 500})
    
}
}