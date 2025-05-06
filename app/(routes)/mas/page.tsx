import PoliticaPrivacidad from "./components/politicaPrivacidad";
import SobreNosotros from "./components/sobreNosotros";

type Props = {};

const Page = (props: Props) => {
  return (
    <>
      <SobreNosotros />
      <PoliticaPrivacidad />
      {/* <Contacto />  */}
    </>
  );
};

export default Page;
