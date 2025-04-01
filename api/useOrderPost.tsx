import { Order } from "@/types/order";
import { useState } from "react";

export function useFetchOrder() {
  const [result, setResult] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendOrder = async (order: Order, orderId?: number) => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ordens${orderId ? `/${orderId}` : ""}`;
      const response = await fetch(url, {
        method: orderId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: order }),
      });

      if (!response.ok) throw new Error("Error en la petición");

      const { data } = await response.json();
      setResult(data);
    } catch (error: any) {
      setError(error.message || "Error en el servidor");
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, error, sendOrder };
}
