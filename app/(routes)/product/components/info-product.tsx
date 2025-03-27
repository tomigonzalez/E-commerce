import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { formatPrice } from "@/lib/formatPrice";
import { ProductType } from "@/types/product";
import { Heart } from "lucide-react";
import React from "react";

type InfoProductProps = {
  product: ProductType;
};

const InfoProduct = (props: InfoProductProps) => {
  const { addItem } = useCart();
  const { addLoveItem } = useLovedProducts();

  return (
    <div className="px-6">
      <div className="justify-between mb-3 sm:flex">
        <h1 className="text-2xl">{props.product.productName}</h1>
        <div className="flex mt-2 items-center justify-between gap-3">
          <p className="px-2 py-1 text-xs text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">
            {props.product.category.categoryName}
          </p>
          <p className="px-2 py-1 text-xs text-white bg-yellow-900 rounded-full">
            {props.product.sub_category?.subCategoryName}
          </p>
        </div>
      </div>
      <Separator className="my-4" />
      <p>{props.product.description}</p>
      <Separator className="my-4" />
      <p className="my-4 text-2xl"> {formatPrice(props.product.price)}</p>
      <div className="flex items-center gap-5">
        <Button className="w-auto" onClick={() => addItem(props.product)}>
          Comprar
        </Button>
        <Heart
          width={30}
          strokeWidth={1}
          className="transition duration-300 cursor-pointer hover:fill-black"
          onClick={() => addLoveItem(props.product)}
        />
      </div>
    </div>
  );
};

export default InfoProduct;
