"use client";
import Contacto from "./components/contacto";

import GuiaDeTalles from "./components/guiaDeTalles";
import SobreNosotros from "./components/sobreNosotros";

type Props = {};

const Page = (props: Props) => {
  return (
    <>
      <SobreNosotros />
      <GuiaDeTalles />
      <Contacto />
    </>
  );
};

export default Page;
