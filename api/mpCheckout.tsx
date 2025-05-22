interface Product {
  id: number;
  productName: string;
  price: number;
  quantity: number;
}

const api = {
  product: {
    async submit(products: Product[], ordenStrapiId: string) {
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
              Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
            },
            body: JSON.stringify({
              items,
              back_urls: {
                success: `${process.env.NEXT_PUBLIC_WEB_MP}/success`,
                failure: `${process.env.NEXT_PUBLIC_WEB_MP}/success`,
                pending: `${process.env.NEXT_PUBLIC_WEB_MP}/success`,
              },
              notification_url: `${process.env.NEXT_PUBLIC_WEB_MP}/webhook`,
              auto_return: "approved",
              metadata: {
                ordenStrapiId,
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
