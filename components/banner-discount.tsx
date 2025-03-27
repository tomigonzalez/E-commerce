import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";

type Props = {};

const BannerDiscount = (props: Props) => {
  return (
    <div className="p-5 sm:p-20 text-center">
      <h2 className="uppercase font-black text-2xl text-primary">
        Consigue hasta un -25%
      </h2>
      <h3 className="mt-3 font-semibold">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe veniam
        impedit provident odio minima tempora voluptatibus, quaerat, officiis
        cum est quia vel sit eos tenetur delectus sapiente et labore ab.
      </h3>
      <div className="max-w-md mx-auto sm:flex justify-center gap-8 mt-5">
        <Link href="#" className={buttonVariants()}>
          Comprar
        </Link>
        <Link href="#" className={buttonVariants({ variant: "outline" })}>
          Mas info
        </Link>
      </div>
    </div>
  );
};

export default BannerDiscount;
