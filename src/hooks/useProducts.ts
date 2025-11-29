import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

import type { ProductsResponse } from "../types/products";

const fetchProducts = async (page: number): Promise<ProductsResponse> => {
  const response = await axios.get<ProductsResponse>(
    `/api/products?page=${page}`
  );
  return response.data;
};

export const useProducts = () => {
  return useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam = 0 }) => fetchProducts(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000, // 5 mins
  });
};
