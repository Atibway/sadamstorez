"use client"

import { Product } from '@/types'
import React from 'react'
import Image from 'next/image'
import { useCart } from '@/hooks/use-cart'
import Currency from '@/components/frontentend/components/ui/Currency'

import { useEffect, useState } from "react"

import { Trash2Icon } from "lucide-react"


import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui1/table"
import { Button } from '@/components/ui/button'
import Summary from './Summary'




interface CartItemProps {
    
    products: Product[]
}

export const CartItem: React.FC<CartItemProps> = ({
    
    products
}) => {
    const cart = useCart()
    const [qty, setQty] = useState<number|string>();
    const [isMounted, setIsMounted] = useState(false)

    useEffect(()=>{
      setIsMounted(true)
  }, []);
  

  if (!isMounted){
      return null;
  }

    const onRemove = (data: string)=> {
        cart.removeItem(data)
    }

  return (
    <>
      <Table>
      <TableHeader>
        <TableRow>
        <TableHead >
            Product
        </TableHead>
        <TableHead className="w-[10rem]" >
            Name
        </TableHead>
        <TableHead>
            Price
        </TableHead>
        <TableHead>
            Quantity
        </TableHead>
        <TableHead className="text-right">
            Total
        </TableHead>
        <TableHead>
            Action
        </TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
    {cart.items.map((data)=> {
       const productInCart = cart.items.find((product) => data.id == product.id);

       const ProductInCartFromDb = products.find((product)=> product.id === productInCart?.id)
   
       // Check if the product is out of stock
       const isOutOfStock = ProductInCartFromDb?.countInStock === 0
       return (
          <TableRow key={data.id}>
         <TableCell className="flex items-center space-x-3">
         <div className="relative h-20 w-20">
           <Image
            src={data.images[0].url}
             alt={data.name}
             height={100}
             width={100}
             className="rounded object-cover"
           />
         </div>
         </TableCell>
         <TableCell>
           {data.name}
         </TableCell>
         <TableCell>
         <Currency value={data.price}/>
         </TableCell>
         <TableCell>
             <div className="flex items-center space-x-2">
                                 <select
             value={data.countInStock}
             onClick={()=> {
               cart.updateQuantity( qty as number, data.id)
             }}
             onChange={(e) => setQty(e.target.value)}
             className="p-2 w-[4rem] border border-slate-800 rounded-lg text-black"
           >
             {!isOutOfStock ? (
               Array.from(Array(Number(ProductInCartFromDb?.countInStock)).keys()).map((x) => (
                 <option
                 key={x + 1} value={x + 1}>
                   {x + 1}
                 </option>
               ))
             ) : (
               <option value="0">Out of stock</option>
             )}
           </select>
              
         
             </div>
         </TableCell>
         
         <TableCell className="text-right">
  {productInCart?.price && productInCart?.countInStock ? 
    (Number(productInCart.price) * productInCart.countInStock).toFixed(2) 
    : "Out Of Stock"}
</TableCell>
         <TableCell>
             <Button
             className='bg-white'
         onClick={()=>onRemove(data.id)}
             >
                 <Trash2Icon className="h-4 w-4 text-red-500"/>
                 <span className="sr-only">remove Item</span>
             </Button>
         </TableCell>
                 </TableRow> 
       )
})}
    </TableBody>

      </Table>
      <Summary/>
    </>
   
    
  )
}

