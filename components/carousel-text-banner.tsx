"use client";
import { useRouter } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import Autoplay from "embla-carousel-autoplay";
import { useHomeData } from "@/hooks/use-homeData";
// Asegúrate de la ruta correcta

const CarouselTextBanner = () => {
  const router = useRouter();
  const homeData = useHomeData((state) => state.data);
  const mostrarDescuento = homeData?.[0]?.mostrarBannerDescuento;
  const bannerText = homeData?.[0]?.bannerDescuentoTexto;

  if (!mostrarDescuento || !bannerText) {
    return null;
  }

  const bannerLines = bannerText
    .split("\n")
    .filter((line) => line.trim() !== "");

  return (
    <div className="bg-gray-200 dark:bg-primary">
      <Carousel
        className="w-full max-w-4xl mx-auto"
        plugins={[Autoplay({ delay: 2000 })]}
      >
        <CarouselContent className="gap-4">
          {bannerLines.map((line, index) => (
            <CarouselItem
              key={index}
              className="flex justify-center items-center"
            >
              <div className="w-full">
                <Card className="shadow-none border-none bg-transparent">
                  <CardContent className="flex flex-col justify-center items-center text-center p-2">
                    <p className="text-sm sm:text-base text-wrap dark:text-secondary font-semibold">
                      {line}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CarouselTextBanner;
