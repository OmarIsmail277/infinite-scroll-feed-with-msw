import { http, HttpResponse, delay } from "msw";
import { mockProducts } from "./data";
import type { ProductsResponse } from "../types/products";

const ITEMS_PER_PAGE = 20;

// every request you're gonna mock, you need a handler for it, the handler is going to intercept that request and is going to return a mock response
export const handlers = [
  http.get("/api/products", async ({ request }) => {
    const url = new URL(request.url, window.location.origin);
    const pageParam = url.searchParams.get("page");
    const page = pageParam ? parseInt(pageParam, 10) : 0;

    const search = url.searchParams.get("search") || "";
    const category = url.searchParams.get("category") || "all";

    // Stimualte network delay (300~1000ms)
    await delay(300 + Math.random() * 700);

    // Simulate occasional errors (5% chance)
    if (Math.random() < 0.05) {
      return HttpResponse.json(
        { error: "Failed to fetch products" },
        { status: 500 }
      );
    }

    // Filter products based on search and category
    let filteredProducts = mockProducts;

    // Apply category filter
    if (category !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === category
      );
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower)
      );
    }

    // Paginate filtered results
    const start = page * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const products = filteredProducts.slice(start, end);
    const hasMore = end < filteredProducts.length;

    const response: ProductsResponse = {
      products,
      hasMore,
      nextPage: hasMore ? page + 1 : null,
      total: filteredProducts.length,
    };

    return HttpResponse.json(response);
  }),
];
