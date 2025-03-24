import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { formatDate } from "../../utils/constants";

const OrderItem = ({ order }) => {
  const {
    _id: itemId,
    order: item,
    product,
    quantity,
    createdAt,
    status,
    total,
  } = order;
  const [itemStatus, setItemStatus] = useState(status);
  const { paymentMethod, isPaid } = item;
  const image = product?.images[0]?.imageUrls;
  const address = item?.shippingAddress;
  const formattedDate = formatDate(createdAt);

  async function updateStatus() {
    try {
      const response = await axios.patch(
        `${BASE_URL}/seller/update-status`,
        { itemId, status: itemStatus },
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Status updated");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-2 md:p-2 my-1 md:my-2 text-xs sm:text-sm text-gray-700">
      <img className="w-14" src={image} alt="saree" />
      <div>
        <div>
          <p className="py-0.5">{product?.name}</p>
        </div>
        <p className="mt-2 mb-0.5 font-medium">{address?.name}</p>
        <div>
          <p className="text-sm">{address?.line1}</p>
          <p className="text-sm">
            {address?.line2}, {address?.city}
          </p>
        </div>
      </div>
      <div>
        <p className="text-xs sm:text-sm">Quantity : {quantity}</p>
        <p className="mt-2 text-xs ">METHOD: {paymentMethod}</p>
        <p className=" text-xs mt-0.5">
          PAYMENT: {isPaid ? "Paid" : "Pending"}
        </p>
        <p className=" text-xs mt-0.5">DATE: {formattedDate}</p>
      </div>
      <p className="text-xs sm:text-sm">Total: ₹ {total}</p>
      <div className="flex flex-col">
        <select
          id="item-status"
          className="p-2 font-semibold max-w-28"
          name="item-status"
          value={itemStatus}
          disabled={status === "cancelled" || status === "delivered"}
          onChange={(e) => setItemStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button
          onClick={updateStatus}
          className={`self-start p-2 cursor-pointer ${
            status === "cancelled" || status === "delivered"
              ? "hidden"
              : "block"
          } `}
        >
          Update Status
        </button>
      </div>
    </div>
  );
};

export default OrderItem;
