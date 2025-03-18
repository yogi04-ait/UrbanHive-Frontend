import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { TiArrowSortedUp } from "react-icons/ti";
import { TiArrowSortedDown } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateQuantity } from "../../utils/cartSlice";
import { NavLink } from "react-router";

const CartItem = ({ item, removeProduct }) => {
  const [value, setValue] = useState(item?.quantity);
  const dispatch = useDispatch();

  const handleQuantity = (operation) => {
    if (operation === "i" && value >= item.availableQuantity) {
      toast.info("Limited quantity available");
    } else {
      setValue((prevQuantity) => {
        if (operation === "i") {
          return prevQuantity + 1;
        } else if (operation === "d" && prevQuantity > 1) {
          return prevQuantity - 1;
        }
        return prevQuantity;
      });

      if (operation === "i" && value < item.availableQuantity) {
        dispatch(
          updateQuantity({ id: item.productId, size: item.size, isadd: true })
        );
      } else if (operation === "d" && value > 1) {
        dispatch(
          updateQuantity({ id: item.productId, size: item.size, isadd: false })
        );
      }
    }
  };

  return (
    <div className="py-4 border-gray-300 border-b font-[Outfit] text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-3">
      <div className="flex items-start gap-6">
        <NavLink to={`/product/${item.productId}`} >
          <img className="w-16 sm:w-26 " src={item?.image} alt={item?.name} />
        </NavLink>

        <div className="ml-5">
          <NavLink to={`/product/${item.productId}`}>
            <p className="text-xs sm:text-lg font-medium">{item?.name}</p>
          </NavLink>
          <div className="flex items-center gap-7 ml-4   mt-5 ">
            <p className="font-bold text-sm sm:text-lg lg:text-xl">
              {item?.price}
            </p>
            <p className="sm:px-2 px-1 py-0.5 md:text-sm text-[10px]  sm:py-1 border bg-slate-50 rounded-full inline-flex justify-center items-center w-5 h-5 md:w-8 md:h-8 ">
              {item?.size}
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="relative w-fit">
          <input
            className="border  focus:outline-none outline-none max-w-10 sm:max-w-20 focus:ring-1 focus:ring-gray-900 text-start px-1 sm:px-2 py-1"
            type="number"
            min="1"
            readOnly
            value={value}
          />
          <div className="absolute top-[0.5px] right-2 py-0.5 ">
            <TiArrowSortedUp
              onClick={() => handleQuantity("i")}
              className="cursor-pointer text-xs lg:text-sm"
            />
            <TiArrowSortedDown
              onClick={() => handleQuantity("d")}
              className="cursor-pointer text-xs lg:text-sm"
            />
          </div>
        </div>
      </div>

      <MdDeleteForever
        onClick={() => removeProduct({ id: item.productId, size: item.size })}
        className="font-bold sm:text-3xl mr-4 w-5 cursor-pointer"
      />
    </div>
  );
};

export default CartItem;
