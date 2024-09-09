
import prismadb from '@/lib/prismadb'
import React from 'react'

export const getStockCount = async(storeId: string) => {
  const StockCount = await prismadb.product.count({
    where:{
        storeId,
        isArchived: false
    }
  })

  return StockCount;
}

