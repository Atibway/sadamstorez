"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Billboard, BillboardImages, Category, Subcategory } from '@prisma/client';

interface CategoryProps {
  data: (Category & {
    billboard: Billboard & {
      BillboardImages: BillboardImages[];
    };
    subcategories: Subcategory[];
  })[];
}

export function Sidebar({ data }: CategoryProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <nav className="space-y-1 p-4">
      {data.map((category) => {
        const isActive = activeCategory === category.name;

        return (
          <div key={category.id} className="relative">
            <div className="flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted">
              <Link href={`/frontend/category/${category.id}`} className="flex items-center gap-3 flex-1">
                <i className={`h-4 w-4 ${category.icon}`} />
                {category.name}
              </Link>
              {category.subcategories.length > 0 && (
                <button
                  onClick={() => setActiveCategory(isActive ? null : category.name)}
                  className="ml-2"
                >
                  {isActive ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </button>
              )}
            </div>

            {isActive && category.subcategories.length > 0 && (
              <div className="mt-1 space-y-2 pl-6">
                {category.subcategories.map((subcategory) => (
                  <div key={subcategory.id}>
                    <Link href={`/frontend/category/${category.id}/${subcategory.id}`}>
                      <h4 className="mb-1 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors">
                        {subcategory.name}
                      </h4>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
