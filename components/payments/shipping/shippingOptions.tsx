import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const ShippingOption = ({ opcion, idx, onSelect, isSelected }: any) => {
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

  return (
    <div className="border rounded p-4 shadow-sm space-y-2">
      <h3 className="font-semibold">{opcion.serviceDescription}</h3>
      <p>Carrier: {opcion.carrier}</p>
      <p>Precio: ARS ${opcion.totalPrice.toFixed(2)}</p>
      <p>Entrega estimada: {opcion.deliveryEstimate}</p>

      {opcion.dropOff > 0 && opcion.branches?.length > 0 && (
        <div>
          <Label htmlFor={`branch-select-${idx}`}>
            Seleccioná una sucursal o punto de retiro
          </Label>
          <select
            id={`branch-select-${idx}`}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            value={selectedBranchId}
            onChange={(e) => setSelectedBranchId(e.target.value)}
          >
            <option value="">Seleccionar punto</option>
            {opcion.branches.map((branch: any, bIdx: number) => (
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
        className={`mt-2 ${isSelected ? "border-green-500" : ""}`}
        onClick={handleSelect}
        disabled={opcion.dropOff > 0 && !selectedBranchId}
      >
        Seleccionar esta opción
      </Button>
    </div>
  );
};
