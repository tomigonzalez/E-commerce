export const normalizarOrden = (userData: any, items: any[]) => {
  const {
    email,
    nombre,
    apellido,
    dni,
    direccion,
    localidad,
    codigoPostal,
    telefono,
    opcionEnvio,
  } = userData;

  const envio = opcionEnvio
    ? {
        transportista: opcionEnvio.carrier,
        servicio: opcionEnvio.serviceDescription,
        precio: opcionEnvio.totalPrice,
        ciudad: opcionEnvio.selectedBranch?.address?.city || "",
        direccion: opcionEnvio.selectedBranch?.address?.street || "",
        codigoPostal: opcionEnvio.selectedBranch?.address?.zipcode || "",
        provincia: opcionEnvio.selectedBranch?.address?.province || "",
        pais: opcionEnvio.selectedBranch?.address?.country || "",
      }
    : null;

  return {
    email,
    nombre,
    apellido,
    dni,
    direccion,
    localidad,
    codigoPostal,
    telefono,
    estado: "pendiente",
    total:
      items.reduce((acc, item) => acc + item.price * item.quantity, 0) +
      (envio?.precio || 0),
    envio,
    producto_pedido: items.map((item) => ({
      title: item.productName,
      price: item.price,
      quantity: item.quantity,
      product_id: item.id.toString(),
      talle: item.sizeSelected,
    })),
  };
};
