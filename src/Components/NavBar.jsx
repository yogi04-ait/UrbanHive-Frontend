import React, { useState } from "react";
import Logo from "../assets/Logo.png";
import { Link, useLocation, useNavigate } from "react-router";
import { IoIosSearch } from "react-icons/io";
import { FaCartArrowDown, FaRegUser, FaRegHeart } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { MdClose } from "react-icons/md";

const NavBar = () => {
  const location = useLocation();
  const locationRoute = (route) => {
    if (location.pathname === route) {
      return true;
    }
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [toggleMenu, setToggleMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="w-full h-full flex items-center justify-between px-5 xl:px-10 py-5">
      <section className="w-full h-full flex items-center justify-start gap-5 sm:gap10 xl:gap-20">
        <img
          src={Logo}
          alt="Logo"
          className="w-32 object-cover object-center"
        />
        <ul className="hidden lg:flex gap-10 text-base font-weight-450 text-gray-600">
          <Link
            to="/"
            className={`${
              locationRoute("/") ? "text-gray-900 font-semibold" : ""
            }`}
          >
            <li>Shop</li>
          </Link>
          <Link
            to="/products/men"
            className={`${
              locationRoute("/products/men")
                ? "text-gray-900 font-semibold"
                : ""
            }`}
          >
            <li>Men</li>
          </Link>
          <Link
            to="/products/women"
            className={`${
              locationRoute("/products/women")
                ? "text-gray-900 font-semibold"
                : ""
            }`}
          >
            <li>Women</li>
          </Link>
          <Link
            to="/products/kids"
            className={`${
              locationRoute("/products/kids")
                ? "text-gray-900 font-semibold"
                : ""
            }`}
          >
            <li>Kids</li>
          </Link>
        </ul>
        <button className="font-semibold cursor-pointer text-gray-600 rounded-3xl hidden md:block  whitespace-nowrap px-5 py-0.5  border-gray-500 border ">
          <Link to="/" target="_blank">
            Seller Panel
          </Link>
        </button>
      </section>
      <section className="w-full h-full  flex items-center justify-end gap-7  sm:gap-10">
        <form className="hidden sm:flex items-center  bg-slate-100 px-3 py-2 gap-2">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-light-gray rounded outline-none border-none"
          />
          <IoIosSearch className="text-gray-500" />
        </form>
        <Link to="/favorite" className="relative hidden lg:block">
          <FaRegHeart className="w-6 h-6 cursor-pointer" />
          <span className="absolute w-5 h-5 -top-3 -right-3 bg-red-500 text-white rounded-full flex justify-center items-center text-sm p-2">
            0
          </span>
        </Link>
        <Link to="/cart" className="relative hidden lg:block">
          <FaCartArrowDown className="w-6 h-6 cursor-pointer" />
          <span className="absolute w-5 h-5 -top-3 -right-3 bg-red-500 text-white rounded-full flex justify-center items-center text-sm p-2">
            0
          </span>
        </Link>
        <Link to="/profile" className="relative hidden lg:block">
          <FaRegUser className="w-6 h-6 cursor-pointer" />
        </Link>
        <section className="block sm:hidden">
          <IoIosSearch
            className="text-black-100 w-5 h-5 cursor-pointer"
            onClick={() => setSearchOpen(true)}
          />
          {searchOpen && (
            <form
              className={`absolute top-0 left-0 z-50 w-full py-6 bg-white flex items-center justify-between px-10 gap-2 ${
                searchOpen ? "search-bar-fade-in" : "search-bar-fade-out"
              }`}
            >
              <input
                type="text"
                placeholder="Search Products..."
                value={searchQuery}
                className="w-full bg-transparent placeholder:text-light-gray text-light-gray border-none outline-none"
              />
              <MdClose
                className="w-6 h-6 text-light-gray cursor-pointer"
                onClick={() => setSearchOpen(false)}
              />
            </form>
          )}
        </section>
        <nav className="block lg:hidden">
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
                <Link
                  to="/"
                  className={`${
                    locationRoute("/") ? "text-gray-900 font-semibold" : ""
                  }`}
                >
                  <li>Shop</li>
                </Link>
                <Link
                  to="/"
                  className={`${
                    locationRoute("/products/men")
                      ? "text-gray-900 font-semibold"
                      : ""
                  }`}
                >
                  <li>Men</li>
                </Link>
                <Link
                  to="/"
                  className={`${
                    locationRoute("/products/women")
                      ? "text-gray-900 font-semibold"
                      : ""
                  }`}
                >
                  <li>Women</li>
                </Link>
                <Link
                  to="/"
                  className={`${
                    locationRoute("/products/kids")
                      ? "text-gray-900 font-semibold"
                      : ""
                  }`}
                >
                  <li>Kids</li>
                </Link>
                <li>
                  <div className="w-full h-[1px] " />
                </li>
                <Link
                  to="/"
                  className={`${
                    locationRoute("/wishlist")
                      ? "text-gray-900 font-semibold"
                      : ""
                  }`}
                >
                  <li>My Wishlist</li>
                </Link>
                <Link
                  to="/"
                  className={`${
                    locationRoute("/cart") ? "text-gray-900 font-semibold" : ""
                  }`}
                >
                  <li>My Cart</li>
                </Link>
                <Link
                  to="/"
                  className={`${
                    locationRoute("/profile")
                      ? "text-gray-900 font-semibold"
                      : ""
                  }`}
                >
                  <li>My Profile</li>
                </Link>
                <Link
                  to="/"
                  target="_blank"
                  className={`${
                    locationRoute("/seller")
                      ? "text-gray-900 font-semibold"
                      : ""
                  }`}
                >
                  <li>Seller Panel</li>
                </Link>
              </ul>
            </div>
          )}
        </nav>
      </section>
    </nav>
  );
};

export default NavBar;
