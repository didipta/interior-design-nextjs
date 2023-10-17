"use client";
import Card from "@/components/Common/Card";
import Pagination from "@/components/Common/Paginationpage";
import { useRouter } from "next/navigation";
import React, { use, useState } from "react";

const Servicelist = ({ data }: any) => {
  const router = useRouter();
  const handlePageChange = ({ selected }: any) => {
    router.push(`/service?page=${selected + 1}`);
  };
  return (
    <div>
      <h1 className="text-2xl font-bold text-center">All Service</h1>
      <p className="text-center text-gray-500 w-96 mx-auto">
        Interior design is the art and science of enhancing the interior of a
        building to achieve a healthier and more aesthetically pleasing
        environment for the people using the space.
      </p>
      <div className="flex justify-between items-center my-5 px-5 flex-wrap">
        <div className="flex gap-2 items-center">
          <label className="text-gray-500">Sort By</label>
          <select className="border p-2 rounded">
            <option value="price">Price</option>
            <option value="name">Name</option>
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search"
            className="border p-2 rounded"
            onChange={(e) => router.push(`/service?search=${e.target.value}`)}
          />
          <button className="button">Search</button>
        </div>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-10 justify-center items-center mt-5 p-10">
        {data?.data?.map((item: any, index: number) => (
          <Card key={index} item={item} />
        ))}
      </div>
      <div className=" flex justify-center items-center my-5">
        <Pagination
          totalPages={Math.ceil(data?.meta?.total / 10)}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Servicelist;
