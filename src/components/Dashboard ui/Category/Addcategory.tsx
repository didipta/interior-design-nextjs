"use client";
import Breadcrumbs from "@/components/Common/Breadcrumbs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useForm } from "react-hook-form";
import { instance } from "@/Service/Axios/interceptors";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Inputs = {
  categoryname: string;
};
const Addcategory = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    console.log(data);
    instance
      .post("/category", data)
      .then((res) => {
        toast.success("Category Added");
        router.push("/dashboard/category");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div>
      <Breadcrumbs
        list={[
          { name: "Dashboard", link: "/dashboard" },
          { name: "Category", link: "/dashboard/category" },
          { name: "Add Category", link: "/dashboard/category/create" },
        ]}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center my-3">
          <h1 className="text-2xl font-bold">New Category Add</h1>
          <button className="button flex gap-2 items-center">
            <FontAwesomeIcon icon={faSave} className=" w-3" /> Save
          </button>
        </div>

        <div className=" flex justify-center items-center mt-5">
          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text  text-md">Category Name</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-md"
              {...register("categoryname")}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Addcategory;
