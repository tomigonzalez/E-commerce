import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";

type Props = {};

const BannerProduct = (props: Props) => {
  return (
    <>
      <div className="mt-4 text-center">
        <p>Sumergete en una experiencia unica</p>
        <h4 className="mt-2 text-5xl font-extrabold uppercase">Titulo</h4>
        <p className="my-2 text-lg">Ingrese una descripcion</p>
        <Link href={"#"} className={buttonVariants()}>
          Comprar
        </Link>
      </div>
    </>
  );
};

export default BannerProduct;
