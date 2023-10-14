"use client";
import Breadcrumbs from "@/components/Common/Breadcrumbs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import Link from "next/link";
import { instance } from "@/Service/Axios/interceptors";

const Categorylist = () => {
  const [category, setCategory] = React.useState([]);
  useEffect(() => {
    instance.get("/category").then((res) => {
      setCategory(res.data);
    });
  }, []);

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

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Total Service</th>
            </tr>
          </thead>
          <tbody>
            {category.map((item: any, index: number) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.categoryname}</td>
                  <td>{item.service.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categorylist;
