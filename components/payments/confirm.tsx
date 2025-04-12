"use client";

import { useUserDataStore } from "@/hooks/user-data";
import { useCart } from "@/hooks/use-cart";
import React from "react";
import { useRouter } from "next/navigation";
import { usePostOrden } from "@/api/usePostOrden";
import { normalizarOrden } from "@/utils/normalizarOrden"; // si movés la lógica a utils

const Confirm = ({
  handleNext, // Pasamos la función de "Siguiente" si es necesario
  handleBack, // Pasamos la función de "Atrás"
}: {
  handleNext: () => void;
  handleBack: () => void;
}) => {
  const userData = useUserDataStore();
  const { items, clearCart } = useCart();
  const router = useRouter();
  const { postOrden, loading, error } = usePostOrden();
  console.log(userData, items);

  const ordenNormalizada = normalizarOrden(userData, items); // si exportás la función

  const handleConfirmarOrden = async () => {
    try {
      await postOrden(ordenNormalizada);
      clearCart();
      router.push("/gracias");
    } catch (err) {
      console.error("Error al crear la orden:", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Confirmación de Orden</h2>

      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm overflow-x-auto">
        {JSON.stringify(ordenNormalizada, null, 2)}
      </pre>

      {error && (
        <div className="mt-2 text-red-600 bg-red-100 p-2 rounded">{error}</div>
      )}

      {/* Botones "Atrás" y "Confirmar" */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Atrás
        </button>
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
