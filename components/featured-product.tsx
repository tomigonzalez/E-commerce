"use client";

import { ResponseType } from "@/types/response";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import SkeletonScheme from "./skeletonScheme";
import { ProductType } from "@/types/product";
import { Card, CardContent } from "./ui/card";
import { Expand } from "lucide-react";
import IconButton from "./icon-button";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { useGetProductAll } from "@/api/usePeticionApi";

const FeaturedProducts = () => {
  const { error, loading, result }: ResponseType = useGetProductAll();

  const router = useRouter();

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="px-6 text-3xl sm:pb-8">Producto destacado</h3>
      <Carousel>
        <CarouselContent className="-ml-2 md:-ml-4">
          {loading && <SkeletonScheme grid={3} />}
          {result != null &&
            result.map((product: ProductType) => {
              return (
                <CarouselItem
                  key={product.id}
                  className="md:basis-1/2 lg:basis-1/3 group"
                >
                  <div className="p-1">
                    <Card className="py-4 border border-gray-200 shadow-none">
                      <CardContent className="relative flex items-center justify-center px-6 py-2">
                        <img
                          loading="lazy"
                          src={
                            product.images && product.images.length > 0
                              ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${product.images[0].url}`
                              : "/subirImg.png"
                          }
                          alt={product.productName}
                          className="object-cover"
                        />
                        <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
                          <div className="flex justify-center gap-x-6">
                            <IconButton
                              onClick={() =>
                                router.push(`product/${product.slug}`)
                              }
                              icon={<Expand size={20} />}
                              className="text-gray-600 cursor-pointer"
                            />
                          </div>
                        </div>
                      </CardContent>
                      <div className="flex justify-between gap-4 px-8">
                        <h3 className="text-lg font-bold">
                          {product.productName}
                        </h3>
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center justify-between gap-3">
                            <p className="px-2 py-1 text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">
                              {product.category?.categoryName ?? "categoría"}
                            </p>
                            <p className="px-2 py-1 text-white bg-yellow-900 rounded-full w-fit">
                              {product.sub_category?.subCategoryName ??
                                "subcategoría"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
        </CarouselContent>
        <CarouselPrevious className="cursor-pointer" />
        <CarouselNext className="hidden sm:flex cursor-pointer" />
      </Carousel>
    </div>
  );
};

export default FeaturedProducts;
