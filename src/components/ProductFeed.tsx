import { useEffect, useRef } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

const ProductFeed = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useProducts();

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

  if (status === "pending") {
    return <LoadingSpinner />;
  }

  if (status === "error") {
    return (
      <ErrorMessage
        message={error?.message || "Failed to load products"}
        onRetry={() => refetch()}
      />
    );
  }

  const allProducts = data?.pages.flatMap((page) => page.products) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Product Catalog</h1>
          <p className="text-gray-600 mt-1">
            Showing {allProducts.length} of {data?.pages[0]?.total || 0}{" "}
            products
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
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
        {!hasNextPage && allProducts.length > 0 && (
          <div className="text-center py-8 text-gray-600">
            <p className="text-lg font-medium">You've reached the end!</p>
            <p className="text-sm mt-1">No more products to load</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductFeed;
