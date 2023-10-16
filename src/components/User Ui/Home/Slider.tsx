import React from "react";

const Slider = () => {
  return (
    <div>
      <div className="carousel w-full h-80">
        <div id="slide1" className="carousel-item relative w-full">
          <img
            src="https://www.decorpot.com/images/1795333106an-exclusive-guide-to-achieve-stunning-3bhk-interior-design.jpg"
            className="w-full h-80"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img
            src="https://jumanji.livspace-cdn.com/magazine/wp-content/uploads/sites/2/2021/06/10131120/interior-wall-design.jpg"
            className="w-full h-80"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img
            src="https://foyr.com/learn/wp-content/uploads/2019/01/best-interior-design-tips.jpg"
            className="w-full h-80"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcAQclWRMLzwQmrmVLIvCGZBLIRgGEJ1l83Q&usqp=CAU"
            className="w-full h-80"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
