export async function updateOrderStatus(orderId: string, newStatus: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/ordens/${orderId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            estado: newStatus, // 👈 este campo es el enumeration
          },
        }),
      }
    );

    if (!res.ok) throw new Error("Error al actualizar el estado del pedido");

    return await res.json();
  } catch (error) {
    console.error("Error actualizando el estado del pedido:", error);
    throw error;
  }
}
