import Servicelist from "@/components/User Ui/Service/Servicelist";
import { NextRequest } from "next/server";
import React from "react";
async function getservice(search: any): Promise<any> {
  const res = await fetch(
    `${process.env.BASE_URL}/api/v1/service?searchTerm=${search}`
  );
  return res.json();
}
const page = async (request: any) => {
  console.log(request?.searchParams?.search);
  //   const { searchParams } = new URL(request.url);
  //   const searchTerm = searchParams.get("searchTerm"); // Corrected parameter name
  //   const data = await getservice(request?.searchParams?.search);
  return <div>{/* <Servicelist data={data?.data} /> */}</div>;
};

export default page;
