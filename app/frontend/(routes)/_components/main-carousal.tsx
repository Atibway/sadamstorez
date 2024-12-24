"use client"
import * as React from 'react';
import Image from 'next/image';

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/types';

import Link from 'next/link';


interface ProductListProps {
    items: Product[]
}

export const MainCarousel: React.FC<ProductListProps> = ({
    items
}) => {
  const [api, setApi] = React.useState<any | null>(null);
  const [isForward, setIsForward] = React.useState(true);

  React.useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      if (isForward) {
        api.scrollNext();
        if (api.selectedScrollSnap() === api.scrollSnapList().length - 1) {
          setIsForward(false);
        }
      } else {
        api.scrollPrev();
        if (api.selectedScrollSnap() === 0) {
          setIsForward(true);
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [api, isForward]);

  return (
    <Carousel setApi={setApi} className="w-full ">
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index}>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-[1] lg:aspect-[2/1]">
                {item.images.map((image)=>(
                  <div key={image.id}>
                    <Image src={image.url} alt={item.name} fill className="object-cover" />
                  </div>
                ))}
                  <div className="absolute inset-0 flex flex-col items-start justify-end bg-gradient-to-t from-black/60 to-transparent p-6 text-white">
                <h2 className="mb-2 text-3xl font-bold">{item.name}</h2>
                <Link href={`/frontend/product/${item.id}`}>
                
                <button className="rounded-full bg-primary px-6 py-2 font-semibold text-white transition-colors hover:bg-primary/90">
                  Buy Now
                </button>
                </Link>
              </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
