export interface Destinatario {
  name: string;
  company: string;
  email: string;
  phone: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export async function cotizarEnvioConCarrier(
  destinatario: Destinatario,
  carrier: string
) {
  const response = await fetch("https://api.envia.com/ship/rate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SHIPPING_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      origin: {
        name: "Tienda XYZ",
        company: "Mi Empresa",
        email: "contacto@miempresa.com",
        phone: "541123456789",
        street: "Avenida Siempre Viva",
        number: "123",
        district: "Centro",
        city: "Buenos Aires",
        state: "BA",
        country: "AR",
        postalCode: "8000",
      },
      destination: destinatario,
      packages: [
        {
          content: "Ropa",
          amount: 1,
          type: "box",
          dimensions: {
            length: 20,
            width: 20,
            height: 15,
          },
          weight: 5,
          insurance: 500,
          declaredValue: 5000,
          weightUnit: "KG",
          lengthUnit: "CM",
        },
      ],
      shipment: {
        carrier: carrier,
        type: 1,
      },
      settings: {
        labelFormat: "PDF",
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error cotizando con ${carrier}: ${errorText}`);
  }

  return response.json();
}
