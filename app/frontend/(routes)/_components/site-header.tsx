"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { MenuIcon, Search, ShoppingCart, User, HelpCircle, LogOutIcon, ChevronDown, BookmarkIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from './sidebar';
import { Billboard, BillboardImages, Category, Subcategory } from '@prisma/client';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useCart } from '@/hooks/use-cart';
import { useBookmark } from '@/hooks/use-bookmark';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui1/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { UserButton } from '@/components/frontentend/components/user-button';
import { ModeToggle } from '@/components/theme-tuggle';
import { useRouter } from 'next/navigation';

interface CategoryProps {
  data: (Category & {
    billboard: Billboard & {
      BillboardImages: BillboardImages[];
    };
    subcategories: Subcategory[];
  })[];
}

export function SiteHeader({ data }: CategoryProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const user = useCurrentUser();
  const cart = useCart();
  const bookmark = useBookmark();
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/frontend/search?query=${searchQuery}`);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <header className=" top-0 w-full border-b border-outline-variant/10 bg-surface shadow-sm">
      {/* Mobile view */}
      <div className="lg:hidden">
        <div className="flex items-center gap-unit p-stack-sm">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0">
                <MenuIcon className="h-6 w-6 text-on-surface" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <Sidebar data={data} />
            </SheetContent>
          </Sheet>
          <Link href="/" className="shrink-0 font-h4 text-h4 text-primary">
            Bam Shopping Center
          </Link>
          <div className="flex items-center gap-unit ml-auto">
            {user? (
              <UserButton />
            ):(
              <Link href={"/auth/login"}>
                <Button className="bg-accent hover:bg-accent-hover text-white font-body-sm text-body-sm">
                  Login
                </Button>
              </Link>
            )}
          
            <div
              onClick={() => router.push("/frontend/cart")}
              className="relative flex items-center justify-center cursor-pointer text-on-surface"
            >
              <ShoppingCart size={20} className="w-8 h-8 text-accent" />
              <span className="absolute top-[-1px] font-label-caps text-label-caps bg-accent text-white font-bold rounded-full w-5 h-5 text-center">
              {cart.items.length}
              </span>
            </div>
            <div
              onClick={() => router.push("/frontend/favorites")}
              className="relative flex items-center justify-center cursor-pointer text-on-surface"
            >
              <BookmarkIcon size={20} className="w-8 h-8 text-accent" />
              <span className="absolute top-[-1px] font-label-caps text-label-caps bg-accent text-white font-bold rounded-full w-5 h-5 text-center">
                {bookmark.items.length}
              </span>
            </div>
            <ModeToggle />
          </div>
        </div>
        <div className="p-stack-sm pb-stack-md">
          <div className="relative">
             <form className="flex w-full gap-unit" onSubmit={handleSearch}>
              <Input
                placeholder="Search products..."
                className="flex-1 rounded-full bg-surface-container-low border-outline-variant/30 focus:border-accent font-body-sm text-body-sm text-on-surface"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" variant="default" className="rounded-full bg-accent hover:bg-accent-hover text-white font-body-sm text-body-sm">
                <Search className="h-4 w-4" />
                <span className="ml-2">Search</span>
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden lg:block max-w-container-max mx-auto py-section-padding px-margin-desktop">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-unit">
            <span className="font-h2 text-h2 text-primary">Bam Shopping Center</span>
          </Link>
          <div className="flex flex-1 items-center gap-unit max-w-xl mx-stack-lg">
            <form className="flex w-full gap-unit" onSubmit={handleSearch}>
              <Input
                placeholder="Search products..."
                className="flex-1 rounded-full bg-surface-container-low border-outline-variant/30 focus:border-accent font-body-sm text-body-sm text-on-surface"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" variant="default" className="rounded-full bg-accent hover:bg-accent-hover text-white font-body-sm text-body-sm">
                <Search className="h-4 w-4" />
                <span className="ml-2">Search</span>
              </Button>
            </form>
          </div>
          <nav className="flex items-center gap-unit">
            {user && (
              <Link href="/frontend/settings" className="flex items-center gap-unit font-body-sm text-body-sm text-on-surface hover:text-accent transition-colors">
                <User className="h-5 w-5" />
                <span>Account</span>
              </Link>
            )}
            <Link href="/frontend/cart" className="flex items-center gap-unit font-body-sm text-body-sm text-on-surface hover:text-accent transition-colors">
              <ShoppingCart className="h-5 w-5" />
              <span className='text-accent font-medium'>Cart ({cart.items.length})</span>
            </Link>
            <div
              onClick={() => router.push("/frontend/favorites")}
              className="relative flex items-center justify-center cursor-pointer text-on-surface"
            >
              <BookmarkIcon size={20} className="w-8 h-8 text-accent" />
              <span className="absolute top-[-1px] font-label-caps text-label-caps bg-accent text-white font-bold rounded-full w-5 h-5 text-center">
                {bookmark.items.length}
              </span>
            </div>
            {user? (
              <UserButton />
            ):(
              <Link href={"/auth/login"}>
                <Button className="bg-accent hover:bg-accent-hover text-white font-body-sm text-body-sm">
                  Login
                </Button>
              </Link>
            )}
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
