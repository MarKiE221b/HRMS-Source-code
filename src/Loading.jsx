import React from "react";
import logo from "./assets/ched-logo.png";

const Loading = () => {
  return (
    <div className="bg-slate-100 flex justify-center items-center h-screen m-0 animate-fadeIn">
      <img
        src={logo}
        alt="Logo"
        className="w-56 h-56 rounded-full animate-logoPulse"
      />
    </div>
  );
};

export default Loading;
