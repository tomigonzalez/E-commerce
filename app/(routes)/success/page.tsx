"use client";

import { updateProductStock } from "@/api/usePeticionPutApi";
import { useCart } from "@/hooks/use-cart";
import { useEffect } from "react";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  const { items, clearCart } = useCart();

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("purchasedProducts", JSON.stringify(items));

      updateProductStock(items);

      clearCart();
      localStorage.removeItem("cart-storage");
    }
  }, [items]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-zinc-900 px-4">
      <div className="max-w-md w-full bg-gray-100 dark:bg-zinc-800 rounded-2xl shadow-md p-8 text-center space-y-6">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-white">
          ¡Pago exitoso!
        </h1>
        <p className="text-zinc-600 dark:text-zinc-300">
          Gracias por tu compra. Estamos actualizando el stock...
        </p>
      </div>
    </div>
  );
}
