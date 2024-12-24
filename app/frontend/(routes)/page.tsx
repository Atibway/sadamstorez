
import getProducts from "@/actions/get-products";
import ProductList from "@/components/frontentend/components/ProductList";
import { Sidebar } from "./_components/sidebar";
import { MainCarousel } from "./_components/main-carousal";
import { CategoryGrid } from "./_components/category-grid";

import { db } from "@/lib/prismadb";
import { FlashSalesSection } from "./_components/FlashSales";


export const revalidate = 0

export default async function HomePage() {
  
  const Featuredproducts = await getProducts({isFeatured: true})
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
    <>
    <div className=" bg-background">
        
            <div className="lg:mb-[9rem] flex flex-col gap-8 lg:flex-row">
              <div className="lg:w-64 hidden lg:block">
                <Sidebar data={categories}  />
              </div>
              <div className="flex-1 space-y-8">
                <div className="lg:h-[calc(100vh-200px)] m-2">
                  <MainCarousel
                  items={Featuredproducts}
                  />
                </div>
               
              </div>
              <div>
                
              </div>
            </div>
            <div className="">
            <h2 className="mb-4 text-2xl font-bold">Featured Categories</h2>
                <CategoryGrid
                data={categories}
                />
            </div>
            <section>
                  
                  <FlashSalesSection  items={Featuredproducts}/>
                </section>
                <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
      <ProductList title="Featured Products" items={Featuredproducts}/>
    </div>
          
         
        </div>
   {/* <Container >
    <div className ="space-y-10 pb-10">
<Billboard
data={billboard}
/>
    <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
      <ProductList title="Featured Products" items={products}/>
    </div>
    </div>
   </Container> */}
    </>
  );
}
