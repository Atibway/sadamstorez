"use client"

import { Product } from '@/types'
import React from 'react'
import Currency from './ui/Currency'
import { Button } from './ui/button'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { Preview } from './preview'
import { ShareButton } from '@/app/frontend/(routes)/favorites/_components/ShareButton'
interface InfoProps{
data:  Product
}

const Info: React.FC<InfoProps> = ({
    data
}) => {
  const cart = useCart();

  const onClick =()=>{
    cart.addItem(data)
  }

  return (
    <div>
      <div className='flex justify-between'>
       <h1 className="text-3xl font-bold text-gray-900 ">{data.name}</h1> 
       <div className='flex items-end justify-between'>
<p className="text-2xl text-gray-900">
    <Currency value={data?.price}/>
</p>
       </div>
      </div>
       
       <hr className='my-4' />
       <Preview
       value={data.description as string}
       />
       <hr className='my-4' />
       <div className='flex justify-between'>
        <div className='grid gap-2 grid-cols-1 sm:grid-cols-3'>
       <div className="flex items-center gap-x-2 sm:border-r-2 border-r-lime-400">
<h3 className='font-semibold  text-black'>Size:</h3>
<p className='mr-2'>
  {data?.size?.name}
</p>
       </div>
       <div className="flex items-center sm:border-r-2 gap-x-2 border-r-lime-400">
<h3 className='font-semibold text-black'>Color:</h3>
<div className='h-6 w-6 rounded-full border border-gray-600' style={{backgroundColor: data?.color?.value}}/>
  
       </div>
       <div className="flex items-center  sm:border-r-2 gap-x-2 border-r-lime-400">
       {data.countInStock === 0?(
<p className='font-bold bg-destructive text-muted-foreground rounded-full px-[3px]'>
Out Of Stock
</p>
       ):(
        <>
        <p>
        In Stock: 
        </p>
        <p>
          {data?.countInStock}
        </p>
        </>
       )}
       </div>
        </div>
       <div className=" sm:flex sm:items-center gap-x-3 ">
        <Button 
        disabled={data.countInStock == 0}
        onClick={onClick}
        className='flex items-center gap-x-2 mb-1'>
          Add To Cart
          <ShoppingCart/>
        </Button>
        <ShareButton
  url={`/product/${data?.id}`}
  title={data.name}
  text={"Check Our Amazing Product"}
/>
       </div>
       </div>

      
    </div>
  )
}

export default Info