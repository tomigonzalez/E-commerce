"use client";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const CheckoutProgress = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {/* Barra de progreso */}
      <Progress value={step * 33.333333} className="w-[60%]" />

      {/* Texto de estado */}
      <div className="flex justify-between w-[60%] text-sm text-gray-600">
        <span className={step >= 1 ? "font-bold text-black" : ""}>
          Formulario
        </span>
        <span className={step >= 2 ? "font-bold text-black" : ""}>Envío</span>
        <span className={step === 3 ? "font-bold text-black" : ""}>
          Finalizar
        </span>
      </div>

      {/* Botones de navegación */}
      <div className="flex gap-2">
        <Button
          onClick={() => setStep((step) => step - 1)}
          disabled={step === 1}
        >
          Atrás
        </Button>
        <Button
          onClick={() => setStep((step) => step + 1)}
          disabled={step === 3}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};

export default CheckoutProgress;
