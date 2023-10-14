import Updatecategory from "@/components/Dashboard ui/Category/Updatecategory";
import { IDProps } from "@/types";
import React from "react";

const page = ({ params }: IDProps) => {
  return (
    <div>
      <Updatecategory params={params} />
    </div>
  );
};

export default page;
