"use client";

import { ProductType } from "@/types/product";
import { formatPrice } from "@/lib/formatPrice";
import React from "react";

interface CartSummaryItemProps {
  product: ProductType & { quantity: number; sizeSelected: string }; // Usamos `selectedSize` en lugar de `sizeSelected`
}

const CartSummaryItem = ({ product }: CartSummaryItemProps) => {
  // Encuentra el stock correspondiente al talle seleccionado
  const sizeStock = product.size_stock.find(
    (size) => size.size === product.sizeSelected
  );

  return (
    <li className="flex flex-col sm:flex-row p-4 border-b dark:border-zinc-700">
      <div className="mb-3 sm:mb-0">
        <img
          loading="lazy"
          src={
            product.images && product.images[0]?.url
              ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${product.images[0].url}`
              : "/subirImg.jpg"
          }
          alt={product.productName}
          className="w-20 h-20 rounded-md object-cover"
        />
      </div>

      <div className="flex flex-col justify-between flex-1 sm:px-4">
        <div>
          <h2 className="text-md font-semibold">{product.productName}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Talle seleccionado: {product.sizeSelected}{" "}
            {/* Mostramos el talle seleccionado */}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Cantidad: {product.quantity}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Precio unitario: {formatPrice(product.price)}
          </p>
        </div>

        {/* Subtotal: Calculamos el subtotal usando la cantidad del producto */}
        <p className="text-sm font-bold mt-1">
          Subtotal: {formatPrice(product.price * product.quantity)}
        </p>

        {/* Mostrar stock disponible para el talle seleccionado */}
        {sizeStock && (
          <p className="text-sm text-gray-500">
            Stock disponible para este talle: {sizeStock.stock}
          </p>
        )}
      </div>
    </li>
  );
};

export default CartSummaryItem;
