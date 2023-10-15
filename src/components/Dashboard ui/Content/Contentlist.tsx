"use client";
import Breadcrumbs from "@/components/Common/Breadcrumbs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import React, { useEffect } from "react";
import Loader from "@/components/Common/Loader";
import { instance } from "@/Service/Axios/interceptors";
import toast from "react-hot-toast";

const Contentlist = () => {
  const [content, setcontent] = React.useState([]) as any;
  const [loading, setloading] = React.useState(false) as any;

  useEffect(() => {
    setloading(true);
    instance.get("/content").then((res) => {
      setcontent(res.data);
      setloading(false);
    });
  }, []);
  const handeldelect = (id: string) => {
    instance.delete(`/content/${id}`).then((res) => {
      setcontent(content.filter((item: any) => item.id !== id));
      toast.success("content Deleted");
    });
  };
  return (
    <div>
      <Breadcrumbs
        list={[
          { name: "Dashboard", link: "/dashboard" },
          { name: "Content", link: "/dashboard/content" },
        ]}
      />

      <div className="flex justify-between items-center my-3">
        <h1 className="text-2xl font-bold">Content List</h1>
        <Link
          href="/dashboard/content/create"
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
                <th>Title</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {content.map((item: any, index: number) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.type}</td>
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

export default Contentlist;
