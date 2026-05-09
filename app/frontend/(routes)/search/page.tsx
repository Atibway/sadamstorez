import Header from "@/components/frontend/Header";
import Sidebar from "@/components/frontend/Sidebar";
import { ChevronLeft, ChevronRight, Filter, X } from "lucide-react";
import { ProductSummary } from "@/types";
import Link from "next/link";
import getProducts from "@/actions/get-products";
import getCategories from "@/actions/get-categories";

interface SearchPageProps {
  searchParams: {
    query?: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const query = searchParams.query || "";
  
  const [products, categories] = await Promise.all([
    query ? getProducts({ query }) : [],
    getCategories()
  ]);

  return (
    <div className="bg-surface min-h-screen flex flex-col">
      <Header />
      
      {/* Main Content Area */}
      <main className="flex-grow flex flex-col lg:flex-row w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg gap-gutter">
        {/* Search Header Context (Mobile only) */}
        <div className="lg:hidden w-full mb-stack-md">
          <h1 className="font-h2 text-h2 text-on-surface mb-unit">
            Search results for "{query}"
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Showing 1-{products.length} of {products.length} results
          </p>
        </div>

        {/* Filter Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0 mb-stack-lg lg:mb-0">
          {/* Mobile Filter Toggle */}
          <button className="lg:hidden w-full flex items-center justify-between p-stack-sm bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface">
            <span className="flex items-center gap-unit">
              <Filter className="w-5 h-5" /> Filters
            </span>
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Desktop Filter Sidebar Content */}
          <div className="hidden lg:block bg-surface-container-low shadow-sm h-full w-full p-stack-lg border border-outline-variant/20 rounded-lg">
            <h2 className="font-h4 text-h4 text-primary mb-stack-md">Filters</h2>
            
            {/* Category Filter */}
            <div className="mb-stack-lg">
              <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider mb-stack-sm">Category</h3>
              <ul className="space-y-unit">
                {categories.slice(0, 5).map((category) => (
                  <li key={category.id}>
                    <label className="flex items-center gap-unit cursor-pointer font-body-md text-body-md text-on-surface">
                      <input className="accent-accent border-outline rounded w-4 h-4 focus:ring-accent" type="checkbox" />
                      {category.name}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Filter */}
            <div className="mb-stack-lg">
              <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider mb-stack-sm">Price Range</h3>
              <div className="flex items-center gap-unit">
                <input className="w-full px-2 py-1 bg-surface border border-outline-variant rounded font-body-sm text-body-sm focus:outline-none focus:border-accent" placeholder="Min" type="number" />
                <span className="text-on-surface-variant">-</span>
                <input className="w-full px-2 py-1 bg-surface border border-outline-variant rounded font-body-sm text-body-sm focus:outline-none focus:border-accent" placeholder="Max" type="number" />
              </div>
            </div>

            <button className="w-full py-2 bg-[#f8f9fa] border border-outline-variant text-[#1a1a2e] rounded-lg font-body-md text-body-md hover:bg-surface-container-high transition-colors">
              Clear Filters
            </button>
          </div>
        </aside>

        {/* Product Grid Area */}
        <section className="flex-grow w-full">
          {/* Desktop Search Header & Sort */}
          <div className="hidden lg:flex justify-between items-end mb-stack-lg border-b border-outline-variant/20 pb-stack-sm">
            <div>
              <h1 className="font-h2 text-h2 text-on-surface mb-unit">
                Search results for "<span className="font-bold">{query}</span>"
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Showing 1-{products.length} of {products.length} results
              </p>
            </div>
            <div className="flex items-center gap-stack-sm">
              <label className="font-body-sm text-body-sm text-on-surface-variant" htmlFor="sort">Sort by:</label>
              <select className="bg-surface-container-low border border-outline-variant rounded-lg px-3 py-1.5 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-accent" id="sort">
                <option>Relevance</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest Arrivals</option>
              </select>
            </div>
          </div>

          {/* Mobile Sort */}
          <div className="lg:hidden flex justify-end mb-stack-md">
            <select className="bg-surface-container-low border border-outline-variant rounded-lg px-3 py-1.5 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-accent w-full max-w-[200px]">
              <option>Sort: Relevance</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          {/* Results Grid */}
          {products.length === 0 ? (
            <div className="mt-section-padding flex flex-col items-center justify-center text-center p-stack-lg bg-surface-container-low rounded-xl border border-dashed border-outline-variant">
              <X className="w-16 h-16 text-on-surface-variant mb-stack-md" />
              <h3 className="font-h3 text-h3 text-on-surface mb-2">
                No results found for "{query}"
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-stack-lg max-w-md">
                We couldn't find anything matching your search. Try adjusting your filters or browsing our categories below.
              </p>
              <div className="flex gap-stack-md">
                <button className="px-6 py-2 bg-primary-container text-white rounded-lg font-body-md text-body-md hover:bg-primary-container/90 transition-colors">
                  Clear All Filters
                </button>
                <Link href="/frontend">
                  <button className="px-6 py-2 bg-transparent border border-primary-container text-primary-container rounded-lg font-body-md text-body-md hover:bg-surface-container-high transition-colors">
                    Browse Categories
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-gutter">
                {products.map((item) => (
                  <article key={item.id} className="group relative bg-surface rounded-xl shadow-sm overflow-hidden flex flex-col h-full transition-transform hover:-translate-y-1 duration-300 border border-outline-variant/10">
                    {item.isFeatured && (
                      <div className="absolute top-2 left-2 bg-primary-container text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider z-10">
                        Bestseller
                      </div>
                    )}
                    <div className="relative aspect-[4/5] bg-surface-container-low border-b border-[#f1f1f1] overflow-hidden">
                      {item.images && item.images.length > 0 ? (
                        <img 
                          alt={item.name} 
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                          src={item.images[0].url}
                        />
                      ) : (
                        <div className="w-full h-full bg-surface-container flex items-center justify-center">
                          <span className="text-on-surface-variant">No image</span>
                        </div>
                      )}
                      <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                        <button className="w-full bg-accent text-white py-2 rounded-lg font-body-sm text-body-sm font-medium shadow-md hover:bg-accent-hover transition-colors">
                          Quick Add
                        </button>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="font-h4 text-h4 text-on-surface line-clamp-2 mb-1">{item.name}</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mb-2">Premium Quality</p>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="font-body-lg text-body-lg font-semibold text-[#0f4c75]">
                          Shs{(item.price || 0).toFixed(2)}
                        </span>
                        <button className="text-on-surface-variant hover:text-error transition-colors">
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-section-padding flex justify-center items-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors" disabled>
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent text-white font-body-md font-medium shadow-sm">
                  1
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container-low transition-colors font-body-md">
                  2
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container-low transition-colors font-body-md">
                  3
                </button>
                <span className="text-on-surface-variant px-2">...</span>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container-low transition-colors font-body-md">
                  12
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default SearchPage;
