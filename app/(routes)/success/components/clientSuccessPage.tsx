"use client";

import { updateProductStock } from "@/api/usePeticionPutApi";
import { useCart } from "@/hooks/use-cart";
import { useEffect } from "react";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function ClientSuccessPage() {
  const { items, clearCart } = useCart();
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("status");

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (paymentStatus === "approved" && items.length > 0) {
      // updateProductStock(items);
      clearCart();
      localStorage.removeItem("cart-storage");
    }

    // Ya no se necesita updateOrderStatus aquí, eso lo maneja el webhook
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
