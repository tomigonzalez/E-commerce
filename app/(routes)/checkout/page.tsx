"use client";
import { Progress } from "@/components/ui/progress";

import React, { useState } from "react";
import { useUserDataStore } from "@/hooks/user-data";
import { useCart } from "@/hooks/use-cart";
import { validateUserData } from "@/utils/validateForms";

import Shipping from "@/components/payments/shipping/shipping";
import Confirm from "@/components/payments/confirm";
import CartSummaryItem from "./cartSummary/cartSummary";
import { FormsDatos } from "@/components/payments/formsDatos";
import ProgressPoints from "./components/ProgressPoints";

const CheckoutProgress = () => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { items } = useCart();
  const userData = useUserDataStore();

  // Función para manejar el avance al siguiente paso
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

  // Función para manejar el retroceso al paso anterior
  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  // Función para manejar la selección de envío
  const handleSeleccionEnvio = (opcion: any) => {
    useUserDataStore.getState().setUserData({ opcionEnvio: opcion });
  };

  // Determina qué contenido mostrar según el paso
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <FormsDatos
            errors={errors}
            setErrors={setErrors}
            handleNext={handleNext}
          />
        );
      case 2:
        return (
          <Shipping
            onSelectShipping={handleSeleccionEnvio}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      case 3:
        return <Confirm handleNext={handleNext} handleBack={handleBack} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 dark:bg-zinc-900 dark:text-white">
      <Progress value={step * 33.3333} className="w-full max-w-5xl" />
      <ProgressPoints step={step} />

      <div className="flex flex-col lg:flex-row w-full max-w-5xl gap-6">
        <div className="w-full lg:w-[60%]">{renderStepContent()}</div>

        <div className="w-full lg:w-[40%] border rounded-lg p-4 dark:border-zinc-700 dark:bg-zinc-800">
          <h2 className="text-lg font-semibold mb-3">Resumen del carrito</h2>

          {items.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Tu carrito está vacío.
            </p>
          ) : (
            <ul className="flex flex-col gap-4 max-h-[400px] overflow-auto">
              {items.map((item) => (
                <CartSummaryItem key={item.id} product={item} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutProgress;
