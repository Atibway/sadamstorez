
import { db } from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
) {
  try {
  

      const categories = await db.category.findMany({
         include: {
           billboard: {
             include: {
               BillboardImages: true,
             },
           },
           subcategories: true,
         },
       });
    return NextResponse.json(categories);
  } catch (error) {
    console.log('[SIZES_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}