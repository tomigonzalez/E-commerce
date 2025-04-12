"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

interface Props {
  categories: string[];
  onFilterChange: (filters: {
    category: string;
    minPrice: number;
    maxPrice: number;
  }) => void;
}

const ProductFilters: React.FC<Props> = ({ categories, onFilterChange }) => {
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const handleApplyFilters = () => {
    onFilterChange({
      category,
      minPrice,
      maxPrice,
    });
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end justify-between">
      <div className="flex flex-col gap-2">
        <label className="text-sm">Categoría</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 p-2 rounded-md"
        >
          <option value="">Todas</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-2">
        <div className="flex flex-col">
          <label className="text-sm">Precio mínimo</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="border border-gray-300 p-2 rounded-md w-24"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Precio máximo</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="border border-gray-300 p-2 rounded-md w-24"
          />
        </div>
      </div>
      <Button
        onClick={handleApplyFilters}
        className="bg-black text-white px-4 py-2 rounded-md"
      >
        Aplicar filtros
      </Button>
    </div>
  );
};

export default ProductFilters;
