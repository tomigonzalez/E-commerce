"use client";
import { useEffect, useState } from "react";
import BannerDiscount from "@/components/banner-discount";
import BannerProduct from "@/components/reseña-product";
import CarouselTextBanner from "@/components/carousel-text-banner";
import FeaturedProducts from "@/components/featured-product";
import GaleryHome from "@/components/galeryHome";
import { useHomeData } from "@/hooks/use-homeData";
import SkeletonScheme from "@/components/skeletonScheme";
import AOS from "aos";

export default function Home() {
  const homeData = useHomeData((state) => state.data);
  const imagenHeroUrl = homeData?.[0]?.imagenHero?.[0]?.url;

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (imagenHeroUrl) {
      const img = new Image();
      img.src = `${process.env.NEXT_PUBLIC_BACKEND_URL}${imagenHeroUrl}`;
      img.onload = () => setIsImageLoaded(true);
    }
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
              src={
                imagenHeroUrl && imagenHeroUrl.trim() !== ""
                  ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${imagenHeroUrl}`
                  : "/BannerSubir.jpg"
              }
              alt="Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0">
              <CarouselTextBanner />
            </div>
          </div>
        )}
      </div>

      <BannerDiscount />
      <FeaturedProducts />
      <GaleryHome />
      <BannerProduct />
    </main>
  );
}
