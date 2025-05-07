"use client";
"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useRouter } from "next/navigation";
import { useGetCategories } from "@/api/usePeticionApi";

const MenuList = () => {
  const router = useRouter();
  const { result: categories, loading, error } = useGetCategories();
  const handleClick = () => {
    router.push("/products");
  };
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="cursor-pointer">
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Inicio
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/products" legacyBehavior passHref>
            <NavigationMenuTrigger
              className="cursor-pointer"
              onClick={() => {
                window.location.href = "/products";
              }}
            >
              Productos
            </NavigationMenuTrigger>
          </Link>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {categories?.map((category, index) => (
                <ListItem
                  key={index}
                  title={category.categoryName}
                  href={`/products?category=${category.categoryName}`}
                  className="cursor-pointer"
                >
                  {` ${category.categoryName}`}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className="cursor-pointer"
            onClick={() => {
              window.location.href = "/mas";
            }}
          >
            Mas
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/ "
                  >
                    <div className="mb-2 mt-4 text-lg font-medium cursor-pointer">
                      TMGC
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem
                href="/mas"
                title="Sobre nosotros"
                className="cursor-pointer"
              >
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem
                href="/mas#guia-de-talles"
                title="Guia de talles"
                className="cursor-pointer"
              >
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem
                href="/mas#contacto"
                title="Contacto"
                className="cursor-pointer"
              >
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
export default MenuList;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <Link href={href || "/"} passHref legacyBehavior>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </Link>
    </li>
  );
});
ListItem.displayName = "ListItem";
