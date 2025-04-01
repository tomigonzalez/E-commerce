"use client";
import { useState } from "react";

// Definir la interfaz para el tipo de dato de envío
interface ShippingOption {
  provider: string;
  price: number;
  estimatedDays: number;
}

const Checkout = () => {
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);

  const fetchShippingRates = async () => {
    const response = await fetch("/api/shipping", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        zipOrigin: "1000",
        zipDest: "2000",
        weight: 1.5,
      }),
    });

    const data = await response.json();
    setShippingOptions(data.shippingOptions);
  };

  return (
    <div>
      <h2>Opciones de Envío</h2>
      <button onClick={fetchShippingRates}>Calcular Envío</button>
      {shippingOptions.length > 0 && (
        <ul>
          {shippingOptions.map((option, index) => (
            <li key={index}>
              <strong>{option.provider}</strong>: ${option.price} -{" "}
              {option.estimatedDays} días
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Checkout;
