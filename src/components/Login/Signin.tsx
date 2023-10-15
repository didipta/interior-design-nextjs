"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Iusersignin } from "@/types";
import { useLoginuserMutation } from "@/redux/Slice/Userslice/userApi";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/redux/hook";
import { setCurrentUser } from "@/redux/Slice/Userslice/Userslices";

const Signin = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Iusersignin>();

  const [signin] = useLoginuserMutation();
  const dispatch = useAppDispatch();

  const onSubmit = (data: Iusersignin) => {
    signin(data)
      .then((res: any) => {
        if (res?.error?.data?.success !== undefined) {
          toast.error(res?.error?.data?.message);
        } else {
          toast.success("Login Success");
          console.log(res.data);
          localStorage.setItem("accessToken", res.data.token);
          dispatch(setCurrentUser(res.data.data));
          router.push("/");
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <div>
      <div className="flex items-center min-h-screen p-6 bg-gray-300">
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <div className="h-32 md:h-auto md:w-1/2">
              <img
                aria-hidden="true"
                className="object-cover w-full h-full dark:hidden"
                src="https://media.istockphoto.com/id/1483031614/photo/modern-interior-design-of-living-room-black-sofa-and-empty-mockup-wall-background.webp?b=1&s=170667a&w=0&k=20&c=IfuCi6xRtN2kCXpLXUVn1NVZZ6tuBtyu6J2zS3gYHKg="
                alt="Office"
              />
              <img
                aria-hidden="true"
                className="hidden object-cover w-full h-full dark:block"
                src="https://media.istockphoto.com/id/1483031614/photo/modern-interior-design-of-living-room-black-sofa-and-empty-mockup-wall-background.webp?b=1&s=170667a&w=0&k=20&c=IfuCi6xRtN2kCXpLXUVn1NVZZ6tuBtyu6J2zS3gYHKg="
                alt="Office"
              />
            </div>
            <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                  Login
                </h1>
                <label className="block text-sm">
                  <span className="text-gray-700 dark:text-gray-400">
                    Email
                  </span>
                  <input
                    type="eamil"
                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input p-2"
                    placeholder="Jane@gmail.com"
                    {...register("email", {
                      required: "Email is Required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format",
                      },
                    })}
                  />
                </label>
                <label className="block mt-4 text-sm">
                  <span className="text-gray-700 dark:text-gray-400">
                    Password
                  </span>
                  <input
                    type="password"
                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input p-2"
                    placeholder="***************"
                    {...register("password", { required: true })}
                  />
                </label>

                <div className="flex mt-6 text-sm">
                  <label className="flex items-center dark:text-gray-400">
                    <input
                      type="checkbox"
                      className="text-purple-600 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                    />
                    <span className="ml-2">Remember me</span>
                  </label>

                  <a
                    href="#"
                    className="ml-auto text-sm text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="mt-4">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-600 rounded hover:bg-purple-500 focus:outline-none focus:bg-purple-500"
                  >
                    Sign In
                  </button>
                </div>
                <div className="my-3">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {" "}
                    or login with
                  </p>
                  <button className="px-4 py-2 ml-auto text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-purple my-2">
                    <FontAwesomeIcon icon={faGoogle} className=" w-5" />
                  </button>

                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {" "}
                    Don't have an account?{" "}
                    <Link
                      href="/signup"
                      className="text-purple-600 dark:text-purple-400 hover:underline"
                    >
                      Register
                    </Link>{" "}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
