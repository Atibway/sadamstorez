"use client";

import ProductCard from "@/components/frontentend/components/ui/ProductCard";
import { Product } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

interface ProductListProps {
  items: Product[];
}

export const FlashSalesSection: React.FC<ProductListProps> = ({ items }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-surface-container text-on-surface py-section-padding">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex items-center justify-between mb-stack-lg">
          <h2 className="font-h2 text-h2 text-primary">Flash Sales</h2>
          <span className="font-body-md text-body-md text-on-surface-variant">Time Left: <b className="text-accent">05days</b></span>
        </div>
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-surface text-on-surface p-2 rounded-full shadow-md hover:bg-surface-container-low z-10 border border-outline-variant/30"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Carousel */}
          <div
            ref={carouselRef}
            className="flex gap-gutter overflow-x-scroll scrollbar-hide scroll-smooth"
          >
            {items.map((item) => (
              <ProductCard key={item.id} data={item} />
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-surface text-on-surface p-2 rounded-full shadow-md hover:bg-surface-container-low z-10 border border-outline-variant/30"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="mt-stack-lg text-right">
          <a href="#" className="font-body-sm text-body-sm text-accent hover:text-accent-hover font-medium">
            See All
          </a>
        </div>
      </div>
    </div>
  );
};
