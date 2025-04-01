import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("🔔 Webhook recibido:", body);

    // Extraer el ID del pago
    const paymentId = body.data?.id;
    if (!paymentId) {
      return NextResponse.json(
        { error: "Pago no encontrado" },
        { status: 400 }
      );
    }

    // Consultar el pago en MercadoPago para obtener detalles
    const paymentResponse = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer APP_USR-563550573701914-033000-589367fb2bbc009fe8259ffbf8eb4f55-2356480963`, // Usa variables de entorno
        },
      }
    );

    const paymentData = await paymentResponse.json();
    console.log("💰 Detalles del pago:", paymentData);

    // Guardar el estado del pago en la base de datos (simulado)
    if (paymentData.status === "approved") {
      console.log("✅ Pago aprobado, actualizando pedido...");
      // Aquí actualizarías tu base de datos con el pago aprobado
    } else {
      console.log(`⚠️ Pago en estado: ${paymentData.status}`);
    }

    return NextResponse.json({ message: "Webhook procesado" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error procesando el webhook:", error);
    return NextResponse.json({ error: "Error en el webhook" }, { status: 500 });
  }
}
