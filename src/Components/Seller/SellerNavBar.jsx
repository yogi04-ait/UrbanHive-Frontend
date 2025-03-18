import React, { useEffect, useState } from "react";
import Logo from "../../assets/Logo.png";
import { BASE_URL } from "../../utils/constants";
import { addSeller, removeSeller } from "../../utils/sellerSlice";
import { useSelector, useDispatch } from "react-redux";
import { HiOutlineMenu } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { NavLink, useNavigate } from "react-router";
import axios from "axios";

const SellerNavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.get(BASE_URL + "/seller/logout", { withCredentials: true });
      dispatch(removeSeller());
      navigate("/seller/login");
    } catch (error) {
      console.error(error);
    }
  };

  const getActiveClass = ({ isActive }) =>
    isActive ? "text-gray-900 font-semibold" : "";

  return (
    <div>
      <div className="flex justify-between m-3">
        <img src={Logo} alt="Urban Hive" className="w-32 cursor-pointer" />
        <div className="flex gap-3 mr-3">
          <button className="px-6 p-1 hidden md:block text-white font-semibold cursor-pointer bg-black rounded-2xl">
            <NavLink to="/seller/profile">Profile</NavLink>
          </button>
          <button
            className="px-6 p-1 hidden md:block text-white font-semibold cursor-pointer bg-black rounded-2xl"
            onClick={handleLogout}
          >
            Logout
          </button>
          <nav className="block mt-1 md:hidden">
            {toggleMenu ? (
              <MdClose
                className="w-6 h-6 text-light-gray cursor-pointer"
                onClick={() => setToggleMenu(false)}
              />
            ) : (
              <HiOutlineMenu
                className="w-6 h-6 text-light-gray cursor-pointer"
                onClick={() => setToggleMenu(true)}
              />
            )}
            {toggleMenu && (
              <div className="bg-white absolute top-20 right-0 w-48 h-fit slide-left shadow-xl rounded-bl z-20">
                <ul className="flex flex-col items-start justify-center gap-2 py-3 px-4 font-satoshi text-base font-normal text-light-gray-100">
                  <NavLink to="/seller/add" className={getActiveClass}>
                    <li>Add Item</li>
                  </NavLink>
                  <NavLink to="/seller/products" className={getActiveClass}>
                    <li>List Item</li>
                  </NavLink>
                  <NavLink to="/seller/orders" className={getActiveClass}>
                    <li>Orders</li>
                  </NavLink>
                  <li>
                    <div className="w-full h-[1px]" />
                  </li>
                  <NavLink to="/seller/profile" className={getActiveClass}>
                    <li>Profile</li>
                  </NavLink>
                  <button onClick={handleLogout} className={getActiveClass}>
                    <li>Logout</li>
                  </button>
                </ul>
              </div>
            )}
          </nav>
        </div>
      </div>
      <div className="w-screen h-px mt-6 bg-gray-500"></div>
    </div>
  );
};

export default SellerNavBar;
