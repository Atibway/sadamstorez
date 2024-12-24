"use client";

import React, { useEffect, useState } from 'react';
import { CartItem } from './CartItem';
import { Image } from '@/types';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui1/dropdown-menu";
import Link from "next/link";

export type Product2 = {
  id: string;
  name: string;
  storeId: string;
  categoryId: string;
  description: string;
  countInStock: number;
  price: number;  // price is now a number instead of Decimal
  priceDiscount: number;
  isFeatured: boolean;
  isArchived: boolean;
  sizeId: string;
  colorId: string;
  images: Image[];
  createdAt: Date;
  updatedAt: Date;
};

export const CartHome = ({
  products
}: {
  products: Product2[]
}) => {
const [categories, setCategories] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  if (!isMounted) {
    return null;
  }

 
  return (
    <>
   
    <div className="min-h-screen bg-gray-100 dark:bg-background">
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
        </div>

      </div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/frontend">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <BreadcrumbEllipsis className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {categories.map((item) => (
                  <div key={item.id}>
                    <Link href={`/frontend/category/${item.id}/`}>
                      <DropdownMenuItem>{item.name}</DropdownMenuItem>
                    </Link>
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mx-auto py-6 sm:px-6 lg:px-8">
        <CartItem products={products} />
      
      </div>
    </div>
    </>
  );
};
