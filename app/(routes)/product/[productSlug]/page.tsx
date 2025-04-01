"use client";

import { ResponseType } from "@/types/response";
import { useParams } from "next/navigation";
import SkeletonProduct from "../components/skeleton-product";
import CarouselProduct from "../components/carousel-product";
import InfoProduct from "../components/info-product";
import { useGetProductBySlug } from "@/api/usePeticionApi";

export default function Page() {
  const params = useParams();
  const { productSlug } = params;

  const { error, loading, result }: ResponseType =
    useGetProductBySlug(productSlug);

  if (result == null) {
    return <SkeletonProduct />;
  }

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-32 sm:px-24">
      <div className="grid sm:grid-cols-2">
        <div>
          {result[0]?.images && <CarouselProduct images={result[0].images} />}
        </div>
        <div className="sm:px-12">
          <InfoProduct product={result[0]} />
        </div>
      </div>
    </div>
  );
}
