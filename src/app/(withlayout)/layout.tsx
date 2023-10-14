import Sidebar from "@/components/Common/Sidebar";
import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="navbar bg-[#abc2f3] lg:hidden">
            <div className="flex-1">
              <Link href="/dashboard" className="">
                <img
                  src="/asset/Image/logo.png"
                  alt="logo"
                  width={100}
                  height={100}
                />
              </Link>
            </div>
            <div className="flex-none">
              <label
                htmlFor="my-drawer-2"
                className=" cursor-pointer lg:hidden"
              >
                
                  <FontAwesomeIcon icon={faBars} className="w-5 mr-5"/> 
                
              </label>
            </div>
          </div>
          <div className="container mx-auto px-4 py-4">{children}</div>
        </div>
        <Sidebar />
      </div>
    </div>
  );
};

export default layout;
