
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui1/dropdown-menu";

import React from "react";
import Filter from "./_components/Filter";
import NoResults from "@/components/frontentend/components/ui/NoResults";
import ProductCard from "@/components/frontentend/components/ui/ProductCard";
import MobileFilter from "./_components/MobileFilter";
import { Container } from "@/components/frontentend/components/ui/Container";
import { db } from "@/lib/prismadb";
import { Categorycarausal } from "./_components/main-carousal";
import Link from "next/link";

export const revalidate = 0

interface SubcategoryPageProps {
  params: {
    categoryId: string;
    subcategoryId: string;
  };
  searchParams: {
    colorId: string;
    sizeId: string;
  };
}

const SubcategoryPage: React.FC<SubcategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const products = await getProducts({
    subcategoryId: params.subcategoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
  });

  const sizes = await getSizes();
  const colors = await getColors();
  const category = await db.category.findUnique({
    where: {
      id: params.categoryId,
    },
    include: {
      billboard: {
        include: {
          BillboardImages: true,
        },
      },
      subcategories: true,
    },
  });

  const subcategory = await db.subcategory.findUnique({
    where: {
      id: params.subcategoryId,
    },
    include: {
      category: true,
    },
  });

  const categories = await db.category.findMany({
    include: {
      billboard: {
        include: {
          BillboardImages: true,
        },
      },
      subcategories: true,
    },
  });

  return (
    <div className="">
      <div className="m-2">
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
                  {categories?.map((item) => (
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
            <BreadcrumbItem>
              <BreadcrumbLink href={`/frontend/category/${category?.id}`}>
                {category?.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {subcategory && (
              <>  
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              <BreadcrumbEllipsis className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {category?.subcategories?.map((item)=>(
                <div key={item.id}>
                  <Link href={`/frontend/category/${category.id}/${item.id}`}>
                  
                  <DropdownMenuItem>{item.name}</DropdownMenuItem>
                  </Link>
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{subcategory?.name}</BreadcrumbPage>
            </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Container className="dark:bg-background">
        <Categorycarausal data={category} />
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            {/* Add Mobile Filter */}
            <MobileFilter sizes={sizes} colors={colors} />

            <div className="hidden lg:block">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="colorId" name="Colors" data={colors} />
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products.length === 0 && <NoResults />}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products?.map((item) => (
                  <ProductCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SubcategoryPage;
