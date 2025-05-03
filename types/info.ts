

export type InfoDataType = {
   
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    sobreNosotros: {
      id: number;
      titulo: string;
      textDesc: string;
    };
    politicaPrivacidad: {
      id: number;
      nombreTienda: string;
      sitioWeb: string;
      direccion: string;
      email: string;
    };
    devolucion: {
      id: number;
      titleText: string;
      textDesc: string;
    };
    contacto: {
      id: number;
      telefono: string;
      whatsapp: string;
      email: string;
      google_maps_url: string;
      direccion: string;
      instagram: string;
      facebook: string;
      linkedin: string;
    };
  };