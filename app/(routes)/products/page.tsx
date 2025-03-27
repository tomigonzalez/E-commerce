"use client";

import { useGetProductAll } from "@/api/useProductAll";
import SkeletonScheme from "@/components/skeletonScheme";
import { useCart } from "@/hooks/use-cart";
import { ProductType } from "@/types/product";
import { ResponseType } from "@/types/response";
import React, { useState } from "react";
import PaginationComponent from "./components/pagination";
import ProductCard from "./components/productsCard";
import ProductFilters from "./components/filtersComponent";

const Page = () => {
  const { error, loading, result }: ResponseType = useGetProductAll();
  const { addItem } = useCart();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [filters, setFilters] = useState({
    category: "",
    minPrice: 0,
    maxPrice: 0,
  });

  // Extraer categorías únicas del resultado
  const categories = Array.from(
    new Set(
      result?.map((p: ProductType) => p.category?.categoryName).filter(Boolean)
    )
  ) as string[];

  // Aplicar filtros
  const filteredProducts = result
    ? result.filter((product: ProductType) => {
        const matchCategory =
          !filters.category ||
          product.category?.categoryName === filters.category;
        const matchMinPrice = product.price >= filters.minPrice;
        const matchMaxPrice =
          !filters.maxPrice || product.price <= filters.maxPrice;
        return matchCategory && matchMinPrice && matchMaxPrice;
      })
    : [];

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="py-8 sm:py-16 sm:px-4 px-20 mx-auto max-w-screen-lg">
      <h3 className="text-2xl sm:text-3xl sm:pb-8">Productos</h3>

      {/* Filtros */}
      <ProductFilters
        categories={categories}
        onFilterChange={(newFilters) => {
          setFilters(newFilters);
          setCurrentPage(1);
        }}
      />

      {/* Loading */}
      {loading && <SkeletonScheme grid={3} />}

      {/* Productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-8">
        {paginatedProducts.map((product: ProductType) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Paginación */}
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Page;
