"use client";

import { Product } from "@/common/types/product";
import { useQuery } from "@tanstack/react-query";

const useProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> => {
      const res = await fetch("https://fakestoreapi.com/products");

      if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);

      return res.json();
    },
    staleTime: 1000 * 60 * 1,
  });
};

export default useProducts;
