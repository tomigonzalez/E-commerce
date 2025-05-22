"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Expand } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import IconButton from "./icon-button";
import SkeletonScheme from "./skeletonScheme";

import { useProductStore } from "@/store/use-products";
import { ProductType } from "@/types/product";

const FeaturedProducts = () => {
  const router = useRouter();
  const { loading, products, fetchProducts } = useProductStore();

  useEffect(() => {
    if (!products) {
      fetchProducts();
    }
  }, [products, fetchProducts]);

  return (
    <section className="max-w-6xl w-[80%] py-14 px-6 mx-auto">
      <h3 className="px-6 text-3xl sm:pb-8 text-gray-900 dark:text-white">
        Producto destacado
      </h3>

      <Carousel>
        <CarouselContent className="ml-2 md:ml-4">
          {loading && <SkeletonScheme grid={3} />}

          {products?.map((product: ProductType) => (
            <CarouselItem
              key={product.id}
              className="md:basis-1/2 lg:basis-1/3 group md:p-2 p-8"
            >
              <div
                className="p-1 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto"
                data-aos="fade-in"
                data-aos-duration="700"
                data-aos-delay="300"
              >
                <Card className="py-4 border rounded-[2rem] shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700">
                  <CardContent className="relative flex items-center justify-center px-6 py-2">
                    <img
                      loading="lazy"
                      src={
                        product.images?.length
                          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${product.images[0].url}`
                          : "/subirImg.jpg"
                      }
                      alt={product.productName}
                      className="object-contain max-h-60 w-full rounded-[2rem]"
                    />
                  </CardContent>

                  <div className="flex flex-col gap-2 px-6 pt-2 items-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {product.productName}
                    </h3>

                    <div className="flex justify-center flex-wrap gap-2 sm:gap-3">
                      <div className="flex flex-wrap gap-4 justify-center">
                        <span className="px-2 py-1 text-white bg-gray-900 rounded-full dark:bg-white dark:text-black w-fit text-sm">
                          {product.category?.categoryName ?? "categoría"}
                        </span>
                        <span className="px-2 py-1 text-black  dark:bg-gray-700 dark:text-white rounded-full w-fit text-sm">
                          {product.sub_category?.subCategoryName ??
                            "subcategoría"}
                        </span>
                      </div>

                      <div
                        className="flex w-full justify-center gap-x-6"
                        title="Abrir producto"
                      >
                        <IconButton
                          onClick={() => router.push(`product/${product.slug}`)}
                          icon={<Expand size={20} />}
                          className="text-gray-800 dark:text-gray cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="cursor-pointer" />
        <CarouselNext className="sm:flex cursor-pointer" />
      </Carousel>
    </section>
  );
};

export default FeaturedProducts;
