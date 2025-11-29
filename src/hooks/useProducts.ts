import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import type { ProductsResponse } from "../types/products";

interface UseProductsParams {
  search?: string;
  category?: string;
}

const fetchProducts = async (
  page: number,
  search?: string,
  category?: string
): Promise<ProductsResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
  });

  if (search) {
    params.append("search", search);
  }

  if (category && category !== "all") {
    params.append("category", category);
  }

  const response = await axios.get<ProductsResponse>(
    `/api/products?${params.toString()}`
  );

  return response.data;
};

export const useProducts = ({
  search = "",
  category = "all",
}: UseProductsParams = {}) => {
  return useInfiniteQuery({
    queryKey: ["products", search, category],
    queryFn: ({ pageParam = 0 }) => fetchProducts(pageParam, search, category),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000, // 5 mins
  });
};
