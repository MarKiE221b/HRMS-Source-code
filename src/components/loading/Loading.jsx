import React from "react";
import catLoad from "../../assets/catLoad2.gif";

const Loading = () => {
  return (
    <div>
      <div className="p-10 flex items-center justify-center">
        <div className="h-[120px] w-[120px]">
          <img src={catLoad} alt="gif_img" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
