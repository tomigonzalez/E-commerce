"use client";

import { ProductType } from "@/types/product";
import { useMemo, useState } from "react";

export type FilterValues = {
  category: string;
  minPrice: number;
  maxPrice: number;
};

export const useProductFilters = (
  products: ProductType[],
  allCategories: { categoryName: string }[]
) => {
  const [filters, setFilters] = useState<FilterValues>({
    category: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory =
        !filters.category ||
        product.category?.categoryName === filters.category;
      const matchMinPrice = product.price >= filters.minPrice;
      const matchMaxPrice =
        !filters.maxPrice || product.price <= filters.maxPrice;
      return matchCategory && matchMinPrice && matchMaxPrice;
    });
  }, [products, filters]);

  return {
    filters,
    setFilters,
    categories: allCategories.map((cat) => cat.categoryName),
    filteredProducts,
  };
};
