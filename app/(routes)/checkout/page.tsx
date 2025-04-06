"use client";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

import Shipping from "@/components/payments/shipping/shipping";
import Confirm from "@/components/payments/confirm";
import { useUserDataStore } from "@/hooks/user-data";
import { validateUserData } from "@/utils/validateForms";
import { FormsDatos } from "@/components/payments/formsDatos";

const CheckoutProgress = () => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const userData = useUserDataStore();

  const handleNext = () => {
    if (step === 1) {
      const validationErrors = validateUserData(userData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      setErrors({});
    }

    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSeleccionEnvio = (opcion: any) => {
    useUserDataStore.getState().setUserData({ opcionEnvio: opcion });

    // Ahora sí, obtené el estado actualizado
    const estadoActualizado = useUserDataStore.getState();
    console.log(
      "🚚 Opción de envío seleccionada:",
      estadoActualizado.opcionEnvio
    );

    setStep(3);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <FormsDatos errors={errors} setErrors={setErrors} />;
      case 2:
        return <Shipping onSelectShipping={handleSeleccionEnvio} />;
      case 3:
        return <Confirm />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <Progress value={step * 33.3333} className="w-[60%]" />

      <div className="flex justify-between w-[60%] text-sm text-gray-600">
        <span className={step >= 1 ? "font-bold text-black" : ""}>
          Formulario
        </span>
        <span className={step >= 2 ? "font-bold text-black" : ""}>Envío</span>
        <span className={step === 3 ? "font-bold text-black" : ""}>
          Finalizar
        </span>
      </div>

      <div className="w-[60%]">{renderStepContent()}</div>

      <div className="flex gap-2">
        <Button onClick={handleBack} disabled={step === 1}>
          Atrás
        </Button>
        <Button onClick={handleNext} disabled={step === 3}>
          Siguiente
        </Button>
      </div>
    </div>
  );
};

export default CheckoutProgress;
