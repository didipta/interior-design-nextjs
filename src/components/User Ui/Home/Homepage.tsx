import React from "react";
import Slider from "./Slider";
import Image from "next/image";
import Card from "@/components/Common/Card";
import Accordion from "./Accordion";
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
            <Card key={index} item={item} />
          ))}
        </div>
      </div>
      <div className="my-10">
        <h1 className="text-3xl font-bold text-center mb-2">Blog</h1>
        <p className="text-center text-gray-500 w-96 mx-auto">
          Interior design is the art and science of enhancing the interior of a
          building to achieve a healthier and more aesthetically pleasing
          environment for the people using the space.
        </p>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-10 justify-center items-center mt-5 p-10">
          {data.content.blog.map((item: any, index: number) => (
            <div className="card bordered shadow-lg">
              <img
                src="https://revenuearchitects.com/wp-content/uploads/2017/02/Blog_pic-1030x584.png"
                width={600}
                height={500}
                className="h-80"
              />
              <div className="card-body">
                <h2 className="card-title text-xl font-bold">{item?.title}</h2>

                <div
                  className="text-gray-500 shortdes"
                  dangerouslySetInnerHTML={{
                    __html: `${item?.content}`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10">
        <h1 className="text-3xl font-bold text-center mb-2">FAQ</h1>
        <p className="text-center text-gray-500 w-96 mx-auto">
          Interior design is the art and science of enhancing the interior of a
          building to achieve a healthier and more aesthetically pleasing
          environment for the people using the space.
        </p>
        <div className="md:w-2/5 mx-auto px-5 mt-5 ">
          {data?.content?.faq.map((item: any, index: number) => (
            <>
              <Accordion key={index} item={item} />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
