"use client";
import { useInfoData } from "@/hooks/use-info-data";
import React from "react";

type Props = {};

const CambiosDevoluciones = (props: Props) => {
  const infoData = useInfoData((state) => state.data);

  return (
    <div className="p-6 sm:p-10 max-w-5xl mx-auto">
      <h2
        className="text-3xl font-semibold text-primary text-center mb-8"
        data-aos="fade-in"
        data-aos-delay="200"
      >
        {infoData?.devolucion.titleText}
      </h2>

      <div className="prose dark:prose-invert max-w-none mx-auto">
        <p data-aos="fade-in" data-aos-delay="200">
          {infoData?.devolucion.textDesc}
        </p>
      </div>
    </div>
  );
};

export default CambiosDevoluciones;
