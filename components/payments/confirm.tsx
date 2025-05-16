import React from "react";
import { Button } from "../ui/button";
import { validarStockYPrecios } from "@/api/validateStock";
import { usePostOrden } from "@/api/usePostOrden";
import { normalizarOrden } from "@/utils/normalizarOrden";
import api from "@/api/mpCheckout";
import { useUserDataStore } from "@/store/user-data";
import { useCart } from "@/store/use-cart";
import { toast } from "sonner";

const Confirm = ({
  handleBack,
}: {
  handleNext: () => void;
  handleBack: () => void;
}) => {
  const userData = useUserDataStore();
  const { items, clearCart } = useCart();
  const { postOrden, loading } = usePostOrden();

  const ordenNormalizada = normalizarOrden(userData, items);

  const handleConfirmarOrden = async () => {
    try {
      // Paso 1: Validar stock y precios desde el backend
      await validarStockYPrecios(items);

      // Paso 2: Crear orden en estado pendiente
      const ordenConEstadoPendiente = {
        ...ordenNormalizada,
        estado: "pendiente",
      };
      // Paso 3: Armar productos + envío y enviar a MercadoPago
      const ordenResponse = await postOrden(ordenConEstadoPendiente);

      if (ordenResponse?.data?.id) {
        localStorage.setItem(
          "ordenStrapiId",
          ordenResponse.data.documentId.toString()
        );
      }

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
          price: ordenNormalizada.envio?.precio || 0,
          quantity: 1,
        },
      ];

      const url = await api.product.submit(
        productosConEnvio,
        ordenResponse.data.documentId
      );

      if (!url) {
        alert("Hubo un problema con el pago. Inténtalo más tarde.");
        return;
      }

      window.location.href = url;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, {
          style: {
            backgroundColor: "#F56565", // rojo
            color: "#fff",
          },
        });
        localStorage.removeItem("cart-storage");
        clearCart();
      } else {
        toast.error(
          "Hubo un problema al procesar tu pedido. Inténtalo nuevamente.",
          {
            style: {
              backgroundColor: "#F56565",
              color: "#fff",
            },
          }
        );
      }
    }
  };

  return (
    <div className="p-6 space-y-6 bg-white rounded shadow max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Confirmación de Orden</h2>

      <div>
        <h3 className="font-medium text-gray-700 mb-1">Datos del Cliente</h3>
        <p>
          {ordenNormalizada.nombre} {ordenNormalizada.apellido}
        </p>
        <p>Email: {ordenNormalizada.email}</p>
        <p>Teléfono: {ordenNormalizada.telefono}</p>
        <p>DNI: {ordenNormalizada.dni}</p>
      </div>

      <div>
        <h3 className="font-medium text-gray-700 mb-1">Dirección de Envío</h3>
        <p>{ordenNormalizada.direccion}</p>
        <p>
          {ordenNormalizada.localidad} (CP: {ordenNormalizada.codigoPostal})
        </p>
      </div>

      <div>
        <h3 className="font-medium text-gray-700 mb-1">Método de Envío</h3>
        <p>Servicio: {ordenNormalizada.envio?.servicio}</p>
        <p>Transportista: {ordenNormalizada.envio?.transportista}</p>
        <p>Costo: ${ordenNormalizada.envio?.precio?.toLocaleString()}</p>
      </div>

      <div className="border-t pt-4">
        <p className="text-lg font-semibold">
          Total a pagar: ${ordenNormalizada.total.toLocaleString()}
        </p>
      </div>

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
