"use client";

import React, { useEffect, useState } from 'react';
import { CartItem } from './CartItem';
import { ProductSummary } from '@/types';
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

export const CartHome = ({
  products
}: {
  products: ProductSummary[]
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
   
    <div className="min-h-screen bg-surface">
      <div className="bg-surface shadow-sm border-b border-outline-variant/10">
        <div className="max-w-container-max mx-auto py-section-padding px-margin-mobile md:px-margin-desktop">
          <h1 className="font-h1 text-h1 text-primary">Shopping Cart</h1>
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
      <div className="max-w-container-max mx-auto py-section-padding px-margin-mobile md:px-margin-desktop">
        <CartItem products={products} />
      
      </div>
    </div>
    </>
  );
};
