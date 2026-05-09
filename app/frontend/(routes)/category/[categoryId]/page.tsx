import getCategory from "@/actions/get-Category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import Sidebar from "@/components/frontend/Sidebar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { db } from "@/lib/prismadb";
import Link from "next/link";

export const revalidate = 0;

interface CategoryPageProps {
    params: {
        categoryId: string;
    },
    searchParams: {
        colorId: string;
        sizeId: string;
    }
}

const CategoryPage: React.FC<CategoryPageProps> = async props => {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const products = await getProducts({
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
  })

  const sizes = await getSizes()
  const colors = await getColors();
  const category = await db.category.findUnique({
     where:{
       id: params.categoryId
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
    <div className="bg-surface min-h-screen flex flex-col">
      <main className="flex-grow flex flex-col md:flex-row w-full max-w-container-max mx-auto">
        {/* Sidebar */}
        <Sidebar categories={categories} />
        
        {/* Product Grid Area */}
        <div className="flex-grow flex flex-col">
          {/* Category Header / Banner */}
          <div className="w-full h-64 bg-surface-container-low relative flex items-center justify-center overflow-hidden">
            {category?.billboard?.BillboardImages && category.billboard.BillboardImages.length > 0 ? (
              <img 
                alt={`${category.name} Banner`} 
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply" 
                src={category.billboard.BillboardImages[0].url}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary-container to-surface opacity-80" />
            )}
            <div className="relative z-10 text-center px-margin-desktop">
              <h1 className="font-h1 text-h1 text-on-surface mb-2">{category?.name}</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant">Discover the latest in premium {category?.name?.toLowerCase()}.</p>
            </div>
          </div>

          {/* Sort and Grid Container */}
          <div className="p-margin-desktop bg-surface">
            {/* Toolbar */}
            <div className="flex justify-between items-center mb-stack-lg pb-stack-sm border-b border-outline-variant/20">
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Showing 1-{products.length} of {products.length} products
              </span>
              <div className="flex items-center gap-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant">Sort By:</label>
                <select className="bg-surface-container-low border-none rounded font-body-sm text-body-sm focus:ring-2 focus:ring-accent py-1 pl-2 pr-8">
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest Arrivals</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
              {products?.map((item) => (
                <div key={item.id} className="bg-surface rounded-xl shadow-sm overflow-hidden group hover:-translate-y-1 transition-transform duration-300 relative border border-outline-variant/10">
                  {item.isFeatured && (
                    <div className="absolute top-2 left-2 bg-primary-container text-on-primary text-[10px] font-bold uppercase px-2 py-1 rounded z-10">New</div>
                  )}
                  <div className="aspect-square bg-surface-container-low relative">
                    {item.images && item.images.length > 0 ? (
                      <img 
                        alt={item.name} 
                        className="w-full h-full object-cover" 
                        src={item.images[0].url}
                      />
                    ) : (
                      <div className="w-full h-full bg-surface-container flex items-center justify-center">
                        <span className="text-on-surface-variant">No image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button className="bg-accent text-white font-body-sm text-body-sm px-4 py-2 rounded-lg translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  <div className="p-stack-md">
                    <h4 className="font-h4 text-h4 text-on-surface mb-1 truncate">{item.name}</h4>
                    <p className="font-body-md text-body-md text-[#0f4c75] font-semibold">Shs{(item.price || 0).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-section-padding flex justify-center items-center gap-2">
              <button className="w-10 h-10 rounded border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded bg-accent text-white font-body-sm font-semibold flex items-center justify-center">1</button>
              <button className="w-10 h-10 rounded border border-outline-variant flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-colors font-body-sm">2</button>
              <button className="w-10 h-10 rounded border border-outline-variant flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-colors font-body-sm">3</button>
              <span className="text-on-surface-variant">...</span>
              <button className="w-10 h-10 rounded border border-outline-variant flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-colors font-body-sm">12</button>
              <button className="w-10 h-10 rounded border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CategoryPage