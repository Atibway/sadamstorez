"use client"

import { CartItem, ProductSummary } from '@/types'
import Image from 'next/image';
import React, { MouseEventHandler } from 'react'
import IconButton from '@/components/frontentend/components/ui/iconButton';
import { Bookmark, Expand, ShoppingCart } from 'lucide-react';
import Currency from '@/components/frontentend/components/ui/Currency';
import { useRouter } from 'next/navigation';
import { usePreviewModal } from '@/hooks/use-preview-models';
import { useCart } from '@/hooks/use-cart';
import { FcBookmark } from 'react-icons/fc';
import { useBookmark } from '@/hooks/use-bookmark';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ShareButton } from './ShareButton';

interface ProductCardProps{
    data: CartItem;
    products: ProductSummary[]
}

const ProductCard: React.FC<ProductCardProps> = ({
    data,
    products
}) => {
    const router = useRouter()
    const previewModal = usePreviewModal()
    const cart = useCart();
    const bookmark = useBookmark()
    const handleClick = ()=> {
        router.push(`/frontend/product/${data?.id}`)
    }
    const onPreview: MouseEventHandler<HTMLButtonElement> = (event)=> {
      event.stopPropagation()  
      previewModal.onOpen(data)
    }

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event)=> {
      event.stopPropagation()  
      cart.addItem(data)
    }
    const onShare: MouseEventHandler<HTMLButtonElement> = (event)=> {
      event.stopPropagation()  
      
    }
    const onAddToBookmark: MouseEventHandler<HTMLButtonElement> = (event)=> {
      event.stopPropagation()  
      bookmark.addItem(data)
    }

    const productInBookmark = bookmark.items.find((product) => data.id === product.id);
    const productInCart = cart.items.find((product) => data.id == product.id);
    const outOfStockProduct = products.find((product)=> product.id === productInBookmark?.id)
    // Check if the product is out of stock
    const isOutOfStock = outOfStockProduct?.countInStock === 0

    
    
  return (
    <div onClick={handleClick} className='bg-surface-container-lowest group cursor-pointer rounded-xl border border-outline-variant/10 p-stack-md shadow-sm hover:shadow-md transition-shadow duration-300'>
        {/* Images and Actions */}

        <div className='aspect-square rounded-xl bg-surface-container relative overflow-hidden'>
                <Image
                    src={data?.images?.[0]?.url}
                    alt={data.name}
                    fill
                    className='aspect-square object-cover rounded-md transition-transform duration-500 group-hover:scale-105'
                />
              {isOutOfStock && (
  <div className="absolute inset-0 bg-primary/50 flex flex-col items-center justify-center text-on-primary font-h4 text-h4 rounded-lg">
    <span>Out of Stock</span>
    <IconButton
      onClick={onAddToBookmark}
      icon={
        productInBookmark ? (
          <FcBookmark className="w-6 h-6" />
        ) : (
          <Bookmark className="w-6 h-6 text-accent" />
        )
      }
    />
  </div>
)}

                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute w-full px-6 bottom-5">
                    {!isOutOfStock && (
                        <div className='flex gap-stack-md justify-center'>
                            <IconButton
                                onClick={onPreview}
                                icon={<Expand size={20} className='text-on-surface-variant' />}
                            />
                            <IconButton
                                onClick={onAddToCart}
                                icon={<ShoppingCart
                                    size={20} className={cn("",
                                        productInCart ? " text-accent" : "text-on-surface-variant"
                                    )}
                                />}
                            />
                            <IconButton
                                onClick={onAddToBookmark}
                                icon={productInBookmark ? <FcBookmark className='w-6 h-6' /> : <Bookmark className='w-6 h-6 text-accent' />}
                            />

<ShareButton
  url={`/frontend/product/${data?.id}`}
  title={data.name}
  text={"Check Our Amazing Product"}
/>

                        </div>
                    )}
                </div>
            </div>
        {/* Description */}
        <div >
            <p className='font-h4 text-h4 text-primary'>
            {data.name}
            </p>
        </div>
        {/* Price */}
        <div className='flex items-center justify-between'>
                {/* If there's a discount, show both the original and discounted price */}
                {data.priceDiscount ? (
                    <div className="flex items-center gap-unit">
                        <span className="font-body-sm text-body-sm text-on-surface-variant line-through">
                            <Currency value={data?.priceDiscount} />
                        </span>
                        <span className="font-h4 text-h4 text-primary">
                            <Currency value={data.price} />
                        </span>
                    </div>
                ) : (
                    <Currency value={data?.price} />
                )}
            </div>
        {isOutOfStock && (
                <div className="mt-stack-md">
                    <Button className="w-full bg-accent hover:bg-accent-hover text-white py-2 font-body-md text-body-md rounded-lg">
                        Notify Me When Available
                    </Button>
                </div>
            )}
        </div>
  )
}

export default ProductCard