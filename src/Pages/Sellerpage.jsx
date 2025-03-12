import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";
import SellerNavBar from "../Components/Seller/SellerNavBar";
import SideBar from "../Components/Seller/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addSeller } from "../utils/sellerSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import ShimmerLoader from "../Components/Loader/ShimmerLoader"; // Import the ShimmerLoader

const Sellerpage = () => {
  const seller = useSelector((store) => store.seller);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchSeller = async () => {
    if (seller) {
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get(BASE_URL + "/seller/profile", {
        withCredentials: true,
      });

      if (res.status === 201) {
        dispatch(addSeller(res?.data?.data));
        setLoading(false);
      } else {
        navigate("/seller/login");
      }
    } catch (error) {
      navigate("/seller/login");
    }
  };

  useEffect(() => {
    fetchSeller();
  }, []);

  if (loading) {
    return <ShimmerLoader />;
  }

  return (
    <div>
      <SellerNavBar />
      <div className="flex">
        <SideBar />
        <Outlet />
      </div>
      <div className="w-screen h-px mb-7 bg-gray-500"></div>
    </div>
  );
};

export default Sellerpage;
