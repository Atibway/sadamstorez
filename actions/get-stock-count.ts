
import {db as prismadb} from "@/lib/prismadb";

export const getStockCount = async() => {
  const StockCount = await prismadb.product.count({
    where:{
        isArchived: false
    }
  })

  return StockCount;
}

