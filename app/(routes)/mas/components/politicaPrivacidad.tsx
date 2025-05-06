"use client";

import { useInfoData } from "@/hooks/use-info-data";
import React from "react";

const PoliticaPrivacidad = () => {
  const infoData = useInfoData((state) => state.data);

  return (
    <div className="p-6 sm:p-10 text-center space-y-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold text-primary">
        Política de Privacidad
      </h2>

      <p className="text-gray-700 dark:text-white">
        En <strong>{infoData?.politicaPrivacidad.nombreTienda}</strong>, nos
        comprometemos a proteger la privacidad de nuestros clientes y
        visitantes. Esta Política describe cómo recopilamos, utilizamos y
        protegemos tu información personal cuando visitás nuestro sitio{" "}
        <a
          href={infoData?.politicaPrivacidad.sitioWeb}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {infoData?.politicaPrivacidad.sitioWeb}
        </a>
        . Cumplimos con lo dispuesto en la Ley 25.326.
      </p>

      <p className="text-gray-700 dark:text-white">
        Si tenés dudas, podés escribirnos a{" "}
        <a
          href={`mailto:${infoData?.politicaPrivacidad.email}`}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {infoData?.politicaPrivacidad.email}
        </a>
        .
      </p>

      <div className="text-left space-y-6">
        <section>
          <h3 className="text-xl font-semibold text-primary mb-2">
            Información que Recopilamos
          </h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-white space-y-1">
            <li>
              <strong>Información personal:</strong> Nombre, email, DNI, CUIL,
              teléfono, dirección.
            </li>
            <li>
              <strong>Datos de pago:</strong> No almacenamos tarjetas. Usamos
              pasarelas externas seguras.
            </li>
            <li>
              <strong>Datos de navegación:</strong> IP, dispositivo, navegador,
              páginas visitadas.
            </li>
            <li>
              <strong>Cookies:</strong> Para mejorar la experiencia y mostrar
              contenido relevante.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-primary mb-2">
            Uso de la Información
          </h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-white space-y-1">
            <li>Procesar pedidos y brindar atención al cliente.</li>
            <li>Enviar comunicaciones comerciales con tu consentimiento.</li>
            <li>Mejorar el sitio web y prevenir fraudes.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-primary mb-2">
            Compartición con Terceros
          </h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-white space-y-1">
            <li>
              <strong>Proveedores:</strong> Servicios de pago, logística o
              marketing.
            </li>
            <li>
              <strong>Legales:</strong> Solo si la ley lo requiere o por
              procesos judiciales.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-primary mb-2">
            Derechos del Usuario
          </h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-white space-y-1">
            <li>Acceder, modificar o eliminar tus datos personales.</li>
            <li>Retirar tu consentimiento de uso comercial.</li>
            <li>
              Solicitar la eliminación de datos salvo obligación legal de
              conservación.
            </li>
          </ul>
          <p className="mt-2 text-gray-700">
            Para ejercer tus derechos, escribinos a{" "}
            <a
              href={`mailto:${infoData?.politicaPrivacidad.email}`}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              {infoData?.politicaPrivacidad.email}
            </a>
            .
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-primary mb-2">
            Uso de Cookies
          </h3>
          <p className="text-gray-700 dark:text-white">
            Usamos cookies para mejorar tu navegación. Podés desactivarlas en tu
            navegador, aunque esto puede afectar tu experiencia.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-primary mb-2">
            Cambios en la Política
          </h3>
          <p className="text-gray-700 dark:text-white">
            Esta política puede actualizarse sin previo aviso. Te sugerimos
            revisarla periódicamente.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PoliticaPrivacidad;
