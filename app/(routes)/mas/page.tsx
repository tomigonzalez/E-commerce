import CambiosDevoluciones from "./components/cambiosDevoluciones";
import Contacto from "./components/contacto";
import PoliticaPrivacidad from "./components/politicaPrivacidad";
import SobreNosotros from "./components/sobreNosotros";

type Props = {};

const Page = (props: Props) => {
  return (
    <>
      <SobreNosotros />
      <PoliticaPrivacidad />
      <CambiosDevoluciones />
      <Contacto />
    </>
  );
};

export default Page;
