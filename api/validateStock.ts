export const validarStockYPrecios = async (items: any[]) => {
  const results = await Promise.all(
    items.map(async (item) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${item.documentId}?populate=*`
      );

      if (!res.ok) {
        throw new Error(`Error consultando el producto ${item.productName}`);
      }

      const data = await res.json();
      const sizeStock = data.data?.size_stock;
      const precioOficial = data.data?.price;

      if (!Array.isArray(sizeStock)) {
        throw new Error(`No se encontró la información de stock para ${item.productName}`);
      }

      const tallaSeleccionada = item.sizeSelected;
      const stockTalle = sizeStock.find((s: any) => s.size === tallaSeleccionada);

      if (!stockTalle) {
        throw new Error(`No se encontró stock para la talla ${tallaSeleccionada} de ${item.productName}`);
      }

      if (item.quantity > stockTalle.stock) {
        throw new Error(
          `No hay suficiente stock para ${item.productName} en talla ${tallaSeleccionada}.`
        );
      }
if (item.quantity < 1) {
  throw new Error(`Cantidad inválida para ${item.productName}.`);
}
      if (item.price !== precioOficial) {
        throw new Error(
          `El precio de ${item.productName} no es válido. Recarga la página e inténtalo nuevamente.`
        );
      }

      return true;
    })
  );

  return results;
};
