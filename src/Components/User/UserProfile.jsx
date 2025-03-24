import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { addUser } from "../../utils/userSlice";
import { useNavigate } from "react-router";
const BASE_URL = import.meta.env.VITE_BASE_URL;


const UserProfile = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const [viewNewPassword, setViewNewPassword] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  if (!user) {
    navigate("/login");
  }

  const updateProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile",
        { name, email, shopName, oldPassword, newPassword },
        { withCredentials: true }
      );
      toast.success("Profile updated successfully!");
      dispatch(addUser(res?.data?.data));
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col min-w-[320px] w-[90vw] sm:w-[60%] md:w-[45%] lg:w-[35%] mx-auto mt-7 mb-16  gap-2 bg-gray-200 px-7 md:px-14 py-6 md:py-10 h-fit rounded-lg">
      <div className="flex flex-col gap-1">
        <label>Name</label>
        <input
          className="border p-2 rounded-md outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label>Email</label>
        <input
          className="border p-2 rounded-md outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label>Old Password</label>
        <div className="relative">
          <input
            className="border p-2 rounded-md w-full outline-none"
            type={viewPassword ? "text" : "password"}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <div
            className="absolute top-3 right-2"
            onClick={() => setViewPassword(!viewPassword)}
          >
            {viewPassword ? <FaEye /> : <FaEyeSlash />}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label>New Password</label>
        <div className="relative">
          <input
            className="border p-2 rounded-md w-full outline-none"
            type={viewNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <div
            className="absolute top-3 right-2"
            onClick={() => setViewNewPassword(!viewNewPassword)}
          >
            {viewNewPassword ? <FaEye /> : <FaEyeSlash />}
          </div>
        </div>
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <button
        onClick={updateProfile}
        className="bg-black text-white px-5 py-3 mt-4 rounded-md cursor-pointer font-semibold"
      >
        Update Profile
      </button>
    </div>
  );
};

export default UserProfile;
