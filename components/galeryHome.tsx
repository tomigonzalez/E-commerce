"use client";

import { useHomeData } from "@/hooks/use-homeData";
import React from "react";

const GaleryHome = () => {
  const homeData = useHomeData((state) => state.data);
  const imagenHeroUrl = homeData?.[0]?.galeriaImg;

  return (
    <div className="bg-white dark:bg-gray-800 py-2 mx-auto sm:py-14 sm:px-24">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8">
        {imagenHeroUrl?.map((image, index) => (
          <a
            key={image.id}
            href="#"
            className={`group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg ${
              index === 1 || index === 2 ? "md:col-span-2" : ""
            } md:h-80`}
            data-aos="fade-up" // Añadimos un efecto fade-up
            data-aos-delay={`${index * 150}`} // Añadimos retraso en cascada
          >
            <img
              loading="lazy"
              src={
                image?.url
                  ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${image.url}`
                  : "/subirImg.jpg"
              }
              alt="Image product"
              className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default GaleryHome;
