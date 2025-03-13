import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GiShoppingBag } from "react-icons/gi";
import { NavLink } from "react-router";
import CartItem from "./CartItem";
import { removeItem } from "../../utils/cartSlice";

const Cart = () => {
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  console.log(cart);

  const removeProduct = ({ id, size }) => {
    dispatch(removeItem({ id, size }));
  };

  return (
    <div className="lg:mx-40 mx-10 sm:mx-16 md:mx-32 ">
      <div className="text-2xl mb-3">
        <div className="inline-flex gap-2 items-center mb-3">
          <p className="text-gray-500">
            YOUR
            <span className="text-gray-700 font-medium">CART</span>
          </p>
          <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
        </div>
      </div>
      {cart.length === 0 ? (
        <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-5">
          <GiShoppingBag className="text-7xl text-blue-800" />
          <article className="flex flex-col items-center justify-center">
            <h3 className="text-2xl font-medium">Hey, It feels so light!</h3>
            <p className="text-light-gray text-xs mt-1.5">
              There is nothing in your bag
            </p>
          </article>
          <button className="text-white bg-blue-800 px-6 py-2 font-normal rounded">
            <NavLink to="/feed">Add Products</NavLink>
          </button>
        </div>
      ) : (
        <div className="min-h-[60vh]">
          {cart.map((item) => (
            <CartItem
              item={item}
              key={item.productId + item.size}
              removeProduct={removeProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
