// app/api/crear-preferencia/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { products, ordenStrapiId } = body;

    const items = products.map((product: any) => ({
      id: product.id.toString(),
      title: product.productName,
      quantity: product.quantity,
      unit_price: product.price,
      currency_id: "ARS",
    }));

    const mpResponse = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`, // 👈 sin NEXT_PUBLIC
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
          products: items.map((item:any) => ({
            id: item.id,
            quantity: item.quantity,
            price: item.unit_price,
          })),
        },
      }),
    });

    const data = await mpResponse.json();

    if (!mpResponse.ok || !data.init_point) {
      return NextResponse.json(
        { error: data.message || "No se pudo generar la preferencia" },
        { status: 500 }
      );
    }

    return NextResponse.json({ init_point: data.init_point });
  } catch (error) {
    console.error("❌ Error en crear-preferencia:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
