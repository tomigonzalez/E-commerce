"use client";
import { useInfoData } from "@/hooks/use-info-data";
import React from "react";

type Props = {};

const PoliticaPrivacidad = (props: Props) => {
  const infoData = useInfoData((state) => state.data);

  return (
    <section className="prose dark:prose-invert max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center text-primary mb-10">
        Política de Privacidad
      </h1>

      <p>
        En <strong>{infoData?.politicaPrivacidad.nombreTienda}</strong>, nos
        comprometemos a proteger la privacidad de nuestros clientes y
        visitantes. Esta Política de Privacidad describe cómo recopilamos,
        utilizamos y protegemos tu información personal cuando visitas nuestro
        sitio web{" "}
        <a
          href={infoData?.politicaPrivacidad.sitioWeb}
          className="text-blue-600 hover:text-blue-800 transition-colors underline"
        >
          {infoData?.politicaPrivacidad.sitioWeb}
        </a>{" "}
        y realizás compras con nosotros.{" "}
        {infoData?.politicaPrivacidad.nombreTienda} hará su mejor esfuerzo para
        proteger la privacidad de los mismos, conforme a la Ley 25.326.
      </p>

      <p>
        Te invitamos a leer detalladamente nuestra Política de Privacidad. Si
        tenés alguna duda, escribinos a{" "}
        <a
          href={`mailto:${infoData?.politicaPrivacidad.email}`}
          className="text-blue-600 hover:text-blue-800 transition-colors underline"
        >
          {infoData?.politicaPrivacidad.email}
        </a>
        .
      </p>

      <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mt-10 mb-4">
        Información que Recopilamos
      </h2>
      <ul className="list-disc list-inside marker:text-blue-500 space-y-2">
        <li>
          <strong>Información personal:</strong> Nombre, apellido, correo
          electrónico, DNI, CUIL/CUIT, teléfono y dirección de envío.
        </li>
        <li>
          <strong>Datos de pago:</strong> No almacenamos tarjetas de crédito ni
          métodos de pago. Usamos pasarelas de terceros seguras.
        </li>
        <li>
          <strong>Datos de navegación:</strong> Dirección IP, dispositivo,
          navegador y páginas visitadas.
        </li>
        <li>
          <strong>Cookies:</strong> Utilizamos cookies para mejorar tu
          experiencia y personalizar contenido.
        </li>
      </ul>

      <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mt-10 mb-4">
        Uso de la Información
      </h2>
      <ul className="list-disc list-inside marker:text-blue-500 space-y-2">
        <li>Procesar y gestionar pedidos.</li>
        <li>Atender al cliente y responder consultas.</li>
        <li>Enviar comunicaciones comerciales (si diste tu consentimiento).</li>
        <li>Mejorar el sitio web y personalizar la experiencia.</li>
        <li>Cumplir con obligaciones legales y prevenir fraudes.</li>
      </ul>

      <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mt-10 mb-4">
        Compartición de Datos con Terceros
      </h2>
      <ul className="list-disc list-inside marker:text-blue-500 space-y-2">
        <li>
          <strong>Proveedores de servicios:</strong> pagos, envíos, marketing,
          entre otros.
        </li>
        <li>
          <strong>Requerimientos legales:</strong> si la ley lo exige o ante
          procesos judiciales.
        </li>
      </ul>

      <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mt-10 mb-4">
        Derechos del Usuario
      </h2>
      <p>Tus derechos incluyen:</p>
      <ul className="list-disc list-inside marker:text-blue-500 space-y-2">
        <li>Retirar consentimiento para comunicaciones comerciales.</li>
        <li>
          Solicitar eliminación de datos (excepto por obligaciones legales).
        </li>
      </ul>
      <p>
        {infoData?.politicaPrivacidad.nombreTienda} tratará tus datos conforme a
        la Ley 25.326. Para ejercer tus derechos, escribinos a{" "}
        <a
          href={`mailto:${infoData?.politicaPrivacidad.email}`}
          className="text-blue-600 hover:text-blue-800 transition-colors underline"
        >
          {infoData?.politicaPrivacidad.email}
        </a>
        .
      </p>

      <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mt-10 mb-4">
        Uso de Cookies
      </h2>
      <p>
        Usamos cookies para mejorar la navegación y funcionalidad. Podés
        configurar tu navegador para rechazarlas, aunque podría afectar la
        experiencia del sitio.
      </p>

      <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mt-10 mb-4">
        Cambios en la Política de Privacidad
      </h2>
      <p>
        Nos reservamos el derecho de modificar esta política en cualquier
        momento. Te recomendamos revisarla periódicamente.
      </p>

      <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mt-10 mb-4">
        7. Contacto
      </h2>
      <p>Si tenés preguntas, escribinos a:</p>
      <ul className="list-none space-y-2">
        <li>
          <strong>📧 Correo:</strong>{" "}
          <a
            href={`mailto:${infoData?.politicaPrivacidad.email}`}
            className="text-blue-600 hover:text-blue-800 transition-colors underline"
          >
            {infoData?.politicaPrivacidad.email}
          </a>
        </li>
        <li>
          <strong>📍 Dirección:</strong>{" "}
          {infoData?.politicaPrivacidad.direccion}
        </li>
      </ul>
    </section>
  );
};

export default PoliticaPrivacidad;
