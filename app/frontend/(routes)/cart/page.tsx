"use client"
import { useEffect, useState } from 'react';
import Header from '@/components/frontend/Header';
import { X, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Product2 } from '@/types';
import { AllProducts } from '@/actions/get-all-products';

const CartPage = () => {
  const [products, setProducts] = useState<Product2[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<any[]>([]);

  const getAllProducts = async () => {
    await AllProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-surface">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  const cartProducts = products.slice(0, 3);
  const subtotal = cartProducts.reduce((sum, product) => sum + (product.price || 0), 0);
  const freeShippingThreshold = 500;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="bg-surface min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow px-margin-mobile md:px-margin-desktop py-section-padding max-w-container-max mx-auto w-full">
        <div className="mb-stack-lg">
          <h1 className="font-h1 text-h1 text-primary">Your Cart</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-unit">{cartProducts.length} items in your cart.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-gutter">
          {/* Cart Items (Left Column) */}
          <div className="w-full lg:w-[70%] flex flex-col gap-stack-md">
            {cartProducts.map((product) => (
              <div key={product.id} className="flex items-center bg-surface-container-lowest rounded-[12px] p-stack-lg shadow-sm border border-outline-variant/20">
                {product.images && product.images.length > 0 ? (
                  <img 
                    alt={product.name} 
                    className="w-24 h-24 object-cover rounded-md border border-[#f1f1f1] mr-stack-lg" 
                    src={product.images[0].url}
                  />
                ) : (
                  <div className="w-24 h-24 bg-surface-container rounded-md border border-[#f1f1f1] mr-stack-lg flex items-center justify-center">
                    <span className="text-on-surface-variant font-body-sm text-body-sm">No image</span>
                  </div>
                )}
                
                <div className="flex-grow">
                  <h3 className="font-h4 text-h4 text-primary">{product.name}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-unit">Color: Default | Size: M</p>
                  <p className="font-h4 text-h4 text-[#0f4c75] mt-unit">Shs{(product.price || 0).toFixed(2)}</p>
                </div>

                <div className="flex flex-col items-end gap-stack-sm">
                  <button className="text-on-surface-variant hover:text-error transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                  <div className="flex items-center bg-surface-container-low rounded-lg p-1 border border-outline-variant/30">
                    <button className="p-1 hover:bg-surface-variant rounded">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-body-md text-body-md w-8 text-center">1</span>
                    <button className="p-1 hover:bg-surface-variant rounded">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary (Right Column) */}
          <div className="w-full lg:w-[30%]">
            <div className="bg-surface-container-lowest rounded-[12px] p-stack-lg shadow-sm border border-outline-variant/20 sticky top-[100px]">
              <h2 className="font-h3 text-h3 text-primary mb-stack-lg border-b border-outline-variant/20 pb-unit">Order Summary</h2>
              
              <div className="flex justify-between items-center mb-stack-md">
                <span className="font-body-md text-body-md text-on-surface-variant">Subtotal</span>
                <span className="font-h4 text-h4 text-primary">Shs{subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center mb-stack-lg">
                <span className="font-body-md text-body-md text-on-surface-variant">Shipping</span>
                <span className="font-body-md text-body-md text-primary">Calculated at checkout</span>
              </div>

              {/* Shipping Progress */}
              <div className="mb-stack-lg p-stack-md bg-[#f8f9fa] rounded-lg">
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-unit">
                  You are <strong className="text-[#0f4c75]">Shs{remainingForFreeShipping.toFixed(2)}</strong> away from free shipping!
                </p>
                <div className="w-full bg-surface-variant rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: `${freeShippingProgress}%` }}></div>
                </div>
              </div>

              <div className="flex justify-between items-center mb-stack-lg pt-stack-md border-t border-outline-variant/20">
                <span className="font-h3 text-h3 text-primary">Total</span>
                <span className="font-h2 text-h2 text-[#0f4c75]">Shs{subtotal.toFixed(2)}</span>
              </div>

              <button className="w-full bg-accent hover:bg-accent-hover text-white font-h4 text-h4 py-stack-md px-stack-lg rounded-[8px] transition-colors flex justify-center items-center gap-unit">
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Recommendations Grid */}
        <div className="mt-section-padding pt-section-padding border-t border-outline-variant/20">
          <h2 className="font-h2 text-h2 text-primary mb-stack-lg">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-gutter">
            {products.slice(4, 8).map((product) => (
              <div key={product.id} className="group bg-surface-container-lowest rounded-[12px] overflow-hidden shadow-sm hover:shadow-md transition-shadow relative border border-outline-variant/10">
                {product.isFeatured && (
                  <div className="absolute top-unit left-unit bg-primary-container text-white font-label-caps text-label-caps px-2 py-1 rounded-sm z-10">NEW</div>
                )}
                {product.images && product.images.length > 0 ? (
                  <img 
                    alt={product.name} 
                    className="w-full h-48 object-cover border-b border-[#f1f1f1]" 
                    src={product.images[0].url}
                  />
                ) : (
                  <div className="w-full h-48 bg-surface-container border-b border-[#f1f1f1] flex items-center justify-center">
                    <span className="text-on-surface-variant">No image</span>
                  </div>
                )}
                <div className="p-stack-md">
                  <h4 className="font-h4 text-h4 text-primary truncate">{product.name}</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-unit">Product</p>
                  <div className="flex justify-between items-center mt-stack-sm">
                    <span className="font-h4 text-h4 text-[#0f4c75]">Shs{(product.price || 0).toFixed(2)}</span>
                    <button className="text-accent opacity-0 group-hover:opacity-100 transition-opacity font-body-sm text-body-sm font-semibold flex items-center">
                      Add <ShoppingBag className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
