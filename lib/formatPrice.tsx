export function formatPrice(price: number) {
  const priceFormated = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  const finalPrice = priceFormated.format(price);
  return finalPrice;
}
