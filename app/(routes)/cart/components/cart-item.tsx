"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/store/use-cart";
import { formatPrice } from "@/lib/formatPrice";
import { ProductType } from "@/types/product";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface CartItemProps {
  product: ProductType & { quantity: number; sizeSelected: string };
}

const CartItem = ({ product }: CartItemProps) => {
  const router = useRouter();
  const { removeItem, addItem, removeOneItem } = useCart();

  const handleDecrease = () => {
    if (product.quantity > 1) {
      removeOneItem(product.id, product.sizeSelected);
    } else {
      removeItem(product.id, product.sizeSelected);
    }
  };

  const handleIncrease = () => {
    addItem(product, product.sizeSelected);
  };

  const sizeInfo = product.size_stock.find(
    (s) => s.size === product.sizeSelected
  );
  const stock = sizeInfo?.stock ?? 0;

  const imageUrl = product.images?.[0]?.url
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${product.images[0].url}`
    : "/subirImg.jpg";

  return (
    <li className="flex flex-col sm:flex-row sm:items-center items-center text-center gap-4 border-b py-6">
      {/* Imagen */}
      <div
        onClick={() => router.push(`/product/${product.slug}`)}
        className="cursor-pointer shrink-0"
      >
        <img
          src={imageUrl}
          alt={product.productName}
          loading="lazy"
          className="w-24  h-24 sm:w-32 sm:h-32 object-cover  rounded-[2rem] border"
        />
      </div>

      {/* Info del producto */}
      <div className="flex-1 w-full">
        <div className="flex justify-between items-start w-full">
          <div className="space-y-1 sm:text-left w-full">
            <h3 className="text-lg font-semibold">{product.productName}</h3>
            <p className="text-sm text-muted-foreground">
              Talle: <strong>{product.sizeSelected}</strong> — Stock: {stock}
            </p>
            <p className="text-sm text-muted-foreground">
              {product.category?.categoryName}
            </p>
            <p className="font-bold">{formatPrice(product.price)}</p>
          </div>

          {/* Botón eliminar - solo visible en sm+ */}
          <Button
            variant="ghost"
            className="hover:text-red-500 hidden sm:inline-flex"
            onClick={() => removeItem(product.id, product.sizeSelected)}
            aria-label="Eliminar producto"
          >
            <X size={18} />
          </Button>
        </div>

        {/* Controles de cantidad */}
        <div className="mt-4 flex items-center justify-center sm:justify-start gap-2">
          <Button
            onClick={handleDecrease}
            className="h-8 w-8"
            aria-label="Disminuir cantidad"
          >
            -
          </Button>
          <span className="px-3">{product.quantity}</span>
          <Button
            onClick={handleIncrease}
            disabled={product.quantity >= stock}
            className="h-8 w-8"
            aria-label="Aumentar cantidad"
          >
            +
          </Button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
