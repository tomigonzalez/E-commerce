"use client";

import { useInfoData } from "@/hooks/use-info-data";
import React from "react";

const PoliticaPrivacidad = () => {
  const infoData = useInfoData((state) => state.data);

  return (
    <div className="p-6 sm:p-10 max-w-5xl mx-auto ">
      <h2
        className="text-3xl font-semibold text-center text-primary mb-10"
        data-aos="fade-in"
        data-aos-delay="200"
      >
        Política de Privacidad
      </h2>

      <div className="prose dark:prose-invert max-w-none prose-a:text-blue-600 hover:prose-a:text-blue-800">
        <p data-aos="fade-in" data-aos-delay="200">
          En <strong>{infoData?.politicaPrivacidad.nombreTienda}</strong>, nos
          comprometemos a proteger la privacidad de nuestros clientes y
          visitantes. Esta Política describe cómo recopilamos, utilizamos y
          protegemos tu información personal cuando visitás nuestro sitio{" "}
          <a href={infoData?.politicaPrivacidad.sitioWeb}>
            {infoData?.politicaPrivacidad.sitioWeb}
          </a>
          . Cumplimos con lo dispuesto en la Ley 25.326.
        </p>

        <p data-aos="fade-in" data-aos-delay="200">
          Si tenés dudas, podés escribirnos a{" "}
          <a href={`mailto:${infoData?.politicaPrivacidad.email}`}>
            {infoData?.politicaPrivacidad.email}
          </a>
          .
        </p>

        <section>
          <h3 data-aos="fade-in" data-aos-delay="200">
            Información que Recopilamos
          </h3>
          <ul>
            <li data-aos="fade-in" data-aos-delay="200">
              <strong>Información personal:</strong> Nombre, email, DNI, CUIL,
              teléfono, dirección.
            </li>
            <li data-aos="fade-in">
              <strong>Datos de pago:</strong> No almacenamos tarjetas. Usamos
              pasarelas externas seguras.
            </li>
            <li data-aos="fade-in">
              <strong>Datos de navegación:</strong> IP, dispositivo, navegador,
              páginas visitadas.
            </li>
            <li data-aos="fade-in">
              <strong>Cookies:</strong> Para mejorar la experiencia y mostrar
              contenido relevante.
            </li>
          </ul>
        </section>

        <section>
          <h3 data-aos="fade-in">Uso de la Información</h3>
          <ul>
            <li data-aos="fade-in">
              Procesar pedidos y brindar atención al cliente.
            </li>
            <li data-aos="fade-in">
              Enviar comunicaciones comerciales con tu consentimiento.
            </li>
            <li data-aos="fade-in">Mejorar el sitio web y prevenir fraudes.</li>
          </ul>
        </section>

        <section>
          <h3 data-aos="fade-in">Compartición con Terceros</h3>
          <ul>
            <li data-aos="fade-in">
              <strong>Proveedores:</strong> Servicios de pago, logística o
              marketing.
            </li>
            <li data-aos="fade-in">
              <strong>Legales:</strong> Solo si la ley lo requiere o por
              procesos judiciales.
            </li>
          </ul>
        </section>

        <section>
          <h3 data-aos="fade-in">Derechos del Usuario</h3>
          <ul>
            <li data-aos="fade-in">
              Acceder, modificar o eliminar tus datos personales.
            </li>
            <li data-aos="fade-in">
              Retirar tu consentimiento de uso comercial.
            </li>
            <li data-aos="fade-in">
              Solicitar la eliminación de datos salvo obligación legal de
              conservación.
            </li>
          </ul>
          <p data-aos="fade-in">
            Para ejercer tus derechos, escribinos a{" "}
            <a href={`mailto:${infoData?.politicaPrivacidad.email}`}>
              {infoData?.politicaPrivacidad.email}
            </a>
            .
          </p>
        </section>

        <section>
          <h3 data-aos="fade-in">Uso de Cookies</h3>
          <p data-aos="fade-in">
            Usamos cookies para mejorar tu navegación. Podés desactivarlas en tu
            navegador, aunque esto puede afectar tu experiencia.
          </p>
        </section>

        <section>
          <h3 data-aos="fade-in">Cambios en la Política</h3>
          <p data-aos="fade-in">
            Esta política puede actualizarse sin previo aviso. Te sugerimos
            revisarla periódicamente.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PoliticaPrivacidad;
