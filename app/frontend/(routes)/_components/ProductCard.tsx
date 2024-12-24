'use client'

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
import { ShareButton } from '@/app/frontend/(routes)/favorites/_components/ShareButton';
import { Product } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
    data: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({
    data
}) => {
    const router = useRouter();
   
    const cart = useCart();
    const bookmark = useBookmark();

    const handleClick = () => {
        router.push(`/frontend/product/${data?.id}`);
    }

  

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        cart.addItem(data);
    }

    const onAddToBookmark: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        bookmark.addItem(data);
    }

    const productInBookmark = bookmark.items.find((product) => data.id === product.id);
    const productInCart = cart.items.find((product) => data.id == product.id);

    // Check if the product is out of stock
    const isOutOfStock = data?.countInStock === 0

   
    return (
        <Card className="overflow-hidden bg-white dark:bg-gray-800 cursor-pointer group rounded-lg border p-3 space-y-4" onClick={handleClick}>
      <CardContent className="p-0">
        <div className="relative aspect-square rounded-lg bg-gray-100">
          <Image
            src={data?.images?.[0]?.url }
            alt={data?.name }
            fill
            className="aspect-square object-cover rounded-md"
          />
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-xl font-semibold rounded-lg">
              <span>Out of Stock</span>
            </div>
          )}
         <Badge className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded"> 
            -{data.priceDiscount && data.price ? (((data.priceDiscount - data.price) / data.price) * 100).toFixed(1) : '0.00'}%

         </Badge>
          <div className="opacity-80 group-hover:opacity-90 transition absolute w-full px-6 bottom-5">
            {!isOutOfStock && (
              <div className='grid grid-cols-2 gap-2'>
                
                <IconButton
                  onClick={onAddToCart}
                  icon={<ShoppingCart
                    size={20} className={cn("",
                      productInCart ? " text-green-600" : "text-gray-600"
                    )}
                  />}
                />
                <IconButton
                  onClick={onAddToBookmark}
                  icon={productInBookmark ? <FcBookmark className='w-6 h-6' /> : <Bookmark className='w-6 h-6 text-yellow-500' />}
                />
                
              </div>
            )}
          </div>
        </div>
        <div className="p-1">
          <h3 className="mb-2 line-clamp-2 text-sm font-medium">{data?.name }</h3>
        
          <div className="flex items-center justify-between">
            {/* If there's a discount, show both the original and discounted price */}
            {data.priceDiscount ? (
              <div className="grid grid-cols-1">
                <span className="text-sm text-gray-500 line-through">
                  <Currency value={data?.price} />
                </span>
                <span className="text-lg font-bold text-gray-800">
                  <Currency value={data?.priceDiscount} />
                </span>
              </div>
            ) : (
              <Currency value={data?.price} />
            )}
          </div>
          {/* Disabled Add to Cart button */}
          
            <div className="mt-4">
              <Button className="w-full py-2 bg-green-800 font-semibold rounded-lg">
                Details...
              </Button>
            </div>
          
        </div>
      </CardContent>
    </Card>
    )
}

export default ProductCard;



