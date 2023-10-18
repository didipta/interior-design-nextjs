"use client";
import { instance } from "@/Service/Axios/interceptors";
import { setCurrentUser } from "@/redux/Slice/Userslice/Userslices";
import { useGetUserQuery } from "@/redux/Slice/Userslice/userApi";
import { useGetcartQuery } from "@/redux/Slice/cartslice/cartapi";
import {
  useGetNotificationQuery,
  usePutnotificationMutation,
} from "@/redux/Slice/notification/notificationapi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { TimeSince } from "@/utils/timeset";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const Header = () => {
  const [category, setcategory] = React.useState([]) as any[];
  const { currentUser }:any = useAppSelector((state) => state.UserSlice);
  useEffect(() => {
    instance
      .get("/category/namelist/list")
      .then((res) => {
        setcategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const { data: user, isFetching, isLoading } = useGetUserQuery({}) as any;
  const [notifications] = usePutnotificationMutation();
  const {
    data: cart,
    isFetching: cartfetch,
    isLoading: cartloading,
  } = useGetcartQuery({}) as any;
  const {
    data: notification,
    isFetching: notificationfetch,
    isLoading: notificationloading,
    refetch,
  } = useGetNotificationQuery({
    pollingInterval: 100,
    refetchOnMountOrArgChange: true,
    skip: false,
  }) as any;

  useEffect(() => {
    refetch();
  }, [cart]);
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
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-80"
            >
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <a>Service</a>
              </li>
              <li>
                <Link href="/dashboard">Dashboard</Link>
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
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/service">Service</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {currentUser !== null ? (
            <>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="dropdown dropdown-end">
                    <label
                      tabIndex={0}
                      className="btn btn-ghost btn-circle"
                      onClick={() => {
                        notifications(0);
                      }}
                    >
                      <div className="indicator">
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
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                          />
                        </svg>
                        <span className="badge badge-sm indicator-item">
                          {!notificationloading && (
                            <>{notification?.data?.length}</>
                          )}
                        </span>
                      </div>
                    </label>
                    <div
                      tabIndex={0}
                      className="mt-3 z-[1] card card-compact dropdown-content w-80 bg-base-100 shadow"
                    >
                      <div className="card-body">
                        <span className="font-bold text-lg h-96 overflow-y-auto">
                          {!notificationloading && (
                            <>
                              {notification?.data?.result.length > 0 ? (
                                <>
                                  {notification?.data?.result.map(
                                    (item: any) => (
                                      <div
                                        className={`flex justify-between py-3 px-2 ${
                                          item?.status === 1
                                            ? "bg-blue-100"
                                            : "bg-gray-100"
                                        } my-2`}
                                      >
                                        <div>
                                          <h1 className="text-xs font-bold">
                                            {item?.title}
                                          </h1>
                                          <p className="text-sm font-normal">
                                            {item?.notification}
                                          </p>
                                          <small className="text-xs text-gray-600 ">
                                            {}
                                            {TimeSince(
                                              new Date(item?.createdAt)
                                            )}
                                          </small>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </>
                              ) : (
                                <>No Notification</>
                              )}
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                      <div className="indicator">
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
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <span className="badge badge-sm indicator-item">
                          {!cartloading && <>{cart?.data?.length}</>}
                        </span>
                      </div>
                    </label>
                    <div
                      tabIndex={0}
                      className="mt-3 z-[1] card card-compact dropdown-content w-80 bg-base-100 shadow"
                    >
                      <div className="card-body">
                        <span className="font-bold text-lg h-96 overflow-y-auto">
                          {!cartloading && (
                            <>
                              {cart?.data?.length > 0 ? (
                                <>
                                  {cart?.data?.map((item: any) => (
                                    <div className="flex gap-3 py-3 px-2 bg-yellow-100 my-2">
                                      <div>
                                        <Image
                                          src={`${item?.service?.img}`}
                                          alt="Placeholder"
                                          className="h-10 w-10"
                                          width={600}
                                          height={500}
                                        />
                                      </div>
                                      <div>
                                        <h1 className="text-xs font-bold">
                                          {item?.service?.name}
                                        </h1>
                                        <p className="text-sm font-normal">
                                         Tk-{item?.service?.price}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </>
                              ) : (
                                <>
                                  <div className="flex justify-center items-center h-96">
                                    <h1 className="text-xl font-bold text-center">
                                      No Cart
                                    </h1>
                                  </div>
                                </>
                              )}
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img src="https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg" />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a className="justify-between">
                        {
                          currentUser?.name
                        }
                        <span className="badge">New</span>
                      </a>
                    </li>
                    <li>
                      <a>Settings</a>
                    </li>
                    <li>
                      <a>Logout</a>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-600 rounded hover:bg-purple-500 focus:outline-none focus:bg-purple-500"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
