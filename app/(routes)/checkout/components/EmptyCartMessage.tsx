// components/EmptyCartMessage.tsx
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const EmptyCartMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4 text-center">
      <ShoppingCart className="w-12 h-12 text-gray-400" />
      <h2 className="text-xl font-semibold">Agregá productos al carrito</h2>
      <Link href="/products">
        <Button>Ir a productos</Button>
      </Link>
    </div>
  );
};

export default EmptyCartMessage;
