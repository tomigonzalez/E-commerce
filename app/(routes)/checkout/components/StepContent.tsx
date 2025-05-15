import Confirm from "@/components/payments/confirm";
import { FormsDatos } from "@/components/payments/formsDatos";
import Shipping from "@/components/payments/shipping/shipping";
import { useUserDataStore } from "@/store/user-data";

// components/payments/StepContent.tsx
const StepContent = ({
  step,
  handleNext,
  handleBack,
  errors,
  setErrors,
}: any) => {
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
      const handleSeleccionEnvio = (opcion: any) => {
        useUserDataStore.getState().setUserData({ opcionEnvio: opcion });
      };
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

export default StepContent;
