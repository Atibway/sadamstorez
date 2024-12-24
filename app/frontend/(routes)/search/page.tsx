"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import getProducts from "@/actions/get-products";
import ProductCard from "@/components/frontentend/components/ui/ProductCard";
import NoResults from "@/components/frontentend/components/ui/NoResults";
import { Container } from "@/components/frontentend/components/ui/Container";
import { Product } from "@/types";
import { PacmanLoader } from "react-spinners";
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

const SearchPage: React.FC = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      if (query) {
        const result = await getProducts({ query });
        setProducts(result);
      }
      setIsLoading(false);
    };

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
    fetchProducts();
  }, [query]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PacmanLoader color={"orange"} loading={loading} size={25} margin={2} />
      </div>
    );
  }

  return (
    <>
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
      <Container className="dark:bg-background">
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <h1 className="text-2xl font-bold mb-6">Search Results for &quot;{query}&quot;</h1>
          {products.length === 0 ? (
            <NoResults />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} data={product} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default SearchPage;
