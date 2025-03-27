"use client";

import { FilterValues } from "@/hooks/use-filters";
import React from "react";

type Props = {
  categories: string[];
  filters: FilterValues;
  onFilterChange: (filters: FilterValues) => void;
};

const ProductFilters = ({ categories, filters, onFilterChange }: Props) => {
  return (
    <div className="flex flex-wrap gap-4 py-4">
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

      <input
        type="number"
        placeholder="Precio mínimo"
        value={filters.minPrice}
        onChange={(e) =>
          onFilterChange({ ...filters, minPrice: Number(e.target.value) })
        }
        className="p-2 border rounded"
      />

      <input
        type="number"
        placeholder="Precio máximo"
        value={filters.maxPrice}
        onChange={(e) =>
          onFilterChange({ ...filters, maxPrice: Number(e.target.value) })
        }
        className="p-2 border rounded"
      />
    </div>
  );
};

export default ProductFilters;
