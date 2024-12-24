import { currentUser } from "@/lib/auth";
import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";


export async function POST(
    req: Request,
    {params}: {params: {categoryId: string}}
){
try {
    const user = await currentUser()
    const {name} = await req.json();

    if(!user?.id){
return new NextResponse("Unauthorized", {status: 401})
    }

    const subcategory = await db.subcategory.create({
        data: {
            name,
            categoryId: params.categoryId
        }
    })

    return NextResponse.json(subcategory)
} catch (error) {
    console.log("subcategorieasID", error);
    return new NextResponse("Internal  Error", {status: 500})
    
}
}