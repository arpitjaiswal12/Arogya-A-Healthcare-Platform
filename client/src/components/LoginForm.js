import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/Slices/userSlice.js";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { toast } from "react-hot-toast";

export default function Login() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    if (e.target.id === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Email address is not valid");
      return;
    }

    try {
      dispatch(loginStart());
      console.log(formData);
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}api/v1/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        toast.error(data.message);
        dispatch(loginFailure(data.message));
        return;
      }
      dispatch(loginSuccess(data));
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      dispatch(loginFailure(error.message));
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md">
      <div className="px-6 py-4">
        {/* <div className="flex justify-center mx-auto">
          <img
            className="w-auto h-7 sm:h-8"
            src="https://merakiui.com/images/logo.svg"
            alt="Logo"
          />
        </div> */}

        <h3 className="mt-3 text-xl font-medium text-center text-gray-800">
          Welcome Back
        </h3>

        <p className="mt-1 text-center text-gray-500">
          Login or create account
        </p>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="w-full">
            <input
              type="email"
              placeholder="Email Address"
              id="email"
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              aria-label="Email Address"
            />
          </div>

          <div className="w-full mt-4 relative">
            <input
              type={type}
              placeholder="Password"
              id="password"
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              aria-label="Password"
            />
            <span
              className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
              onClick={handleToggle}
            >
              <Icon icon={icon} size={20} />
            </span>
          </div>

          <div className="flex items-center justify-between mt-4">
            <a href="#" className="text-sm text-gray-600 hover:text-gray-500">
              Forget Password?
            </a>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-black rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>

      <div className="flex items-center justify-center py-4 text-center bg-gray-50">
        <span className="text-sm text-gray-600">Don’t have an account?</span>

        <Link
          to="/signup"
          className="mx-2 text-sm font-bold text-black hover:underline"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
