import React from "react";
import catSpinning from "./assets/catspinning.gif";

const Loading = () => {
  return (
    <div className="h-screen p-10 flex items-center justify-center">
      <div className="flex md:flex-row flex-col items-center gap-10">
        <div className="h-[300px] w-[300px]">
          <img src={catSpinning} alt="gif_img" />
        </div>
        <div className="text-left">
          <p className="font-bold">LOADING...</p>
          <p className="">paws a moment!</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
