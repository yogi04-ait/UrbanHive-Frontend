import { MdAddCircleOutline } from "react-icons/md";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { NavLink } from "react-router-dom"; // Corrected to "react-router-dom"

const getActiveClass = ({ isActive }) =>
  isActive ? "bg-pink-100 border-pink-300" : "";

const SideBar = () => {
  return (
    <div className=" ml-7 font-[Outfit]">
      <div className="flex flex-col gap-4 mt-7 pl-3">
        <NavLink
          to="/seller/add"
          className={({ isActive }) =>
            `flex gap-3 p-2 border w-48 rounded-l-sm border-r-0 border-gray-300 text-md ${getActiveClass(
              {
                isActive,
              }
            )}`
          }
        >
          <MdAddCircleOutline className="w-6 h-6" />
          Add Items
        </NavLink>
        <NavLink
          to="/seller/products"
          className={({ isActive }) =>
            `flex gap-3 p-2 border w-48 rounded-l-sm border-r-0 border-gray-300 text-md ${getActiveClass(
              {
                isActive,
              }
            )}`
          }
        >
          <BsFillBoxSeamFill className="w-6 h-6" />
          List Items
        </NavLink>
        <NavLink
          to="/seller/orders"
          className={({ isActive }) =>
            `flex gap-3 p-2 border w-48 rounded-l-sm border-r-0 border-gray-300 text-md ${getActiveClass(
              {
                isActive,
              }
            )}`
          }
        >
          <BsFillBoxSeamFill className="w-6 h-6" />
          Orders
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
