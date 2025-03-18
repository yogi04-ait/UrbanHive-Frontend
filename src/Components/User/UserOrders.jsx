import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { GiShoppingBag } from "react-icons/gi";
import { NavLink } from "react-router";
import { formatDate } from "../../utils/constants";
import OrderItems from "./OrderItems";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  async function fetchOrders() {
    try {
      const response = await axios.get(BASE_URL + "/user/orders", {
        withCredentials: true,
      });
      setOrders(response?.data?.orders);
    } catch (error) {}
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-[60vh] lg:mx-40 mx-10 sm:mx-16 md:mx-32 pt-3 pb-16 ">
      <div className="text-2xl">
        <div className="inline-flex gap-2 items-center mb-3">
          <p className="text-gray-500">
            MY <span className="text-gray-700 font-medium"> CART</span>
          </p>
          <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
        </div>
      </div>
      {orders.length === 0 && (
        <div className="w-full text-center align-bottom mt-14 text-black flex flex-col items-center justify-center gap-5 ">
          <p>NO ORDERS FOUND</p>
          <GiShoppingBag className="text-7xl text-black" />
          <button className="text-white bg-black px-6 py-2 font-normal rounded">
            <NavLink to="/feed">Shop Now</NavLink>
          </button>
        </div>
      )}
      <div>
        {orders.map((order) => {
          const formattedDate = formatDate(order?.createdAt);
          const {
            shippingAddress: address,
            totalAmount,
            paymentMethod,
            _id: orderId,
            orderItems,
          } = order;
          return (
            <div
              key={orderId}
              className=" border my-2 rounded-lg w-full overflow-hidden text-xs"
            >
              <div className="flex justify-between p-3 bg-gray-200 text-gray-700  w-full ">
                <div className="hidden sm:flex gap-5">
                  <div className="flex flex-col  ">
                    <p>ORDER PLACED</p>
                    <p>{formattedDate}</p>
                  </div>
                  <div className="flex flex-col ">
                    <p>Total</p>
                    <p>₹ {totalAmount}</p>
                  </div>
                  <div className="flex flex-col">
                    <p>SHIP TO</p>
                    <p>{address?.name.split(" ")[0]}</p>
                  </div>
                </div>
                <div className=" flex flex-col gap-1">
                  <p className="hidden sm:block">ORDER ID: {orderId}</p>
                  <p className="cursor-pointer">View order details</p>
                </div>
              </div>
              {orderItems.map((item) => {
                return (
                  <OrderItems
                    key={item?.product?._id}
                    item={item}
                    paymentMethod={paymentMethod}
                    orderId={orderId}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserOrders;
