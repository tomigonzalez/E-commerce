"use client";
import { BaggageClaim, Heart, ShoppingCart, User } from "lucide-react";
import { useRouter } from "next/navigation";
import MenuList from "./menu-list";
import ItemsMenuMobile from "./items-menu-mobile";
import { ToggleTheme } from "./toggle-theme";
import { useCart } from "@/hooks/use-cart";
import { useHomeData } from "@/hooks/use-homeData";

const NavBar = () => {
  const router = useRouter();
  const cart = useCart();
  const homeData = useHomeData((state) => state.data);

  return (
    <div className="flex items-center justify-between p-4 mx-auto sm:max-w-4xl md:max-w-6xl">
      <h1 onClick={() => router.push("/")} className="font-bold">
        {homeData?.[0]?.tituloHero}
      </h1>
      <div className="items-center justify-between hidden sm:flex">
        <MenuList />
      </div>
      <div className="flex sm:hidden cursor-pointer">
        <ItemsMenuMobile />
      </div>
      <div className="flex items-center justify-between gap-2 sm:gap-7">
        {cart.items.length == 0 ? (
          <ShoppingCart
            strokeWidth="1"
            className="cursor-pointer"
            onClick={() => router.push("/cart")}
          />
        ) : (
          <div className="flex gap-1" onClick={() => router.push("/cart")}>
            <BaggageClaim strokeWidth={1} className="cursor-pointer" />
            <span>{cart.items.length}</span>
          </div>
        )}

        <ToggleTheme />
      </div>
    </div>
  );
};

export default NavBar;
