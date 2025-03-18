import React from "react";
import { RxCross1 } from "react-icons/rx";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
import { NavLink } from "react-router";

const Shimmer = () => {
  return (
    <div className="flex justify-between bg-gray-100 mt-2 pr-10 pl-3 items-center font-[Outfit] animate-pulse">
      <div className="flex gap-10 min-w-2xs">
        <div className="w-12 h-12 bg-gray-300 rounded-md"></div>{" "}
        <div className="w-32 h-4 bg-gray-300 rounded-md"></div>{" "}
      </div>
      <div className="flex gap-20 items-center">
        <div className="w-24 h-4 bg-gray-300 rounded-md"></div>{" "}
        <div className="w-16 h-4 bg-gray-300 rounded-md"></div>{" "}
        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>{" "}
      </div>
    </div>
  );
};

const Item = ({ item, onDelete }) => {
  if (!item) {
    return <Shimmer />;
  }

  const { name, category, price, images, _id } = item;

  return (
    <div className="flex justify-between md:flex-row flex-col bg-gray-100 mt-2 pr-10 pl-3 items-center font-[Outfit]">
      <div className="flex gap-10 min-w-2xs items-center">
        <NavLink to={`/seller/update/${_id}`}>
          <img
            src={images[0]?.imageUrls}
            width="50px"
            className="p-0.5 py-1"
            alt={name}
          />
        </NavLink>
        <NavLink to={`/seller/update/${_id}`}>
          <p className=" pl-5">{name}</p>
        </NavLink>
      </div>
      <div className="flex w-full justify-between md:w-fit md:gap-20 md:items-center">
        <p>{category}</p>
        <p>₹ {price}</p>
        <RxCross1 onClick={() => onDelete(_id)} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Item;
