import axios from "axios";
import React, { useEffect, useState } from "react";
import { GiShoppingBag } from "react-icons/gi";
import { NavLink } from "react-router";
import { formatDate } from "../../utils/constants";
import OrderItems from "./OrderItems";
import { animateScroll as scroll } from "react-scroll";
import { unstable_batchedUpdates } from "react-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;


const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalProducts: 0,
    pageSize: 7,
  });

  async function fetchOrders() {
    try {
      const { currentPage, pageSize } = pagination;
      const response = await axios.get(
        `${BASE_URL}/user/orders?page=${currentPage}&limit=${pageSize}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        unstable_batchedUpdates(() => {
          setOrders(response?.data?.orders);
          setPagination(response?.data?.pagination);
          setLoading(false);
        });
      }

      scroll.scrollToTop({
        duration: 500,
        smooth: true,
      });
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [pagination.currentPage]);

  const handleNextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      setPagination((prevState) => ({
        ...prevState,
        currentPage: prevState.currentPage + 1,
      }));
    }
  };

  const handlePrevPage = () => {
    if (pagination.currentPage > 1) {
      setPagination((prevState) => ({
        ...prevState,
        currentPage: prevState.currentPage - 1,
      }));
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="text-center w-full h-full text-lg flex justify-center align-center pt-[25vh] min-h-[60vh] ">
        Loading...
      </div>
    );
  }

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
                  <div className="flex flex-col group relative">
                    <p>SHIP TO</p>
                    <p className="cursor-pointer group">
                      {address?.name.split(" ")[0]}
                    </p>
                    {
                      <div className="absolute hidden w-[140px] group-hover:block bg-white border  p-2 rounded-md top-10">
                        <p>{address?.name}</p>
                        <p>
                          {address.line1}, {address.line2}, {address.state},{" "}
                          {address.pincode}
                        </p>
                      </div>
                    }
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
      <div className="flex justify-center items-center mt-5">
        <button
          onClick={handlePrevPage}
          disabled={pagination.currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-l-md disabled:opacity-50"
        >
          Previous
        </button>

        <span className="mx-4 text-gray-700">
          {/* Render page numbers */}
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() =>
                  setPagination((prevState) => ({
                    ...prevState,
                    currentPage: pageNumber,
                  }))
                }
                className={`px-4 py-2 ${
                  pagination.currentPage === pageNumber
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                } rounded-md mx-0.5 cursor-pointer`}
              >
                {pageNumber}
              </button>
            )
          )}
        </span>

        <button
          onClick={handleNextPage}
          disabled={pagination.currentPage === pagination.totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-r-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserOrders;
