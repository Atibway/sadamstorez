
import {db as prismadb} from "@/lib/prismadb";
import React from 'react'
import BillboardForm from './_components/BillboardForm'

const BillboardPage = async({
    params
}: {
    params: {billboardId:string}
    }) => {

    const billboard = await prismadb.billboard.findUnique({
        where: {
            id:params.billboardId
        },
        include:{
            BillboardImages: true
        }
    })
    


  return (
    <div className='flex-col'>
          <div className='flex-1 space-y-4 p-8 pt-6'>
              <BillboardForm
initialData={billboard}
              />
</div>
    </div>
  )
}

export default BillboardPage

