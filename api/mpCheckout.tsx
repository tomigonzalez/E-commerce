interface Product {
  id: number;
  productName: string;
  price: number;
  quantity: number;
}

const api = {
  product: {
    async submit(products: Product[]) {
      try {
        const items = products.map((product) => ({
          id: product.id.toString(),
          title: product.productName,
          quantity: product.quantity,
          unit_price: product.price,
          currency_id: "ARS",
        }));

        console.log("🛒 Enviando productos a MercadoPago:", items);

        const response = await fetch(
          "https://api.mercadopago.com/checkout/preferences",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer APP_USR-563550573701914-033000-589367fb2bbc009fe8259ffbf8eb4f55-2356480963`, // ⚠️ Usá variables de entorno
            },
            body: JSON.stringify({
              items,
              back_urls: {
                success: `https://kx1c20hc-3000.brs.devtunnels.ms/success`,
                failure: `https://kx1c20hc-3000.brs.devtunnels.ms/payment`,
                pending: `https://kx1c20hc-3000.brs.devtunnels.ms/payment`,
              },
              notification_url: `https://kx1c20hc-3000.brs.devtunnels.ms/webhook`,
              auto_return: "approved",
              metadata: {
                products: items.map((item) => ({
                  id: item.id,
                  quantity: item.quantity,
                  price: item.unit_price,
                })),
              },
            }),
          }
        );

        const data = await response.json();
        console.log("✅ Respuesta de MercadoPago:", data);

        if (!response.ok || !data.init_point) {
          throw new Error(
            `Error en MercadoPago: ${data.message || "No se pudo obtener el enlace de pago"}`
          );
        }

        return data.init_point;
      } catch (error) {
        console.error("❌ Error al crear la preferencia:", error);
        throw new Error("Hubo un problema al procesar el pago.");
      }
    },
  },
};

export default api;
