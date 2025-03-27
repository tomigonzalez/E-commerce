"use client";

import { useRouter } from "next/navigation";
import { Expand, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import IconButton from "@/components/icon-button";
import { ProductType } from "@/types/product";
import { formatPrice } from "@/lib/formatPrice";
import { useCart } from "@/hooks/use-cart";

interface ProductCardProps {
  product: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const { addItem } = useCart();

  return (
    <Card className="border border-gray-200 shadow-sm p-6 sm:p-6">
      <CardContent className="flex flex-col items-center">
        <img
          src={
            product.images && product.images.length > 0
              ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${product.images[0].url}`
              : "/subirImg.png"
          }
          alt={product.productName}
          className="w-full h-30 sm:h-40 md:h-48 object-contain"
        />
        <h3 className="text-sm sm:text-lg font-bold mt-2 sm:mt-4">
          {product.productName}
        </h3>
        <div className="flex mt-2 items-center justify-between gap-2 sm:gap-3 text-xs sm:text-sm">
          <p className="px-2 py-1 text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">
            {product.category?.categoryName ?? "categoría"}
          </p>
          <p className="px-2 py-1 text-white bg-yellow-900 rounded-full w-fit">
            {product.sub_category?.subCategoryName ?? "subcategoría"}
          </p>
        </div>
        <p className="my-2 sm:my-4 text-base sm:text-2xl">
          {formatPrice(product.price)}
        </p>
        <div className="flex justify-center gap-3 sm:gap-4 mt-2 sm:mt-4">
          <IconButton
            onClick={() => router.push(`product/${product.slug}`)}
            icon={<Expand size={16} />}
            className="text-gray-600 cursor-pointer"
          />
          <IconButton
            onClick={() => addItem(product)}
            icon={<ShoppingCart size={16} />}
            className="text-gray-600 cursor-pointer"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
