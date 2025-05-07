import { Suspense } from "react";
import ClientSuccessPage from "./components/clientSuccessPage";

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Cargando resultado del pago...</div>}>
      <ClientSuccessPage />
    </Suspense>
  );
}
