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

import { useGetProductAll } from "@/api/usePeticionApi";

const FeaturedProducts = () => {
  const { error, loading, result }: ResponseType = useGetProductAll();

  const router = useRouter();

  return (
    <div className="max-w-6xl py-14 px-6 mx-auto">
      <h3 className="px-6 text-3xl sm:pb-8">Producto destacado</h3>
      <Carousel>
        <CarouselContent className="ml-2 md:ml-4">
          {loading && <SkeletonScheme grid={3} />}
          {result != null &&
            result.map((product: ProductType) => {
              return (
                <CarouselItem
                  key={product.id}
                  className="md:basis-1/2 lg:basis-1/3 group md:p-2 p-16"
                >
                  <div className="p-1 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
                    <Card className="py-4 border border-gray-200 shadow-none">
                      <CardContent className="relative flex items-center justify-center px-6 py-2">
                        <img
                          loading="lazy"
                          src={
                            product.images && product.images.length > 0
                              ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${product.images[0].url}`
                              : "/subirImg.jpg"
                          }
                          alt={product.productName}
                          className="object-contain max-h-60 w-full rounded-md"
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

                      <div className="flex flex-col gap-2 px-6 pt-2">
                        <h3 className="text-lg font-bold">
                          {product.productName}
                        </h3>

                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                          <p className="px-2 py-1 text-white bg-black rounded-full dark:bg-white dark:text-black w-fit text-sm">
                            {product.category?.categoryName ?? "categoría"}
                          </p>
                          <p className="px-2 py-1 text-white bg-defaultUser rounded-full w-fit text-sm">
                            {product.sub_category?.subCategoryName ??
                              "subcategoría"}
                          </p>
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
