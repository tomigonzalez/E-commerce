export interface Order {
    id?: number;
    nombre: string;
    email: string;
    dni: string;
    direccion: {
      calle: string;
      ciudad: string;
      codigo_postal: string;
    };
    productos: { id: number; quantity: number }[];
    total: number;
    estado: "pendiente" | "pagado" | "rechazado";
  }
  