import React from "react";
import Logo from "../../assets/Logo.png";
import { FaRegUser } from "react-icons/fa";

const SellerNavBar = () => {
  return (
    <div>
      <div className="flex justify-between m-3">
        <img src={Logo} alt="Urban Hive" className="w-32 cursor-pointer" />
        <div className="flex gap-3 mr-3">
          <button className="px-5 p-1 text-white font-semibold cursor-pointer bg-[#4B5563] rounded-2xl">
            Profile
          </button>
          <button className="px-5 p-1 text-white font-semibold cursor-pointer bg-[#4B5563] rounded-2xl">
            Logout
          </button>
        </div>
      </div>
      <div class="w-screen h-px mt-6 bg-gray-500"></div>
    </div>
  );
};

export default SellerNavBar;
