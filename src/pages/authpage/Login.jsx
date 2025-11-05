

import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { loginUser } from "../../redux/Slice/LoginSlice";
import { Eye, EyeOff } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, token, user } = useSelector((state) => state.login);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setCredentials({
      email: "",
      password: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      toast.error("Please fill in all fields");
      return;
    }
    dispatch(loginUser(credentials));
  };

  useEffect(() => {
    if (token && user) {
      toast.success("Login successful. Redirecting...");
      resetForm();

      const timer = setTimeout(() => {
        if (user?.role === "Admin") navigate("/admin");
        else navigate("/user");
      }, 1000);

      return () => clearTimeout(timer);
    }

    if (error) {
      toast.error(error);
    }
  }, [error, token, user, navigate]);

  const toggleToRegister = () => navigate("/register");
  const forgetPassword = () => navigate("/forgetPassword");

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Left Section - Welcome Banner */}
      <div className="hidden md:flex md:w-1/2 justify-center items-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-10">
        <div className="max-w-md text-left space-y-6 animate-fade-in">
          <h1 className="text-5xl font-extrabold font-serif leading-tight">
            Welcome Back, <br /> 
          </h1>
          <p className="text-lg opacity-90">
            Log in to continue your journey of discovery, growth, and brilliance.
          </p>
          <div className="h-1 w-24 bg-white rounded-full"></div>
        </div>
      </div>

      {/* Right Section - Login Card */}
      <div className="flex-1 flex justify-center items-center p-6 md:p-12">
        <div className="w-full max-w-md bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-2xl rounded-3xl p-8 md:p-10 transition-transform duration-500 hover:scale-[1.02]">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-8 text-gray-900 dark:text-white">
            👋 Hello Again!
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={credentials.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 dark:border-gray-700 rounded-2xl p-3 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-2xl p-3 pr-10 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 cursor-pointer text-gray-500 dark:text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                onClick={forgetPassword}
                className="text-sm text-blue-600 hover:underline font-medium"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              disabled={loading}
              type="submit"
              className={`w-full p-3 rounded-2xl text-lg font-serif text-white transition-all duration-300 shadow-md ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "btn"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center mt-8 text-gray-700 dark:text-gray-300">
            Don’t have an account?{" "}
            <span
              onClick={toggleToRegister}
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
            >
              Register Now
            </span>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
