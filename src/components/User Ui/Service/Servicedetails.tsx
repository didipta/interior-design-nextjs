"use client";
import { instance } from "@/Service/Axios/interceptors";
import Loader from "@/components/Common/Loader";
import { useGetservicebyidQuery } from "@/redux/Slice/Serviceslice/serviceapi";
import { useGetNotificationQuery } from "@/redux/Slice/notification/notificationapi";
import { useAppSelector } from "@/redux/hook";
import Image from "next/image";
import React, { useState } from "react";
import Calendar from "react-calendar";
type ValuePiece = Date | null;
import "react-calendar/dist/Calendar.css";
import toast from "react-hot-toast";

type Value = ValuePiece | [ValuePiece, ValuePiece];
const Servicedetails = ({ id }: any) => {
  const [value, onChange] = useState<Value>(new Date());
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const { currentUser }: any = useAppSelector((state) => state.UserSlice);
  const {
    data,
    isLoading,
    refetch: bookrefetch,
  }: any = useGetservicebyidQuery(id);
  const {
    data: notification,
    isFetching: notificationfetch,
    isLoading: notificationloading,
    refetch,
  } = useGetNotificationQuery({}) as any;
  const isDateValid = (date: any) => {
    // You can implement your logic to check if a date is valid or an "off" day here
    // For example, if "off" days are weekends (Saturday and Sunday):
    const day = date.getDay();
    return day !== 5 && day !== 6; // Allow only non-Saturday and non-Sunday dates
  };
  const handleDateChange = (date: any) => {
    // Check if the selected date is valid
    if (isDateValid(date)) {
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      onChange(formattedDate);
    } else {
      // Handle the case when the date is not valid (e.g., show an error message)
      toast.error("Invalid date selected.");
    }
  };
  const isBangladeshiWeekend = (date: any) => {
    const day = date.getDay();
    return day === 5 || day === 6; // Friday (5) and Saturday (6) are weekend days in Bangladesh
  };

  // Function to set custom class names for different date types
  const tileClassName = ({ date }: any) => {
    if (isBangladeshiWeekend(date)) {
      return "weekend-date";
    }
    if (date < new Date()) {
      return "past-date";
    }
    return "valid-date";
  };
  const bookingadd = () => {
    instance
      .post("/booking", {
        serviceId: id,
        serviceprice: data?.data?.price,
        bookingdate: value,
      })
      .then((res) => {
        toast.success("Booking Success");
        refetch();
        bookrefetch();
        const modal = document.getElementById(
          "my_modal_2"
        ) as HTMLDialogElement | null;
        if (modal) {
          modal.close();
        }
      });
  };
  const setreview = () => {
    if (rating === 0 && review === "") {
      return toast.error("Please give rating and review");
    } else {
      instance
        .post("/review", { serviceId: id, review: review, rating: rating })
        .then((res) => {
          toast.success("Review Success");
          refetch();
          bookrefetch();
        });
    }
  };
  return (
    <div>
      <style>
        {`
          .weekend-date {
            color: blue; /* Set the text color for weekend dates (e.g., Friday and Saturday) */
          }
          .past-date {
            color: gray; /* Set the text color for past dates (invalid) */
            pointer-events: none; /* Disable selection of past dates */
          }
          .valid-date {
            color: black; /* Set the text color for all other valid dates */
          }
        `}
      </style>
      {!isLoading ? (
        <>
          <div className="card card-side md:flex-row flex-col bg-base-100 shadow-xl md:m-10">
            <figure>
              <Image
                src={`${data?.data?.img}`}
                alt="Movie"
                className="rounded-lg"
                width={600}
                height={500}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{data?.data?.name}</h2>
              <span className="text-gray-500">
                {data?.data?.shortdescription}
              </span>
              <span className="text-gray-500">
                <strong>Price:</strong> {data?.data?.price}-Tk
              </span>
              <p className="text-gray-500">{data?.data?.description}</p>

              <div className="card-actions justify-end">
                <button
                  className="btn"
                  onClick={() => {
                    const modal = document.getElementById(
                      "my_modal_2"
                    ) as HTMLDialogElement | null;
                    if (modal) {
                      modal.showModal();
                    }
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
          {currentUser !== null && (
            <div>
              <h2 className="text-2xl font-bold text-center">
                My Booking List
              </h2>
              <div className="grid md:grid-cols-3 grid-cols-1 gap-10 justify-center items-center mt-5 p-10">
                {data?.data?.booking?.map((item: any, index: number) => (
                  <div className="card bordered shadow-lg" key={index}>
                    <div className="card-body">
                      <h2 className="card-title text-xl font-bold name">
                        {item?.service?.name}
                      </h2>
                      <p className="text-gray-500 shortdes">
                        <strong>Price:</strong> {item?.serviceprice}-Tk
                      </p>
                      <p className="text-gray-500 shortdes">
                        <strong>Booking Date:</strong>{" "}
                        {new Date(
                          item?.bookingdate as string
                        ).toLocaleDateString()}
                      </p>
                      <p className="text-gray-500 shortdes">
                        <strong>Meetup Time:</strong>{" "}
                        {item?.bookingtime === null
                          ? "please Wait Admin Approve"
                          : item?.bookingtime}
                      </p>
                      <p className="text-gray-500 shortdes">
                        <strong>Status:</strong> {item?.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {currentUser !== null && (
            <div className=" w-full bg-slate-100 p-5 shadow-lg rounded-md my-5">
              <div className="flex gap-2">
                <div>
                  <label className="block mt-4 text-sm">
                    <span className="text-black text-lg my-2">Rating</span>
                  </label>
                  <select
                    className="border p-2 rounded"
                    onChange={(e: any) => setRating(e.target.value)}
                  >
                    <option value="1">1 Star</option>
                    <option value="2">2 Star</option>
                    <option value="3">3 Star</option>
                    <option value="4">4 Star</option>
                    <option value="5">5 Star</option>
                  </select>
                </div>
                <div className="flex flex-col w-full">
                  <label className="block mt-4 text-sm">
                    <span className="text-black text-lg my-2">Review</span>
                  </label>
                  <textarea
                    className="border p-2 rounded"
                    onChange={(e: any) => setReview(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  className="btn bg-blue-900 text-white my-4"
                  onClick={setreview}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
          <div className="card card-side md:flex-row flex-col bg-base-100 shadow-xl md:m-10 my-20">
            <div className="card-body">
              <h2 className="card-title">Reviews</h2>
              {data?.data?.review?.map((item: any, index: number) => (
                <div className="flex gap-2" key={index}>
                  <div className="flex flex-col bg-blue-200 w-full p-2 rounded-sm my-2">
                    <h2 className="card-title uppercase text-sm">
                      {item?.user?.name}( {item?.rating}/5)
                    </h2>
                    <span className="text-gray-500">{item?.review}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}

      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <div>
            <Calendar
              onChange={handleDateChange}
              value={value}
              tileClassName={tileClassName}
            />
            <button
              className="btn bg-blue-900 text-white my-4"
              onClick={bookingadd}
            >
              Book Now
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Servicedetails;
