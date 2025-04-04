import  { useEffect, useState } from "react";
import Logo from "../../assets/Logo.png";
import { NavLink, useNavigate } from "react-router-dom"; // make sure to import from react-router-dom
import { useSelector } from "react-redux";
import { IoIosSearch } from "react-icons/io";
import { FaCartArrowDown, FaRegUser, FaRegHeart } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../../utils/userSlice";
import { clearWishlist } from "../../utils/wishlistSlice";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [toggleMenu, setToggleMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const user = useSelector((store) => store.user);
  const cart = useSelector((store) => store.cart);
  const navigate = useNavigate();
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

  const handleMenuClose = () => {
    setToggleMenu(!toggleMenu);
  };

  function search() {
    navigate("/search/" + searchQuery);
  }

  const getActiveClass = ({ isActive }) =>
    isActive ? "text-gray-900 font-semibold" : "hover:text-gray-800";

  return (
    <nav className="w-full h-full flex items-center justify-between px-5 lg:px-10 py-5">
      <section className=" h-full flex items-center justify-start gap-1 sm:gap-2 ">
        <a href="/" className="w-32 object-cover object-center mr-7">
          <img
            src={Logo}
            alt="Logo"
            className="w-32 object-cover object-center"
          />
        </a>
        <ul className="hidden lg:flex gap-10 text-base font-weight-450 text-gray-600 ">
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

      <section className=" h-full flex items-center justify-end gap-10 sm:gap-8">
        <form
          className="hidden sm:flex items-center bg-slate-100 px-3 py-2 gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            search();
          }}
        >
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
        <div className={`relative hidden lg:block  ${user ? "group" : ""}`}>
          <NavLink to={user ? "/profile" : "/login"}>
            <FaRegUser className={`w-6 h-6 cursor-pointer`} />
          </NavLink>
          <div className="absolute right-1  hidden group-hover:block  group-hover:opacity-100 pt-1 mt-0.5 transition-opacity delay-700 z-10 duration-300 ease-in-out">
            <div className="flex flex-col items-center  w-32 bg-slate-100 font-[Outfit] text-lg font-medium py-3 px-5 z-10 text-gray-500 rounded">
              <NavLink
                to="/profile"
                className="cursor-pointer hover:text-black"
              >
                Profile
              </NavLink>
              <NavLink to="/orders" className="cursor-pointer hover:text-black">
                Orders
              </NavLink>
              <NavLink
                className="cursor-pointer hover:text-black"
                onClick={handleLogout}
              >
                Logout
              </NavLink>
            </div>
          </div>
        </div>

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
              className="w-6 h-6 text-light-gray cursor-pointer "
              onClick={handleMenuClose}
            />
          ) : (
            <HiOutlineMenu
              className="w-6 h-6 text-light-gray cursor-pointer"
              onClick={handleMenuClose}
            />
          )}
          {toggleMenu && (
            <div className="bg-white absolute top-11 right-0 w-48 h-fit slide-left shadow-xl rounded-bl z-20">
              <ul className="flex flex-col items-start justify-center gap-2 py-3 px-4 font-satoshi text-base font-normal text-light-gray-100">
                <NavLink
                  to="/"
                  className={getActiveClass}
                  onClick={handleMenuClose}
                >
                  <li>Home</li>
                </NavLink>
                <NavLink
                  to="/feed"
                  className={getActiveClass}
                  onClick={handleMenuClose}
                >
                  <li>Shop</li>
                </NavLink>
                <NavLink
                  to="/products/men"
                  className={getActiveClass}
                  onClick={handleMenuClose}
                >
                  <li>Men</li>
                </NavLink>
                <NavLink
                  to="/products/women"
                  className={getActiveClass}
                  onClick={handleMenuClose}
                >
                  <li>Women</li>
                </NavLink>
                <NavLink
                  to="/products/kids"
                  className={getActiveClass}
                  onClick={handleMenuClose}
                >
                  <li>Kids</li>
                </NavLink>
                <li>
                  <div className="w-full h-[1px]" />
                </li>
                {user && (
                  <NavLink
                    to="/wishlist"
                    className={getActiveClass}
                    onClick={handleMenuClose}
                  >
                    <li>My Wishlist</li>
                  </NavLink>
                )}
                <NavLink
                  to="/cart"
                  className={getActiveClass}
                  onClick={handleMenuClose}
                >
                  <li>My Cart</li>
                </NavLink>
                <NavLink
                  to="/orders"
                  className={getActiveClass}
                  onClick={handleMenuClose}
                >
                  <li>My Orders</li>
                </NavLink>
                {!user && (
                  <NavLink
                    to="/login"
                    className={getActiveClass}
                    onClick={handleMenuClose}
                  >
                    <li>Login</li>
                  </NavLink>
                )}
                {user && (
                  <>
                    <NavLink
                      to="/profile"
                      className={getActiveClass}
                      onClick={handleMenuClose}
                    >
                      <li>My Profile</li>
                    </NavLink>
                    <button onClick={handleLogout} className="cursor-pointer">
                      <li>Logout</li>
                    </button>
                  </>
                )}
                <NavLink
                  to="/seller"
                  target="_blank"
                  className={getActiveClass}
                  onClick={handleMenuClose}
                >
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
