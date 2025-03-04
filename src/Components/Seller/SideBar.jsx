import React from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { BsFillBoxSeamFill } from "react-icons/bs";

const SideBar = () => {
  return (
    <div className="flex gap-0 ml-7 font-[Outfit] ">
      <div className="flex flex-col gap-4 mt-7 pl-3">
        <div className="flex gap-3 p-2 border w-48 rounded-l-sm border-r-0 border-gray-300 text-md ">
          <MdAddCircleOutline className="w-6 h-6" />
          Add Items
        </div>
        <div className="flex gap-3 p-2 border w-48 rounded-l-sm border-r-0 border-gray-300 text-md ">
          <BsFillBoxSeamFill className="w-6 h-6" />
          List Items
        </div>
        <div className="flex gap-3 p-2 border w-48 rounded-l-sm border-r-0 border-gray-300 text-md ">
          <BsFillBoxSeamFill className="w-6 h-6" />
          Orders
        </div>
      </div>
      <div class="h-screen w-px bg-gray-500"></div>
    </div>
  );
};

export default SideBar;
