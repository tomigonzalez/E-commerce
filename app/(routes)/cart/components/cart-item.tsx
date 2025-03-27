import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types/product";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface CartItemProps {
  product: ProductType;
}

const CartItem = (props: CartItemProps) => {
  const router = useRouter();
  const { removeItem } = useCart();

  return (
    <li className="flex py-6 border-b">
      <div
        onClick={() => router.push(`/product/${props.product.slug}`)}
        className="cursor-pointer"
      >
        <img
          src={
            props.product.images && props.product.images[0]?.url
              ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${props.product.images[0].url}`
              : "/subirImg.png"
          }
          alt="Product"
          className="w-24 h-24 overflow-hidden rounded-md sm:w-auto sm:h-32"
        />
      </div>
      <div className="flex justify-between flex-1 px-6">
        <div>
          <h2 className="text-lg font-bold">{props.product.productName}</h2>
          <p className="font-bold">{formatPrice(props.product.price)}</p>
          <div className="flex items-center justify-between gap-3">
            <p className="px-2 py-1 text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">
              {props.product.category?.categoryName ?? "categoría"}
            </p>
            <p className="px-2 py-1 text-white bg-yellow-900 rounded-full w-fit">
              {props.product.sub_category?.subCategoryName ?? "subcategoría"}
            </p>
          </div>
        </div>
        <div>
          <button
            className={cn(
              "cursor-pointer rounded-full flex items-center justify-center bg-white border shadow-md p-1 hover:scale-110 trasition"
            )}
          >
            <X size={20} onClick={() => removeItem(props.product.id)} />
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
