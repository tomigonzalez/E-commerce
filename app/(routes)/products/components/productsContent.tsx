"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo, useCallback } from "react";

import SkeletonScheme from "@/components/skeletonScheme";
import ProductFilters from "@/components/products-filters";
import { useProductFilters } from "@/hooks/use-filters";
import { CategoryType } from "@/types/product";
import ProductCard from "./productsCard";
import PaginationComponent from "./pagination";
import { useCategoryStore } from "@/store/use-category";
import { useProductStore } from "@/store/use-products"; // ✅ importamos el store

const ProductsContent = () => {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  // ✅ Zustand store de productos
  const { products, loading, fetchProducts } = useProductStore();

  // ✅ Zustand store de categorías
  const {
    categories: allCategories,
    loading: loadingCategories,
    fetchCategories,
  } = useCategoryStore();

  // ✅ Hook de filtros reutilizable
  const { filters, setFilters, categories, filteredProducts } =
    useProductFilters(products ?? [], allCategories ?? []);

  const [isCategoryChanging, setIsCategoryChanging] = useState(false);

  // ✅ Ordena los productos con stock primero
  const filteredProductsMemo = useMemo(() => {
    return filteredProducts.sort((a, b) => {
      const aHasStock = a.size_stock.some((size) => size.stock > 0);
      const bHasStock = b.size_stock.some((size) => size.stock > 0);
      if (aHasStock === bHasStock) return 0;
      return aHasStock ? -1 : 1;
    });
  }, [filteredProducts]);

  const categoriesMemo = useMemo(() => categories, [categories]);

  // ✅ Trae productos si no hay
  useEffect(() => {
    if (!products) {
      fetchProducts();
    }
  }, [products, fetchProducts]);

  // ✅ Trae categorías si no hay
  useEffect(() => {
    if (!allCategories) {
      fetchCategories();
    }
  }, [allCategories, fetchCategories]);

  // ✅ Maneja cambio de categoría por URL
  useEffect(() => {
    if (
      initialCategory &&
      allCategories?.some(
        (cat: CategoryType) => cat.categoryName === initialCategory
      )
    ) {
      setIsCategoryChanging(true);

      setFilters((prev) => ({ ...prev, category: initialCategory }));

      const timeout = setTimeout(() => {
        setIsCategoryChanging(false);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [initialCategory, allCategories, setFilters]);

  // ✅ Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredProductsMemo.length / itemsPerPage);

  const paginatedProducts = useMemo(() => {
    return filteredProductsMemo.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredProductsMemo, currentPage]);

  const onFilterChange = useCallback(
    (newFilters: any) => {
      setFilters(newFilters);
      setCurrentPage(1);
    },
    [setFilters]
  );

  // ✅ Scroll al top cuando cambia de página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // ✅ Loader mientras carga algo
  if (loading || loadingCategories || isCategoryChanging) {
    return (
      <div className="py-8 sm:py-16 sm:px-4 px-40 mx-auto max-w-screen-lg">
        <SkeletonScheme grid={3} />
      </div>
    );
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
        <div className="prose dark:prose-invert mx-auto text-center mt-10">
          <p>
            No hay productos disponibles en esta categoría. Te invitamos a
            explorar otras secciones de nuestra tienda.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-8">
          {paginatedProducts.map((product, index) => (
            <div
              key={product.id}
              data-aos="fade-up"
              data-aos-delay={`${index * 100}`}
              data-aos-duration="200"
            >
              <ProductCard product={product} />
            </div>
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
