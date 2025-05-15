"use client";

import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/use-cart";
import { useUserDataStore } from "@/store/user-data";
import { validateUserData } from "@/utils/validateForms";

import ProgressPoints from "./components/ProgressPoints";
import CartSummaryItem from "./cartSummary/cartSummary";
import EmptyCartMessage from "./components/EmptyCartMessage";
import StepContent from "./components/StepContent";

const CheckoutProgress = () => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { items } = useCart();
  const userData = useUserDataStore();

  if (items.length === 0) return <EmptyCartMessage />;

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

  const handleBack = () => setStep((prev) => prev - 1);

  return (
    <div className="flex flex-col items-center gap-4 p-4 dark:bg-zinc-900 dark:text-white">
      <Progress value={step * 33.3333} className="w-full max-w-5xl" />
      <ProgressPoints step={step} />

      <div className="flex flex-col lg:flex-row w-full max-w-5xl gap-6">
        <div className="w-full lg:w-[60%]">
          <StepContent
            step={step}
            handleNext={handleNext}
            handleBack={handleBack}
            errors={errors}
            setErrors={setErrors}
          />
        </div>

        <div className="w-full lg:w-[40%] border rounded-lg p-4 dark:border-zinc-700 dark:bg-zinc-800">
          <h2 className="text-lg font-semibold mb-3">Resumen del carrito</h2>
          <ul className="flex flex-col gap-4 max-h-[400px] overflow-auto">
            {items.map((item) => (
              <CartSummaryItem
                key={`${item.id}-${item.sizeSelected}`}
                product={item}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProgress;
