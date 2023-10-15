"use client";
import { instance } from "@/Service/Axios/interceptors";
import Breadcrumbs from "@/components/Common/Breadcrumbs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import Loader from "@/components/Common/Loader";
import ReactPaginate from "react-paginate";

const Servicelist = () => {
  const [allservice, setallservice] = useState([]) as any;
  const [loading, setloading] = useState(false) as any;
  const [meta, setmeta] = useState({}) as any;
  const [page, setpage] = useState(1) as any;

  useEffect(() => {
    setloading(true);
    instance.get(`/service?limit=10&page=${page}`).then((res) => {
      setallservice(res.data.data);
      setmeta(res.data.meta);
      setloading(false);
    });
  }, [page]);

  const handeldelect = (id: string) => {
    instance.delete(`/service/${id}`).then((res) => {
      toast.success("Service Deleted Successfully");
      setallservice(allservice.filter((item: any) => item.id !== id));
    });
  };
  const handlePageChange = ({ selected }: any) => {
    setpage(selected + 1);
  };

  return (
    <div>
      <Breadcrumbs
        list={[
          { name: "Dashboard", link: "/dashboard" },
          { name: "Service", link: "/dashboard/service" },
          { name: "Service List", link: "/dashboard/service" },
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

      {loading ? (
        <>
          <Loader />
        </>
      ) : (
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
              {allservice?.map((item: any) => (
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
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded-md"
                      onClick={() => handeldelect(item.id)}
                    >
                      Detect
                    </button>
                  </th>
                </tr>
              ))}
              {/* row 1 */}
            </tbody>
            {/* foot */}
          </table>
          <div className="w-full grid justify-center p-5 mt-10">
            <ReactPaginate
              previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
              nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={meta?.total / 20}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Servicelist;
