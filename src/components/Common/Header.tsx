"use client";
import { setCurrentUser } from "@/redux/Slice/Userslice/Userslices";
import { useGetUserQuery } from "@/redux/Slice/Userslice/userApi";
import { useAppDispatch } from "@/redux/hook";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { data: user, isFetching, isLoading } = useGetUserQuery({}) as any;
  const dispatch = useAppDispatch();

  if (!isLoading) {
    if (user?.statusCode === 200) {
      dispatch(setCurrentUser(user?.data));
    }
  }
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <Link href="/" className="btn btn-ghost normal-case text-xl">
            <img
              src="/asset/Image/logo.png"
              alt="logo"
              width={100}
              height={100}
            />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Item 1</a>
            </li>
            <li tabIndex={0}>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <Link
            href="/login"
            className="px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-600 rounded hover:bg-purple-500 focus:outline-none focus:bg-purple-500"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
