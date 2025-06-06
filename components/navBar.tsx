"use client";

import { BaggageClaim, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import MenuList from "./menu-list";
import ItemsMenuMobile from "./items-menu-mobile";
import { ToggleTheme } from "./toggle-theme";
import { useCart } from "@/store/use-cart";
import { useInfoData } from "@/store/use-info-data";

const NavBar = () => {
  const router = useRouter();
  const cart = useCart();
  const infoData = useInfoData((state) => state.data);

  return (
    <div className="sticky  top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="flex items-center justify-between p-4 mx-auto sm:max-w-4xl md:max-w-6xl">
        <h1
          onClick={() => router.push("/")}
          className="font-bold cursor-pointer"
        >
          {infoData?.politicaPrivacidad.nombreTienda}
        </h1>

        <div className="items-center justify-between hidden sm:flex">
          <MenuList />
        </div>

        <div className="flex sm:hidden cursor-pointer">
          <ItemsMenuMobile />
        </div>

        <div className="flex items-center justify-between gap-2 sm:gap-7">
          {cart.items.length === 0 ? (
            <ShoppingCart
              strokeWidth={1}
              className="cursor-pointer"
              onClick={() => router.push("/cart")}
            />
          ) : (
            <div
              className="flex gap-1 cursor-pointer"
              onClick={() => router.push("/cart")}
            >
              <BaggageClaim strokeWidth={1} />
              <span>{cart.items.length}</span>
            </div>
          )}
          <ToggleTheme />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
