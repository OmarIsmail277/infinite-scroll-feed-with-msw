import { useEffect, useRef, useState, useMemo } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import SearchFilter from "./SearchFilter";
import { categories } from "../mocks/data";

const ProductFeed = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
    isFetching,
  } = useProducts({ search, category });

  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const allProducts = useMemo(() => {
    return data?.pages?.flatMap((page) => page?.products ?? []) ?? [];
  }, [data]);

  const totalProducts = data?.pages?.[0]?.total ?? 0;
  const isFiltering = search || category !== "all";

  // Show loading for initial fetch or when switching filters
  if (status === "pending" || (isFetching && allProducts.length === 0)) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Product Catalog
            </h1>
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <SearchFilter
            onSearchChange={setSearch}
            onCategoryChange={setCategory}
            categories={categories}
            currentCategory={category}
          />
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Product Catalog
            </h1>
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <SearchFilter
            onSearchChange={setSearch}
            onCategoryChange={setCategory}
            categories={categories}
            currentCategory={category}
          />
          <ErrorMessage
            message={error?.message || "Failed to load products"}
            onRetry={() => refetch()}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Product Catalog</h1>
          <p className="text-gray-600 mt-1">
            {isFiltering ? (
              <>
                Found {allProducts.length} of {totalProducts} products
                {search && (
                  <span className="font-medium"> matching "{search}"</span>
                )}
                {category !== "all" && (
                  <span className="font-medium"> in {category}</span>
                )}
              </>
            ) : (
              <>
                Showing {allProducts.length} of {totalProducts} products
              </>
            )}
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <SearchFilter
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          categories={categories}
          currentCategory={category}
        />

        {/* Show loading indicator when filtering */}
        {isFetching && allProducts.length === 0 && <LoadingSpinner />}

        {!isFetching && allProducts.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No products found
            </h3>
            <p className="mt-1 text-gray-500">
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
          </div>
        ) : allProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Intersection Observer Target */}
            <div ref={observerTarget} className="h-10" />

            {/* Loading More Indicator */}
            {isFetchingNextPage && <LoadingSpinner />}

            {/* End of List Message */}
            {!hasNextPage && !isFetchingNextPage && (
              <div className="text-center py-8 text-gray-600">
                <p className="text-lg font-medium">You've reached the end!</p>
                <p className="text-sm mt-1">No more products to load</p>
              </div>
            )}
          </>
        ) : null}
      </main>
    </div>
  );
};

export default ProductFeed;
