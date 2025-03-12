import React, { useEffect, useState } from "react";
import Logo from "../../assets/Logo.png";
import { NavLink } from "react-router-dom"; // make sure to import from react-router-dom
import { useSelector } from "react-redux";
import { IoIosSearch } from "react-icons/io";
import { FaCartArrowDown, FaRegUser, FaRegHeart } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../../utils/userSlice";
import { clearWishlist } from "../../utils/wishlistSlice";
import axios from "axios";

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [toggleMenu, setToggleMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const user = useSelector((store) => store.user);
  const cart = useSelector((store) => store.cart);

  const dispatch = useDispatch();

  const fetchUser = async () => {
    if (user) return;
    try {
      const res = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });
      if (res.status === 200) {
        dispatch(addUser(res.data.data));
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      axios.get(BASE_URL + "/logout", { withCredentials: true });
      dispatch(removeUser());
      dispatch(clearWishlist());
    } catch (error) {}
  };

  const getActiveClass = ({ isActive }) =>
    isActive ? "text-gray-900 font-semibold" : "";

  return (
    <nav className="w-full h-full flex items-center justify-between px-5 xl:px-10 py-5">
      <section className=" h-full flex items-center justify-start gap-1 sm:gap-2 ">
        <img
          src={Logo}
          alt="Logo"
          className="w-32 object-cover object-center mr-7"
        />
        <ul className="hidden lg:flex gap-10 text-base font-weight-450 text-gray-600">
          <NavLink to="/" className={getActiveClass}>
            <li>Home</li>
          </NavLink>
          <NavLink to="/feed" className={getActiveClass}>
            <li>Shop</li>
          </NavLink>
          <NavLink to="/products/men" className={getActiveClass}>
            <li>Men</li>
          </NavLink>
          <NavLink to="/products/women" className={getActiveClass}>
            <li>Women</li>
          </NavLink>
          <NavLink to="/products/kids" className={getActiveClass}>
            <li>Kids</li>
          </NavLink>
        </ul>
      </section>
      <NavLink to="/seller" target="_blank">
        <button className="font-semibold cursor-pointer text-gray-600 rounded-3xl hidden md:block whitespace-nowrap px-5 py-0.5 border-gray-500 border">
          Seller Panel
        </button>
      </NavLink>

      <section className=" h-full flex items-center justify-end gap-7 sm:gap-10">
        <form className="hidden sm:flex items-center bg-slate-100 px-3 py-2 gap-2">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-light-gray rounded outline-none border-none"
          />
          <IoIosSearch className="text-gray-500" />
        </form>
        {user && (
          <NavLink to="/wishlist" className="relative hidden lg:block">
            <FaRegHeart className="w-6 h-6 cursor-pointer" />
            <span className="absolute w-5 h-5 -top-3 -right-3 bg-red-500 text-white rounded-full flex justify-center items-center text-sm p-2">
              {user.wishlist.length}
            </span>
          </NavLink>
        )}
        <NavLink to="/cart" className="relative hidden lg:block">
          <FaCartArrowDown className="w-6 h-6 cursor-pointer" />
          <span className="absolute w-5 h-5 -top-3 -right-3 bg-red-500 text-white rounded-full flex justify-center items-center text-sm p-2">
            {cart.length}
          </span>
        </NavLink>
        <NavLink
          to={user ? "" : "/login"}
          className={`relative hidden lg:block ${user ? "group" : ""}`}
        >
          <FaRegUser className="w-6 h-6 cursor-pointer" />
        </NavLink>

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
                <NavLink to="/" className={getActiveClass}>
                  <li>Home</li>
                </NavLink>
                <NavLink to="/feed" className={getActiveClass}>
                  <li>Shop</li>
                </NavLink>
                <NavLink to="/products/men" className={getActiveClass}>
                  <li>Men</li>
                </NavLink>
                <NavLink to="/products/women" className={getActiveClass}>
                  <li>Women</li>
                </NavLink>
                <NavLink to="/products/kids" className={getActiveClass}>
                  <li>Kids</li>
                </NavLink>
                <li>
                  <div className="w-full h-[1px]" />
                </li>
                {user && (
                  <NavLink to="/favorite" className={getActiveClass}>
                    <li>My Wishlist</li>
                  </NavLink>
                )}
                <NavLink to="/cart" className={getActiveClass}>
                  <li>My Cart</li>
                </NavLink>
                {!user && (
                  <NavLink to="/login" className={getActiveClass}>
                    <li>Login</li>
                  </NavLink>
                )}
                {user && (
                  <NavLink to="/profile" className={getActiveClass}>
                    <li>My Profile</li>
                  </NavLink>
                )}
                <NavLink to="/" target="_blank" className={getActiveClass}>
                  <li>Seller Panel</li>
                </NavLink>
              </ul>
            </div>
          )}
        </nav>
      </section>
    </nav>
  );
};

export default NavBar;
