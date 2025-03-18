import axios from "axios";
import React from "react";
import { BASE_URL } from "../../utils/constants";
import { toast } from "react-toastify";
import { useState } from "react";
import { NavLink } from "react-router";

const OrderItems = ({ item, paymentMethod, orderId }) => {
  const { _id: itemID, product, quantity, size, status, total } = item;
  const [itemStatus, setItemStatus] = useState(status);
  const image = product?.images[0]?.imageUrls;
  const name = product?.name;
  const productId = product?._id;

  async function cancelItem() {
    try {
      const response = await axios.patch(
        BASE_URL + "/user/cancel",
        {
          orderId,
          itemIds: [itemID],
        },
        { withCredentials: true }
      );
      if (response.status === 200) setItemStatus("cancelled");
      toast.info("Order cancelled");
    } catch (error) {
      toast.info(error?.response?.data?.message);
    }
  }

  return (
    <div className="py-2 px-3 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4  ">
      <div className="flex items-start gap-6 text-sm">
        <NavLink to={`/product/${productId}`}>
          <img src={image} width="60px" className="w-16 sm:w-20 " alt={name} />
        </NavLink>
        <div>
          <NavLink to={`/product/${productId}`}>
            <p className="sm:text-base font-medium ">{name}</p>
          </NavLink>
          <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
            <p>₹ {total}</p>
            <p>Quantity: {quantity}</p>
            <p>Size: {size}</p>
          </div>
          <p>
            Payment: <span className="text-gray-400">{paymentMethod}</span>
          </p>
        </div>
      </div>
      <div className="md:w-1/2 flex justify-between">
        <div className="flex items-center gap-2">
          <p
            className={`min-w-2 h-2 rounded-full ${
              itemStatus === "cancelled" ? "bg-red-500" : "bg-green-500"
            }`}
          ></p>
          <p className="text-sm md:text-base">
            {itemStatus.charAt(0).toUpperCase() + itemStatus.slice(1)}
          </p>
        </div>
        <button
          onClick={() => {
            if (itemStatus === "cancelled" || itemStatus === "delivered")
              return;
            cancelItem();
          }}
          disabled={itemStatus === "cancelled" || itemStatus === "delivered"}
          className={`border px-3 cursor-pointer py-1 text-sm font-medium rounded-sm ${
            itemStatus === "cancelled" || itemStatus === "delivered"
              ? "hidden"
              : ""
          }`}
        >
          Cancel Order
        </button>
      </div>
    </div>
  );
};

export default OrderItems;
