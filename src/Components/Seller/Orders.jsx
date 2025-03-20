import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderItem from "./OrderItem";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Orders = () => {
  const [orders, setOrders] = useState([]);
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
        `${BASE_URL}/seller/orders?page=${currentPage}&limit=${pageSize}`,
        {
          withCredentials: true,
        }
      );
      setOrders(response?.data?.orders);
    } catch (error) {
      toast.error(error?.response?.data?.message);
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

  return (
    <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-5 text-gray-600 text-base">
      <div>
        <h3>Orders</h3>
        <div>
          {orders.map((order) => {
            return <OrderItem order={order} key={order._id} />;
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
    </div>
  );
};

export default Orders;
