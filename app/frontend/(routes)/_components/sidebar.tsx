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
    <nav className="space-y-unit p-margin-desktop">
      {data.map((category) => {
        const isActive = activeCategory === category.name;

        return (
          <div key={category.id} className="relative">
            <div className="flex items-center justify-between rounded-lg px-stack-md py-stack-sm font-body-sm text-body-sm transition-colors hover:bg-surface-container-low text-on-surface">
              <Link href={`/frontend/category/${category.id}`} className="flex items-center gap-unit flex-1">
                <i className={`h-5 w-5 ${category.icon}`} />
                {category.name}
              </Link>
              {category.subcategories.length > 0 && (
                <button
                  onClick={() => setActiveCategory(isActive ? null : category.name)}
                  className="ml-2 text-on-surface-variant"
                >
                  {isActive ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </button>
              )}
            </div>

            {isActive && category.subcategories.length > 0 && (
              <div className="mt-unit space-y-unit pl-stack-lg">
                {category.subcategories.map((subcategory) => (
                  <div key={subcategory.id}>
                    <Link href={`/frontend/category/${category.id}/${subcategory.id}`}>
                      <h4 className="mb-unit font-body-sm text-body-sm text-on-surface-variant hover:text-accent hover:underline decoration-accent underline-offset-4 transition-colors">
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
