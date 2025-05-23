"use client";
import { useEffect, useState } from "react";
import BannerDiscount from "@/components/banner-discount";
import BannerProduct from "@/components/reseña-product";
import CarouselTextBanner from "@/components/carousel-text-banner";
import FeaturedProducts from "@/components/featured-product";
import GaleryHome from "@/components/galeryHome";
import { useHomeData } from "@/store/use-homeData";
import SkeletonScheme from "@/components/skeletonScheme";
import AOS from "aos";
import Link from "next/link";

export default function Home() {
  const homeData = useHomeData((state) => state.data);
  const rawHeroUrl = homeData?.[0]?.imagenHero?.[0]?.url;
  const imagenHeroUrl =
    rawHeroUrl && rawHeroUrl.trim() !== ""
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${rawHeroUrl}`
      : "/BannerSubir.jpg";

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = imagenHeroUrl;
    img.onload = () => setIsImageLoaded(true);
    img.onerror = () => setIsImageLoaded(true); // también avanzar si falla
  }, [imagenHeroUrl]);

  useEffect(() => {
    if (isImageLoaded) {
      AOS.refresh(); // Asegura que AOS detecte la imagen cargada
    }
  }, [isImageLoaded]);

  return (
    <main>
      <div className="h-[90vh] w-full relative flex items-center justify-center">
        {!isImageLoaded ? (
          <div className="w-full h-[80%] content-center">
            <SkeletonScheme grid={1} />
          </div>
        ) : (
          <div className="relative w-full h-full">
            <img
              src={imagenHeroUrl}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/BannerSubir.jpg";
              }}
              alt="Hero"
              className="w-full h-full object-cover rounded-b-[8rem]"
            />
            <div className="absolute inset-0">
              <CarouselTextBanner />
            </div>
          </div>
        )}
      </div>

      <BannerDiscount />
      <FeaturedProducts />
      <div className="w-full flex justify-center mb-10">
        <Link
          href="/products"
          data-aos="fade-up"
          className="text-lg font-semibold text-primary animate-pulse hover:animate-none hover:underline transition-all duration-2200"
        >
          Ver más productos
        </Link>
      </div>
      <GaleryHome />
      <BannerProduct />
    </main>
  );
}
