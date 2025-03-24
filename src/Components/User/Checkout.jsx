import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { statesAndUTsEnum, verifyAddress } from "../../utils/constants";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { unstable_batchedUpdates } from "react-dom";
import { resetCart } from "../../utils/cartSlice";

const Checkout = () => {
  const [address, setAddress] = useState({
    name: "",
    mobile: "",
    pincode: "",
    line1: "",
    line2: "",
    landmark: "",
    city: "",
    state: "",
  });
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [deleteAddressModal, setDeleteAddressModal] = useState(false);
  const [deleteAddressId, setDeleteAddressId] = useState(null);
  const [error, setError] = useState("");
  const [editAddId, setEditAddID] = useState(null);
  const user = useSelector((store) => store.user);
  const cart = useSelector((store) => store.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [placingOrder, setPlacingOrder] = useState(false);

  if (!user) {
    navigate("/login");
  }

  function cartTotal() {
    let total = 0;
    cart.forEach((product) => {
      total += product.quantity * product.price;
    });

    return total.toFixed(2);
  }
  const total = cartTotal();

  const handleRadioChange = (id) => {
    setSelectedAddressId(id);
  };

  async function fetchAddress() {
    try {
      const res = await axios.get(BASE_URL + "/address", {
        withCredentials: true,
      });
      if (res.state === 401) {
        navigate("/login");
      }
      if (res.status === 200) {
        setAddresses(res?.data?.addresses);
        setSelectedAddressId(res?.data?.addresses[0]?._id);
      }
    } catch (error) {}
  }

  function editAddress(address) {
    const {
      _id,
      name,
      mobileNumber,
      pincode,
      line1,
      line2,
      landmark,
      city,
      state,
    } = address;
    setModal(true);
    setEditAddID(_id);

    setAddress({
      name: name,
      mobile: mobileNumber,
      pincode: pincode,
      line1: line1,
      line2: line2,
      landmark: landmark,
      city: city,
      state: state,
    });
  }

  async function addAddress(e) {
    e.preventDefault();
    const newAddress = {
      name: address.name,
      mobileNumber: address.mobile,
      pincode: address.pincode,
      line1: address.line1,
      line2: address.line2,
      landmark: address.landmark,
      city: address.city,
      state: address.state,
    };

    try {
      await verifyAddress(newAddress);
    } catch (error) {
      setError(error.message);
      return;
    }

    try {
      let response;
      if (editAddId) {
        response = await axios.patch(
          BASE_URL + "/address/" + editAddId,
          newAddress,
          {
            withCredentials: true,
          }
        );
        setEditAddID(null);
      } else {
        response = await axios.post(BASE_URL + "/address", newAddress, {
          withCredentials: true,
        });
      }

      if (response.status === 200) {
        if (editAddId) {
          toast.success("Address updated successfully");
        } else {
          toast.success("Address added successfully");
        }
        setAddress({
          name: "",
          mobile: "",
          pincode: "",
          line1: "",
          line2: "",
          landmark: "",
          city: "",
          state: "",
        });
        setModal(false);
        await fetchAddress();
        setSelectedAddressId(response?.data?.address?._id);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  useEffect(() => {
    fetchAddress();
    if (cart.length == 0) {
      navigate("/feed");
    }
  }, []);

  const [modal, setModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const handlePaymentMethodChange = (e) => {
    if (e.target.value === "ONLINE") {
      toast.warn("Online payment is not available");
      return;
    }
    setPaymentMethod(e.target.value);
  };

  async function deleteAddress() {
    try {
      const response = await axios.delete(
        `${BASE_URL}/address/${deleteAddressId}`,
        { withCredentials: true }
      );
      setDeleteAddressModal(false);
      if (response.status === 200) {
        toast.info("Address deleted");
        fetchAddress();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  function openDeleteModal(id) {
    setDeleteAddressModal(true);
    setDeleteAddressId(id);
  }

  function closeModal() {
    unstable_batchedUpdates(() => {
      setModal(false);
      setEditAddID(null);
      setAddress({
        name: "",
        mobile: "",
        pincode: "",
        line1: "",
        line2: "",
        landmark: "",
        city: "",
        state: "",
      });
    });
  }

  async function placeOrder() {
    try {
      const orderItems = [];
      setPlacingOrder(true);
      cart.map((product) => {
        orderItems.push({
          productId: product.productId,
          size: product.size,
          quantity: product.quantity,
        });
      });
      const isPaid = paymentMethod === "COD" ? false : true;
      const response = await axios.post(
        BASE_URL + "/order",
        {
          orderItems,
          addressId: selectedAddressId,
          isPaid: isPaid,
          paymentMethod: paymentMethod,
        },
        { withCredentials: true }
      );
      if (response.status === 201) {
        toast.success("Order placed successfully");
        dispatch(resetCart());
        navigate("/orders");
      }
    } catch (error) {
      toast.warn(error?.response?.data?.message);
    } finally {
      setPlacingOrder(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <div>
      {deleteAddressModal && (
        <div className="flex flex-col fixed gap-7 inset-0 backdrop-blur-md z-40 bg-gray-100 my-auto shadow-lg mx-auto justify-center items-center min-w-3xs w-1/5 p-5 rounded-md h-fit ">
          <p>Delete Address</p>
          <div className="flex w-full gap-10 justify-center ">
            <button
              onClick={deleteAddress}
              className="py-1 px-2 cursor-pointer hover:bg-gray-300 rounded-sm"
            >
              Confirm
            </button>
            <button
              onClick={closeModal}
              className="py-1 px-2 cursor-pointer hover:bg-gray-300 rounded-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div
        className={`flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] ${
          modal ? "opacity-10 pointer-events-none" : ""
        }  `}
      >
        <div className="flex flex-col w-full sm:max-w-[480px] ">
          <p className="font-semibold mb-5 ">Delivery Address</p>
          <div className="h-[50vh] flex flex-col gap-4 w-full overflow-scroll ">
            {addresses.map((address) => {
              return (
                <div
                  key={address._id}
                  className="border p-2 rounded-md flex flex-col gap-0.5"
                >
                  <div className="flex flex-col gap-3">
                    <input
                      type="radio"
                      id={`address-${address._id}`}
                      name="address"
                      value={address._id}
                      checked={selectedAddressId === address._id}
                      onChange={() => handleRadioChange(address._id)}
                      className=" w-3 h-3 border border-gray-400 rounded-full 
                cursor-pointer"
                    />
                  </div>

                  <p>{address.name}</p>
                  <p>
                    {address.line1}, {address.line2}, {address.state},{" "}
                    {address.pincode}
                  </p>
                  <p>Phone number: {address.mobileNumber}</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => editAddress(address)}
                      className="cursor-pointer text-blue-600"
                    >
                      Edit address
                    </button>
                    <button
                      onClick={() => openDeleteModal(address._id)}
                      className="cursor-pointer text-blue-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            onClick={() => setModal(true)}
            className="mt-3 bottom-2 mx-2 cursor-pointer  text-white bg-black px-3 py-1 w-fit font-semibold rounded-md"
          >
            Add a new address
          </button>
        </div>
        <div className="mt-8 ">
          <div className="mt-8 min-w-80">
            <div className="w-full">
              <div className="text-2xl">
                <div className="inline-flex gap-2 items-center mb-3">
                  <p className="text-gray-500">
                    CART
                    <span className="text-gray-700 font-medium"> TOTALS</span>
                  </p>
                  <p class="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-2 text-sm">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>₹ {total}</p>
                </div>
                <hr />
                <div className="flex justify-between ">
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
          </div>
          <div className="mt-12">
            <div className="inline-flex gap-2 items-center mb-3">
              <p className="text-gray-500">
                PAYMENT
                <span className="text-gray-700 font-medium">METHOD</span>
              </p>
              <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
            </div>

            <div className="flex gap-3 flex-col lg:flex-row">
              <label className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="ONLINE"
                  checked={paymentMethod === "ONLINE"}
                  onChange={handlePaymentMethodChange}
                  className="appearance-none w-3 h-3 border border-gray-400 rounded-full 
              checked:bg-green-400 focus:outline-none cursor-pointer"
                />
                <p className="text-gray-500 text-sm font-medium mx-4">ONLINE</p>
              </label>

              <label className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={handlePaymentMethodChange}
                  className="appearance-none w-3 h-3 border border-gray-400 rounded-full 
              checked:bg-green-400 focus:outline-none cursor-pointer"
                />
                <p className="text-gray-500 text-sm font-medium mx-4">COD</p>
              </label>
            </div>
            <div className="w-full text-end mt-8">
              <button
                onClick={placeOrder}
                disabled={placingOrder}
                className={`bg-black cursor-pointer text-white px-16 py-3 text-sm ${
                  placingOrder ? "cursor-progress" : "cursor-pointer"
                }`}
              >
                {placingOrder ? "PLACING ORDER" : "PLACE ORDER"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {modal && (
        <div className="flex fixed inset-0  backdrop-blur-md z-40 overflow-auto bg-white my-auto shadow-lg mx-auto flex-col gap-3 h-fit min-w-[340px] text-sm w-[55vw] lg:w-[42vw] border px-5 py-1 md:py-4 rounded-md ">
          <div className="flex justify-between  ">
            <p className="text-lg mb-3 sm:text-xl md:text-2xl font-medium">
              {editAddId ? "Update Address" : "Enter a new delivery address"}{" "}
            </p>
            <IoMdClose
              className="cursor-pointer self-center text-lg sm:text-2xl   "
              onClick={closeModal}
            />
          </div>
          <form className=" flex flex-col gap-4">
            <div className="flex flex-col gap-1 ">
              <label className="font-semibold">Full name</label>
              <input
                className="border outline-none p-1 rounded-sm"
                name="name"
                value={address.name}
                required
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1 ">
              <label className="font-semibold">Mobile number</label>
              <input
                className="border outline-none p-1 rounded-sm"
                name="mobile"
                type="text"
                pattern="[0-9]{10}"
                maxLength={10}
                required
                value={address.mobile}
                onChange={handleChange}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold">Pincode</label>
              <input
                className="border outline-none p-1 rounded-sm"
                placeholder="6 digits [0-9] PIN code"
                type="number"
                required
                name="pincode"
                maxLength={6}
                value={address.pincode}
                onChange={handleChange}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold">Flat, House No.</label>
              <input
                className="border outline-none p-1 rounded-sm"
                name="line1"
                required
                value={address.line1}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold">
                Area, Street, Sector, Village
              </label>
              <input
                className="border outline-none p-1 rounded-sm"
                placeholder=""
                name="line2"
                required
                value={address.line2}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold">Landmark</label>
              <input
                className="border outline-none p-1 rounded-sm"
                placeholder="Eg. near apollo hospital"
                name="landmark"
                value={address.landmark}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-2 flex-col md:flex-row">
              <div className="flex flex-col gap-1">
                <label className="font-semibold">Town/City</label>
                <input
                  className="border outline-none  p-1 rounded-sm"
                  name="city"
                  required
                  value={address.city}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-semibold ">State</label>
                <select
                  className="border outline-none p-1 py-1.5 text-xs bg-gray-200   rounded-sm"
                  name="state"
                  value={address.state}
                  onChange={handleChange}
                >
                  <option value="" className="text-xs bg-white  ">
                    Select a state
                  </option>
                  {statesAndUTsEnum.map((state, index) => (
                    <option
                      key={index}
                      required
                      className="text-xs bg-white"
                      value={state}
                    >
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {error && <p className="text-red-500 text-xs -mb-5">{error}</p>}
            <button
              onClick={(e) => addAddress(e)}
              className="font-semibold mt-4 self-start text-white bg-black rounded-md cursor-pointer px-3 py-1.5"
            >
              {editAddId ? "Update Address" : "Add Address"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Checkout;
