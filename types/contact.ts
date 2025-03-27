export type ContactType = {
    telefono: string;       // Formato internacional recomendado (+54 9 11 5708 4698)
    whatsapp: string;       // Similar a telefono
    email: string;          // Validado como email
    horario: string | Record<string, string>; // Puede ser un string simple o JSON con horarios
    direccion: string;      // Dirección física
    google_maps_url: string; // URL de Google Maps
    facebook?: string;      // URL de la página de Facebook (opcional)
    instagram?: string;     // URL de Instagram (opcional)
    linkedin?: string;      // URL de LinkedIn (opcional)
  };