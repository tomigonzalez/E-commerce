"use client";
import Image from "next/image";

const GuiaDeTalles = () => {
  return (
    <div
      className=" p-6 sm:p-20 rounded-lg  max-w-6xl mx-auto space-y-8"
      id="guia-de-talles"
    >
      <h2 className="text-2xl font-semibold text-center text-primary dark:text-white">
        Guía de Talles
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Columna de imagen */}
        <div className="flex justify-center items-center">
          <Image
            loading="lazy"
            src="/subirImg.png" // Asegúrate de tener la imagen en la carpeta public/images
            alt="Imagen de guía de talles"
            width={400}
            height={400}
            className="rounded-lg  object-cover"
          />
        </div>

        {/* Columna de tabla de talles */}
        <div>
          <table className="min-w-full text-center  ">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-gray-700 font-semibold dark:text-white">
                  Tamaño
                </th>
                <th className="py-2 px-4 border-b text-gray-700 font-semibold dark:text-white">
                  Pecho (cm)
                </th>
                <th className="py-2 px-4 border-b text-gray-700 font-semibold dark:text-white">
                  Cintura (cm)
                </th>
                <th className="py-2 px-4 border-b text-gray-700 font-semibold dark:text-white">
                  Cadera (cm)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b text-gray-600 dark:text-white">
                  S
                </td>
                <td className="py-2 px-4 border-b text-gray-600 dark:text-white">
                  85-90
                </td>
                <td className="py-2 px-4 border-b text-gray-600 dark:text-white">
                  70-75
                </td>
                <td className="py-2 px-4 border-b text-gray-600 dark:text-white">
                  90-95
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-gray-600 dark:text-white">
                  M
                </td>
                <td className="py-2 px-4 border-b text-gray-600 dark:text-white">
                  91-96
                </td>
                <td className="py-2 px-4 border-b text-gray-600 dark:text-white">
                  76-81
                </td>
                <td className="py-2 px-4 border-b text-gray-600 dark:text-white">
                  96-101
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-gray-600 dark:text-white">
                  L
                </td>
                <td className="py-2 px-4 border-b text-gray-600 dark:text-white">
                  97-102
                </td>
                <td className="py-2 px-4 border-b text-gray-600 dark:text-white">
                  82-87
                </td>
                <td className="py-2 px-4 border-b text-gray-600 dark:text-white">
                  102-107
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-gray-600 dark:text-white">
                  XL
                </td>
                <td className="py-2 px-4 border-b text-gray-600 dark:text-white">
                  103-108
                </td>
                <td className="py-2 px-4 border-b text-gray-600 dark:text-white">
                  88-93
                </td>
                <td className="py-2 px-4 border-b text-gray-600 dark:text-white">
                  108-113
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GuiaDeTalles;
