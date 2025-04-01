"use client";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

// Componentes de los formularios
const Formulario = () => (
  <div>
    <h2 className="text-lg font-bold">Paso 1: Formulario</h2>
    <input type="text" placeholder="Nombre" className="border p-2 w-full" />
  </div>
);

const Envio = () => (
  <div>
    <h2 className="text-lg font-bold">Paso 2: Envío</h2>
    <input type="text" placeholder="Dirección" className="border p-2 w-full" />
  </div>
);

const Finalizar = () => (
  <div>
    <h2 className="text-lg font-bold">Paso 3: Finalizar</h2>
    <p>Revisa tu información antes de confirmar.</p>
  </div>
);

const CheckoutProgress = () => {
  const [step, setStep] = useState(1);

  // Determina qué formulario mostrar
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <Formulario />;
      case 2:
        return <Envio />;
      case 3:
        return <Finalizar />;
      default:
        return null;
    }
  };

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

      {/* Contenido dinámico */}
      <div className="w-[60%]">{renderStepContent()}</div>

      {/* Botones de navegación */}
      <div className="flex gap-2">
        <Button onClick={() => setStep(step - 1)} disabled={step === 1}>
          Atrás
        </Button>
        <Button onClick={() => setStep(step + 1)} disabled={step === 3}>
          Siguiente
        </Button>
      </div>
    </div>
  );
};

export default CheckoutProgress;
