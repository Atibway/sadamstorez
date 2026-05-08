
import {db as prismadb} from "@/lib/prismadb";
import React from 'react'
import ColorForm from './_components/ColorForm'

const ColorPage = async (
    props: {
        params: Promise<{colorId:string}>
        }
) => {
    const params = await props.params;

    const color = await prismadb.color.findUnique({
        where: {
            id:params.colorId
        }
    })



    return (
      <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <ColorForm
  initialData={color}
                />
  </div>
      </div>
    )
}

export default ColorPage

