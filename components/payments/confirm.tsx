"use client";

import { useUserDataStore } from "@/hooks/user-data";
import { useCart } from "@/hooks/use-cart";
import React from "react";
import { useRouter } from "next/navigation";
import { usePostOrden } from "@/api/usePostOrden";
import { normalizarOrden } from "@/utils/normalizarOrden";
import { Button } from "../ui/button";
import api from "@/api/mpCheckout";

const Confirm = ({
  handleBack,
}: {
  handleNext: () => void;
  handleBack: () => void;
}) => {
  const userData = useUserDataStore();
  const { items } = useCart();
  const { postOrden, loading, error } = usePostOrden();

  const ordenNormalizada = normalizarOrden(userData, items);
  const {
    nombre,
    apellido,
    email,
    telefono,
    dni,
    direccion,
    localidad,
    codigoPostal,
    envio,
    total,
  } = ordenNormalizada;

  const handleConfirmarOrden = async () => {
    try {
      const ordenConEstadoPendiente = {
        ...ordenNormalizada,
        estado: "pendiente",
      };

      const ordenResponse = await postOrden(ordenConEstadoPendiente);
      console.log("✅ Orden creada:", ordenResponse);

      const productosConEnvio = [
        ...items.map((item) => ({
          id: item.id,
          productName: item.productName,
          price: item.price,
          quantity: item.quantity,
        })),
        {
          id: 9999,
          productName: "Costo de Envío",
          price: envio?.precio || 0,
          quantity: 1,
        },
      ];

      const url = await api.product.submit(productosConEnvio);

      if (!url) {
        alert("Hubo un problema con el pago. Inténtalo más tarde.");
        return;
      }

      window.location.href = url;
    } catch (error) {
      console.error("Error en el checkout:", error);
      alert("No se pudo procesar el pago. Inténtalo nuevamente.");
    }
  };

  return (
    <div className="p-6 space-y-6 bg-white rounded shadow max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Confirmación de Orden</h2>

      <div>
        <h3 className="font-medium text-gray-700 mb-1">Datos del Cliente</h3>
        <p>
          {nombre} {apellido}
        </p>
        <p>Email: {email}</p>
        <p>Teléfono: {telefono}</p>
        <p>DNI: {dni}</p>
      </div>

      <div>
        <h3 className="font-medium text-gray-700 mb-1">Dirección de Envío</h3>
        <p>{direccion}</p>
        <p>
          {localidad} (CP: {codigoPostal})
        </p>
      </div>

      <div>
        <h3 className="font-medium text-gray-700 mb-1">Método de Envío</h3>
        <p>Servicio: {envio?.servicio}</p>
        <p>Transportista: {envio?.transportista}</p>
        <p>Costo: ${envio?.precio?.toLocaleString()}</p>
      </div>

      <div className="border-t pt-4">
        <p className="text-lg font-semibold">
          Total a pagar: ${total.toLocaleString()}
        </p>
      </div>

      {error && (
        <div className="mt-2 text-red-600 bg-red-100 p-2 rounded">{error}</div>
      )}

      <div className="flex gap-2">
        <Button
          onClick={handleBack}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded cursor-pointer hover:bg-gray-300"
        >
          Atrás
        </Button>
        <button
          onClick={handleConfirmarOrden}
          disabled={loading}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Procesando..." : "Confirmar y Pagar"}
        </button>
      </div>
    </div>
  );
};

export default Confirm;
