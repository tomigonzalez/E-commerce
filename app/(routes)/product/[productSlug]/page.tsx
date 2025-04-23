import { notFound } from "next/navigation";
import { ProductType } from "@/types/product";
import CarouselProduct from "../components/carousel-product";
import InfoProduct from "../components/info-product";

// No declares Props ni params: deja que Next lo maneje internamente
const Page = async ({ params }: { params: { productSlug: string } }) => {
  const { productSlug } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[slug][$eq]=${productSlug}&populate=*`
  );

  if (!res.ok) return notFound();

  const data = await res.json();
  const product: ProductType | null = data?.data?.[0] || null;

  if (!product) return notFound();

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-32 sm:px-24">
      <div className="grid sm:grid-cols-2">
        <div>
          {product.images && <CarouselProduct images={product.images} />}
        </div>
        <div className="sm:px-12">
          <InfoProduct product={product} />
        </div>
      </div>
    </div>
  );
};

export default Page;
