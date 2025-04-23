import React from "react";

type Props = {};

const GaleryHome = (props: Props) => {
  return (
    <div className="max-w-6xl py-2 mx-auto sm:py-14 sm:px-24">
      <div className="grid gap-4">
        <div>
          <img
            className="h-auto max-w-full rounded-lg"
            src="/subirImg.png"
            alt=""
          />
        </div>
        <div className="grid grid-cols-5 gap-4">
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="/subirImg.png"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="/subirImg.png"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="/subirImg.png"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="/subirImg.png"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="/subirImg.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GaleryHome;
