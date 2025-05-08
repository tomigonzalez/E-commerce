"use client";

import { useInfoData } from "@/hooks/use-info-data";

const SobreNosotros = () => {
  const infoData = useInfoData((state) => state.data);

  return (
    <div className="p-6 sm:p-10 max-w-5xl mx-auto " data-aos="fade-in">
      <h2 className="text-3xl font-semibold text-primary text-center mb-8">
        {infoData?.sobreNosotros.titulo}
      </h2>

      <div className="prose dark:prose-invert max-w-none mx-auto">
        <p>{infoData?.sobreNosotros.textDesc}</p>
      </div>
    </div>
  );
};

export default SobreNosotros;
