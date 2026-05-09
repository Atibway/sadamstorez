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

    const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        const previewModal = usePreviewModal();
        previewModal.onOpen(data);
    }

    const productInBookmark = bookmark.items.find((product) => data.id === product.id);
    const productInCart = cart.items.find((product) => data.id == product.id);

    // Check if the product is out of stock
    const isOutOfStock = data?.countInStock === 0

   
    return (
        <Card className="overflow-hidden bg-surface-container-lowest cursor-pointer group rounded-xl border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow duration-300 p-stack-md space-y-stack-md" onClick={handleClick}>
      <CardContent className="p-0">
        <div className="relative aspect-square rounded-xl bg-surface-container overflow-hidden">
          <Image
            src={data?.images?.[0]?.url }
            alt={data?.name }
            fill
            className="aspect-square object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
          />
          {isOutOfStock && (
            <div className="absolute inset-0 bg-primary/50 flex items-center justify-center text-on-primary font-h4 text-h4 rounded-lg">
              <span>Out of Stock</span>
            </div>
          )}
         {data.priceDiscount && data.price && (
            <Badge className="absolute top-2 left-2 bg-accent text-white font-label-caps text-label-caps px-2 py-1 rounded"> 
            -{(((data.priceDiscount - data.price) / data.price) * 100).toFixed(1)}%

         </Badge>
         )}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute w-full px-6 bottom-5">
            {!isOutOfStock && (
              <div className='grid grid-cols-3 gap-unit'>
                
                <IconButton
                  onClick={onPreview}
                  icon={<Expand size={20} className="text-on-surface-variant" />}
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
                
              </div>
            )}
          </div>
        </div>
        <div className="p-unit">
          <h3 className="mb-unit line-clamp-2 font-h4 text-h4 text-primary">{data?.name }</h3>
        
          <div className="flex items-center justify-between">
            {/* If there's a discount, show both the original and discounted price */}
            {data.priceDiscount ? (
              <div className="grid grid-cols-1">
                <span className="font-body-sm text-body-sm text-on-surface-variant line-through">
                  <Currency value={data?.price} />
                </span>
                <span className="font-h4 text-h4 text-primary">
                  <Currency value={data?.priceDiscount} />
                </span>
              </div>
            ) : (
              <Currency value={data?.price} />
            )}
          </div>
          {/* Disabled Add to Cart button */}
          
            <div className="mt-stack-md">
              <Button className="w-full py-2 bg-accent hover:bg-accent-hover text-white font-body-md text-body-md rounded-lg">
                Details...
              </Button>
            </div>
          
        </div>
      </CardContent>
    </Card>
    )
}

export default ProductCard;



