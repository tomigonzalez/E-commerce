"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
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

  const handleDecreaseQuantity = () => {
    if (product.quantity > 1) {
      removeOneItem(product.id, product.sizeSelected);
    } else {
      removeItem(product.id, product.sizeSelected);
    }
  };

  const handleIncreaseQuantity = () => {
    addItem(product, product.sizeSelected); // ✅ Ahora sí
  };

  // Buscar stock correspondiente al talle seleccionado
  const sizeInfo = product.size_stock.find(
    (s) => s.size === product.sizeSelected
  );
  const sizeStock = sizeInfo?.stock ?? 0;

  return (
    <li className="flex p-6 border-b">
      <div
        onClick={() => router.push(`/product/${product.slug}`)}
        className="cursor-pointer"
      >
        <img
          loading="lazy"
          src={
            product.images && product.images[0]?.url
              ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${product.images[0].url}`
              : "/subirImg.png"
          }
          alt="Product"
          className="w-24 h-24 overflow-hidden rounded-md sm:w-auto sm:h-32 object-cover"
        />
      </div>
      <div className="flex justify-between flex-1 px-6">
        <div>
          <h2 className="text-lg font-bold">{product.productName}</h2>
          <p className="font-bold">{formatPrice(product.price)}</p>

          <div className="flex items-center justify-between pt-2 pb-2 gap-3">
            <p className="px-2 py-1 text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">
              {product.category?.categoryName ?? "categoría"}
            </p>
            <p className="px-2 py-1 text-white bg-defaultUser rounded-full w-fit">
              {product.sub_category?.subCategoryName ?? "subcategoría"}
            </p>
          </div>

          <p className="text-sm text-gray-500">
            Talle: <strong>{product.sizeSelected}</strong>
          </p>
          <p className="text-sm text-gray-500">
            Stock disponible para ese talle: {sizeStock}
          </p>

          <div className="flex items-center mt-2">
            <Button
              onClick={handleDecreaseQuantity}
              className="px-2 py-1 border rounded-l-md cursor-pointer"
            >
              -
            </Button>
            <span className="px-3 border-t border-b ">{product.quantity}</span>
            <Button
              onClick={handleIncreaseQuantity}
              disabled={product.quantity >= sizeStock}
              className="px-2 py-1 border rounded-r-md cursor-pointer"
            >
              +
            </Button>
          </div>
        </div>
        <div>
          <Button
            className={cn(
              "cursor-pointer rounded-full flex items-center justify-center bg-white border shadow-md p-1 hover:scale-110 transition"
            )}
          >
            <X
              size={20}
              onClick={() => removeItem(product.id, product.sizeSelected)}
            />
          </Button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
