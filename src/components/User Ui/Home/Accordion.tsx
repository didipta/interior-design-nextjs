import React from "react";

const Accordion = ({item} : any) => {
  return (
    <div className="my-2">
      <div className="collapse collapse-arrow bg-base-200 ">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">
          {item?.title}
        </div>
        <div className="collapse-content">
        <div
      dangerouslySetInnerHTML={{
        __html: `${item?. content}`,
      }}
    />
        </div>
      </div>
    </div>
  );
};

export default Accordion;
