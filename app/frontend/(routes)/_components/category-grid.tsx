"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { Category, Billboard, Subcategory, BillboardImages } from '@prisma/client';
import Link from 'next/link';

interface CategoryProps {
  data: (Category & {
    billboard: Billboard & {
      BillboardImages: BillboardImages[];
    };
    subcategories: Subcategory[];
  })[];
}

function AutoRotatingCarousel({ images }: { images: BillboardImages[] }) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!api) return;

    const timer = setInterval(() => {
      const nextSlide = (currentSlide + 1) % images.length;
      api.scrollTo(nextSlide);
      setCurrentSlide(nextSlide);
    }, 1500);

    return () => clearInterval(timer);
  }, [api, currentSlide, images.length]);

  return (
    <Carousel className="w-full p-0 m-0" setApi={setApi}>
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image.id}>
            <div className="aspect-square">
              <img
                src={image.url}
                alt={image.name}
                className="h-full w-full object-cover rounded-t-lg"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export const CategoryGrid: React.FC<CategoryProps> = ({ data }) => {
  return (
    <div className="bg-emerald-600 p-6">
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {data.map((category) => (
          <Card key={category.id} className="overflow-hidden border-none">
            <Link href={`/frontend/category/${category.id}`}>
            <CardContent className="p-0">
              <AutoRotatingCarousel images={category.billboard.BillboardImages} />
              <div className="p-3 text-center ">
                <h3 className="text-sm font-medium">{category.name}</h3>
              </div>
            </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};
