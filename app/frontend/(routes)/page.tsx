import getProducts from "@/actions/get-products";
import ProductList from "@/components/frontentend/components/ProductList";
import Header from "@/components/frontend/Header";
import Sidebar from "@/components/frontend/Sidebar";
import { db } from "@/lib/prismadb";

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
    <div className="bg-surface min-h-screen flex flex-col">
      <Header />
      
      <div className="flex flex-1 max-w-container-max mx-auto w-full">
        <Sidebar categories={categories} />
        
        <main className="flex-1 w-full min-w-0">
          {/* Hero Section */}
          <section className="relative w-full bg-surface-container-low min-h-[500px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-container to-surface opacity-80" />
            <div className="relative z-10 text-center px-gutter flex flex-col items-center">
              <h1 className="font-h1 text-h1 text-primary-container mb-stack-md">Bam Shopping Center</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-stack-lg">
                Your one-stop shop for all your needs. Discover quality products at great prices.
              </p>
              <button className="bg-accent hover:bg-accent-hover text-white font-h4 text-h4 px-8 py-4 rounded-lg transition-colors shadow-sm">
                Shop Now
              </button>
            </div>
          </section>

          {/* Featured Products */}
          <section className="py-section-padding px-gutter md:px-margin-desktop">
            <div className="flex justify-between items-end mb-stack-lg">
              <div>
                <h2 className="font-h2 text-h2 text-primary">Featured Products</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-unit">
                  Handpicked essentials for your everyday.
                </p>
              </div>
              <a className="font-label-caps text-label-caps text-secondary hover:text-primary transition-colors flex items-center gap-1" href="#">
                View All
              </a>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
              {Featuredproducts.slice(0, 4).map((product) => (
                <div key={product.id} className="group bg-surface rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-surface-container-low relative">
                  {product.isFeatured && (
                    <div className="absolute top-3 left-3 bg-primary-container text-white font-label-caps text-label-caps px-2 py-1 rounded z-10">
                      NEW
                    </div>
                  )}
                  <div className="aspect-[4/5] bg-surface-container-low relative overflow-hidden border-b border-[#f1f1f1]">
                    {product.images && product.images.length > 0 ? (
                      <img 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        src={product.images[0].url}
                      />
                    ) : (
                      <div className="w-full h-full bg-surface-container flex items-center justify-center">
                        <span className="text-on-surface-variant">No image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-stack-md flex flex-col gap-unit">
                    <h3 className="font-h4 text-h4 text-primary truncate">{product.name}</h3>
                    <div className="flex justify-between items-center mt-auto pt-unit">
                      <span className="font-body-lg text-body-lg font-semibold text-[#0f4c75]">
                        Shs{product.price.toFixed(2)}
                      </span>
                      <button className="text-accent hover:text-accent-hover opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-2xl">+</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Existing Product List */}
          <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 pb-section-padding">
            <ProductList title="All Products" items={Featuredproducts} />
          </div>
        </main>
      </div>
    </div>
  );
}
