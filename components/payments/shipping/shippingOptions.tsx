import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const ShippingOption = ({
  opcion,
  idx,
  onSelect,
  isSelected,
  ciudadUsuario,
}: any) => {
  const [selectedBranchId, setSelectedBranchId] = useState("");

  const handleSelect = () => {
    const selectedBranch = opcion.branches?.find(
      (branch: any) => branch.branch_id === selectedBranchId
    );

    onSelect({
      ...opcion,
      selectedBranch: selectedBranch || null, // agregamos la sucursal elegida
    });
  };

  // Filtrar las sucursales por ciudad
  const filteredBranches =
    opcion.branches?.filter(
      (branch: any) =>
        branch.address.city.toUpperCase() === ciudadUsuario.toUpperCase()
    ) || [];

  return (
    <div className="border rounded p-4 shadow-sm space-y-2 bg-white dark:bg-gray-800 dark:border-gray-700">
      <h3 className="font-semibold text-gray-900 dark:text-white">
        {opcion.serviceDescription}
      </h3>
      <p className="text-gray-700 dark:text-gray-300">
        Carrier: {opcion.carrier}
      </p>
      <p className="text-gray-700 dark:text-gray-300">
        Precio: ARS ${opcion.totalPrice.toFixed(2)}
      </p>
      <p className="text-gray-700 dark:text-gray-300">
        Entrega estimada: {opcion.deliveryEstimate}
      </p>

      {opcion.dropOff > 0 && filteredBranches.length > 0 && (
        <div>
          <Label
            htmlFor={`branch-select-${idx}`}
            className="text-gray-700 dark:text-gray-300"
          >
            Seleccioná una sucursal o punto de retiro
          </Label>
          <select
            id={`branch-select-${idx}`}
            className="mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white rounded-md shadow-sm"
            value={selectedBranchId}
            onChange={(e) => setSelectedBranchId(e.target.value)}
          >
            <option value="">Seleccionar punto</option>
            {filteredBranches.map((branch: any, bIdx: number) => (
              <option key={bIdx} value={branch.branch_id}>
                {branch.reference} - {branch.address.street}{" "}
                {branch.address.number}, {branch.address.city}
              </option>
            ))}
          </select>
        </div>
      )}

      <Button
        variant="outline"
        className={`mt-2 border transition-colors ${
          isSelected
            ? "border-green-500 dark:border-green-400"
            : "border-gray-300 dark:border-gray-700"
        }`}
        onClick={handleSelect}
        disabled={opcion.dropOff > 0 && !selectedBranchId}
      >
        Seleccionar esta opción
      </Button>
    </div>
  );
};
