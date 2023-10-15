
import React from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";


const Mainlayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Mainlayout;
