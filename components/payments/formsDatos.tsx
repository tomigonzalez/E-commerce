import { useUserDataStore } from "@/hooks/user-data";
import { Button } from "../ui/button";

type Props = {
  errors: Record<string, string>;
  setErrors: (errors: Record<string, string>) => void;
  handleNext: () => void;
};

export const FormsDatos = ({ errors, setErrors, handleNext }: Props) => {
  const {
    email,
    nombre,
    apellido,
    dni,
    direccion,
    localidad,
    codigoPostal,
    telefono,
    setUserData,
  } = useUserDataStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const fields = [
    { name: "email", label: "Email", type: "email", value: email },
    { name: "nombre", label: "Nombre", type: "text", value: nombre },
    { name: "apellido", label: "Apellido", type: "text", value: apellido },
    { name: "dni", label: "DNI", type: "text", value: dni },
    { name: "direccion", label: "Dirección", type: "text", value: direccion },
    { name: "localidad", label: "Localidad", type: "text", value: localidad },

    { name: "telefono", label: "Teléfono", type: "text", value: telefono },
  ];

  return (
    <div className="space-y-4">
      {fields.map(({ name, label, type, value }) => (
        <div key={name}>
          <label htmlFor={name} className="block mb-1">
            {label}
          </label>
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors[name] ? "border-red-500" : ""}`}
          />
          {errors[name] && (
            <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
          )}
        </div>
      ))}

      <div className="flex gap-2 mt-4">
        <Button onClick={handleNext} disabled={false}>
          Siguiente
        </Button>
      </div>
    </div>
  );
};
