import Servicedetails from "@/components/User Ui/Service/Servicedetails";
import React from "react";

const page = ({ params }: any) => {
  return (
    <div>
      <Servicedetails id={params.id} />
    </div>
  );
};

export default page;
