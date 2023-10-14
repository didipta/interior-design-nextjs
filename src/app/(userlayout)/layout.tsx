import Mainlayout from "@/components/Main/Mainlayout";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Mainlayout>{children}</Mainlayout>
    </div>
  );
};

export default layout;
