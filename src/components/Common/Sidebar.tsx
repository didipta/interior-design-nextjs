"use client";

import { useAppSelector } from "@/redux/hook";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathname: string | any = usePathname();
  const { currentUser }: any = useAppSelector((state) => state.UserSlice);
  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu p-4 w-72 min-h-full bg-[#abc2f3] text-base-content">
        <Link href="/dashboard" className="mb-5">
          <img
            src="/asset/Image/logo.png"
            alt="logo"
            width={150}
            height={150}
          />
        </Link>
        <li>
          <Link
            href="/dashboard"
            className={`${pathname === "/dashboard" ? "active" : ""}`}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/category"
            className={`${pathname === "/dashboard/category" ? "active" : ""}`}
          >
            Category
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/service"
            className={`${pathname === "/dashboard/service" ? "active" : ""}`}
          >
            Service
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/content"
            className={`${pathname === "/dashboard/content" ? "active" : ""}`}
          >
            Content
          </Link>
        </li>
        {currentUser?.role === "Superadmin" ? (
          <li>
            <Link
              href="/dashboard/user"
              className={`${pathname === "/dashboard/admin" ? "active" : ""}`}
            >
              Admin
            </Link>
          </li>
        ) : null}
       <li>
        <Link href="/">Back</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
