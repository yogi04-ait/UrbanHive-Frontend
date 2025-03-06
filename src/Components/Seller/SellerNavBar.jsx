import React, { useEffect, useState } from "react";
import Logo from "../../assets/Logo.png";
import { BASE_URL } from "../../utils/constants";
import { addSeller, removeSeller } from "../../utils/sellerSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";

const SellerNavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(BASE_URL + "/seller/logout", { withCredentials: true });
      dispatch(removeSeller());
      navigate("/seller/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between m-3">
        <img src={Logo} alt="Urban Hive" className="w-32 cursor-pointer" />
        <div className="flex gap-3 mr-3">
          <button className="px-5 p-1 text-white font-semibold cursor-pointer bg-[#4B5563] rounded-2xl">
            Profile
          </button>
          <button
            className="px-5 p-1 text-white font-semibold cursor-pointer bg-[#4B5563] rounded-2xl"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="w-screen h-px mt-6 bg-gray-500"></div>
    </div>
  );
};

export default SellerNavBar;
