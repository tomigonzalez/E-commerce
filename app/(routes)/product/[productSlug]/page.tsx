// app/producto/[productSlug]/page.tsx
import { notFound } from "next/navigation";
import { ProductType } from "@/types/product";
import CarouselProduct from "../components/carousel-product";
import InfoProduct from "../components/info-product";

export default async function Page({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) {
  const { productSlug } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[slug][$eq]=${productSlug}&populate=*`
  );

  if (!res.ok) return notFound();

  const data = await res.json();
  const product: ProductType | null = data?.data?.[0] || null;

  if (!product) return notFound();
  console.log(product.images);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
        <div className="lg:col-span-2 w-full">
          <div className="w-[80%] max-w-full mx-auto">
            {product.images && <CarouselProduct images={product.images} />}
          </div>
        </div>

        <div className="w-full max-w-full mx-auto">
          <InfoProduct product={product} />
        </div>
      </div>
    </div>
  );
}
