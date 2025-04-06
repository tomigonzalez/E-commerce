"use client";

import { useUserDataStore } from "@/hooks/user-data";
import React from "react";

const Confirm = () => {
  const userData = useUserDataStore();

  // Normalización de los datos para enviar a Strapi
  const normalizarOrder = (data: any) => {
    const {
      email,
      nombre,
      apellido,
      dni,
      direccion,
      localidad,
      codigoPostal,
      telefono,
      opcionEnvio,
    } = data;

    return {
      email,
      nombre,
      apellido,
      dni,
      direccion,
      localidad,
      codigoPostal,
      telefono,
      envio: {
        carrier: opcionEnvio?.carrier,
        servicio: opcionEnvio?.serviceDescription,
        precio: opcionEnvio?.totalPrice,
        estimado: opcionEnvio?.deliveryEstimate,
        sucursal: opcionEnvio?.branches?.[0]?.address || null,
      },
    };
  };

  const ordenNormalizada = normalizarOrder(userData);

  console.log("Orden lista para enviar a Strapi:", ordenNormalizada);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Confirmación de Orden</h2>

      <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
        {JSON.stringify(ordenNormalizada, null, 2)}
      </pre>
    </div>
  );
};

export default Confirm;
