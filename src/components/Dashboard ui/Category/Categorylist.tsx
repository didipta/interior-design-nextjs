"use client";
import Breadcrumbs from "@/components/Common/Breadcrumbs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import Link from "next/link";
import { instance } from "@/Service/Axios/interceptors";
import Image from "next/image";
import loader from "@/asset/Image/loder.gif";
import Loader from "@/components/Common/Loader";
import toast from "react-hot-toast";

const Categorylist = () => {
  const [category, setCategory] = React.useState([]);
  const [loading, setloading] = React.useState(false);
  useEffect(() => {
    setloading(true);
    instance.get("/category").then((res) => {
      setCategory(res.data);
      setloading(false);
    });
  }, []);

  const handeldelect = (id: string) => {
    instance.delete(`/category/${id}`).then((res) => {
      setCategory(category.filter((item: any) => item.id !== id));
      toast.success("Category Deleted");
    });
  };

  return (
    <div>
      <Breadcrumbs
        list={[
          { name: "Dashboard", link: "/dashboard" },
          { name: "Category", link: "/dashboard/category" },
        ]}
      />
      <div className="flex justify-between items-center my-3">
        <h1 className="text-2xl font-bold">Category List</h1>
        <Link
          href="/dashboard/category/create"
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
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Total Service</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {category.map((item: any, index: number) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.categoryname}</td>
                    <td>{item.service.length}</td>
                    <td>
                      <Link
                        className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                        href={`/dashboard/category/${item.id}`}
                      >
                        Edit
                      </Link>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded-md"
                        onClick={() => handeldelect(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Categorylist;
