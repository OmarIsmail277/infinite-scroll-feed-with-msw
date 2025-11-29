import { http, HttpResponse, delay } from "msw";
import { mockProducts } from "./data";
import type { ProductsResponse } from "../types/products";

const ITEMS_PER_PAGE = 20;

// every request you're gonna mock, you need a handler for it, the handler is going to intercept that request and is going to return a mock response
// that happens inside the resolver function, as a second arg which is a callback fun
export const handlers = [
  http.get("/api/products", async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "0");

    // Stimualte network delay (300~1000ms)
    await delay(300 + Math.random() * 700);

    // Simulate occasional errors (5% chance)
    if (Math.random() < 0.05) {
      return HttpResponse.json(
        { error: "Failed to fetch products" },
        { status: 500 }
      );
    }

    const start = page * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const products = mockProducts.slice(start, end);
    const hasMore = end < mockProducts.length;

    const response: ProductsResponse = {
      products,
      hasMore,
      nextPage: hasMore ? page + 1 : null,
      total: mockProducts.length,
    };

    return HttpResponse.json(response);
  }),
];
