"use client";

import { instance } from "@/Service/Axios/interceptors";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Fecdback = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [feeback, setback] = useState(null) as any;
  const getfeedback = () => {
    instance
      .get("/feedback")
      .then((res) => {
        setback(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    getfeedback();
  }, []);
  const fecdback = () => {
    if (subject === "" || message === "") {
      toast.error("Please fill all the fields");
    } else {
      instance
        .post("/feedback", {
          subject: subject,
          feedback: message,
        })
        .then((res) => {
          toast.success("Fecdback sent");
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
    }
  };
  return (
    <div>
      <div className=" flex flex-col items-center justify-center py-10">
        <h1 className="text-4xl font-bold text-gray-700">Feedback</h1>
        <p className="text-gray-500">Your feedback matters</p>
        <div className="flex flex-col md:flex-row gap-5 mt-5">
          <label className="text-gray-500">Subject</label>
          <input
            type="text"
            className="border p-2 rounded w-96"
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5 mt-5">
          <label className="text-gray-500">Message</label>
          <textarea
            className="border p-2 rounded w-96"
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button className="button mt-5" onClick={fecdback}>
          Send
        </button>
      </div>

      <div className="flex flex-col items-center justify-center py-10">
        <h2 className="text-4xl font-bold text-gray-700">All My Feedback</h2>
        <div className="flex flex-col md:flex-row gap-5 mt-5">
          {feeback?.map((item: any, index: number) => (
            <div className="card bordered shadow-lg" key={index}>
              <div className="card-body">
                <h2 className="card-title text-xl font-bold name">
                  {item?.subject}
                </h2>
                <p className="text-gray-500 shortdes">
                  <strong>Message:</strong> {item?.feedback}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fecdback;
