"use client"

import React, { useEffect, useState } from 'react'
import Header from '@/components/frontend/Header';
import { ChevronRight, ShoppingBag, Trash2, Heart, LogIn } from 'lucide-react';
import { ProductSummary } from '@/types';
import { AllProducts } from '@/actions/get-all-products';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

const FavoritePage = () => {
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await AllProducts();
      setProducts(data.slice(0, 4));
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-surface">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="bg-surface min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-padding">
        <div className="flex items-center justify-between mb-stack-lg">
          <h1 className="font-h2 text-h2 text-primary">Your Wishlist</h1>
          <span className="font-body-md text-body-md text-on-surface-variant">{products.length} items saved</span>
        </div>

        {/* Login Reminder for non-logged-in users */}
        {!session && (
          <div className="bg-surface-container-low rounded-xl border border-outline-variant/20 p-stack-md mb-stack-lg flex items-center gap-unit">
            <div className="w-12 h-12 bg-surface-container-low rounded-full flex items-center justify-center flex-shrink-0">
              <LogIn className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-grow">
              <p className="font-body-md text-body-md text-on-surface">
                <span className="font-medium text-primary">Log in</span> to sync your wishlist across devices and access it from anywhere.
              </p>
            </div>
            <Link href="/auth/login">
              <Button className="bg-accent hover:bg-accent-hover text-white font-body-sm text-body-sm px-4 py-2">
                Log In
              </Button>
            </Link>
          </div>
        )}

        {/* Breadcrumbs */}
        <nav className="flex text-on-surface-variant font-body-sm text-body-sm mb-stack-lg">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link className="inline-flex items-center hover:text-primary transition-colors" href="/frontend">Home</Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1" />
                <span className="text-primary font-medium">Wishlist</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Empty State */}
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-section-padding text-center bg-surface-container-low rounded-xl border border-outline-variant/20 mt-stack-lg">
            <div className="bg-surface rounded-full p-6 mb-stack-md shadow-sm">
              <Heart className="w-12 h-12 text-outline" />
            </div>
            <h2 className="font-h3 text-h3 text-primary mb-unit">Your wishlist is empty</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md mb-stack-lg">
              Save items you love here to keep track of them or buy them later.
            </p>
            <Link href="/frontend">
              <button className="bg-accent hover:bg-accent-hover text-white font-h4 text-h4 px-8 py-3 rounded-lg transition-colors inline-flex items-center gap-2">
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {products.map((item) => (
              <div key={item.id} className="group relative bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-300 border border-outline-variant/10">
                <div className="relative aspect-[3/4] overflow-hidden bg-surface-container-low border-b border-outline-variant/10">
                  {item.images && item.images.length > 0 ? (
                    <img 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      src={item.images[0].url}
                    />
                  ) : (
                    <div className="w-full h-full bg-surface-container flex items-center justify-center">
                      <span className="text-on-surface-variant">No image</span>
                    </div>
                  )}
                  <button className="absolute top-unit right-unit p-unit bg-surface/80 backdrop-blur-sm rounded-full text-on-surface-variant hover:text-error hover:bg-surface transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                  {item.isFeatured && (
                    <div className="absolute top-unit left-unit bg-primary-container text-on-primary px-2 py-1 rounded font-label-caps text-label-caps shadow-sm">
                      LOW STOCK
                    </div>
                  )}
                </div>
                <div className="p-stack-md flex flex-col flex-grow">
                  <h3 className="font-h4 text-h4 text-primary mb-unit line-clamp-1">{item.name}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-stack-md flex-grow">Default / One Size</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-h4 text-h4 text-[#1a1a2e]">Shs{(item.price || 0).toFixed(2)}</span>
                    <button className="bg-accent hover:bg-accent-hover text-white font-body-sm text-body-sm px-4 py-2 rounded-lg transition-colors flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-200">
                      <ShoppingBag className="w-4 h-4" />
                      Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default FavoritePage