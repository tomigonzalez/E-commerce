"use client";

const SobreNosotros = () => {
  return (
    <div className=" p-6 sm:p-20 text-center space-y-8">
      <h2 className="text-2xl font-semibold text-primary">Sobre Nosotros</h2>

      <div className="max-w-6xl mx-auto sm:flex justify-center items-center space-y-8 sm:space-y-0">
        {/* Columna de texto */}
        <div className="sm:w-auto space-y-6">
          <p className="text-gray-700 dark:text-white">
            Somos una empresa dedicada a ofrecer soluciones innovadoras y de
            alta calidad. Nuestra misión es mejorar la experiencia de nuestros
            clientes a través de productos y servicios que marcan la diferencia.
            Contamos con un equipo profesional altamente calificado y apasionado
            por lo que hace.
          </p>
          <p className="text-gray-700 dark:text-white">
            Nos comprometemos con la excelencia, la sostenibilidad y el trato
            cercano. Cada proyecto que emprendemos refleja nuestros valores y el
            deseo de generar un impacto positivo. Trabajamos para transformar
            ideas en soluciones efectivas que beneficien a todos nuestros
            clientes y socios.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SobreNosotros;
