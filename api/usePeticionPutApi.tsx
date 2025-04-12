export async function updateProductStock(products: any[]) {
  try {
    const updateRequests = products.map(async (product) => {
      const newStock = product.stock - product.quantity;

      console.log(
        `🔄 Actualizando stock del producto ${product.documentId}: ${newStock}`
      );

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${product.documentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              stock: newStock,
            },
          }),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(
          `Error al actualizar el stock del producto ${product.documentId}: ${res.status} - ${errorText}`
        );
      }
    });

    await Promise.all(updateRequests);

    console.log("✅ Stock actualizado correctamente");
    localStorage.removeItem("purchasedProducts");
  } catch (error) {
    console.error("❌ Error al actualizar stock:", error);
  }
}
