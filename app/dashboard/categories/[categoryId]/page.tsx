
import {db as prismadb} from "@/lib/prismadb";
import React from 'react'
import CategoryForm from './components/CategoryForm'

const CategoryPage = async (
    props: {
        params: Promise<{categoryId:string}>
        }
) => {
    const params = await props.params;

    const category = await prismadb.category.findUnique({
        where: {
            id:params.categoryId
        }, include:{
            subcategories: true
        }
    })

    const billboards = await prismadb.billboard.findMany()



    return (
      <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <CategoryForm 
  initialData={category} billboards={billboards}
                />
  </div>
      </div>
    )
}

export default CategoryPage

