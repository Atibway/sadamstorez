import React from 'react'
import { Prisma } from "@/generated/prisma/client";
import {db as prismadb} from "@/lib/prismadb";
import { ProductColumn } from './_components/columns'
import {format} from "date-fns"
import ProductClient from './_components/Client'
import { formatter } from '@/lib/utils'

type ProductWithRelations = Prisma.ProductGetPayload<{
    select: {
        id: true;
        name: true;
        countInStock: true;
        isFeatured: true;
        isArchived: true;
        price: true;
        createdAt: true;
        category: {
            select: { name: true };
        };
        size: {
            select: { name: true };
        };
        color: {
            select: { value: true };
        };
    };
}>;

const ProductsPage = async () => {
    const products = await prismadb.product.findMany({
        select: {
            id: true,
            name: true,
            countInStock: true,
            isFeatured: true,
            isArchived: true,
            price: true,
            createdAt: true,
            category: {
                select: { name: true }
            },
            size: {
                select: { name: true }
            },
            color: {
                select: { value: true }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    }) as unknown as ProductWithRelations[];

    const formattedProducts: ProductColumn[] = products.map((item) => ({
        id: item.id,
        name: item.name,
        countInStock: item.countInStock,
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        price: formatter.format(item.price.toNumber()) ,
        category: item.category.name,
        size: item.size.name,
        color: item.color.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
}))
    return (
      <div className='flex-col'>
            <div className='flex-1 space-y-4 p-6 '>
                <ProductClient
  data={formattedProducts}
                />
  </div>
      </div>
    )
}

export default ProductsPage

