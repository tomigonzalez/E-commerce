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
        const response = await fetch("/api/crear-preferencia", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ products, ordenStrapiId }),
        });

        const data = await response.json();

        if (!response.ok || !data.init_point) {
          throw new Error(data.error || "No se pudo obtener el enlace de pago");
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
