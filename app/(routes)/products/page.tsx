// app/(routes)/products/page.tsx
import { Suspense } from "react";
import ProductsContent from "./components/productsContent";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Cargando productos...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
