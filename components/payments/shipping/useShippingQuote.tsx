// hooks/useShippingQuote.ts
import { useState } from "react";
import { cotizarEnvioConCarrier } from "@/api/checkout";

export const useShippingQuote = () => {
  const [loading, setLoading] = useState(false);
  const [resultados, setResultados] = useState<any[]>([]);
  const [error, setError] = useState("");

  const cotizar = async (destinatario: any, postalCode: string) => {
    if (!/^\d{4,5}$/.test(postalCode)) {
      setError("Código postal inválido");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const [oca, andreani] = await Promise.all([
        cotizarEnvioConCarrier(destinatario, "OCA"),
        cotizarEnvioConCarrier(destinatario, "Andreani"),
      ]);

      const todasLasOpciones = [...(oca.data || []), ...(andreani.data || [])];

      const opcionesFiltradas = todasLasOpciones
        .filter(
          (op) =>
            op.service !== "sucursal" &&
            op.service !== "oca_PS" &&
            op.service !== "oca_PP"
        )
        .sort((a, b) => a.totalPrice - b.totalPrice);

      setResultados(opcionesFiltradas);
    } catch (e) {
      console.error("Error al cotizar:", e);
      setError("Ocurrió un error al cotizar el envío");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, resultados, cotizar };
};
