import React from "react";
import { Truck, CreditCard, ShieldCheck } from "lucide-react"; // Assuming you are using Lucide icons

type Props = {};

const InfoBanner = (props: Props) => {
  return (
    <div className="bg-gray-100 py-2 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-around items-center">
        <div className="text-center">
          <Truck className="w-8 h-8 text-gray-500 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-gray-700">
            ENVÍOS A TODO EL PAÍS
          </h3>
          <p className="text-xs text-gray-500">
            Envíos gratis a partir de $90.000
          </p>
        </div>
        <div className="text-center">
          <CreditCard className="w-8 h-8 text-gray-500 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-gray-700">
            TARJETA DE CRÉDITO
          </h3>
          <p className="text-xs text-gray-500">3 y 6 cuotas sin interés</p>
        </div>
        <div className="text-center">
          <ShieldCheck className="w-8 h-8 text-gray-500 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-gray-700">SEGURIDAD</h3>
          <p className="text-xs text-gray-500">
            Todos tus datos están protegidos
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoBanner;
