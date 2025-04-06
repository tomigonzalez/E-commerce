interface UserData {
  email: string;
  nombre: string;
  apellido: string;
  dni: string;
  direccion: string;
  localidad: string;
  codigoPostal: string;
  telefono: string;
}

export const validateUserData = (data: UserData) => {
  const errors: Record<string, string> = {};

  if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Email inválido";
  }

  if (!data.nombre) {
    errors.nombre = "Nombre es requerido";
  }

  if (!data.apellido) {
    errors.apellido = "Apellido es requerido";
  }

  if (!data.dni || !/^\d+$/.test(data.dni)) {
    errors.dni = "DNI inválido";
  }

  if (!data.direccion) {
    errors.direccion = "Dirección es requerida";
  }

  if (!data.localidad) {
    errors.localidad = "Localidad es requerida";
  }

  if (!data.codigoPostal || !/^\d{4,5}$/.test(data.codigoPostal)) {
    errors.codigoPostal = "Código postal inválido";
  }

  if (!data.telefono || !/^\d{7,15}$/.test(data.telefono)) {
    errors.telefono = "Teléfono inválido";
  }

  return errors;
};
