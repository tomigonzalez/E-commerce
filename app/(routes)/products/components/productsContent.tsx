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

  const [isCategoryChanging, setIsCategoryChanging] = useState(false);

  const filteredProductsMemo = useMemo(() => {
    return filteredProducts.sort((a, b) => {
      const aHasStock = a.size_stock.some((size) => size.stock > 0);
      const bHasStock = b.size_stock.some((size) => size.stock > 0);
      if (aHasStock === bHasStock) return 0;
      return aHasStock ? -1 : 1;
    });
  }, [filteredProducts]);

  const categoriesMemo = useMemo(() => categories, [categories]);

  // Actualizar filtros al cambiar de categoría en la URL
  useEffect(() => {
    if (
      initialCategory &&
      allCategories?.some(
        (cat: CategoryType) => cat.categoryName === initialCategory
      )
    ) {
      setIsCategoryChanging(true); // Activa loading temporal

      setFilters((prev) => ({ ...prev, category: initialCategory }));

      const timeout = setTimeout(() => {
        setIsCategoryChanging(false);
      }, 300); // Delay para mostrar skeleton

      return () => clearTimeout(timeout);
    }
  }, [initialCategory, allCategories, setFilters]);

  // Paginación
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
      setCurrentPage(1); // Resetear página al aplicar filtros
    },
    [setFilters]
  );

  // Desplazar la página hacia arriba cada vez que cambie el número de página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

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
              data-aos-delay={`${index * 100}`} // Añadir un retraso progresivo para crear un efecto en cascada
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
