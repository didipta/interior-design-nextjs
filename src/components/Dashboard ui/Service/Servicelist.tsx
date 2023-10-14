"use client";
import { instance } from "@/Service/Axios/interceptors";
import Breadcrumbs from "@/components/Common/Breadcrumbs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const Servicelist = () => {
  const [allservice, setallservice] = useState([]) as any;

  useEffect(() => {
    instance.get("/service").then((res) => {
      setallservice(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div>
      <Breadcrumbs
        list={[
          { name: "Dashboard", link: "/dashboard" },
          { name: "Service", link: "/dashboard/service" },
          { name: "Service List", link: "/dashboard/service/list" },
        ]}
      />
      <div className="flex justify-between items-center my-3">
        <h1 className="text-2xl font-bold">Service List</h1>
        <Link
          href="/dashboard/service/create"
          className="button flex gap-2 items-center"
        >
          <FontAwesomeIcon icon={faPlus} className=" w-3" /> Add
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Description</th>
              <th>Review</th>
              <th>Booking</th>
              <th>Cart</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allservice?.data?.map((item: any) => (
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item?.img}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item?.name}</div>
                      <div className="text-sm opacity-50">
                        {item?.servicecategory?.categoryname}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {item?.shortdescription?.length > 50 ? (
                    <span>{item?.shortdescription?.slice(0, 50)}...</span>
                  ) : (
                    <span>{item?.shortdescription}</span>
                  )}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {item?.status === 1 ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>{item?.review.length}</td>
                <td>{item?.booking.length}</td>
                <td>{item?.cart.length}</td>
                <th>
                  <Link
                    href={`/dashboard/service/${item?.id}`}
                    className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                  >
                    details
                  </Link>
                  <button className="bg-red-500 text-white px-2 py-1 rounded-md">
                    Detect
                  </button>
                </th>
              </tr>
            ))}
            {/* row 1 */}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </div>
  );
};

export default Servicelist;
