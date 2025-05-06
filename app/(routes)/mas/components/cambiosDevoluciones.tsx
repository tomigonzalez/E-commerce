"use client";
import { useInfoData } from "@/hooks/use-info-data";
import React from "react";

type Props = {};

const CambiosDevoluciones = (props: Props) => {
  const infoData = useInfoData((state) => state.data);

  return (
    <div className="p-6 sm:p-20 text-center space-y-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold text-primary">
        {infoData?.devolucion.titleText}
      </h2>

      <p className="text-gray-700 dark:text-white">
        {infoData?.devolucion.textDesc}
      </p>
    </div>
  );
};

export default CambiosDevoluciones;
