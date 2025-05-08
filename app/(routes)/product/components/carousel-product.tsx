import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ImageType } from "@/types/product";
import React from "react";

interface CarouselPRoductProps {
  images: ImageType[];
}

const CarouselProduct = (props: CarouselPRoductProps) => {
  return (
    <div className="sm:px-14">
      <Carousel>
        <CarouselContent>
          {props.images.map((image) => (
            <CarouselItem key={image.id}>
              <img
                loading="lazy"
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image.url}`}
                alt="Image product"
                className="w-full h-full object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CarouselProduct;
