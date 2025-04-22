"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

const reviews = [
  {
    name: "María",

    rating: 5,
    comment: "¡Producto increíble! Superó mis expectativas.",
  },
  {
    name: "Carlos",

    rating: 4,
    comment: "Muy bueno, aunque el envío tardó un poco.",
  },
  {
    name: "Lucía",

    rating: 5,
    comment: "Me encantó la calidad, definitivamente volveré a comprar.",
  },
  {
    name: "Pedro",

    rating: 3,
    comment: "Está bien, pero esperaba algo más.",
  },
  {
    name: "Ana",

    rating: 5,
    comment:
      "Excelente atención y producto de primera calidad.Excelente atención y producto de primera calidad.Excelente atención y producto de primera calidad.Excelente atención y producto de primera calidad.",
  },
];

const ReviewsCarousel = () => {
  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="px-6 text-3xl sm:pb-8">Reseñas</h3>
      <Carousel
        plugins={[Autoplay({ delay: 1500 })]}
        opts={{ align: "start", loop: true }}
        className="w-full"
      >
        <CarouselContent className="-ml-2">
          {reviews.map((review, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:basis-[49%] ml-1 mr-1" // 2 por slide
            >
              <Card>
                <CardContent className="flex flex-col items-start p-4">
                  <div className="flex items-center gap-5 mb-2">
                    <Avatar>
                      <AvatarFallback>{review.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold">{review.name}</p>
                      <div className="flex text-yellow-500">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-500" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {review.comment}
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ReviewsCarousel;
