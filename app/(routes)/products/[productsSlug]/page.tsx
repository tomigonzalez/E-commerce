"use client";

import { useGetProductsByTipo } from "@/api/getTipoProduct";
import { ResponseType } from "@/types/response";
import { useParams } from "next/navigation";
import SkeletonScheme from "@/components/skeletonScheme";
import { ProductType } from "@/types/product";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import IconButton from "@/components/icon-button";
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";

import { formatPrice } from "@/lib/formatPrice";
import PaginationComponent from "../components/pagination";

export default function Page() {
  const params = useParams();
  const { productsSlug } = params;
  const router = useRouter();
  const { addItem } = useCart();
  const { error, loading, result }: ResponseType =
    useGetProductsByTipo(productsSlug);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages =
    result && result.length > 0 ? Math.ceil(result.length / itemsPerPage) : 0;

  const paginatedProducts =
    result && result.length > 0 && currentPage <= totalPages
      ? result.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      : [];

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="px-6 text-3xl sm:pb-8">Productos</h3>
      {loading && <SkeletonScheme grid={3} />}
      {paginatedProducts.length === 0 && !loading ? (
        <p className="text-center text-gray-500">
          No hay productos en esta categoría
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {paginatedProducts.map((product: ProductType) => (
            <Card
              key={product.id}
              className="border border-gray-200 shadow-sm p-4"
            >
              <CardContent className="flex flex-col items-center">
                <img
                  loading="lazy"
                  src={
                    product.images && product.images.length > 0
                      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${product.images[0].url}`
                      : "/subirImg.png"
                  }
                  alt={product.productName}
                  className="w-full h-48"
                />
                <h3 className="text-lg font-bold mt-4">
                  {product.productName}
                </h3>
                <div className="flex items-center justify-between gap-3">
                  <p className="px-2 py-1 text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">
                    {product.category?.categoryName ?? "Categoría"}
                  </p>
                  <p className="px-2 py-1 text-white bg-yellow-900 rounded-full w-fit">
                    {product.sub_category?.subCategoryName ?? "Subcategoría"}
                  </p>
                </div>
                <p className="my-4 text-2xl">{formatPrice(product.price)}</p>

                <div className="flex justify-center gap-4 mt-4">
                  <IconButton
                    onClick={() => router.push(`product/${product.slug}`)}
                    icon={<Expand size={20} />}
                    className="text-gray-600 cursor-pointer"
                  />
                  <IconButton
                    onClick={() => addItem(product)}
                    icon={<ShoppingCart size={20} />}
                    className="text-gray-600 cursor-pointer"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
