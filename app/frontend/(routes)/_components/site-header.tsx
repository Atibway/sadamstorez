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
    <header className=" top-0 w-full border-b bg-white dark:bg-gray-900 shadow-sm">
      {/* Mobile view */}
      <div className="lg:hidden">
        <div className="flex items-center gap-3 p-2 dark:bg-gray-900">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0">
                <MenuIcon className="h-6 w-6 dark:text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <Sidebar data={data} />
            </SheetContent>
          </Sheet>
          <Link href="/" className="shrink-0 dark:text-white">
            Sadamstores
          </Link>
          <div className="flex items-center gap-1 ml-auto">
            {user? (
              <UserButton />
            ):(
              <Link href={"/auth/login"}>
                <Button>
                  Login
                </Button>
              </Link>
            )}
          
            <div
              onClick={() => router.push("/frontend/cart")}
              className="relative flex items-center justify-center  cursor-pointer dark:text-white"
            >
              <ShoppingCart size={20} className="w-8 h-8 text-green-800" />
              <span className="absolute top-[-1px] text-xs bg-orange-500 text-white font-bold rounded-full w-5 h-5 text-center">
              {cart.items.length}
              </span>
            </div>
            <div
              onClick={() => router.push("/frontend/favorites")}
              className="relative flex items-center justify-center  cursor-pointer dark:text-white"
            >
              <BookmarkIcon size={20} className="w-8 h-8 dark:text-white" />
              <span className="absolute top-[-1px] text-xs bg-red-500 dark:text-white font-bold rounded-full w-5 h-5 text-center">
                {bookmark.items.length}
              </span>
            </div>
            <ModeToggle />
          </div>
        </div>
        <div className="p-2 pb-3 dark:bg-gray-900">
          <div className="relative">
             <form className="flex w-full gap-2" onSubmit={handleSearch}>
              <Input
                placeholder="Search products..."
                className="flex-1 rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" variant="default" className="rounded-full bg-primary">
                <Search className="h-4 w-4" />
                <span className="ml-2">Search</span>
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden lg:block container py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary dark:text-white">Sadamstores</span>
          </Link>
          <div className="flex flex-1 items-center gap-2 max-w-xl mx-4">
            <form className="flex w-full gap-2" onSubmit={handleSearch}>
              <Input
                placeholder="Search products..."
                className="flex-1 rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" variant="default" className="rounded-full bg-primary">
                <Search className="h-4 w-4" />
                <span className="ml-2">Search</span>
              </Button>
            </form>
          </div>
          <nav className="flex items-center gap-4">
            {user && (
              <Link href="/frontend/settings" className="flex items-center gap-1 text-sm hover:text-primary dark:text-white dark:hover:text-primary">
                <User className="h-5 w-5" />
                <span>Account</span>
              </Link>
            )}
            <Link href="/frontend/cart" className="flex items-center gap-1 text-sm hover:text-primary dark:text-white dark:hover:text-primary">
              <ShoppingCart className="h-5 w-5" />
              <span className='text-orange-600'>Cart ({cart.items.length})</span>
            </Link>
            <div
              onClick={() => router.push("/frontend/favorites")}
              className="relative flex items-center justify-center mx-2 cursor-pointer"
            >
              <BookmarkIcon size={20} className="w-8 h-8 dark:text-white" />
              <span className="absolute top-[-1px] text-xs bg-red-500 text-white font-bold rounded-full w-5 h-5 text-center">
                {bookmark.items.length}
              </span>
            </div>
            {user? (
              <UserButton />
            ):(
              <Link href={"/auth/login"}>
                <Button>
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
