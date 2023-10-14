import Link from "next/link";
import React from "react";

const Breadcrumbs = ({ list }: any) => {
  return (
    <div>
      <div className="text-sm breadcrumbs">
        <ul>
          {list.map((item: any, index: number) => {
            return (
              <li key={index}>
                <Link href={item.link}>{item.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Breadcrumbs;
