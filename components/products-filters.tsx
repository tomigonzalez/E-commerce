"use client";

import { FilterValues } from "@/hooks/use-filters";
import React from "react";

type Props = {
  categories: string[];
  filters: FilterValues;
  onFilterChange: (filters: FilterValues) => void;
};

const ProductFilters = ({ categories, filters, onFilterChange }: Props) => {
  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "minPrice" | "maxPrice"
  ) => {
    const value = Math.max(0, Number(e.target.value)); // Asegura que el valor no sea negativo
    onFilterChange({ ...filters, [type]: value });
  };

  return (
    <div className="flex flex-wrap gap-4 py-4">
      <div className="flex flex-col justify-center">
        <p className="text-sm text-gray-600">Categoría</p>
        <select
          value={filters.category}
          onChange={(e) =>
            onFilterChange({ ...filters, category: e.target.value })
          }
          className="p-2 border rounded"
        >
          <option value="">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col justify-center">
        <p className="text-sm text-gray-600">Precio mínimo</p>
        <input
          type="number"
          placeholder="Precio mínimo"
          value={filters.minPrice}
          onChange={(e) => handlePriceChange(e, "minPrice")}
          className="p-2 border rounded"
        />
      </div>

      <div className="flex flex-col justify-center">
        <p className="text-sm text-gray-600">Precio máximo</p>
        <input
          type="number"
          placeholder="Precio máximo"
          value={filters.maxPrice}
          onChange={(e) => handlePriceChange(e, "maxPrice")}
          className="p-2 border rounded"
        />
      </div>
    </div>
  );
};

export default ProductFilters;
