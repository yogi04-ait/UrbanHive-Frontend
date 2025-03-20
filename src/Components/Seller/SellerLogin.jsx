import React, { useState, useEffect } from "react";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import validator from "validator";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addSeller } from "../../utils/sellerSlice";
const BASE_URL = import.meta.env.VITE_BASE_URL;


const SellerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [shopname, setShopname] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const seller = useSelector((store) => store.seller);

  const fetchSeller = async () => {
    if (seller) return;
    try {
      const res = await axios.get(BASE_URL + "/seller/profile", {
        withCredentials: true,
      });
      if (res.status === 201) {
        navigate("/seller/add");
        dispatch(addSeller(res.data.data));
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchSeller();
  }, []);


  const handleUser = () => {
    if (!validator.isEmail(email)) {
      setError("Enter a valid email Id");
      return;
    }
    if (!password) {
      setError("Enter a password");
      return;
    }
    if (!validator.isStrongPassword(password)) {
      setError("Enter a strong password");
      return;
    }

    if (isSignup) {
      if (!name || !shopname) {
        const field = !name ? "Name" : "Shopname";
        setError(`${field} cannot be empty`);
        return;
      }
      signUp();
    } else {
      signIn();
    }
  };

  const signUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/seller/signup",
        {
          name,
          email,
          password,
          shopName: shopname,
        },
        { withCredentials: true }
      );
      if (res.status === 201) {
        toast.success("Registered successfully");
        dispatch(addSeller(res.data.data));
        navigate("/seller/add");
      }
    } catch (error) {
      setError(error?.response?.data?.error || "Something went wrong");
    }
  };

  const signIn = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/seller/login",
        { email, password },
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success("Login successfully");
        dispatch(addSeller(res.data.data));
        navigate("/seller/add");
      }
    } catch (error) {
      setError(error?.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="w-full h-screen  flex justify-center items-center bg-gray-100">
      <div className="flex flex-col relative w-[75%] sm:w-1/2 md:w-1/3  lg:w-1/4 bg-white  gap-4 rounded-md p-5 ">
        <h1 className="font-bold text-xl">Seller Panel</h1>
        {isSignup && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="border border-gray-500 p-2 placeholder:text-gray-400  outline-none rounded-md"
            />
          </div>
        )}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">
            Email Address
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter you email"
            className="border border-gray-500 p-2 placeholder:text-gray-400  outline-none rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              type={viewPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="border border-gray-500 w-full p-2  placeholder:text-gray-400  outline-none rounded-md"
            />
            <div
              className="absolute  top-3 right-2 "
              onClick={() => setViewPassword(!viewPassword)}
            >
              {viewPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
        </div>
        {isSignup && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Shop Name
            </label>
            <input
              value={shopname}
              onChange={(e) => setShopname(e.target.value)}
              placeholder="Enter you shop name"
              className="border border-gray-500 p-2 placeholder:text-gray-400  outline-none rounded-md"
            />
          </div>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}
        <p
          className="font-semibold text-sm text-gray-600 absolute right-5 cursor-pointer bottom-16  "
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? "Login Here" : "Create account"}
        </p>
        <button
          className="w-full cursor-pointer text-white p-2 rounded-md font-semibold bg-black mt-5"
          onClick={handleUser}
        >
          {isSignup ? "Sign Up" : "Sign In"}
        </button>
      </div>
    </div>
  );
};

export default SellerLogin;
