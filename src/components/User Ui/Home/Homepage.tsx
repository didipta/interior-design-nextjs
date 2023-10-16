import React from "react";
import Slider from "./Slider";
import Image from "next/image";
const Homepage = ({ data }: any) => {
  return (
    <div>
      <div className="mb-5">
        <Slider />
      </div>
      <div className="mt-10">
        <h1 className="text-3xl font-bold text-center mb-2">
          Our Popular Services
        </h1>
        <p className="text-center text-gray-500 w-96 mx-auto">
          Interior design is the art and science of enhancing the interior of a
          building to achieve a healthier and more aesthetically pleasing
          environment for the people using the space.
        </p>

        <div className="grid md:grid-cols-3 grid-cols-1 gap-10 justify-center items-center mt-5 p-10">
          {data?.service?.map((item: any, index: number) => (
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
                <h2 className="card-title text-xl font-bold">{item?.name}</h2>
                <p className="text-gray-500 shortdes">
                  {item?.shortdescription}
                </p>
                <p className="text-gray-500 shortdes">
                  <strong>Price:</strong> {item?.price}-Tk
                </p>
                <div className="card-actions mt-4">
                  <button className="btn btn-primary">Book Now</button>
                  <button className="btn ">Add to cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
