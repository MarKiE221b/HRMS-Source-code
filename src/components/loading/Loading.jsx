import React from "react";
import logo from "../../assets/ched-logo.png";

const Loading = () => {
  return (
    <div>
      <div className="p-10 flex items-center justify-center">
        <div className="h-[120px] w-[120px]">
          <img
            src={logo}
            alt="Logo"
            className="rounded-full animate-logoPulse"
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;
