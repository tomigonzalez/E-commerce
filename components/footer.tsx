import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";

const dataFooter = [
  { id: 1, name: "Productos", link: "/products" },
  { id: 2, name: "Sobre nosotros", link: "/mas#sobre-nosotros" },
  { id: 3, name: "Guia de talles", link: "/mas#guia-de-talles" },
  { id: 4, name: "Contacto", link: "/mas#contacto" },
];

const Footer = () => {
  return (
    <footer className="mt-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <p>
            <span className="font-bold">TMGC</span>
            E-commerce
          </p>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            {dataFooter.map((data) => {
              return (
                <li key={data.id}>
                  <Link
                    href={data.link}
                    className="hover:underline me-4 md:me-6 "
                  >
                    {data.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <Separator className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          ©2025
          <Link href={""} className="ml-1 mr-1">
            TMGC.
          </Link>
          Todos los derechos reservados
        </span>
      </div>
    </footer>
  );
};

export default Footer;
