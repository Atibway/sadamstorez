import getProduct from '@/actions/get-Product';
import getProducts from '@/actions/get-products';
import Header from '@/components/frontend/Header';
import ProductList from '@/components/frontentend/components/ProductList';
import { Star, ChevronRight, Truck, ArrowUpLeft, Heart } from 'lucide-react';
import { db } from '@/lib/prismadb';
import Link from 'next/link';

interface ProductPageProps {
    params: {
        productId: string;
    }
}

const ProductPage: React.FC<ProductPageProps> = async props => {
  const params = await props.params;
  const product = await getProduct(params.productId)
  const product1 = await db.product.findUnique({
      where:{
          id: params.productId
      }
  })
  const suggestedProducts = await getProducts({
      categoryId: product?.category?.id
  })

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

  const category = await db.category.findUnique({
    where:{
        id:product.category.id
    },
    include:{
        subcategories: true
    }
  })

  const subcategory = await db.subcategory.findUnique({
    where:{
        id: product1?.subcategoryId
    }
  })

  return (
    <div className="bg-surface min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Breadcrumbs */}
        <div className="max-w-container-max mx-auto px-margin-desktop py-stack-md">
          <nav className="flex font-label-caps text-label-caps text-on-surface-variant gap-unit items-center">
            <Link className="hover:text-primary" href="/frontend">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link className="hover:text-primary" href="/frontend">Categories</Link>
            <ChevronRight className="w-4 h-4" />
            <Link className="hover:text-primary" href={`/frontend/category/${category?.id}`}>
              {category?.name}
            </Link>
            {subcategory && (
              <>
                <ChevronRight className="w-4 h-4" />
                <Link className="hover:text-primary" href={`/frontend/category/${category?.id}/${subcategory?.id}`}>
                  {subcategory?.name}
                </Link>
              </>
            )}
            <ChevronRight className="w-4 h-4" />
            <span className="text-primary font-bold">{product.name}</span>
          </nav>
        </div>

        {/* Product Detail Main Section */}
        <section className="max-w-container-max mx-auto px-margin-desktop py-stack-lg grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Left Column: Gallery (60%) */}
          <div className="lg:col-span-7 flex flex-col gap-stack-md">
            <div className="w-full aspect-[4/5] bg-surface-container-low rounded-xl overflow-hidden relative">
              {product.images && product.images.length > 0 ? (
                <img 
                  alt={product.name} 
                  className="w-full h-full object-cover" 
                  src={product.images[0].url}
                />
              ) : (
                <div className="w-full h-full bg-surface-container flex items-center justify-center">
                  <span className="text-on-surface-variant">No image</span>
                </div>
              )}
              {product.isFeatured && (
                <div className="absolute top-stack-md left-stack-md bg-primary-container text-on-primary font-label-caps text-label-caps px-unit py-1 rounded">
                  NEW
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 gap-stack-sm">
              {product.images?.slice(0, 4).map((image, index) => (
                <div key={image.id} className={`aspect-square bg-surface-container-low rounded-lg overflow-hidden border cursor-pointer ${index === 0 ? 'border-2 border-primary' : 'border border-outline-variant/30 hover:border-primary/50'} transition-colors`}>
                  <img 
                    alt={`Thumbnail ${index + 1}`} 
                    className="w-full h-full object-cover" 
                    src={image.url}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Details (40%) */}
          <div className="lg:col-span-5 flex flex-col gap-stack-lg py-stack-md">
            {/* Title & Rating */}
            <div className="flex flex-col gap-unit">
              <h1 className="font-h1 text-h1 text-primary">{product.name}</h1>
              <div className="flex items-center gap-unit text-on-surface-variant">
                <div className="flex text-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="font-body-sm text-body-sm">4.5 (128 Reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="text-[40px] font-bold text-accent leading-tight">
              Shs{product.price.toFixed(2)}
            </div>
            
            <p className="font-body-md text-body-md text-on-surface-variant border-b border-outline-variant/20 pb-stack-lg">
              {product.description || 'Premium quality product designed for everyday use.'}
            </p>

            {/* Color Selector */}
            <div className="flex flex-col gap-stack-sm">
              <span className="font-label-caps text-label-caps text-primary">COLOR: <span className="font-normal text-on-surface-variant ml-1">Default</span></span>
              <div className="flex gap-stack-sm">
                <button className="w-10 h-10 rounded-full bg-primary ring-2 ring-offset-2 ring-primary focus:outline-none"></button>
                <button className="w-10 h-10 rounded-full bg-[#5c4033] border border-outline-variant/30 hover:border-primary focus:outline-none"></button>
              </div>
            </div>

            {/* Size Selector */}
            <div className="flex flex-col gap-stack-sm">
              <div className="flex justify-between items-center">
                <span className="font-label-caps text-label-caps text-primary">SIZE</span>
                <Link className="font-label-caps text-label-caps text-on-surface-variant underline hover:text-primary" href="#">Size Guide</Link>
              </div>
              <div className="grid grid-cols-4 gap-unit">
                <button className="py-2 border border-outline-variant/30 rounded-lg text-body-sm font-body-sm hover:border-primary hover:bg-surface-container-low transition-colors">S</button>
                <button className="py-2 border-2 border-primary rounded-lg text-body-sm font-body-sm bg-surface-container-low font-bold">M</button>
                <button className="py-2 border border-outline-variant/30 rounded-lg text-body-sm font-body-sm hover:border-primary hover:bg-surface-container-low transition-colors">L</button>
                <button className="py-2 border border-outline-variant/30 rounded-lg text-body-sm font-body-sm text-outline cursor-not-allowed bg-surface-container-low relative overflow-hidden">
                  XL
                  <div className="absolute inset-0 border-t border-outline-variant/30 rotate-45 scale-150 origin-center pointer-events-none"></div>
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-unit mt-stack-md">
              <button className="w-full bg-accent text-white font-h4 text-h4 py-4 rounded-lg hover:bg-accent-hover transition-colors shadow-sm flex justify-center items-center gap-unit">
                Add to Cart
              </button>
              <button className="w-full bg-transparent border border-primary-container text-primary-container font-h4 text-h4 py-4 rounded-lg hover:bg-surface-container-low transition-colors flex justify-center items-center gap-unit">
                <Heart className="w-5 h-5" /> Add to Wishlist
              </button>
            </div>

            {/* Shipping Info */}
            <div className="bg-surface-container-low rounded-lg p-stack-md flex flex-col gap-unit mt-stack-sm text-body-sm font-body-sm text-on-surface-variant">
              <div className="flex items-center gap-unit">
                <Truck className="w-5 h-5 text-accent" />
                <span>Free Standard Shipping on orders over Shs150</span>
              </div>
              <div className="flex items-center gap-unit">
                <ArrowUpLeft className="w-5 h-5 text-accent" />
                <span>Free 30-day returns. <Link className="underline hover:text-primary" href="#">Read Policy</Link></span>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="bg-surface-bright border-t border-outline-variant/20 mt-section-padding">
          <div className="max-w-container-max mx-auto px-margin-desktop py-stack-lg">
            <div className="flex gap-stack-lg border-b border-outline-variant/20 mb-stack-lg">
              <button className="font-h4 text-h4 text-primary border-b-2 border-accent pb-stack-sm px-unit">Description</button>
              <button className="font-h4 text-h4 text-on-surface-variant hover:text-primary pb-stack-sm px-unit transition-colors">Details & Care</button>
              <button className="font-h4 text-h4 text-on-surface-variant hover:text-primary pb-stack-sm px-unit transition-colors">Reviews (128)</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-section-padding">
              <div>
                <h3 className="font-h3 text-h3 text-primary mb-stack-md">Product Description</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md">
                  {product.description || 'Premium quality product designed for everyday use. Crafted with attention to detail and using only the finest materials.'}
                </p>
              </div>
              <div className="bg-surface-container-low p-stack-lg rounded-xl">
                <h4 className="font-h4 text-h4 text-primary mb-stack-md">Features</h4>
                <ul className="list-disc list-inside font-body-md text-body-md text-on-surface-variant space-y-unit">
                  <li>Premium quality materials</li>
                  <li>Designed for durability</li>
                  <li>Modern styling</li>
                  <li>Easy care instructions</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products Grid */}
        <section className="max-w-container-max mx-auto px-margin-desktop py-section-padding bg-background">
          <h2 className="font-h2 text-h2 text-primary mb-stack-lg text-center">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {suggestedProducts.slice(0, 4).map((suggestedProduct) => (
              <div key={suggestedProduct.id} className="group flex flex-col gap-stack-sm bg-surface rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 pb-stack-md border border-surface-container-high overflow-hidden">
                <div className="relative aspect-[3/4] bg-surface-container-low overflow-hidden border-b border-[#f1f1f1]">
                  {suggestedProduct.images && suggestedProduct.images.length > 0 ? (
                    <img 
                      alt={suggestedProduct.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      src={suggestedProduct.images[0].url}
                    />
                  ) : (
                    <div className="w-full h-full bg-surface-container flex items-center justify-center">
                      <span className="text-on-surface-variant">No image</span>
                    </div>
                  )}
                  {suggestedProduct.isFeatured && (
                    <div className="absolute top-unit left-unit bg-primary-container text-on-primary font-label-caps text-label-caps px-unit py-1 rounded">
                      NEW
                    </div>
                  )}
                </div>
                <div className="px-stack-md pt-stack-sm flex flex-col flex-grow">
                  <h4 className="font-h4 text-h4 text-primary truncate">{suggestedProduct.name}</h4>
                  <span className="font-body-md text-body-md text-[#0f4c75] font-semibold mt-1">
                    Shs{suggestedProduct.price.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default ProductPage