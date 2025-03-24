import { useEffect, useState } from "react";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { useNavigate } from "react-router";
import validator from "validator";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const UserLogin = () => {
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) navigate("/profile");
  }, []);

  const handleLogin = async () => {
    if (!validator.isEmail(email)) {
      setError("Enter a valid email Id");
      return;
    }
    if (!password) {
      setError("Enter a password");
      return;
    }
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.status === 200) {
        dispatch(addUser(res?.data?.data));
        return navigate("/");
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.error || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    if (!name) {
      setError("Enter name");
    }

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
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { name, email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      if (res.status === 201) {
        toast.success("Registered successfully");
        dispatch(addUser(res.data.data));
        return navigate("/");
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col mt-24 items-center gap-5">
      <h1 className="text-4xl">{isSignUp ? "Sign Up" : "Login"} </h1>
      <div className="flex flex-col gap-5 w-[30%] min-w-3xs">
        {isSignUp && (
          <input
            placeholder="Name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded-sm outline-none"
          />
        )}
        <input
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded-sm outline-none"
        />

        <div className="relative p-2 border rounded-sm outline-none">
          <input
            placeholder="Password"
            type={viewPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="outline-none w-full"
          />
          <div
            className="absolute top-3.5 right-3 "
            onClick={() => setViewPassword(!viewPassword)}
          >
            {viewPassword ? <FaEye /> : <FaEyeSlash />}
          </div>
        </div>
      </div>
      <div className="flex w-[30%] sm:justify-between sm:text-sm text-xs -mt-3 flex-col sm:flex-row  ">
        {!isSignUp && <p className="cursor-pointer">Forget your password?</p>}
        <p
          className="cursor-pointer sm:ml-auto "
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? "Login Here" : "Create account"}
        </p>
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <button
        className="bg-black border cursor-pointer text-white  px-5 py-3 rounded-xs"
        onClick={isSignUp ? handleSignUp : handleLogin}
      >
        {isSignUp ? "Sign Up" : "Sign In"}
      </button>
    </div>
  );
};

export default UserLogin;
