import React from 'react'
import CategoryClient from './_components/Client'
import { Prisma } from "@/generated/prisma/client";
import {db as prismadb} from "@/lib/prismadb";
import {  CategoryColumn } from './_components/columns'
import {format} from "date-fns"

type CategoryWithBillboard = Prisma.CategoryGetPayload<{
    select: {
        id: true;
        name: true;
        createdAt: true;
        billboard: {
            select: {
                label: true;
            };
        };
    };
}>;

const CategoriesPage = async () => {
    const categories = await prismadb.category.findMany({
        select: {
            id: true,
            name: true,
            createdAt: true,
            billboard: {
                select: {
                    label: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc"
        }
    }) as unknown as CategoryWithBillboard[];

    const formattedCategories: CategoryColumn[] = categories.map((item) => ({
        id: item.id,
        name: item.name,
        billboardLabel: item.billboard.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
}))
    return (
      <div className='flex-col'>
            <div className='flex-1 space-y-4 p-6 '>
                <CategoryClient
  data={formattedCategories}
                />
  </div>
      </div>
    )
}

export default CategoriesPage

