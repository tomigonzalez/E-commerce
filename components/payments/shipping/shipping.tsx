import { useUserDataStore } from "@/hooks/user-data";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useShippingQuote } from "./useShippingQuote";
import { ShippingOption } from "./shippingOptions";

const Shipping = ({
  onSelectShipping,
  handleNext,
  handleBack,
}: {
  onSelectShipping: (opcion: any) => void;
  handleNext: () => void;
  handleBack: () => void;
}) => {
  const {
    nombre,
    email,
    telefono,
    direccion,
    localidad,
    codigoPostal,
    setUserData,
  } = useUserDataStore();
  const [postalCode, setPostalCode] = useState(codigoPostal || ""); // Inicializar con el código postal ya cargado
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const { cotizar, resultados, error, loading } = useShippingQuote();

  const handleSubmit = () => {
    const destinatario = {
      name: nombre,
      company: nombre,
      email,
      phone: telefono,
      street: direccion,
      number: "",
      district: " ",
      city: localidad,
      state: "BA",
      country: "AR",
      postalCode,
    };

    setHasSubmitted(true);
    cotizar(destinatario, postalCode);

    // Actualizar el código postal en el store
    setUserData({ codigoPostal: postalCode });
  };

  const handleOptionSelect = (opcion: any) => {
    setSelectedOption(opcion);
    onSelectShipping(opcion);
  };

  const retiroEnLocalOption = {
    serviceDescription: "Retiro en local",
    carrier: "Sucursal",
    totalPrice: 0,
    deliveryEstimate: "Disponible inmediatamente",
    dropOff: 0,
    branches: [],
  };

  const opcionesDisponibles =
    resultados.length > 0
      ? [...resultados, retiroEnLocalOption]
      : [retiroEnLocalOption];

  return (
    <div className="max-w-md mx-auto p-6 bg-white border shadow-md rounded-xl">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
        Ingresá tu Código Postal para cotizar el envío
      </h2>

      <Label htmlFor="postalCode">Código Postal</Label>
      <Input
        id="postalCode"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        placeholder="Ej: 1425"
        className={error ? "border-red-500" : ""}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

      <Button onClick={handleSubmit} className="w-full mt-4" disabled={loading}>
        {loading ? "Cargando..." : "Cotizar Envío"}
      </Button>

      {hasSubmitted && !error && (
        <div className="mt-6 space-y-4">
          {opcionesDisponibles.map((res, idx) => (
            <ShippingOption
              key={idx}
              idx={idx}
              opcion={res}
              onSelect={handleOptionSelect}
              isSelected={
                selectedOption?.serviceDescription === res.serviceDescription
              }
              ciudadUsuario={localidad} // Aquí pasamos la ciudad del usuario
            />
          ))}
        </div>
      )}

      <div className="flex gap-2 mt-4 justify-between">
        <Button onClick={handleBack} className="w-auto" disabled={false}>
          Atrás
        </Button>
        <Button
          onClick={handleNext}
          className="w-auto"
          disabled={!selectedOption}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};

export default Shipping;
