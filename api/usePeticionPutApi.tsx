export async function updateProductStock(products: any[]) {
  try {
    // 1. Agrupar productos por documentId
    const groupedByProduct: Record<string, any[]> = {};

    for (const product of products) {
      if (!groupedByProduct[product.documentId]) {
        groupedByProduct[product.documentId] = [];
      }
      groupedByProduct[product.documentId].push(product);
    }

    // 2. Para cada producto único, aplicar todos los descuentos necesarios
    const updateRequests = Object.entries(groupedByProduct).map(
      async ([documentId, productGroup]) => {
        // Tomamos el size_stock original del primero (todos deberían ser iguales)
        const baseStock = productGroup[0].size_stock;

        // Creamos un mapa para ir restando el stock
        const sizeMap: Record<string, number> = {};
        for (const item of baseStock) {
          sizeMap[item.size] = item.stock;
        }

        // Aplicamos todos los descuentos
        for (const item of productGroup) {
          const size = item.sizeSelected;
          const quantity = item.quantity;
          const current = sizeMap[size] ?? 0;
          const newStock = current - quantity;

          console.log(
            `🔄 Descontando stock del talle ${size}: ${current} - ${quantity} = ${newStock}`
          );

          sizeMap[size] = newStock >= 0 ? newStock : 0;
        }

        // Transformamos el mapa a array
        const updatedSizeStock = Object.entries(sizeMap).map(
          ([size, stock]) => ({
            size,
            stock,
          })
        );

        console.log(
          `🔄 Actualizando stock del producto ${documentId}:`,
          updatedSizeStock
        );

        // Enviamos el PUT
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${documentId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: {
                size_stock: updatedSizeStock,
              },
            }),
          }
        );

        const responseJson = await res.json();
        console.log("✅ Respuesta de Strapi:", responseJson);

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(
            `❌ Error al actualizar el stock del producto ${documentId}: ${res.status} - ${errorText}`
          );
        }
      }
    );

    await Promise.all(updateRequests);
    console.log("✅ Todos los stocks fueron actualizados correctamente");
    localStorage.removeItem("purchasedProducts");
  } catch (error) {
    console.error("❌ Error al actualizar stock:", error);
  }
}
