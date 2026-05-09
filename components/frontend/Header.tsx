"use client";

import Link from "next/link";
import { Search, ShoppingCart, User } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-surface/95 dark:bg-surface-container-highest/95 sticky top-0 z-50 shadow-sm border-b border-outline-variant/30 backdrop-blur-md">
      <div className="flex justify-between items-center w-full px-margin-desktop py-stack-md max-w-container-max mx-auto">
        <div className="text-h3 font-h3 font-bold tracking-tight text-primary dark:text-primary-fixed">
          LUXE RETAIL
        </div>
        
        <nav className="hidden md:flex gap-stack-lg">
          <Link 
            href="/frontend" 
            className="font-body-sm text-body-sm text-on-surface-variant font-medium hover:text-primary transition-colors hover:bg-surface-container-low dark:hover:bg-surface-container-highest transition-all duration-200 px-3 py-2 rounded-lg"
          >
            Categories
          </Link>
          <Link 
            href="#" 
            className="font-body-sm text-body-sm text-on-surface-variant font-medium hover:text-primary transition-colors hover:bg-surface-container-low dark:hover:bg-surface-container-highest transition-all duration-200 px-3 py-2 rounded-lg"
          >
            New Arrivals
          </Link>
          <Link 
            href="#" 
            className="font-body-sm text-body-sm text-on-surface-variant font-medium hover:text-primary transition-colors hover:bg-surface-container-low dark:hover:bg-surface-container-highest transition-all duration-200 px-3 py-2 rounded-lg"
          >
            Deals
          </Link>
          <Link 
            href="/frontend/favorites" 
            className="font-body-sm text-body-sm text-on-surface-variant font-medium hover:text-primary transition-colors hover:bg-surface-container-low dark:hover:bg-surface-container-highest transition-all duration-200 px-3 py-2 rounded-lg"
          >
            Wishlist
          </Link>
        </nav>

        <div className="flex items-center gap-stack-md">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant h-4 w-4" />
            <input 
              className="pl-10 pr-4 py-2 bg-surface-container-low rounded-lg border-none focus:ring-2 focus:ring-accent focus:bg-surface font-body-sm text-body-sm text-on-surface placeholder-on-surface-variant outline-none transition-all w-48 lg:w-64" 
              placeholder="Search..." 
              type="text"
            />
          </div>
          
          <Link href="/frontend/cart" className="p-2 text-primary dark:text-primary-fixed-dim hover:bg-surface-container-low rounded-full transition-colors">
            <ShoppingCart className="h-5 w-5" />
          </Link>
          
          <button className="p-2 text-primary dark:text-primary-fixed-dim hover:bg-surface-container-low rounded-full transition-colors">
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
