"use client";
import Servicelist from "@/components/User Ui/Service/Servicelist";
import { useSearchParams } from "next/navigation";
import { NextRequest } from "next/server";
import React from "react";

const page = () => {
  return (
    <div>
      <Servicelist />
    </div>
  );
};

export default page;
