"use client";

import { updateProductStock } from "@/api/usePeticionPutApi";
import { useCart } from "@/hooks/use-cart";
import { useEffect } from "react";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { updateOrderStatus } from "@/api/usePutOrden";

export default function SuccessPage() {
  const { items, clearCart } = useCart();
  const searchParams = useSearchParams();

  const paymentStatus = searchParams.get("status"); // valores esperados: 'approved', 'cancelled', 'pending'

  useEffect(() => {
    if (typeof window === "undefined") return; // asegura ejecución en cliente

    const ordenId = localStorage.getItem("ordenStrapiId");

    if (paymentStatus === "approved" && items.length > 0) {
      updateProductStock(items);
      clearCart();
      localStorage.removeItem("cart-storage");

      if (ordenId) updateOrderStatus(ordenId, "confirmado");
    }

    if (paymentStatus === "rejected") {
      if (ordenId) updateOrderStatus(ordenId, "cancelado");
    }
    if (paymentStatus === "in_process") {
      if (ordenId) updateOrderStatus(ordenId, "pendiente");
    }
  }, [items, paymentStatus]);

  const renderMessage = () => {
    switch (paymentStatus) {
      case "approved":
        return {
          icon: <CheckCircle className="mx-auto h-16 w-16 text-green-500" />,
          title: "¡Pago exitoso!",
          message: "Gracias por tu compra. Estamos actualizando el stock...",
        };
      case "rejected":
        return {
          icon: <XCircle className="mx-auto h-16 w-16 text-red-500" />,
          title: "Pago cancelado",
          message:
            "Tu pago fue cancelado. Si fue un error, intentá nuevamente.",
        };
      case "in_process":
        return {
          icon: <Clock className="mx-auto h-16 w-16 text-yellow-500" />,
          title: "Pago pendiente",
          message: "Estamos esperando la confirmación del pago.",
        };
      default:
        return {
          icon: null,
          title: "Estado desconocido",
          message: "No pudimos determinar el estado del pago.",
        };
    }
  };

  const { icon, title, message } = renderMessage();

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-zinc-900 px-4">
      <div className="max-w-md w-full bg-gray-100 dark:bg-zinc-800 rounded-2xl shadow-md p-8 text-center space-y-6">
        {icon}
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-white">
          {title}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-300">{message}</p>
      </div>
    </div>
  );
}
