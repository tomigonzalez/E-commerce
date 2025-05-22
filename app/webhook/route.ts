import { updateOrderStatus } from "@/api/usePutOrden";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("🚨 Webhook ha llegado");  // Agrega este log para confirmar que el webhook llega
  
  try {
    const body = await req.json();
    
    const paymentId = body.data?.id;
    if (!paymentId) {
      return NextResponse.json(
        { error: "Pago no encontrado" },
        { status: 400 }
      );
    }

    const paymentResponse = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}?fields=metadata,status`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      }
    );

    const paymentData = await paymentResponse.json();
    

    const ordenStrapiId = paymentData.metadata?.orden_strapi_id;
    const status = paymentData.status;

    // Validamos si no se encontró ordenStrapiId
    if (!ordenStrapiId) {
      console.warn("⚠️ No se encontró ordenStrapiId en metadata");
      return NextResponse.json({ message: "Sin orden asociada" }, { status: 200 });
    }
    
    
    let nuevoEstado = "pendiente";
    if (status === "approved") {
      nuevoEstado = "confirmado";
      console.log("✅ El pago fue aprobado, cambiando estado a 'confirmado'");
    } else if (status === "rejected") {
      nuevoEstado = "cancelado";
      console.log("❌ El pago fue rechazado, cambiando estado a 'cancelado'");
    } else if (status === "in_process") {
      nuevoEstado = "pendiente";
      console.log("🔄 El pago está en proceso, manteniendo estado 'pendiente'");
    } else {
      console.warn(`⚠️ Estado de pago no manejado: ${status}`);
    }

   
    await updateOrderStatus(ordenStrapiId, nuevoEstado);

    return NextResponse.json({ message: "Webhook procesado" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error procesando el webhook:", error);
    return NextResponse.json({ error: "Error en el webhook" }, { status: 500 });
  }
}
