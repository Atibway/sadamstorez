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
    <div className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Flash Sales</h2>
          <span className="text-lg">Time Left: <b>05days</b></span>
        </div>
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-red-600 p-2 rounded-full shadow-md hover:bg-gray-100 z-10"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Carousel */}
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-scroll scrollbar-hide scroll-smooth"
          >
            {items.map((item) => (
              <ProductCard key={item.id} data={item} />
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-red-600 p-2 rounded-full shadow-md hover:bg-gray-100 z-10"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="mt-6 text-right">
          <a href="#" className="text-white underline">
            See All
          </a>
        </div>
      </div>
    </div>
  );
};
