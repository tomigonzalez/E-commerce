import BannerDiscount from "@/components/banner-discount";
import BannerProduct from "@/components/banner-product";
import CarouselTextBanner from "@/components/carousel-text-banner";

import FeaturedProducts from "@/components/featured-product";

export default function Home() {
  return (
    <main>
      <CarouselTextBanner />
      <div className="h-[350px] bg-cover lg:h-[600px] bg-[url('/subirImg.png')] bg-center" />
      <BannerDiscount />
      <FeaturedProducts />
      <BannerProduct />
    </main>
  );
}
