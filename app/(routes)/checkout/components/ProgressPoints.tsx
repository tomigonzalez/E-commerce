import React from "react";

type Props = {
  step: number;
};

const ProgressPoints = (props: Props) => {
  return (
    <div className="flex justify-between w-full max-w-5xl text-sm text-gray-600 dark:text-gray-300">
      <span
        className={
          props.step >= 1 ? "font-bold text-black dark:text-white" : ""
        }
      >
        Formulario
      </span>
      <span
        className={
          props.step >= 2 ? "font-bold text-black dark:text-white" : ""
        }
      >
        Envío
      </span>
      <span
        className={
          props.step === 3 ? "font-bold text-black dark:text-white" : ""
        }
      >
        Finalizar
      </span>
    </div>
  );
};

export default ProgressPoints;
