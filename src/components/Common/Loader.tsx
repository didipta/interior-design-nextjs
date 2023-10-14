import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <img src="/asset/Image/loder.gif" width={100} height={100} alt="" />
    </div>
  );
};

export default Loader;
