// app/(routes)/products/ProductsContent.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo, useCallback } from "react";

import SkeletonScheme from "@/components/skeletonScheme";

import ProductFilters from "@/components/products-filters";
import { useProductFilters } from "@/hooks/use-filters";

import { CategoryType } from "@/types/product";
import { useGetCategories, useGetProductAll } from "@/api/usePeticionApi";
import ProductCard from "./productsCard";
import PaginationComponent from "./pagination";

const ProductsContent = () => {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const { loading, result: products } = useGetProductAll();
  const { loading: loadingCategories, result: allCategories } =
    useGetCategories();

  const { filters, setFilters, categories, filteredProducts } =
    useProductFilters(products || [], allCategories || []);

  const filteredProductsMemo = useMemo(
    () => filteredProducts,
    [filteredProducts]
  );
  const categoriesMemo = useMemo(() => categories, [categories]);

  const onFilterChange = useCallback(
    (newFilters: any) => {
      setFilters(newFilters);
      setCurrentPage(1);
    },
    [setFilters]
  );

  useEffect(() => {
    if (
      initialCategory &&
      (allCategories ?? []).some(
        (cat: CategoryType) => cat.categoryName === initialCategory
      )
    ) {
      setFilters((prev) => ({ ...prev, category: initialCategory }));
    }
  }, [initialCategory, allCategories, setFilters]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredProductsMemo.length / itemsPerPage);

  const paginatedProducts = useMemo(() => {
    return filteredProductsMemo.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredProductsMemo, currentPage]);

  if (loading || loadingCategories) {
    return <SkeletonScheme grid={3} />;
  }

  return (
    <div className="py-8 sm:py-16 sm:px-4 px-20 mx-auto max-w-screen-lg">
      <h3 className="text-2xl sm:text-3xl sm:pb-8">Productos</h3>

      <ProductFilters
        categories={categoriesMemo}
        filters={filters}
        onFilterChange={onFilterChange}
      />

      {filteredProductsMemo.length === 0 ? (
        <p className="text-center text-gray-500 m-10">
          No hay productos en esta categoría
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-8">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ProductsContent;
