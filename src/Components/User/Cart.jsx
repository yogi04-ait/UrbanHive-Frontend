import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GiShoppingBag } from "react-icons/gi";
import { NavLink } from "react-router";
import CartItem from "./CartItem";
import { removeItem } from "../../utils/cartSlice";
import { animateScroll as scroll } from "react-scroll";


const Cart = () => {
  const cart = useSelector((store) => store.cart);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const removeProduct = ({ id, size }) => {
    dispatch(removeItem({ id, size }));
  };
scroll.scrollToTop({
  duration: 500,
  smooth: true,
});
  function cartTotal() {
    let total = 0;
    cart.forEach((product) => {
      total += product.quantity * product.price;
    });

    return total.toFixed(2);
  }
  const total = cartTotal();

  return (
    <div className="lg:mx-40 mx-10 sm:mx-16 md:mx-32 ">
      <div className="text-2xl mb-3">
        <div className="inline-flex gap-2 items-center mb-3">
          <p className="text-gray-500">
            YOUR
            <span className="text-gray-700 font-medium"> CART</span>
          </p>
          <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
        </div>
      </div>
      {cart.length === 0 ? (
        <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-5">
          <GiShoppingBag className="text-7xl text-black" />
          <article className="flex flex-col items-center justify-center">
            <h3 className="text-2xl font-medium">Hey, It feels so light!</h3>
            <p className="text-light-gray text-xs mt-1.5">
              There is nothing in your bag
            </p>
          </article>
          <button className="text-white bg-black px-6 py-2 font-normal rounded">
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
      {cart.length > 0 && (
        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <div className="w-full">
              <div className="text-2xl">
                <div className="inline-flex gap-2 items-center mb-3">
                  <p className="text-gray-500">
                    CART
                    <span className="text-gray-700 font-medium"> TOTALS</span>
                  </p>
                  <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-2 text-sm">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>₹ {total}</p>
                </div>
                <hr />
                <div className="flex justify-between">
                  <p>Shipping Fee</p>
                  <p>₹ 0.00</p>
                </div>
                <hr />
                <div className="flex justify-between">
                  <b>Total</b>
                  <b>₹ {total}</b>
                </div>
              </div>
            </div>
            <div className="w-full text-end mt-10">
              <NavLink
                to={user ? "/checkout" : "/login"}
                className="bg-black cursor-pointer text-white text-sm my-8 px-8 py-3"
              >
                {user ? "PROCEED TO CHECKOUT" : "LOGIN TO CHECKOUT"}
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
