"use client";
import BannerDiscount from "@/components/banner-discount";
import BannerProduct from "@/components/banner-product";
import CarouselTextBanner from "@/components/carousel-text-banner";
import FeaturedProducts from "@/components/featured-product";
import { useHomeData } from "@/hooks/use-homeData";

export default function Home() {
  const homeData = useHomeData((state) => state.data);
  const imagenHeroUrl = homeData?.[0].imagenHero?.[0]?.url;

  return (
    <main>
      <CarouselTextBanner />
      {imagenHeroUrl && ( // Renderiza la imagen solo si hay una URL
        <div
          className="h-[250px] lg:h-[500px] bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_BACKEND_URL}${imagenHeroUrl})`,
          }}
        />
      )}
      <BannerDiscount />
      <FeaturedProducts />
      <BannerProduct />
    </main>
  );
}
