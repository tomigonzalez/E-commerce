import { create } from "zustand";

interface UserData {
  email: string;
  nombre: string;
  apellido: string;
  dni: string;
  direccion: string;
  localidad: string;
  codigoPostal: string;
  telefono: string;
  opcionEnvio?: any; // podés tipar esto mejor si sabés la forma exacta
  setUserData: (data: Partial<UserData>) => void;
}

export const useUserDataStore = create<UserData>((set) => ({
  email: "",
  nombre: "",
  apellido: "",
  dni: "",
  direccion: "",
  localidad: "",
  codigoPostal: "",
  telefono: "",
  opcionEnvio: undefined,
  setUserData: (data) => set((state) => ({ ...state, ...data })),
}));
