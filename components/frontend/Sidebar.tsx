"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { 
  Laptop, 
  Shirt, 
  Home as HomeIcon, 
  Scissors, 
  Dumbbell 
} from "lucide-react";
import { CategoryWithTree } from "@/types";

interface SidebarProps {
  categories: CategoryWithTree[];
}

export default function Sidebar({ categories }: SidebarProps) {
  const categoryIcons: Record<string, ReactNode> = {
    electronics: <Laptop className="h-5 w-5" />,
    fashion: <Shirt className="h-5 w-5" />,
    "home & living": <HomeIcon className="h-5 w-5" />,
    beauty: <Scissors className="h-5 w-5" />,
    sports: <Dumbbell className="h-5 w-5" />,
  };

  return (
    <aside className="bg-surface-container-low dark:bg-surface-container-high h-full w-64 hidden lg:block shadow-sm flex flex-col gap-stack-sm p-stack-lg border-r border-outline-variant/20 sticky top-[73px]" style={{ height: "calc(100vh - 73px)" }}>
      <div className="mb-stack-lg">
        <h2 className="text-h4 font-h4 text-primary dark:text-primary-fixed">Shop by Category</h2>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Explore our collections</p>
      </div>
      
      <nav className="flex flex-col gap-unit">
        {categories.map((category) => (
          <Link 
            key={category.id}
            href={`/frontend/category/${category.id}`}
            className="flex items-center gap-stack-md p-3 font-label-caps text-label-caps text-on-surface-variant hover:bg-surface-container-high rounded-lg hover:pl-4 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-secondary/20 transition-all"
          >
            {categoryIcons[category.name.toLowerCase()] || <Laptop className="h-5 w-5" />}
            {category.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
