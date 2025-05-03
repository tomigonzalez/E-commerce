"use client";

import { useInfoData } from "@/hooks/use-info-data";

const SobreNosotros = () => {
  const infoData = useInfoData((state) => state.data);

  return (
    <div className=" p-6 sm:p-20 text-center space-y-8">
      <h2 className="text-2xl font-semibold text-primary">
        {infoData?.sobreNosotros.titulo}
      </h2>

      <div className="max-w-6xl mx-auto sm:flex justify-center items-center space-y-8 sm:space-y-0">
        {/* Columna de texto */}
        <div className="sm:w-auto space-y-6">
          <p className="text-gray-700 dark:text-white">
            {infoData?.sobreNosotros.textDesc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SobreNosotros;
