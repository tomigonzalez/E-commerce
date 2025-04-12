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
  product: ProductType & { quantity: number }; // Asegúrate de que product tenga la propiedad quantity
}

const CartItem = (props: CartItemProps) => {
  const router = useRouter();
  const { removeItem, addItem, removeOneItem } = useCart();

  const handleDecreaseQuantity = () => {
    if (props.product.quantity > 1) {
      removeOneItem(props.product.id);
    } else {
      removeItem(props.product.id);
    }
  };

  const handleIncreaseQuantity = () => {
    addItem(props.product);
  };

  return (
    <li className="flex p-6 border-b">
      <div
        onClick={() => router.push(`/product/${props.product.slug}`)}
        className="cursor-pointer"
      >
        <img
          loading="lazy"
          src={
            props.product.images && props.product.images[0]?.url
              ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${props.product.images[0].url}`
              : "/subirImg.png"
          }
          alt="Product"
          className="w-24 h-24 overflow-hidden rounded-md sm:w-auto sm:h-32 object-cover"
        />
      </div>
      <div className="flex justify-between flex-1 px-6">
        <div>
          <h2 className="text-lg font-bold">{props.product.productName}</h2>
          <p className="font-bold">{formatPrice(props.product.price)}</p>

          <div className="flex items-center justify-between pt-2 pb-2 gap-3">
            <p className="px-2 py-1 text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">
              {props.product.category?.categoryName ?? "categoría"}
            </p>
            <p className="px-2 py-1 text-white bg-yellow-900 rounded-full w-fit">
              {props.product.sub_category?.subCategoryName ?? "subcategoría"}
            </p>
          </div>
          <p className="text-sm text-gray-500">
            Stock disponible: {props.product.stock}
          </p>
          <div className="flex items-center mt-2">
            <Button
              onClick={handleDecreaseQuantity}
              className="px-2 py-1 border rounded-l-md cursor-pointer"
            >
              -
            </Button>
            <span className="px-3 border-t border-b ">
              {props.product.quantity}
            </span>
            <Button
              onClick={handleIncreaseQuantity}
              className="px-2 py-1 border rounded-r-md cursor-pointer"
            >
              +
            </Button>
          </div>
        </div>
        <div>
          <Button
            className={cn(
              "cursor-pointer rounded-full flex items-center justify-center bg-white border shadow-md p-1 hover:scale-110 trasition"
            )}
          >
            <X size={20} onClick={() => removeItem(props.product.id)} />
          </Button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
