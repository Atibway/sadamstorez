"use client";

import * as React from 'react';
import Image from 'next/image';

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

import { Category, Billboard, BillboardImages, Subcategory } from '@prisma/client';

interface CategoryProps {
  data: (Category & {
    billboard: Billboard & {
      BillboardImages: BillboardImages[];
    };
    subcategories: Subcategory[];
  }) | null;
}

export const Categorycarausal: React.FC<CategoryProps> = ({ data }) => {
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
    <div className="w-full lg:max-w-6xl mb-3 mx-auto">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {data?.billboard.BillboardImages.map((item, index) => (
            <CarouselItem key={index}>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-[1] lg:aspect-[2/1]">
                    <Image src={item.url} alt={item.name} fill className="object-cover" />
                    <div className="absolute inset-0 flex flex-col items-start justify-end bg-gradient-to-t from-black/60 to-transparent p-6 text-white">
                      <h2 className="mb-2 text-3xl font-bold">{data.name}</h2>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
