"use client";
import Breadcrumbs from "@/components/Common/Breadcrumbs";
import { IService } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { instance } from "@/Service/Axios/interceptors";
import { handleFileUpload } from "@/utils/Imagehandeler";
import toast from "react-hot-toast";

const Addservice = () => {
  const [error, seterror] = React.useState([]) as any;
  const [category, setcategory] = React.useState([]) as any[];
  const [loading, setloading] = React.useState(false) as any;
  const [img, setimg] = React.useState(null) as any;

  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IService>();

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

  const onSubmit = async (data: IService) => {
    setloading(true);

    const result: any = await handleFileUpload(data?.img[0]);
    data.slug = data?.name?.toLowerCase().replace(/ /g, "-");
    data.img = result?.url;
    await savedata(data);
  };

  const savedata = async (data: IService) => {
    const result = await instance
      .post("/service", {
        name: data?.name,
        slug: data?.slug,
        price: data?.price,
        img: data.img ? data.img : null,
        description: data?.description,
        shortdescription: data?.shortdescription,
        servicecategoryId: data?.servicecategoryId,
      })
      .then((res) => {
        toast.success("Service Added");
        setloading(false);
        router.push("/dashboard/service");
      })
      .catch((err) => {
        setloading(false);
        if (err.response.status === 400) {
          seterror(err?.response?.data?.errors);
        }
      });

    return result;
  };

  return (
    <div>
      <Breadcrumbs
        list={[
          { name: "Dashboard", link: "/dashboard" },
          { name: "Service", link: "/dashboard/service" },
          { name: "Add Service", link: "/dashboard/service/create" },
        ]}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center my-3">
          <h1 className="text-2xl font-bold">New Service Add</h1>
          <button className="button flex gap-2 items-center">
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            ) : (
              <>
                <FontAwesomeIcon icon={faSave} className=" w-3" /> Save
              </>
            )}
          </button>
        </div>

        <div className=" grid grid-cols-2 gap-2 justify-center items-center mt-5">
          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text  text-md">Service name</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-md"
              {...register("name", { required: true })}
            />
            {error[0]?.path === "name" && (
              <span className=" text-red-700">{error[0]?.message}</span>
            )}
            {error[0]?.path === "" && (
              <span className=" text-red-700">{error[0]?.message}</span>
            )}
          </div>
          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text  text-md">Price</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-md"
              {...register("price", { required: true })}
            />
            {error[0]?.path === "price" && (
              <span className=" text-red-700">{error[0]?.message}</span>
            )}
          </div>

          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text  text-md">Description</span>
            </label>
            <textarea
              placeholder="Type here"
              className="textarea textarea-bordered w-full max-w-md"
              {...register("description", { required: true })}
            />
            {error[0]?.path === "description" && (
              <span className=" text-red-700">{error[0]?.message}</span>
            )}
          </div>
          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text  text-md">Short Description</span>
            </label>
            <textarea
              placeholder="Type here"
              className="textarea textarea-bordered w-full max-w-md"
              {...register("shortdescription", { required: true })}
            />
            {error[0]?.path === "shortdescription" && (
              <span className=" text-red-700">{error[0]?.message}</span>
            )}
          </div>
          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text  text-md">Service Image</span>
            </label>
            <input
              type="file"
              placeholder="Type here"
              className="input input-bordered w-full max-w-md"
              {...register("img", { required: true })}
            />
            {error[0]?.path === "img" && (
              <span className=" text-red-700">{error[0]?.message}</span>
            )}
          </div>
          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text  text-md">Category</span>
            </label>
            <select
              className="select select-bordered w-full max-w-md"
              {...register("servicecategoryId", { required: true })}
            >
              {category?.map((item: any) => (
                <option value={item?.id}>{item?.categoryname}</option>
              ))}
            </select>
            {error[0]?.path === "category" && (
              <span className=" text-red-700">{error[0]?.message}</span>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Addservice;
