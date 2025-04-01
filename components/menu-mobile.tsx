"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { ToggleTheme } from "./toggle-theme";

const ItemsMenuMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="sm:hidden">
      {/* Botón para abrir el menú */}
      <button onClick={toggleMenu} className="p-2">
        <Menu size={28} />
      </button>

      {/* Menú deslizante */}
      <div
        className={`fixed top-0 left-0 h-full w-3/4 bg-white dark:bg-gray-900 shadow-lg transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Botón para cerrar */}
        <div className="flex justify-end p-4">
          <button onClick={closeMenu}>
            <X size={28} />
          </button>
        </div>

        {/* Opciones del menú */}
        <nav className="flex flex-col items-start gap-6 p-6 text-lg">
          <button
            onClick={() => router.push("/")}
            className="hover:text-gray-500"
          >
            Inicio
          </button>
          <button
            onClick={() => router.push("/products")}
            className="hover:text-gray-500"
          >
            Productos
          </button>
          <button
            onClick={() => router.push("/cart")}
            className="hover:text-gray-500"
          >
            Carrito
          </button>
          <button
            onClick={() => router.push("/profile")}
            className="hover:text-gray-500"
          >
            Perfil
          </button>
          <ToggleTheme />
        </nav>
      </div>

      {/* Fondo oscuro para cerrar el menú al hacer clic afuera */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={closeMenu}
        ></div>
      )}
    </div>
  );
};

export default ItemsMenuMobile;
