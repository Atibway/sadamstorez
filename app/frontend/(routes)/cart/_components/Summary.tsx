"use client"
import { Button } from '@/components/ui/button'
import Currency from '@/components/frontentend/components/ui/Currency'
import { useCart } from '@/hooks/use-cart'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useCurrentUser } from '@/hooks/use-current-user'

const Summary = () => {
  const searchParams = useSearchParams()
  const items = useCart((state)=> state.items)
  const removeAll = useCart((state)=> state.removeAll)
const user = useCurrentUser()
const router = useRouter()

  useEffect(()=>{
    if(searchParams.get("success")){
      toast.success("Payment completed");
      removeAll()
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong");
    }
  }, [searchParams, removeAll])

  const totalPrice = items.reduce((sum, item)=> {
    return sum + Number(item.price) * (item.countInStock ?? 0)
  }, 0)

  const onCheckout = async ()=> {
    if(!user){
router.push("/auth/login")

    }else{
      router.push("/frontend/cart/checkout")
    }
  }

  return (
    <div className='mt-section-padding rounded-xl bg-surface-container-low px-stack-lg sm:p-section-padding py-section-padding lg:mt-0 lg:p-section-padding border border-outline-variant/20 shadow-sm'>
      <div className='flex justify-between items-center mb-stack-lg'>
        <Button
                variant="outline"
                className="text-error border-error hover:bg-error hover:text-white"
                disabled={items.length === 0}
                onClick={()=> removeAll()}
                >
                  Clear cart
                </Button>
        <Button variant="outline" asChild className="border-outline-variant text-on-surface hover:bg-surface-container">
                  <Link href="/frontend">Continue Shopping</Link>
                </Button>
      </div>
        <div className="space-y-stack-md">
<div className="flex items-center justify-between border-t border-outline-variant/30 pt-stack-md">
<div className="font-body-md text-body-md text-on-surface">
    Order total
</div>
<Currency value={totalPrice}/>
</div>
        </div>
        <Button disabled={items.length === 0} onClick={onCheckout} className='w-full mt-stack-lg bg-accent hover:bg-accent-hover text-white'>
          Checkout
        </Button>
        </div>
  )
}

export default Summary