"use client";

import { useHomeData } from "@/store/use-homeData";
import Image from "next/image";
import React from "react";

const GaleryHome = () => {
  const homeData = useHomeData((state) => state.data);
  const imagenHeroUrl = homeData?.[0]?.galeriaImg;

  const hayImagenes =
    Array.isArray(imagenHeroUrl) &&
    imagenHeroUrl.length > 0 &&
    imagenHeroUrl.some((img) => img?.url && img.url.trim() !== "");

  if (!hayImagenes) {
    return (
      <div className="text-center py-10 text-gray-500 dark:text-gray-300 text-lg">
        Agregar fotos en la galería
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 py-2 mx-auto sm:py-14 sm:px-24">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8">
        {imagenHeroUrl.map((image, index) => (
          <a
            key={image.id || index}
            href="#"
            className={`group relative flex h-48 items-end overflow-hidden rounded-[3rem] bg-gray-100 shadow-lg ${
              index === 1 || index === 2 ? "md:col-span-2" : ""
            } md:h-80`}
            data-aos="fade-up"
            data-aos-delay={`${index * 150}`}
          >
            <Image
              loading="lazy"
              src={
                image?.url && image.url.trim() !== ""
                  ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${image.url}`
                  : "/galeriaChico.jpg"
              }
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/galeriaChico.jpg";
              }}
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
