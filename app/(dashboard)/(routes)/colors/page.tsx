import React from 'react'

import {db as prismadb} from "@/lib/prismadb";
import {format} from "date-fns"

import ColorClient from './_components/Client'
import { ColorColumn } from './_components/columns'
import { getDefaultStore } from "@/lib/store"

const ColorsPage = async () => {
    const storeId = await getDefaultStore();
    
    const colors = await prismadb.color.findMany({
        where: {
            storeId: storeId
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const formattedColors: ColorColumn[] = colors.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
}))

    return (
      <div className='flex-col'>
            <div className='flex-1 space-y-4 p-6 '>
                <ColorClient
  data={formattedColors}
                />
  </div>
      </div>
    )
}

export default ColorsPage

