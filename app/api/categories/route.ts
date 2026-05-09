import { db } from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import { handleApiError } from '@/lib/api-error-handler';

export async function GET(req: Request) {
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

    // Cache for 5 minutes
    return NextResponse.json(categories, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}