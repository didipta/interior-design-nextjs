import Breadcrumbs from "@/components/Common/Breadcrumbs";
import React from "react";

const Addservice = () => {
  const [error, seterror] = React.useState([]) as any;

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
        if (err.response.status === 400) {
          console.log(err.response.data.errorMessages);
          seterror(err.response.data.errorMessages);
        }
      });
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
            {error[0]?.path === "categoryname" && (
              <span className=" text-red-700">{error[0]?.message}</span>
            )}
            {error[0]?.path === "" && (
              <span className=" text-red-700">{error[0]?.message}</span>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Addservice;
