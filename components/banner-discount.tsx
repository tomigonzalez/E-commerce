import React from "react";
import { Truck, CreditCard, ShieldCheck } from "lucide-react"; // Asumiendo que usás Lucide

type Props = {};

const InfoBanner = (props: Props) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-center sm:justify-around items-center gap-6 sm:gap-0">
        <div className="text-center">
          <Truck className="w-8 h-8 text-gray-500 dark:text-gray-400 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            ENVÍOS A TODO EL PAÍS
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Estés donde estés, te llevamos tu pedido.
          </p>
        </div>
        <div className="text-center">
          <CreditCard className="w-8 h-8 text-gray-500 dark:text-gray-400 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            PAGÁ COMO QUIERAS
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Paga tu pedido con tarjeta de crédito, transferencia bancaria o
            efectivo.
          </p>
        </div>
        <div className="text-center">
          <ShieldCheck className="w-8 h-8 text-gray-500 dark:text-gray-400 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            SEGURIDAD
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Todos tus datos están protegidos
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoBanner;
