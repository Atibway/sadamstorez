
import {db as prismadb} from "@/lib/prismadb";
import React from 'react'
import ProductForm from './_components/ProductForm'
import { getDefaultStore } from "@/lib/store"

const ProductPage = async (
    props: {
        params: Promise<{productId:string}>
        }
) => {
    const params = await props.params;
    const storeId = await getDefaultStore();

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
            storeId: storeId,
        },
        include:{
            subcategories: true
        }
    })
    const sizes = await prismadb.size.findMany({
        where:{
            storeId: storeId,
        }
    })
    const colors= await prismadb.color.findMany({
        where:{
            storeId: storeId,
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

