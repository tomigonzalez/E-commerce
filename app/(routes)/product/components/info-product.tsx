"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/formatPrice";
import { ProductType, SizeStockType } from "@/types/product";
import React, { useState } from "react";

type InfoProductProps = {
  product: ProductType;
};

const InfoProduct = ({ product }: InfoProductProps) => {
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState<SizeStockType | null>(null);

  const handleAddToCart = () => {
    if (!selectedSize) return alert("Selecciona un talle");

    const sizeData = product.size_stock.find(
      (size) => size.id === selectedSize.id
    );

    if (sizeData && sizeData.stock > 0) {
      addItem(product, selectedSize.size);
    } else {
      alert("Este talle no está disponible en stock.");
    }
  };

  return (
    <div className="px-6">
      <div className="justify-between mb-3 sm:flex">
        <h1 className="text-2xl">{product.productName}</h1>
        <div className="flex mt-2 items-center justify-between gap-3">
          <p className="px-2 py-1 text-xs text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">
            {product.category.categoryName}
          </p>
          <p className="px-2 py-1 text-xs text-white bg-defaultUser rounded-full">
            {product.sub_category?.subCategoryName}
          </p>
        </div>
      </div>

      <Separator className="my-4" />

      <p>{product.description}</p>

      <Separator className="my-4" />

      <p className="my-4 text-2xl">{formatPrice(product.price)}</p>

      {/* Talles */}
      <div className="flex flex-col gap-2 my-4">
        <p className="font-medium">Talle:</p>
        <div className="flex flex-wrap gap-2">
          {product.size_stock.map((size) => (
            <Button
              key={size.id}
              variant={selectedSize?.id === size.id ? "default" : "outline"}
              className="px-4 py-2 text-sm"
              onClick={() => setSelectedSize(size)}
            >
              {size.size}
            </Button>
          ))}
        </div>
        {selectedSize && (
          <p className="text-sm text-muted-foreground">
            Stock disponible: {selectedSize.stock}
          </p>
        )}
      </div>

      <div className="flex items-center gap-5">
        <Button className="w-auto" onClick={handleAddToCart}>
          Comprar
        </Button>
      </div>
    </div>
  );
};

export default InfoProduct;
