import { useState } from "react";

export function usePostOrden() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postOrden = async (orden: any) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ordens`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: orden }),
        }
      );

      if (!res.ok) {
        throw new Error("Error al crear la orden");
      }

      const json = await res.json();
      return json;
    } catch (err: any) {
      setError(err.message || "Ocurrió un error");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { postOrden, loading, error };
}
