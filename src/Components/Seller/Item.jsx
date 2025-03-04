import React from "react";
import { RxCross1 } from "react-icons/rx";

const Item = ({ item }) => {
  return (
    <div className="flex justify-between bg-gray-100 mt-2 pr-10 pl-3 items-center font-[Outfit]">
      <div className="flex gap-10 min-w-2xs">
        <img
          src="https://urbanhive.netlify.app/static/media/top7.e785c86bf90c0116f210.png"
          width="50px"
          className="p-0.5 py-1"
        />
        <p className="self-center">Women Printed Blouson Top</p>
      </div>
      <div className="flex gap-20 items-center ">
        <p>Women</p>
        <p>₹ 400</p>
        <RxCross1 />
      </div>
    </div>
  );
};

export default Item;
