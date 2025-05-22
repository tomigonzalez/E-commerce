import { updateOrderStatus } from "@/api/usePutOrden";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  console.log("🚨 Webhook ha llegado");

  const signatureHeader = req.headers.get("x-signature");
  const secret = process.env.MP_WEBHOOK_SECRET;

  if (!secret || !signatureHeader) {
    console.warn("❌ Webhook sin clave o firma");
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const rawBody = await req.text(); // usamos texto sin parsear para firmar
  const localSignature = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  if (localSignature !== signatureHeader) {
    console.warn("❌ Firma inválida. Webhook rechazado.");
    return NextResponse.json({ error: "Firma inválida" }, { status: 401 });
  }

  try {
    const body = JSON.parse(rawBody); // lo parseamos después de validar

    const paymentId = body.data?.id;
    if (!paymentId) {
      return NextResponse.json(
        { error: "ID de pago no encontrado" },
        { status: 400 }
      );
    }

    const paymentResponse = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}?fields=metadata,status`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_MP_ACCESS_TOKEN}`,
        },
      }
    );

    const paymentData = await paymentResponse.json();

    const ordenStrapiId = paymentData.metadata?.ordenStrapiId;
    const status = paymentData.status;

    if (!ordenStrapiId) {
      console.warn("⚠️ No se encontró ordenStrapiId en metadata");
      return NextResponse.json({ message: "Sin orden asociada" }, { status: 200 });
    }

    let nuevoEstado = "pendiente";
    if (status === "approved") {
      nuevoEstado = "confirmado";
      console.log("✅ Pago aprobado");
    } else if (status === "rejected") {
      nuevoEstado = "cancelado";
      console.log("❌ Pago rechazado");
    } else if (status === "in_process") {
      nuevoEstado = "pendiente";
      console.log("🔄 Pago en proceso");
    } else {
      console.warn(`⚠️ Estado desconocido: ${status}`);
    }

    await updateOrderStatus(ordenStrapiId, nuevoEstado);

    return NextResponse.json({ message: "Webhook procesado con éxito" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error procesando el webhook:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
