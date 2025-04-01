export async function updateProductStock(products: any[]) {
  try {
    for (const product of products) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${product.documentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              stock: product.quantity - product.quantityPurchased, // Restar stock
            },
          }),
        }
      );

      if (!res.ok) {
        throw new Error(
          `Error al actualizar el stock del producto ${product.documentId}`
        );
      }
    }

    console.log("✅ Stock actualizado correctamente");
    localStorage.removeItem("purchasedProducts"); // Limpiar el storage después de actualizar
  } catch (error) {
    console.error("❌ Error al actualizar stock:", error);
  }
}
