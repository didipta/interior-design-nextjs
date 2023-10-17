import Image from "next/image";
import React from "react";

const Card = ({ item }: any) => {
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
        <h2 className="card-title text-xl font-bold">{item?.name}</h2>
        <p className="text-gray-500 shortdes">{item?.shortdescription}</p>
        <p className="text-gray-500 shortdes">
          <strong>Price:</strong> {item?.price}-Tk
        </p>
        <div className="card-actions mt-4">
          <button className="btn bg-orange-400 text-white">Book Now</button>
          <button className="btn ">Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
