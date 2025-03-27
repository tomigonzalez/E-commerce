import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types/product";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface LovedItemProductProps {
  product: ProductType;
}

const LovedItemProduct = (props: LovedItemProductProps) => {
  const router = useRouter();
  const { removeLovedItem } = useLovedProducts();
  const { addItem } = useCart();
  return (
    <li className="flex py-6 border-b">
      <div onClick={() => router.push(`/product${props.product.slug}`)}>
        <img
          src={
            props.product.images && props.product.images[0]?.url
              ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${props.product.images[0].url}`
              : "/subirImg.png"
          }
          alt="product"
          className="w-24 h-24 overflow-hidden rounded-md sm:w-auto sm:h-32"
        />
      </div>
      <div className="flex justify-between flex-1 px-6">
        <div>
          <div>
            <h2 className="text-lg font-bold"> {props.product.productName}</h2>
            <p className="font-bold">{formatPrice(props.product.price)}</p>
            <div className="flex items-center justify-between gap-3">
              <p className="px-2 py1 text-xs text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">
                {props.product.category.categoryName}
              </p>
              <p className="px-2 py1 text-xs text-white bg-yellow-900 rounded-full w-fit">
                {props.product.sub_category?.subCategoryName}
              </p>
            </div>
            <Button className="mt-5 rounded-full cursor-pointer">
              Añadir al carrito
            </Button>
          </div>
        </div>
        <div>
          <button
            className={cn(
              " rounded-full flex items-center justify-center bg-whnite border shadow-md p-1 hover:scale-110 transition"
            )}
          >
            <X size={20} onClick={() => removeLovedItem(props.product.id)} />
          </button>
        </div>
      </div>
    </li>
  );
};

export default LovedItemProduct;
