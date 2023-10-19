"use client";
import { useAddcartMutation } from "@/redux/Slice/cartslice/cartapi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const Card = ({ item }: any) => {
  const router = useRouter();
  const [data] = useAddcartMutation();

  const addcart = async (id: any) => {
    data(id).then((res: any) => {
      console.log(res);
      if (res?.data?.success === true) {
        toast.success("Added to cart");
      }
      if (res?.error?.status === 401) {
        toast.error("Please Login First");
        return router.push("/login");
      }
    });
  };
  return (
    <div className="card bordered shadow-lg">
      <figure>
        <Image
          src={`${item?.img}`}
          alt="Placeholder"
          className="h-80"
          width={600}
          height={500}
        />
      </figure>
      <div className="card-body">
        <Link
          href={`/service/${item?.id}`}
          className="card-title text-xl font-bold name"
        >
          {item?.name}
        </Link>
        <p className="text-gray-500 shortdes">{item?.shortdescription}</p>
        <p className="text-gray-500 shortdes">
          <strong>Price:</strong> {item?.price}-Tk
        </p>
        <div className="card-actions mt-4">
          <button className="btn bg-orange-400 text-white">Book Now</button>
          <button className="btn " onClick={() => addcart(item.id)}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
