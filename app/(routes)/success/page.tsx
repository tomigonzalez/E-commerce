"use client";

import { updateProductStock } from "@/api/usePeticionPutApi";
import { useCart } from "@/hooks/use-cart";
import { useEffect } from "react";

export default function SuccessPage() {
  const { items, clearCart } = useCart(); // Obtén los productos del carrito
  console.log(items);
  useEffect(() => {
    if (items.length > 0) {
      // Guardar productos en localStorage
      localStorage.setItem("purchasedProducts", JSON.stringify(items));

      // Pasar los productos a la función de actualización de stock
      updateProductStock(items);

      // Limpiar el carrito después de la compra
      clearCart();
      // Puedes hacer esto en el store Zustand también o aquí
      localStorage.removeItem("cart-storage"); // Limpiar el carrito en localStorage si es necesario
    }
  }, [items]); // Ejecuta este efecto cuando los productos cambien (es decir, cuando el carrito se actualice)

  return (
    <div>
      <h1>¡Pago exitoso!</h1>
      <p>Gracias por tu compra. Actualizando stock...</p>
    </div>
  );
}
