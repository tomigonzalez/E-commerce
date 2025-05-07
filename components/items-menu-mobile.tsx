"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Menu } from "lucide-react";
import Link from "next/link";

const ItemsMenuMobile = () => {
  return (
    <Popover>
      <PopoverTrigger
        className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer "
        title="Abrir menú de navegación"
      >
        <Menu size={24} />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 p-4 bg-white rounded-md shadow-md dark:bg-gray-900">
        <Link
          href="/"
          className="block p-2 text-lg font-medium hover:text-blue-500"
        >
          Inicio
        </Link>
        <Link
          href="/products"
          className="block p-2 text-lg font-medium hover:text-blue-500"
        >
          Productos
        </Link>
        <Link
          href="/mas"
          className="block p-2 text-lg font-medium hover:text-blue-500"
        >
          Más
        </Link>
        <Link
          href="/mas#guia-de-talles"
          className="block p-2 text-lg font-medium hover:text-blue-500"
        >
          Guía de talles
        </Link>
        <Link
          href="/mas#contacto"
          className="block p-2 text-lg font-medium hover:text-blue-500"
        >
          Contacto
        </Link>
      </PopoverContent>
    </Popover>
  );
};

export default ItemsMenuMobile;
