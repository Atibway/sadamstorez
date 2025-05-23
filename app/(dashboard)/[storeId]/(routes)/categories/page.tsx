import React from 'react'
import CategoryClient from './_components/Client'
import {db as prismadb} from "@/lib/prismadb";
import {  CategoryColumn } from './_components/columns'
import {format} from "date-fns"

const CategoriesPage = async({
    params
}: {params: {storeId: string}
}) => {
    
const categories = await prismadb.category.findMany({
    where: {
        storeId: params.storeId
    },
    include:{
billboard: true,
    },
    orderBy: {
        createdAt: "desc"
    }
})

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

