
import {db as prismadb} from "@/lib/prismadb";
import React from 'react'
import ProductForm from './_components/ProductForm'

const ProductPage = async({
    params
}: {
    params: {productId:string, storeId: string}
    }) => {

    const product = await prismadb.product.findUnique({
        where: {
            id:params.productId
        },
        include: {
            images: true
        }
    })

    
    
    const categoris= await prismadb.category.findMany({
        where:{
            storeId: params.storeId,
        },
        include:{
            subcategories: true
        }
    })
    const sizes = await prismadb.size.findMany({
        where:{
            storeId: params.storeId,
        }
    })
    const colors= await prismadb.color.findMany({
        where:{
            storeId: params.storeId,
        }
    })
    


  return (
    <div className='flex-col'>
          <div className='flex-1 space-y-4 p-8 pt-6'>
              <ProductForm
              categories={categoris}
              colors={colors}
              sizes={sizes}
initialData={product}
              />
</div>
    </div>
  )
}

export default ProductPage

