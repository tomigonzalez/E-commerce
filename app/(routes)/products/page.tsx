"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetProductAll } from "@/api/useProductAll";
import { useGetCategories } from "@/api/getCategorys";
import SkeletonScheme from "@/components/skeletonScheme";

import PaginationComponent from "./components/pagination";
import ProductFilters from "@/components/products-filters";
import { useProductFilters } from "@/hooks/use-filters";
import ProductCard from "./components/productsCard";
import { CategoryType } from "@/types/product";

const Page = () => {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const { loading, result: products } = useGetProductAll();
  const { loadingg: loadingCategories, categorys: allCategories } =
    useGetCategories();

  const { filters, setFilters, categories, filteredProducts } =
    useProductFilters(products || [], allCategories || []);

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
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="py-8 sm:py-16 sm:px-4 px-20 mx-auto max-w-screen-lg">
      <h3 className="text-2xl sm:text-3xl sm:pb-8">Productos</h3>
      <ProductFilters
        categories={categories}
        filters={filters}
        onFilterChange={(newFilters) => {
          setFilters(newFilters);
          setCurrentPage(1);
        }}
      />
      {loading && <SkeletonScheme grid={3} />}
      {filteredProducts.length === 0 && !loading && (
        <p className="text-center text-gray-500 m-10">
          No hay productos en esta categoría
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-8">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Page;
